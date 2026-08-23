import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from 'd3-force';
import { RADIUS, type GraphLink, type GraphNode } from '../data/graph';
import type { Graph } from './graph';

/**
 * The layout is solved once at build time with a seeded RNG, then frozen into the
 * markup. Visitors always see the same arrangement, the browser never runs a layout
 * pass on load, and the graph still renders with JavaScript disabled.
 */

export interface PlacedNode extends GraphNode {
  x: number;
  y: number;
  r: number;
  /** Which side the label sits on. */
  side: 'left' | 'right';
  labelSize: number;
}

export interface Layout {
  width: number;
  height: number;
  nodes: PlacedNode[];
  links: { source: PlacedNode; target: PlacedNode }[];
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Options {
  width: number;
  height: number;
  /** Regions the layout must stay clear of, e.g. behind the fixed navigation. */
  keepOut?: Rect[];
  seed?: number;
  labels?: boolean;
}

type SimNode = SimulationNodeDatum & GraphNode & { r: number };
type SimLink = SimulationLinkDatum<SimNode>;

/** Small, fast, seeded PRNG. Same seed in, same layout out. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LABEL_SIZE: Record<string, number> = {
  identity: 15,
  primary: 12.5,
  research: 10.5,
  method: 10,
  institution: 10,
  personal: 10,
  paper: 10,
};

function labelWidth(text: string, size: number): number {
  return text.length * size * 0.53;
}

function pushOutOfRect(node: SimNode, rect: Rect, pad: number) {
  const x = node.x ?? 0;
  const y = node.y ?? 0;
  const left = rect.x - pad;
  const right = rect.x + rect.w + pad;
  const top = rect.y - pad;
  const bottom = rect.y + rect.h + pad;
  if (x < left || x > right || y < top || y > bottom) return;
  // Move along the cheapest axis out of the rectangle.
  const dLeft = x - left;
  const dRight = right - x;
  const dTop = y - top;
  const dBottom = bottom - y;
  const min = Math.min(dLeft, dRight, dTop, dBottom);
  if (min === dLeft) node.x = left;
  else if (min === dRight) node.x = right;
  else if (min === dTop) node.y = top;
  else node.y = bottom;
}

/**
 * Breadth-first tree over the graph, rooted at the identity node. The tree decides the
 * composition; the remaining edges are cross-links drawn on top of it.
 */
function spanningTree(graph: Graph, root: string) {
  const neighbours = new Map<string, string[]>();
  for (const node of graph.nodes) neighbours.set(node.id, []);
  for (const link of graph.links) {
    neighbours.get(link.source)?.push(link.target);
    neighbours.get(link.target)?.push(link.source);
  }

  const parent = new Map<string, string | null>();
  const depth = new Map<string, number>();
  const children = new Map<string, string[]>();
  for (const node of graph.nodes) children.set(node.id, []);

  const start = graph.nodes.some((n) => n.id === root) ? root : (graph.nodes[0]?.id ?? '');
  const queue = [start];
  parent.set(start, null);
  depth.set(start, 0);

  while (queue.length) {
    const id = queue.shift()!;
    for (const next of neighbours.get(id) ?? []) {
      if (parent.has(next)) continue;
      parent.set(next, id);
      depth.set(next, (depth.get(id) ?? 0) + 1);
      children.get(id)!.push(next);
      queue.push(next);
    }
  }

  // Anything unreachable hangs off the root so it still gets a place.
  for (const node of graph.nodes) {
    if (parent.has(node.id)) continue;
    parent.set(node.id, start);
    depth.set(node.id, 1);
    children.get(start)!.push(node.id);
  }

  return { root: start, parent, depth, children };
}

/** Leaf-count weighted angular allocation: busy branches get more of the circle. */
function assignAngles(
  tree: ReturnType<typeof spanningTree>,
  start = -Math.PI / 2,
): Map<string, number> {
  const leaves = new Map<string, number>();
  const countLeaves = (id: string): number => {
    const kids = tree.children.get(id) ?? [];
    const total = kids.length === 0 ? 1 : kids.reduce((sum, kid) => sum + countLeaves(kid), 0);
    leaves.set(id, total);
    return total;
  };
  countLeaves(tree.root);

  const angles = new Map<string, number>();
  angles.set(tree.root, 0);

  const walk = (id: string, from: number, to: number) => {
    const kids = tree.children.get(id) ?? [];
    if (kids.length === 0) return;
    const total = leaves.get(id) ?? 1;
    let cursor = from;
    for (const kid of kids) {
      const share = ((leaves.get(kid) ?? 1) / total) * (to - from);
      angles.set(kid, cursor + share / 2);
      walk(kid, cursor, cursor + share);
      cursor += share;
    }
  };
  walk(tree.root, start, start + Math.PI * 2);

  return angles;
}

export function solveLayout(graph: Graph, options: Options): Layout {
  const { width, height, keepOut = [], seed = 20260101, labels = true } = options;
  const rand = mulberry32(seed);
  const cx = width / 2;
  const cy = height / 2;

  const tree = spanningTree(graph, 'ainhoa');
  const angles = assignAngles(tree);
  const maxDepth = Math.max(1, ...[...tree.depth.values()]);

  const ringGap = Math.min(width, height) * 0.5 * (labels ? 0.78 : 0.9);
  const ring = (d: number) => (d === 0 ? 0 : (ringGap * (0.42 + 0.58 * (d / maxDepth))) / 1);

  // Deterministic polar start position. The jitter is seeded, so it is the same every build.
  const nodes: SimNode[] = graph.nodes.map((n) => {
    const depth = tree.depth.get(n.id) ?? 1;
    const angle = (angles.get(n.id) ?? 0) + (rand() - 0.5) * 0.05;
    const radius = ring(depth) * (0.97 + rand() * 0.06);
    return {
      ...n,
      r: RADIUS[n.category],
      x: cx + Math.cos(angle) * radius * 1.04,
      y: cy + Math.sin(angle) * radius * 0.92,
    };
  });

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const links: SimLink[] = graph.links
    .filter((l) => byId.has(l.source) && byId.has(l.target))
    .map((l) => ({ source: byId.get(l.source)!, target: byId.get(l.target)! }));

  const identity = byId.get(tree.root);
  if (identity) {
    identity.fx = cx;
    identity.fy = cy;
  }

  // Relaxation keeps each node near its allotted place but lets collisions resolve.
  const anchor = new Map(nodes.map((n) => [n.id, { x: n.x ?? cx, y: n.y ?? cy }]));

  const distance = (l: SimulationLinkDatum<SimNode>) => {
    const s = l.source as SimNode;
    const t = l.target as SimNode;
    const ds = tree.depth.get(s.id) ?? 1;
    const dt = tree.depth.get(t.id) ?? 1;
    return Math.max(48, Math.abs(ring(ds) - ring(dt)) || 70);
  };

  const sim = forceSimulation(nodes)
    .force('link', forceLink<SimNode, SimLink>(links).distance(distance).strength(0.12))
    .force(
      'charge',
      forceManyBody<SimNode>().strength((d) => (d.category === 'paper' ? -60 : -120)),
    )
    .force(
      'collide',
      forceCollide<SimNode>()
        .radius((d) => d.r + (labels && d.category !== 'paper' ? 15 : 8))
        .strength(0.92),
    )
    .force('x', forceX<SimNode>((d) => anchor.get(d.id)!.x).strength(0.28))
    .force('y', forceY<SimNode>((d) => anchor.get(d.id)!.y).strength(0.28))
    .stop();

  const margin = labels ? 34 : 22;
  for (let i = 0; i < 320; i++) {
    sim.tick();
    for (const node of nodes) {
      for (const rect of keepOut) pushOutOfRect(node, rect, node.r + 8);
      node.x = Math.min(width - margin, Math.max(margin, node.x ?? cx));
      node.y = Math.min(height - margin, Math.max(margin, node.y ?? cy));
    }
  }

  // Decide label sides, then nudge nodes apart until label boxes stop overlapping.
  const placed: PlacedNode[] = nodes.map((n) => ({
    ...(n as GraphNode),
    x: round(n.x ?? cx),
    y: round(n.y ?? cy),
    r: n.r,
    // Labels radiate outward from the centre, so they never point back into the graph.
    side: (n.x ?? cx) < cx ? 'left' : 'right',
    labelSize: LABEL_SIZE[n.category] ?? 10,
  }));

  if (labels) separateLabels(placed, width, height, keepOut);

  const placedById = new Map(placed.map((n) => [n.id, n]));
  return {
    width,
    height,
    nodes: placed,
    links: graph.links
      .filter((l) => placedById.has(l.source) && placedById.has(l.target))
      .map((l: GraphLink) => ({
        source: placedById.get(l.source)!,
        target: placedById.get(l.target)!,
      })),
  };
}

function labelBox(n: PlacedNode) {
  const size = n.labelSize;
  const w = labelWidth(n.label, size) + 14;
  const h = size + 6;
  const gap = n.r + 7;
  const x = n.side === 'right' ? n.x + gap : n.x - gap - w;
  // Union of the dot and its label: a label must not land on another node either.
  const left = Math.min(x, n.x - n.r - 2);
  const right = Math.max(x + w, n.x + n.r + 2);
  const top = Math.min(n.y - h / 2, n.y - n.r - 2);
  const bottom = Math.max(n.y + h / 2, n.y + n.r + 2);
  return { x: left, y: top, w: right - left, h: bottom - top };
}

function overlap(a: Rect, b: Rect) {
  const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  return ox > 0 && oy > 0 ? { ox, oy } : null;
}

/**
 * Papers carry no permanent label, so only the always-labelled categories take part.
 * Nodes are moved vertically first: it disturbs the composition least.
 */
function separateLabels(nodes: PlacedNode[], width: number, height: number, keepOut: Rect[]) {
  const labelled = nodes.filter((n) => n.category !== 'paper');
  for (let pass = 0; pass < 240; pass++) {
    let moved = false;
    for (let i = 0; i < labelled.length; i++) {
      for (let j = i + 1; j < labelled.length; j++) {
        const a = labelled[i]!;
        const b = labelled[j]!;
        if (a.category === 'identity' && b.category === 'identity') continue;
        const hit = overlap(labelBox(a), labelBox(b));
        if (!hit) continue;
        moved = true;
        const aLocked = a.category === 'identity';
        const bLocked = b.category === 'identity';

        // Against the pinned identity label, the free node steps clear on whichever
        // axis needs the smaller move.
        if (aLocked !== bLocked) {
          const free = aLocked ? b : a;
          const fixed = aLocked ? a : b;
          if (hit.ox <= hit.oy) {
            free.x += free.x >= fixed.x ? hit.ox + 1 : -(hit.ox + 1);
          } else {
            free.y += free.y >= fixed.y ? hit.oy + 1 : -(hit.oy + 1);
          }
          continue;
        }

        const shift = Math.min(hit.oy, 7) / 2 + 0.5;
        const aFirst = a.y <= b.y;
        if (!aLocked) a.y += aFirst ? -shift : shift;
        if (!bLocked) b.y += aFirst ? shift : -shift;
      }
    }
    for (const n of labelled) {
      for (const rect of keepOut) {
        const box = labelBox(n);
        if (overlap(box, rect)) n.y = rect.y + rect.h + n.r + 12;
      }
      n.y = Math.min(height - 22, Math.max(22, n.y));
      n.x = Math.min(width - 22, Math.max(22, n.x));
      // Pull nodes back in until the whole label box fits inside the frame.
      const box = labelBox(n);
      if (box.x < 4) n.x += 4 - box.x;
      else if (box.x + box.w > width - 4) n.x -= box.x + box.w - (width - 4);
    }
    if (!moved) break;
  }
  for (const n of nodes) {
    n.x = round(n.x);
    n.y = round(n.y);
  }
}

function round(v: number): number {
  return Math.round(v * 10) / 10;
}
