import type { CollectionEntry } from 'astro:content';
import { baseLinks, baseNodes, type GraphLink, type GraphNode } from '../data/graph';

export type Paper = CollectionEntry<'papers'>;

/** Shorter display labels for a few long paper titles, used only inside the graph. */
const SHORT_LABELS: Record<string, string> = {
  'transnational-organised-crime-embeddedness': 'Transnational organised crime',
  'eu-legal-frameworks-ai-criminal-justice': 'EU frameworks for AI in justice',
  'policing-irregularities-barcelona-crimmigration': 'Policing irregularities, Barcelona',
  'asymmetries-street-and-white-collar-crime': 'Street vs. white-collar crime',
  'policy-making-in-human-trafficking': 'Policy making in human trafficking',
  'institutional-responses-to-natural-floods': 'Institutional flood responses',
  'paradox-of-crimmigration-in-eu-law': "The 'crimmigration' paradox",
  'harmonising-the-fight-against-ransomware': 'Harmonising ransomware response',
  'state-corporate-collusion-valencia-floods': 'State-corporate collusion, Valencia',
  'neoliberalism-and-big-pharma': 'Neoliberalism and Big Pharma',
  'gun-control-policies-in-the-us': 'Gun control policies in the US',
  'justice-after-conflict': 'Justice after conflict',
  'criminal-law-in-the-metaverse': 'Criminal law in the metaverse',
  'master-thesis': "Master's thesis (in progress)",
};

export function sortPapers(papers: Paper[]): Paper[] {
  return [...papers].sort((a, b) => a.data.order - b.data.order);
}

export function isThesis(paper: Paper): boolean {
  return paper.data.type === 'Bachelor thesis' || paper.data.type === 'Master thesis';
}

export interface Graph {
  nodes: GraphNode[];
  links: GraphLink[];
}

export function buildGraph(papers: Paper[]): Graph {
  const nodes: GraphNode[] = [...baseNodes];
  const links: GraphLink[] = [...baseLinks];
  const known = new Set(baseNodes.map((n) => n.id));

  for (const paper of sortPapers(papers)) {
    const id = `paper:${paper.id}`;
    nodes.push({
      id,
      label: SHORT_LABELS[paper.id] ?? paper.data.title,
      category: 'paper',
      href: `/papers/${paper.id}`,
      note: `${paper.data.type} · ${paper.data.period}`,
    });
    links.push({ source: isThesis(paper) ? 'thesis' : 'papers', target: id });

    for (const topic of paper.data.topics) {
      if (known.has(topic)) links.push({ source: id, target: topic });
    }
  }

  return { nodes, links };
}

/** Reduced graph for small screens: identity plus the primary sections only. */
export function mobileGraph(graph: Graph): Graph {
  const ids = new Set(graph.nodes.filter((n) => n.mobile).map((n) => n.id));
  return {
    nodes: graph.nodes.filter((n) => ids.has(n.id)),
    links: graph.links.filter((l) => ids.has(l.source) && ids.has(l.target)),
  };
}

/**
 * A one-and-a-half hop neighbourhood around a single node: the node itself, whatever it
 * links to, and any other paper that shares one of those topics.
 */
export function localGraph(graph: Graph, centreId: string, limit = 12): Graph {
  const near = adjacency(graph);
  const direct = near.get(centreId) ?? new Set<string>();
  const keep = new Set<string>([centreId, ...direct]);

  for (const topic of direct) {
    const topicNode = graph.nodes.find((n) => n.id === topic);
    if (!topicNode || topicNode.category !== 'research') continue;
    for (const sibling of near.get(topic) ?? []) {
      if (keep.size >= limit) break;
      if (sibling.startsWith('paper:')) keep.add(sibling);
    }
  }

  return {
    nodes: graph.nodes.filter((n) => keep.has(n.id)),
    links: graph.links.filter((l) => keep.has(l.source) && keep.has(l.target)),
  };
}

/** Neighbour lookup, used for hover highlighting and the local graph on paper pages. */
export function adjacency(graph: Graph): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  const add = (a: string, b: string) => {
    if (!map.has(a)) map.set(a, new Set());
    map.get(a)!.add(b);
  };
  for (const link of graph.links) {
    add(link.source, link.target);
    add(link.target, link.source);
  }
  return map;
}
