# Ainhoa Zamora — academic portfolio

An Astro site built around an interactive knowledge graph. Deploys to GitHub Pages at
`https://ainhoazamora.github.io/portfolio/`.

```bash
npm install
npm run dev      # local dev server
npm run check    # astro check (types + templates)
npm run build    # production build to dist/
npm run format   # prettier
```

## Note on the starting point

The brief asked to preserve an existing Astro structure. The repository at
`github.com/ainhoazamora/portfolio` (master branch) is not an Astro project — it is a static
vCard HTML template: one `index.html`, `assets/css/style.css`, `assets/js/script.js` and an
assets folder. This is a fresh Astro 5 project built to the structure the brief describes, with
all content migrated from that `index.html`.

## Content integrity

Nothing on this site is invented. Where the source had no data, the page says so.

- **No abstracts exist.** The old portfolio listed titles, categories and PDF links only. Every
  paper has `abstract: null` and the detail pages state that no abstract has been published.
- **No per-paper dates exist.** The source records programme periods only (BSc Bristol 2020–2023,
  IMARC 2024–2026). Papers show the programme period, labelled as such, with a footnote on both
  the Research page and each paper page.
- **No methods except one.** Only "Policy Making in Human Trafficking" states its method, in its
  own subtitle ("A Critical Examination of a Quantitative Dataset"). The method filter reads from
  frontmatter and fills out as verified methods are added.
- **Nothing is called peer-reviewed.** Each paper page carries a line stating it is student
  coursework produced for a degree programme.
- **Removed from the old site:** phone number and date of birth (both were public), and the
  contact form, which had no backend. Contact is now email and LinkedIn.
- **Not included:** three PDFs that exist in the old repo but are no longer linked from its
  `index.html` — `Intersectionality and Domestic Violence Policies.pdf`,
  `Poster Human trafficking.pdf`, `State Crime and Globalisation - y2.pdf`. They appear in an
  older `index.txt`. Add them to `src/content/papers/` if they were retired by accident.

## Structure

```
src/
  content/papers/*.md      14 papers — the single source of truth for paper data
  content.config.ts        collection schema
  data/site.ts             biography, education, experience, skills, symposiums
  data/graph.ts            graph nodes and relationships (papers excluded — see below)
  lib/graph.ts             merges the papers collection into the graph
  lib/layout.ts            build-time force layout
  components/
    KnowledgeGraph.astro   SVG graph + interaction script
    Nav.astro              fixed top-right navigation
  pages/                   index, about, research, cv, archive, contact, 404, papers/[slug]
public/papers/*.pdf        13 PDFs, renamed to match paper slugs
```

Paper nodes are generated from the content collection in `lib/graph.ts`, never hand-written in
`data/graph.ts`, so the graph and the paper list cannot drift apart. Adding a markdown file to
`src/content/papers/` adds a node, a row on Research, an Archive entry and a detail page.

## How the graph works

**The layout is solved at build time, not in the browser.** A breadth-first spanning tree rooted
at the identity node assigns each branch an angular sector weighted by its leaf count, d3-force
relaxes collisions, a label pass separates overlapping label boxes, and the settled coordinates
are written into server-rendered SVG.

Consequences:

- The arrangement is identical on every visit — the seeded RNG makes the build deterministic.
- The graph renders with JavaScript disabled, and with no layout work on page load.
- No simulation runs in the browser. The runtime script only adds hover highlighting, pointer
  repulsion and dragging, all of which spring back to the frozen positions and then stop.

The animation loop exits when everything is at rest and pauses on `visibilitychange`. It does not
start at all under `prefers-reduced-motion: reduce` or `pointer: coarse` — those visitors get the
static graph, with hover highlighting still available on the former.

The top-right region is passed to the solver as a keep-out rectangle, so no connection line runs
underneath the fixed navigation.

Two graphs are rendered and swapped with CSS at 56rem: the full 49-node graph, and a reduced graph
of the identity node plus eight primary sections. Only identity, section and research-area nodes
carry permanent labels; tools, institutions and papers reveal theirs on hover or keyboard focus,
which is what keeps the field readable at this node count.

## Accessibility

- The top-right navigation is primary. The homepage also lists every graph destination as an
  ordinary link, below the hero.
- Graph nodes with a destination are real SVG `<a>` elements — keyboard focusable in tab order,
  with an accessible name that includes the node's note. Nodes without a destination are
  `aria-hidden` and removed from the tab order. Connection lines are `aria-hidden`.
- The mobile menu is a `<details>` element, so it opens and is announced without JavaScript.
  Script adds Escape-to-close and click-outside only.
- Research filters and Archive search require JavaScript; all content is visible without them.

## Still to verify

Layout and build are checked. The following were not tested in a real browser:

- Mouse interaction performance (pointer repulsion, dragging).
- Keyboard tabbing through 49 SVG links.
- Touch behaviour on a real device.
- The `<object>` PDF viewer, which falls back to a link but behaves inconsistently on mobile.
- The `/portfolio/` base path against a live GitHub Pages deployment.
