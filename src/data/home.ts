import type { FaqEntry } from './site';

export const homeSectionIds = {
  solutions: 'solutions',
  results: 'results',
  expertise: 'expertise',
  faq: 'faq',
  contact: 'contact',
} as const;

export const homeNavItems = [
  { href: `#${homeSectionIds.solutions}`, label: 'How We Help' },
  { href: `#${homeSectionIds.results}`, label: 'Use Cases' },
  { href: `#${homeSectionIds.expertise}`, label: 'Industries' },
  { href: '/pricing/', label: 'Pricing' },
  { href: `#${homeSectionIds.faq}`, label: 'FAQ' },
] as const;

export const homeMeta = {
  title: 'Caliperworks | Free AI Audit, Voice Agents, and SEO for Service Businesses',
  description:
    'Start with a free AI process audit. Caliperworks helps service businesses improve coverage, follow-up, voice handling, and SEO with clear pricing and practical workflows.',
} as const;

export const homeHero = {
  headline: 'You do not need more tools. You need more coverage.',
  subheadline:
    'We build AI systems that help service businesses handle demand, reduce admin drag, and keep the workflow under your team’s control.',
  primaryCtaLabel: 'Schedule a Discovery Call',
  secondaryCtaLabel: 'View Pricing',
  availabilityTimezone: 'America/New_York',
} as const;

export const homeProblemText =
  'Most owners do not need more software to babysit. They need dependable coverage when the phone rings during lunch, after hours, or while the team is stretched thin. We work with you to build practical systems that fit your process, keep your staff in control, and take repetitive work off their plate.';

export const homeSolutions = [
  {
    title: 'Workflow Review',
    subtitle: 'Find the right starting points',
    description:
      'We review your intake, follow-up, and handoff process with your team and identify the places where automation will actually help. You get a rollout plan grounded in your day-to-day operations.',
  },
  {
    title: 'Voice Coverage',
    subtitle: 'Coverage when staff are busy or offline',
    description:
      'We can answer routine calls during lunch breaks, after hours, or peak periods, capture the right details, and route or book the next step so your staff starts from a clean follow-up list.',
  },
  {
    title: 'Search & Ads Support',
    subtitle: 'Measured automation, clear reporting',
    description:
      'We support SEO and ad workflows with measured automation, human review, and reporting your team can actually use. The goal is more qualified demand without creating another system to monitor all day.',
  },
] as const;

export const homeTestimonials = [
  {
    quote:
      'A home care agency used Caliperworks to improve search visibility and lead qualification. Monthly engaged visitors increased 199%, and the team had a much cleaner intake process for new inquiries.',
    author: 'Home Care Agency in Boston',
    metrics: ['199% Visitor Growth', 'Page 1 for Key Terms', 'Cleaner Intake Handoffs'],
  },
  {
    quote:
      'A dental practice wanted dependable phone coverage during lunch and after hours without asking staff to hover over missed calls. Caliperworks helped create a workflow that captured patient requests, closed coverage gaps, and let the front desk follow up from a clear queue.',
    author: 'Dental Practice',
    metrics: ['Lunch-Break Coverage', 'After-Hours Intake', 'Staff-Led Follow-Up'],
  },
  {
    quote:
      'An HVAC business used Caliperworks to automate parts of its ad workflow and lead handling. The result was 25% more leads on the same spend and a 30% lift in lead conversion, with less day-to-day babysitting from the team.',
    author: 'HVAC Business Owner in Austin, TX',
    metrics: ['25% More Leads', '30% Conversion Lift', 'Same Budget'],
  },
] as const;

export const homeFeaturedIndustries = [
  {
    name: 'Home Care Agencies',
    detail:
      'SEO, intake, and qualification workflows that help your team respond faster to new client and caregiver inquiries.',
    tags: ['SEO', 'Ads Automation', 'Voice Agent'],
  },
  {
    name: 'Dentists',
    detail:
      'Coverage for calls during lunch, after hours, or peak chair time, with patient requests logged so staff can return to a clear follow-up list.',
    tags: ['Voice Agent'],
  },
  {
    name: 'Laundromats',
    detail:
      'Local search and ad support for pickup and delivery services, with practical reporting and steadier follow-up.',
    tags: ['Local SEO', 'Ad Budget Optimization'],
  },
  {
    name: 'HVAC & Plumbing',
    detail:
      'Reliable call coverage for urgent service windows and marketing support that helps the team respond without staying glued to the phone.',
    tags: ['Voice Agent', 'SEO', 'Ads Automation'],
  },
  {
    name: 'Real Estate',
    detail:
      'Lead qualification and routing that helps agents focus on serious buyer and seller conversations instead of sorting every inquiry by hand.',
    tags: ['Voice Agent'],
  },
] as const;

export const homeFaqs: FaqEntry[] = [
  {
    question: 'How is this different from ChatGPT?',
    answer:
      'ChatGPT is a general-purpose interface. We design workflow-specific systems that plug into the way your business already handles calls, follow-up, and marketing.',
  },
  {
    question: 'How involved is my team in the setup?',
    answer:
      'Very involved. We build collaboratively: your team helps define scripts, escalation rules, booking logic, and review points. Nothing gets dropped into your business as a black box.',
  },
  {
    question: 'Will this replace my staff?',
    answer:
      'No. The goal is to remove repetitive coverage and admin work so your staff can focus on patients, customers, and higher-value follow-up. In most cases it makes the existing team more effective.',
  },
  {
    question: 'What happens when the office is closed or staff are at lunch?',
    answer:
      'That is one of the clearest use cases. We can help you maintain coverage during lunch breaks, after hours, or busy periods so inquiries are captured, routed, or booked instead of slipping through.',
  },
  {
    question: 'How much control do we keep?',
    answer:
      'You keep control of the workflow. We define guardrails, escalation paths, booking rules, and review steps with you so the system supports your process rather than taking it over.',
  },
  {
    question: 'How do you measure success?',
    answer:
      'We look at the operational outcome that matters: fewer missed calls, cleaner follow-up, more qualified leads, better use of staff time, and stronger marketing performance where it applies.',
  },
] as const;

export const homeContactSection = {
  headline: 'See where this fits.',
  body:
    'We can review your intake, phone coverage, and follow-up process with you, identify the gaps worth solving, and outline a rollout your team can actually run.',
} as const;
