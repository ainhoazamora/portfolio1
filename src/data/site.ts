/**
 * All content in this file is migrated verbatim (or lightly re-set) from the existing
 * portfolio at https://ainhoazamora.github.io/portfolio/
 * Nothing here is invented. Where the source site did not state something, the field is
 * absent rather than filled in.
 */

export const site = {
  name: 'Ainhoa Zamora',
  role: 'Criminologist & Fraud Analyst',
  tagline:
    'Criminology researcher working on computational methods, criminal networks and financial crime.',
  location: 'Ghent, BE & Rotterdam, NL',
  email: 'Ainhoa.Zamora@UGent.be',
  linkedin: 'https://www.linkedin.com/in/ainhoa-zamora/',
  linkedinLabel: 'linkedin.com/in/ainhoa-zamora',
};

export const bio: string[] = [
  "I'm a criminology researcher with a strong focus on computational methods and data-driven analysis. I'm currently in the second year of my master's degree, specialising in applying predictive modelling and explainable AI to criminological research.",
  'My current project — my master thesis — includes ensembling machine learning methods (like XGBoost and Random Forest) for classification and prediction tasks, alongside network analysis approaches (such as Bayesian methods) to map relational dynamics in criminal networks.',
  'With my First-Class Honours degree in Criminology from the University of Bristol and hands-on experience as a fraud analyst, I strive to bring theoretical rigour and practical applicability to my research.',
  'My work so far spans a wide range of areas, including human and organ trafficking, financial crime, computational criminology, and border security.',
];

export const interests = [
  {
    title: 'IMARC student',
    items: [
      "Dual master's from Erasmus University Rotterdam & Ghent University",
      'Researching innovative approaches to computational criminological research and policy development',
    ],
  },
  {
    title: 'Computational stack',
    items: [
      'Self-taught Python and R',
      'Improving skills in data visualisation and statistical analysis',
      'Python toolkits: Pandas, scikit-learn, XGBoost',
      'R toolkits: Tidyverse, caret, igraph',
      'Currently learning how to build my own website',
    ],
  },
  {
    title: 'Bookshelf in 2026',
    items: [
      '“Essentials of Physics”, R. Feynman — reading',
      '“The Death of Ivan Ilyich”, L. Tolstoy — reading',
      '“El dolor de los demás”, M. Á. Hernández — finished',
    ],
  },
  {
    title: 'Photography',
    items: [
      'Amateur photography',
      'Bridging pictures and criminology through visual ethnographies',
    ],
  },
];

export const education = [
  {
    institution: 'Erasmus Universiteit Rotterdam & Ghent Universiteit',
    period: '2024 — Present',
    items: [
      "International Master's in Advanced Research in Criminology (IMARC)",
      '2-year master programme covering Advanced European Criminal Policy, Advanced Research Methods, Migration European and International Policies, and Cybercrime & Technology',
    ],
  },
  {
    institution: 'University of Bristol',
    period: '2020 — 2023',
    items: [
      'BSc in Criminology (Faculty of Social Sciences and Law)',
      'Grade awarded: First Class Honours',
      'Active member of the Criminal Justice Society and Bristol Law Club',
    ],
  },
  {
    institution: 'Agora International School Barcelona',
    period: '2008 — 2020',
    items: [
      'Double degree: International Baccalaureate (IB) & LOMCE Baccalaureate',
      'Grades awarded: 38/45 (IB), 11.66/14 (LOMCE)',
    ],
  },
];

export const experience = [
  {
    role: 'Fraud Analyst',
    org: 'Indra & CaixaBank, Barcelona, Spain',
    period: 'August 2025 — Present',
    items: [
      'Analyse financial transactions to identify suspicious patterns and prevent fraudulent activity',
      'Use data analysis tools and behavioural indicators to detect anomalies and emerging fraud trends',
      'Ensure compliance with internal policies, regulatory standards and data protection requirements',
    ],
  },
  {
    role: 'Commercial and Visual Merchandiser',
    org: 'Inditex — Zara (UK) & Stradivarius (NL)',
    period: 'October 2023 — February 2025',
    items: [
      'Managed commercial operations, coordinating team efforts to optimise sales and customer engagement',
    ],
  },
  {
    role: 'Peer Mentor',
    org: 'University of Bristol, United Kingdom',
    period: 'March 2021 — March 2023',
    items: [
      'Mentored first-year students, offering academic support and personal guidance',
      'Communicated complex university procedures in a clear and supportive manner',
    ],
  },
  {
    role: 'Research Intern',
    org: 'Key4Life & Bean Research, Bristol, United Kingdom',
    period: 'October 2021 — June 2022',
    items: [
      'Contributed to a report on rehabilitative programmes for young offenders at risk of incarceration across the UK',
      'Provided guidance and support to at-risk youth',
    ],
  },
  {
    role: 'Committee Member',
    org: 'University of Bristol — Spanish Society, United Kingdom',
    period: 'May 2022 — November 2022',
    items: [
      'Co-organised cultural events on Spanish-speaking literatures, history and identity',
      'Contributed written materials and communications to promote events',
    ],
  },
];

export const skills = [
  { label: 'Quantitative research', level: 80 },
  { label: 'Qualitative research', level: 65 },
  { label: 'SPSS', level: 70 },
  { label: 'R', level: 40 },
];

export const toolkits = [
  { label: 'Python', detail: 'Pandas, scikit-learn, XGBoost' },
  { label: 'R', detail: 'Tidyverse, caret, igraph' },
  { label: 'SPSS', detail: 'Statistical analysis' },
];

export type SymposiumEntry = {
  org: string;
  place: string;
  period: string;
  items: string[];
  link?: { href: string; label: string };
};

export const symposiums: SymposiumEntry[] = [
  {
    org: 'Stanford University',
    place: 'Palo Alto, United States',
    period: 'April 2026 — June 2026',
    items: ['Code in Place — CS106A Programming Methodologies'],
    link: {
      href: 'https://codeinplace.stanford.edu/cip6/certificate/sw8pip',
      label: 'View certificate',
    },
  },
  {
    org: 'Universiteit Utrecht',
    place: 'Utrecht, NL',
    period: 'November 2025',
    items: ['Common Study Programme in Criminal Justice and Critical Criminology'],
  },
  {
    org: 'Eurojust',
    place: 'Den Haag, NL',
    period: 'May 2025',
    items: [
      "Eurojust's role in counter-terrorism at international level and Core International Crimes (CIC)",
    ],
  },
  {
    org: 'Europol',
    place: 'Den Haag, NL',
    period: 'May 2025',
    items: [
      'Data Protection at Europol',
      'Presentation on the analysis project TWINS — Fighting Child Sexual Exploitation',
      'Europol Innovation Lab',
    ],
  },
  {
    org: 'International Criminal Court',
    place: 'Den Haag, NL',
    period: 'May 2025',
    items: ['Symposium on Global Cooperation on International Criminal Justice'],
  },
  {
    org: 'Ghent University',
    place: 'Ghent, BE',
    period: 'May 2025',
    items: ['Common Study Programme in Criminal Justice and Critical Criminology'],
  },
  {
    org: 'Universidade do Porto',
    place: 'Porto, PT',
    period: 'November 2024',
    items: ['Common Study Programme in Criminal Justice and Critical Criminology'],
  },
];
