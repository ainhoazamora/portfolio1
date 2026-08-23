/**
 * The knowledge graph is defined here as structured data.
 * Paper nodes are NOT listed in this file — they are generated from the `papers`
 * content collection in `src/lib/graph.ts` so the two can never drift apart.
 */

export type NodeCategory =
  'identity' | 'primary' | 'research' | 'method' | 'institution' | 'personal' | 'paper';

export interface GraphNode {
  id: string;
  label: string;
  category: NodeCategory;
  /** Internal path (without base) or absolute URL. Nodes without href are not clickable. */
  href?: string;
  /** Short, factual preview shown on hover / focus. */
  note?: string;
  /** Included in the reduced mobile graph. */
  mobile?: boolean;
}

export interface GraphLink {
  source: string;
  target: string;
}

export const RADIUS: Record<NodeCategory, number> = {
  identity: 14,
  primary: 8,
  research: 5.5,
  method: 4.5,
  institution: 4.5,
  personal: 4.5,
  paper: 3.4,
};

/**
 * Categories whose labels are always drawn. Everything else — tools, institutions,
 * personal interests, papers — reveals its label on hover or keyboard focus.
 */
export const ALWAYS_LABELLED: NodeCategory[] = ['identity', 'primary', 'research'];

export const baseNodes: GraphNode[] = [
  {
    id: 'ainhoa',
    label: 'Ainhoa Zamora',
    category: 'identity',
    href: '/about',
    note: 'Criminologist & fraud analyst',
    mobile: true,
  },

  // Primary navigation
  {
    id: 'about',
    label: 'About',
    category: 'primary',
    href: '/about',
    note: 'Biography and interests',
    mobile: true,
  },
  {
    id: 'research',
    label: 'Research',
    category: 'primary',
    href: '/research',
    note: 'Research areas and written work',
    mobile: true,
  },
  {
    id: 'papers',
    label: 'Papers',
    category: 'primary',
    href: '/research#papers',
    note: "Master's and bachelor's papers",
    mobile: true,
  },
  {
    id: 'thesis',
    label: 'Thesis',
    category: 'primary',
    href: '/research#theses',
    note: 'Bachelor thesis and master thesis',
    mobile: true,
  },
  {
    id: 'cv',
    label: 'CV',
    category: 'primary',
    href: '/cv',
    note: 'Education, experience, skills',
    mobile: true,
  },
  {
    id: 'symposiums',
    label: 'Symposiums',
    category: 'primary',
    href: '/cv#symposiums',
    note: 'Symposiums and certificates',
    mobile: true,
  },
  {
    id: 'photography',
    label: 'Photography',
    category: 'primary',
    href: '/about#photography',
    note: 'Amateur photography',
    mobile: true,
  },
  {
    id: 'contact',
    label: 'Contact',
    category: 'primary',
    href: '/contact',
    note: 'Email and LinkedIn',
    mobile: true,
  },

  // Research areas
  {
    id: 'computational-criminology',
    label: 'Computational criminology',
    category: 'research',
    href: '/research#areas',
  },
  { id: 'fraud-analysis', label: 'Fraud analysis', category: 'research', href: '/research#areas' },
  {
    id: 'network-analysis',
    label: 'Network analysis',
    category: 'research',
    href: '/research#areas',
  },
  {
    id: 'predictive-modelling',
    label: 'Predictive modelling',
    category: 'research',
    href: '/research#areas',
  },
  { id: 'explainable-ai', label: 'Explainable AI', category: 'research', href: '/research#areas' },
  {
    id: 'criminal-networks',
    label: 'Criminal networks',
    category: 'research',
    href: '/research#areas',
  },
  {
    id: 'financial-crime',
    label: 'Financial crime',
    category: 'research',
    href: '/research#areas',
  },
  {
    id: 'human-trafficking',
    label: 'Human trafficking',
    category: 'research',
    href: '/research#areas',
  },
  {
    id: 'border-security',
    label: 'Border security',
    category: 'research',
    href: '/research#areas',
  },
  { id: 'cybercrime', label: 'Cybercrime', category: 'research', href: '/research#areas' },
  { id: 'state-crime', label: 'State crime', category: 'research', href: '/research#areas' },
  {
  id: 'genai-governance',
  label: 'Generative AI governance',
  category: 'research',
  href: '/research#areas',
},
  {
    id: 'gun-control-policy',
    label: 'Gun control policy',
    category: 'research',
    href: '/research#areas',
  },

  // Tools and analytical approaches
  {
    id: 'python',
    label: 'Python',
    category: 'method',
    href: '/cv#skills',
    note: 'Pandas, scikit-learn, XGBoost',
  },
  { id: 'r', label: 'R', category: 'method', href: '/cv#skills', note: 'Tidyverse, caret, igraph' },
  { id: 'xgboost', label: 'XGBoost', category: 'method', href: '/cv#skills' },
  { id: 'bayesian-methods', label: 'Bayesian methods', category: 'method', href: '/cv#skills' },

  // Institutions
  {
  id: 'stanford-g3o',
  label: 'Stanford University',
  category: 'institution',
  href: '/cv#experience',
  note: 'Graduate Research Assistant, G3O, 2026 — present',
},
{
  id: 'humane-intelligence',
  label: 'Humane Intelligence',
  category: 'institution',
  href: '/cv#experience',
  note: 'AI red-teaming volunteer, 2026 — present',
  },
  {
    id: 'erasmus-rotterdam',
    label: 'Erasmus Rotterdam',
    category: 'institution',
    href: '/cv#education',
    note: 'IMARC, 2024 — 2026, Cum Laude',
  },
  {
    id: 'ghent-university',
    label: 'Ghent University',
    category: 'institution',
    href: '/cv#education',
    note: 'IMARC, 2024 — 2026, Cum Laude',
  },
  {
    id: 'university-bristol',
    label: 'University of Bristol',
    category: 'institution',
    href: '/cv#education',
    note: 'BSc Criminology, 2020 — 2023',
  },
  {
    id: 'indra-caixabank',
    label: 'Indra & CaixaBank',
    category: 'institution',
    href: '/cv#experience',
    note: 'Fraud analyst, 2025 — 2026',
  },

  // Symposium hosts
  {
    id: 'europol',
    label: 'Europol',
    category: 'institution',
    href: '/cv#symposiums',
    note: 'Den Haag, May 2025',
  },
  {
    id: 'eurojust',
    label: 'Eurojust',
    category: 'institution',
    href: '/cv#symposiums',
    note: 'Den Haag, May 2025',
  },
  {
    id: 'icc',
    label: 'International Criminal Court',
    category: 'institution',
    href: '/cv#symposiums',
    note: 'Den Haag, May 2025',
  },
  {
    id: 'stanford',
    label: 'Stanford Code in Place',
    category: 'institution',
    href: '/cv#symposiums',
    note: 'CS106A, 2026',
  },

  // Personal
  {
    id: 'visual-ethnography',
    label: 'Visual ethnography',
    category: 'personal',
    href: '/about#photography',
  },
  { id: 'bookshelf', label: 'Bookshelf', category: 'personal', href: '/about#bookshelf' },
];

export const baseLinks: GraphLink[] = [
  // Identity → primary sections
  { source: 'ainhoa', target: 'about' },
  { source: 'ainhoa', target: 'research' },
  { source: 'ainhoa', target: 'cv' },
  { source: 'ainhoa', target: 'photography' },
  { source: 'ainhoa', target: 'contact' },

  // Identity → what she works on
  { source: 'ainhoa', target: 'computational-criminology' },
  { source: 'ainhoa', target: 'fraud-analysis' },

  // Section structure
  { source: 'research', target: 'papers' },
  { source: 'research', target: 'thesis' },
  { source: 'cv', target: 'symposiums' },
  { source: 'about', target: 'bookshelf' },

  // Research areas
  { source: 'research', target: 'computational-criminology' },
  { source: 'research', target: 'human-trafficking' },
  { source: 'research', target: 'border-security' },
  { source: 'research', target: 'financial-crime' },
  { source: 'research', target: 'cybercrime' },
  { source: 'research', target: 'state-crime' },
  { source: 'computational-criminology', target: 'network-analysis' },
  { source: 'computational-criminology', target: 'predictive-modelling' },
  { source: 'computational-criminology', target: 'explainable-ai' },
  { source: 'network-analysis', target: 'criminal-networks' },
  { source: 'fraud-analysis', target: 'financial-crime' },

  // Tools and approaches
  { source: 'computational-criminology', target: 'python' },
  { source: 'computational-criminology', target: 'r' },
  { source: 'predictive-modelling', target: 'xgboost' },
  { source: 'network-analysis', target: 'bayesian-methods' },
  { source: 'python', target: 'xgboost' },
  { source: 'stanford', target: 'python' },

  // Thesis
  { source: 'thesis', target: 'gun-control-policy' },

  // Education and employment
  { source: 'cv', target: 'erasmus-rotterdam' },
  { source: 'cv', target: 'ghent-university' },
  { source: 'cv', target: 'university-bristol' },
  { source: 'cv', target: 'indra-caixabank' },
  { source: 'fraud-analysis', target: 'indra-caixabank' },

  // Symposiums
  { source: 'symposiums', target: 'europol' },
  { source: 'symposiums', target: 'eurojust' },
  { source: 'symposiums', target: 'icc' },
  { source: 'symposiums', target: 'stanford' },

  { source: 'ainhoa', target: 'genai-governance' },
  { source: 'research', target: 'genai-governance' },
  { source: 'cv', target: 'stanford-g3o' },
  { source: 'cv', target: 'humane-intelligence' },
  { source: 'genai-governance', target: 'stanford-g3o' },
  { source: 'cybercrime', target: 'humane-intelligence' },

  
  // Personal
  { source: 'photography', target: 'visual-ethnography' },
  { source: 'about', target: 'photography' },
];
