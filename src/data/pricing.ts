export interface SeoPricingPlan {
  id: string;
  name: string;
  price: string;
  cadence: string;
  bestFor: string;
  summary: string;
  output: string;
  features: string[];
  fit: string[];
  ctaLabel: string;
  inquirySubject: string;
  featured?: boolean;
}

export interface ContactPricingItem {
  id: string;
  name: string;
  detail: string;
  inquirySubject: string;
  ctaLabel: string;
}

export interface PricingFaqEntry {
  question: string;
  answer: string;
}

export const pricingMeta = {
  title: 'Pricing | Caliperworks',
  description:
    'See Caliperworks pricing for packaged growth execution, including local search assets, page optimization, setup, and discovery-scoped implementation work.',
} as const;

export const pricingOverview = {
  eyebrow: 'Pricing',
  headline: 'Packaged SEO pricing. Custom scope everywhere else.',
  body:
    'Local visibility work is priced by monthly execution pace. Voice agents, ads workflows, and operational automation are scoped around the call flows, integrations, handoffs, and support your business actually needs.',
  primaryCta: 'Request a Gap Review',
  secondaryCta: 'Compare SEO Plans',
} as const;

export const pricingTerms = {
  setupFee: '$2,000',
  minimumTerm: '6 months',
  setupDescription:
    'The setup is where we build the execution foundation before monthly production starts.',
  termDescription:
    'Growth work needs enough runway to compound. The 6-month minimum gives the strategy enough time to move from planning to publishing, optimization, indexing, and early performance signals.',
  includedLabel: 'Included in every packaged growth plan',
  includedDescription:
    'These are not tiered by plan. A smaller plan does not get weaker strategy. It simply gets fewer shipped assets each month.',
  setupItems: [
    'Business and offer review',
    'Current website and page inventory',
    'Local search opportunity review',
    'Google Business Profile review',
    'Competitor and market scan',
    'Initial growth asset roadmap',
    'First internal linking and optimization priorities',
    'Recommended starting plan',
  ],
  includedItems: [
    'Business, market, and competitor review',
    'Search intent and opportunity mapping',
    'Content direction and page planning',
    'On-page optimization',
    'Internal linking updates',
    'Google Business Profile review and optimization',
    'Local conversion recommendations',
    'Human review before publishing',
    'Monthly progress summary',
  ],
} as const;

export const pricingLogic = {
  headline: 'Same strategy quality. Different monthly output.',
  body:
    'Every plan gets the same level of market review, keyword thinking, content direction, internal linking, Google Business Profile attention, and quality control. The difference is not how carefully the work is done. The difference is how much execution we ship each month.',
  rows: [
    { plan: 'Starter', meaning: 'Steady foundation-building' },
    { plan: 'Growth', meaning: 'Consistent monthly expansion' },
    { plan: 'Max', meaning: 'Faster coverage across services, locations, and high-value searches' },
  ],
} as const;

export const seoPricingPlans: SeoPricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$499',
    cadence: '/month',
    bestFor: 'Businesses that need a clean foundation and steady execution',
    summary: 'For businesses that need a steady foundation without overbuilding the program.',
    output: '2 new growth assets + 2 existing-page optimizations',
    features: [
      '2 new growth assets per month',
      '2 existing-page optimizations per month',
      'Same strategy, planning, GBP review, and internal linking standards as every plan',
      'Best for one-location businesses, lower-competition markets, or early-stage SEO foundations',
    ],
    fit: [
      'Smaller service-area businesses',
      'One main location',
      'Lower-competition suburbs',
      'Businesses with thin websites',
      'Owners who need steady foundational execution',
    ],
    ctaLabel: 'Ask about Starter',
    inquirySubject: 'Caliperworks Pricing Inquiry - Starter Plan',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$899',
    cadence: '/month',
    bestFor: 'Most service businesses that want consistent visibility expansion',
    summary: 'For businesses that want consistent expansion across services, locations, and buyer-intent searches.',
    output: '4 new growth assets + 4 existing-page optimizations',
    features: [
      '4 new growth assets per month',
      '4 existing-page optimizations per month',
      'Same strategy, planning, GBP review, and internal linking standards as every plan',
      'Best for most local service businesses',
    ],
    fit: [
      'Most plumbing, HVAC, pest control, roofing, home care, med spa, dental, ortho, elder law, and restoration businesses',
      'Companies with several services or procedures',
      'Businesses that need more consistent publishing',
      'Businesses that want to cover both services and local search intent',
    ],
    ctaLabel: 'Ask about Growth',
    inquirySubject: 'Caliperworks Pricing Inquiry - Growth Plan',
    featured: true,
  },
  {
    id: 'max',
    name: 'Max',
    price: '$1,199',
    cadence: '/month',
    bestFor: 'Competitive markets, multi-service businesses, or faster coverage',
    summary: 'For competitive categories where faster coverage across services, locations, and high-value searches matters.',
    output: '6 new growth assets + 6 existing-page optimizations',
    features: [
      '6 new growth assets per month',
      '6 existing-page optimizations per month',
      'Same strategy, planning, GBP review, and internal linking standards as every plan',
      'Best for competitive metros, multi-service businesses, or businesses already investing in paid ads',
    ],
    fit: [
      'Competitive markets',
      'Multi-location or multi-city coverage',
      'Emergency-service categories',
      'High-value treatments, procedures, or legal matters',
      'Businesses already spending on ads and needing better landing-page/search coverage',
    ],
    ctaLabel: 'Ask about Max',
    inquirySubject: 'Caliperworks Pricing Inquiry - Max Plan',
  },
] as const;

export const customPricingItems: ContactPricingItem[] = [
  {
    id: 'voice-agents',
    name: 'Voice Agents',
    detail:
      'Custom pricing based on call flow complexity, booking logic, routing rules, integrations, handoffs, and support scope.',
    inquirySubject: 'Caliperworks Pricing Inquiry - Voice Agents',
    ctaLabel: 'Scope voice agents after audit',
  },
  {
    id: 'ads-support',
    name: 'Ads Workflows',
    detail:
      'Custom pricing based on channel mix, account state, landing-page needs, reporting depth, automation opportunities, and optimization cadence.',
    inquirySubject: 'Caliperworks Pricing Inquiry - Ads Support',
    ctaLabel: 'Scope ads workflows after audit',
  },
  {
    id: 'automation',
    name: 'Operational Automations',
    detail:
      'Custom pricing based on intake systems, follow-up rules, CRM handoffs, reporting needs, and how much of the workflow should be automated.',
    inquirySubject: 'Caliperworks Pricing Inquiry - Operational Automation',
    ctaLabel: 'Scope automation after audit',
  },
] as const;

export const growthAssetDefinition = {
  headline: 'What counts as a growth asset?',
  body:
    'A growth asset is a new page or resource built to capture a specific search intent, answer a real buyer question, support local visibility, or improve conversion.',
  examples: [
    { type: 'Service page', example: 'Emergency Plumbing Repair' },
    { type: 'Location page', example: 'HVAC Repair in Round Rock' },
    { type: 'Treatment/procedure page', example: 'Botox Treatment in Austin' },
    { type: 'Practice-area page', example: 'Medicaid Planning Attorney' },
    { type: 'Problem page', example: 'Signs of Mold After Water Damage' },
    { type: 'Comparison page', example: 'Botox vs Dysport' },
    { type: 'Cost/FAQ page', example: 'How Much Does Invisalign Cost?' },
    { type: 'Conversion landing page', example: 'Same-Day Pest Control Quote' },
  ],
  note:
    'The asset mix depends on the business. A plumber, home care agency, dental practice, law firm, med spa, and restoration company should not all get the same content calendar.',
} as const;

export const pricingFit = {
  headline: 'Who this fits',
  body:
    'The packaged plans are built for service businesses where local visibility, fast follow-up, and buyer-intent pages can turn into real appointments, calls, consultations, or booked work.',
  industries: [
    'Plumbing',
    'HVAC',
    'Roofing',
    'Restoration',
    'Pest control',
    'Home care',
    'Med spas',
    'Dental and orthodontic practices',
    'Elder law',
  ],
} as const;

export const notFitReasons = [
  'You need guaranteed rankings by a specific date',
  'You want cheap blog posts without strategy',
  'You want a one-time website refresh but no ongoing execution',
  'You do not have a real service area, offer, or follow-up process',
  'You want weekly meetings instead of shipped work',
] as const;

export const pricingFaqs: PricingFaqEntry[] = [
  {
    question: 'Do I need to know which plan I want?',
    answer:
      'No. Start with the free discovery audit. We will recommend the right starting point based on your website, services, market, and current bottlenecks.',
  },
  {
    question: 'Are the lower plans less strategic?',
    answer:
      'No. Every plan gets the same level of review, planning, and quality control. The difference is monthly output volume.',
  },
  {
    question: 'What is a growth asset?',
    answer:
      'A growth asset is a new page or resource built around a specific search intent, service, location, buyer question, or conversion opportunity.',
  },
  {
    question: 'Do plans include Google Business Profile work?',
    answer: 'Yes. Google Business Profile review and optimization are included across the packaged plans.',
  },
  {
    question: 'Are monthly calls required?',
    answer:
      'No. The work is designed to run async with clear summaries and execution updates. If something needs clarification, we handle it directly.',
  },
  {
    question: 'Is this only SEO?',
    answer:
      'No. The packaged plans focus on search, local visibility, landing-page coverage, and conversion-focused execution. If the audit shows that voice coverage, ads workflows, or operational automation should come first, that can be scoped separately.',
  },
] as const;

export const pricingSeoStructuredOffers = seoPricingPlans.map((plan) => ({
  name: `${plan.name} Plan`,
  description: plan.output,
  price: plan.price.replace(/[$,]/g, ''),
  url: `/pricing/#${plan.id}`,
  category: 'Packaged growth execution',
}));
