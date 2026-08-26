/**
 * All content in this file is migrated verbatim (or lightly re-set) from the existing
 * portfolio at https://ainhoazamora.github.io/portfolio/
 * Nothing here is invented. Where the source site did not state something, the field is
 * absent rather than filled in.
 */

export const site = {
  name: 'Ainhoa Zamora',
  role: 'AI Researcher & Criminologist',
  tagline:
    'Criminology researcher working on computational methods, generative AI governance and financial crime.',
  location: 'Stanford, California, US // Rotterdam, NL // Barcelona, ES',
  email: 'ainhoa.zm@stanford.edu',
  linkedin: 'https://www.linkedin.com/in/ainhoa-zamora/',
  linkedinLabel: 'linkedin.com/in/ainhoa-zamora',
};

export const bio: string[] = [
  "I'm a criminology researcher working at the intersection of computational methods, financial crime and responsible AI. I completed an international master's in Advanced Research in Criminology at Erasmus University Rotterdam and Ghent University, graduating Cum Laude.",
  'I currently work as a graduate research assistant at Stanford University, contributing to G3O—a database tracking generative AI adoption across public institutions worldwide. My research combines machine learning and network analysis, supported by previous experience as a fraud analyst at Indra and CaixaBank.',
  'I also volunteer with Humane Intelligence, red-teaming AI systems for fraud and cybercrime risks.',
];

export const interests = [
  {
    title: 'Stanford Graduate Researcher',
    items: [
      'Graduate research assistant on G3O, tracking generative AI adoption across public institutions',
      'AI red-teaming volunteer with Humane Intelligence',
    ],
  },
  {
    title: 'Computational stack',
    items: [
      'Self-taught Python and R',
      'Improving skills in data visualisation and statistical analysis',
      'Python toolkits: Pandas, scikit-learn, NLTK, Matplotlib, XGBoost, Random Forest',
      'R toolkits: Tidyverse, caret, igraph',
    ],
  },
  {
    title: 'Currently reading',
    items: [
      '"Essentials of Physics", R. Feynman — reading',
      '"The Death of Ivan Ilyich", L. Tolstoy — reading',
      '"El dolor de los demás", M. Á. Hernández — finished',
    ],
  },
];

export type PhotoEntry = {
  image: string;
  location: string;
};

  export const photography: PhotoEntry[] = [
  {
    image: '/images/IMG_1845.jpg',
    location: 'Solothurn, Switzerland',
  },
  {
    image: '/images/IMG_2638.jpg',
    location: 'Golden Gate Bridge, San Francisco, California, USA',
  },
  {
    image: '/images/IMG_2734__1_.jpg',
    location: 'Stanford University Campus Stadium, California, USA',
  },
  {
    image: '/images/IMG_3141.jpg',
    location: 'San Francisco Bay Area, California, USA',
  },
  {
    image: '/images/IMG_5063.jpg',
    location: 'Brussels, Belgium',
  },
  {
    image: '/images/IMG_8731.jpg',
    location: 'Abadía de Montserrat, Catalunya, Spain',
  },
   {
    image: '/images/img4.jpg',
    location: 'Zurich City Center, Switzerland',
  },
];


export const education = [
  {
    institution: 'Stanford University',
    period: 'Jun 2026 — Aug 2026',
    items: [
      'International Honours Programme, Visiting Student',
      'Coursework in AI politics, algorithms and technical AI foundations (RNN, CNN, Transformers...), with emphasis on governance and responsible AI systems',
    ],
  },
  {
    institution: 'Erasmus Universiteit Rotterdam & Ghent Universiteit',
    period: '2024 — 2026',
    items: [
      "International Master's in Advanced Research in Criminology (IMARC)",
      '2-year master programme covering Advanced European Criminal Policy, Advanced Research Methods, Migration European and International Policies, and Cybercrime & Technology',
      'Graduated Cum Laude; thesis supervised by Wim Hardyns (BIGDATPOL, ERC-funded research)',
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
    period: '2018 — 2020',
    items: [
      'Double degree: International Baccalaureate (IB) & LOMCE Baccalaureate',
      'Grades awarded: 38/45 (IB), 11.66/14 (LOMCE)',
    ],
  },
];

export const experience = [
  {
    role: 'Graduate Research Assistant',
    org: 'Stanford University, Palo Alto, United States',
    period: 'June 2026 — Present',
    items: [
      'Support G3O, a database tracking generative AI adoption across roughly 700,000 public institutions worldwide, led by Dr. Simone Paci',
      'Build and manage the data procurement pipeline: sourcing, structuring and validating institutional records at scale',
    ],
  },
  {
    role: 'AI Red Team Volunteer',
    org: 'Humane Intelligence, Remote',
    period: 'August 2026 — Present',
    items: [
      'Participate in structured red-teaming exercises to identify vulnerabilities, biases and safety limitations in generative AI systems',
      'Contribute subject-matter expertise in fraud, financial crime and cybercrime typologies to adversarial testing and evaluation design',
    ],
  },
  {
    role: 'Fraud Analyst',
    org: 'Indra & CaixaBank, Barcelona, Spain',
    period: 'August 2025 — June 2026',
    items: [
      'Analysed financial transactions to identify suspicious patterns and prevent fraudulent activity',
      'Used data analysis tools and behavioural indicators to detect anomalies and emerging fraud trends',
      'Ensured compliance with internal policies, regulatory standards and data protection requirements',
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
