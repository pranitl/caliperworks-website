import type { FaqEntry } from './site';

export const homeSectionIds = {
  solutions: 'solutions',
  results: 'results',
  expertise: 'expertise',
  faq: 'faq',
  contact: 'contact',
} as const;

export const homeNavItems = [
  { href: '/use-cases/', label: 'Use Cases' },
  { href: '/services/', label: 'Services' },
  { href: '/industries/', label: 'Industries' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/case-studies/', label: 'Case Studies' },
] as const;

export const homeMeta = {
  title: 'Growth Systems for Service Businesses | Caliperworks',
  description: 'Caliperworks improves the path from local search or inbound call to a qualified, properly routed next step through SEO execution, call coverage, ads workflows, and practical automation.',
} as const;

export const homeHero = {
  eyebrow: 'Growth systems for service businesses',
  headline: 'More qualified demand. Fewer dropped handoffs.',
  subheadline: 'Caliperworks improves the path from local search or inbound call to the next useful action through SEO execution, call coverage, ads workflows, and practical automation.',
  primaryCtaLabel: 'Request a Gap Review',
  secondaryCtaLabel: 'View Selected Work',
} as const;

export const homeSolutions = [
  {
    number: '01',
    title: 'Visibility',
    description: 'Build the service, location, treatment, practice-area, and buyer-intent pages qualified local demand is already looking for.',
    href: '/use-cases/local-visibility-growth/',
  },
  {
    number: '02',
    title: 'Coverage',
    description: 'Capture and move inbound calls forward when staff are busy, at lunch, in the field, or offline.',
    href: '/use-cases/missed-call-coverage/',
  },
  {
    number: '03',
    title: 'Follow-up',
    description: 'Reduce the delay, missing context, and manual chasing between the first inquiry and the next owner.',
    href: '/use-cases/lead-handoff-cleanup/',
  },
] as const;

export const homeTestimonials = [
  {
    metric: '199%',
    label: 'increase in engaged visitors',
    context: 'Home care search and intake engagement',
    href: '/case-studies/home-care-agency-seo-growth/',
  },
  {
    metric: '25%',
    label: 'more leads on the same spend',
    context: 'HVAC paid-demand and qualification workflow',
    href: '/case-studies/hvac-lead-automation/',
  },
  {
    metric: '30%',
    label: 'lift in lead conversion',
    context: 'HVAC paid-demand and qualification workflow',
    href: '/case-studies/hvac-lead-automation/',
  },
] as const;

export const homeFeaturedIndustries = [
  { name: 'Home Care Agencies', detail: 'Client intake, caregiver routing, and local search coverage.', href: '/industries/home-care-agencies/' },
  { name: 'Dentists', detail: 'New-patient calls, treatment visibility, and front-desk overflow.', href: '/industries/dentists/' },
  { name: 'Law Offices', detail: 'Practice-area visibility, intake detail, and consultation routing.', href: '/industries/law-offices/' },
  { name: 'HVAC & Plumbing', detail: 'Urgent call coverage, qualification, dispatch handoff, and paid demand.', href: '/industries/hvac-and-plumbing/' },
  { name: 'Med Spas', detail: 'Treatment visibility, consultation capture, and follow-up.', href: '/industries/med-spas/' },
] as const;

export const homeFaqs: FaqEntry[] = [
  {
    question: 'What happens in a gap review?',
    answer: 'We look at the path from local demand to the next useful action, identify the most material visibility, coverage, or follow-up gaps, and recommend what should come first.',
  },
  {
    question: 'Is every service sold as a monthly package?',
    answer: 'No. Local SEO execution is packaged because the monthly output is repeatable. Voice agents, ads workflows, and operational automation are custom-scoped around call flows, integrations, routing rules, and support needs.',
  },
  {
    question: 'Do you replace our existing team or software?',
    answer: 'Usually not. The goal is to improve the path your team already uses, keep staff in control, and change the stack only where the existing tools cannot support the required workflow.',
  },
  {
    question: 'How do you measure success?',
    answer: 'The measure depends on the constraint: qualified search visibility, calls captured, speed to lead, clean handoffs, booked next steps, lead quality, or efficiency from existing demand.',
  },
];

export const homeContactSection = {
  headline: 'Find the first constraint worth fixing.',
  body: 'Request a gap review and we will map where qualified demand is being lost, what the consequence is, and which practical next step makes sense.',
} as const;
