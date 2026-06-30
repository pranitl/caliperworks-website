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
  title: 'Caliperworks | Local SEO, Voice Agents, and AI Workflows for Service Businesses',
  description:
    'Caliperworks helps service businesses grow local search visibility, build practical SEO assets, improve voice coverage, and clean up follow-up workflows.',
} as const;

export const homeHero = {
  headline: 'Local search, voice coverage, and follow-up systems that actually ship.',
  subheadline:
    'Caliperworks helps service businesses build the pages, workflows, and AI-supported coverage needed to capture more qualified demand without adding another tool to babysit.',
  primaryCtaLabel: 'Schedule a Discovery Call',
  secondaryCtaLabel: 'View Pricing',
  availabilityTimezone: 'America/New_York',
} as const;

export const homeProblemText =
  'Most owners do not need more software to babysit. They need stronger visibility for the services people are already searching for, dependable coverage when the phone rings, and cleaner follow-up once demand arrives. We work with you to build practical systems that fit your process, keep your staff in control, and take repetitive work off their plate.';

export const homeSolutions = [
  {
    title: 'Local SEO & Growth Assets',
    subtitle: 'Search visibility that compounds',
    description:
      'We build and optimize service pages, location pages, FAQ resources, and conversion-focused landing pages around the searches that matter for your market.',
  },
  {
    title: 'Voice Coverage',
    subtitle: 'Coverage when staff are busy or offline',
    description:
      'We can answer routine calls during lunch breaks, after hours, or peak periods, capture the right details, and route or book the next step so your staff starts from a clean follow-up list.',
  },
  {
    title: 'Workflow Review',
    subtitle: 'Find the right starting points',
    description:
      'We review your intake, follow-up, marketing, and handoff process with your team and identify whether search growth, voice coverage, ads workflows, or operational cleanup should come first.',
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
      'A Boston dental practice wanted dependable phone coverage during lunch and after hours without asking staff to hover over missed calls. Caliperworks helped create a workflow that captured patient requests, closed coverage gaps, and let the front desk follow up from a clear queue.',
    author: 'Dental Practice in Boston',
    metrics: ['Lunch-Break Coverage', 'After-Hours Intake', 'Staff-Led Follow-Up'],
  },
  {
    quote:
      'A Houston HVAC business used Caliperworks to automate parts of its ad workflow and lead handling. The result was 25% more leads on the same spend and a 30% lift in lead conversion, with less day-to-day babysitting from the team.',
    author: 'HVAC Business Owner in Houston, TX',
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
      'Local search coverage for treatments, emergency needs, and new-patient intent, plus phone workflows for lunch and after-hours gaps.',
    tags: ['Local SEO', 'Voice Agent'],
  },
  {
    name: 'Law Offices',
    detail:
      'Practice-area pages, local search assets, intake routing, and follow-up support for higher-value legal inquiries.',
    tags: ['Local SEO', 'Intake Automation'],
  },
  {
    name: 'HVAC & Plumbing',
    detail:
      'Reliable call coverage for urgent service windows and marketing support that helps the team respond without staying glued to the phone.',
    tags: ['Voice Agent', 'SEO', 'Ads Automation'],
  },
  {
    name: 'Med Spas',
    detail:
      'Treatment pages, comparison resources, consultation capture, and follow-up workflows for high-intent local demand.',
    tags: ['Local SEO', 'Voice Agent'],
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
