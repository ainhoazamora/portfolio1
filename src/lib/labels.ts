const SPECIAL: Record<string, string> = {
  'eu-law': 'EU law',
  'explainable-ai': 'Explainable AI',
  'gun-control-policy': 'Gun control policy',
  'machine-learning': 'Machine learning',
  'bayesian-methods': 'Bayesian methods',
  'quantitative-analysis': 'Quantitative analysis',
  'network-analysis': 'Network analysis',
  'predictive-modelling': 'Predictive modelling',
  'criminal-networks': 'Criminal networks',
  'organised-crime': 'Organised crime',
  'human-trafficking': 'Human trafficking',
  'financial-crime': 'Financial crime',
  'border-security': 'Border security',
  'disaster-governance': 'Disaster governance',
  'transitional-justice': 'Transitional justice',
  'state-crime': 'State crime',
  crimmigration: 'Crimmigration',
  cybercrime: 'Cybercrime',
};

/** Turn a slug into a readable label. */
export function humanise(slug: string): string {
  if (SPECIAL[slug]) return SPECIAL[slug];
  const words = slug.replace(/-/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}
