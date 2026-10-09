export const APPLICATION_CATEGORIES = [
  'Utilities',
  'Work Management',
  'Business Website',
  'Software Solutions',
  'Education',
  'Rural Services',
  'Business Applications'
] as const;

export type ApplicationCategory = (typeof APPLICATION_CATEGORIES)[number];
export type ApplicationStatus = 'live' | 'in-development' | 'coming-soon';
export type OpeningMode = 'system-browser' | 'same-tab';

export interface HubApplication {
  id: string;
  name: string;
  slug: string;
  url: string;
  category: ApplicationCategory;
  description: string;
  icon: string;
  displayOrder: number;
  status: ApplicationStatus;
  openingMode: OpeningMode;
  businessName?: string;
}

const applicationEntries: HubApplication[] = [
  {
    id: 'tools',
    name: 'Tools',
    slug: 'tools',
    url: 'https://tools-xi-murex.vercel.app/',
    category: 'Utilities',
    description: 'A collection of practical digital tools for everyday work.',
    icon: 'tool',
    displayOrder: 1,
    status: 'live',
    openingMode: 'same-tab'
  },
  {
    id: 'worklog',
    name: 'Worklog',
    slug: 'worklog',
    url: 'https://worklog-liard.vercel.app/',
    category: 'Work Management',
    description: 'A dedicated space for work and activity management.',
    icon: 'work',
    displayOrder: 2,
    status: 'live',
    openingMode: 'same-tab'
  },
  {
    id: 'soft-steps-carpets',
    name: 'Soft Steps Carpets',
    slug: 'soft-steps-carpets',
    url: 'https://www.softstepscarpets.com/',
    category: 'Business Website',
    description: 'Explore the Soft Steps Carpets business website.',
    icon: 'carpet',
    displayOrder: 3,
    status: 'live',
    openingMode: 'same-tab',
    businessName: 'Soft Steps Carpets'
  },
  {
    id: 'suraksha-software',
    name: 'Suraksha Software',
    slug: 'suraksha-software',
    url: 'https://www.surakshawalls.space/',
    category: 'Software Solutions',
    description: 'Digital products and software solutions from Suraksha.',
    icon: 'software',
    displayOrder: 4,
    status: 'live',
    openingMode: 'same-tab',
    businessName: 'Suraksha Group'
  },
  {
    id: 'suraksha-library',
    name: 'Suraksha Library',
    slug: 'suraksha-library',
    url: 'https://library-six-ashy.vercel.app/',
    category: 'Education',
    description: 'A digital library for learning and reading.',
    icon: 'library',
    displayOrder: 5,
    status: 'live',
    openingMode: 'same-tab',
    businessName: 'Suraksha Group'
  },
  {
    id: 'farf-rural-connect',
    name: 'FARF Rural Connect',
    slug: 'farf-rural-connect',
    url: 'https://farf.vercel.app/',
    category: 'Rural Services',
    description: 'A digital connection point for rural services.',
    icon: 'rural',
    displayOrder: 6,
    status: 'live',
    openingMode: 'same-tab',
    businessName: 'FARF'
  },
  {
    id: 'madad-qr',
    name: 'Madad QR',
    slug: 'madad-qr',
    url: 'https://madad-qr.vercel.app/',
    category: 'Utilities',
    description: 'A QR-based utility for quick access to help.',
    icon: 'qr',
    displayOrder: 7,
    status: 'live',
    openingMode: 'same-tab'
  },
  {
    id: 'dandaata',
    name: 'Dandaata',
    slug: 'dandaata',
    url: 'https://dandata-neon.vercel.app/home',
    category: 'Business Applications',
    description: 'A business application from the Suraksha ecosystem.',
    icon: 'dandaata',
    displayOrder: 8,
    status: 'live',
    openingMode: 'same-tab'
  }
];

export const APPLICATIONS = applicationEntries.sort(
  (left, right) => left.displayOrder - right.displayOrder
);
