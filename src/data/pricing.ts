export interface SeoPricingPlan {
  id: string;
  name: string;
  price: string;
  cadence: string;
  summary: string;
  features: string[];
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

export const pricingMeta = {
  title: 'Pricing | Caliperworks',
  description:
    'See Caliperworks pricing for SEO content creation and optimization, plus contact-only pricing for voice agents and ads support.',
} as const;

export const pricingOverview = {
  eyebrow: 'Pricing',
  headline: 'Clear pricing for SEO content and optimization. Custom scope for everything else.',
  body:
    'The SEO work is packaged because the scope is predictable. Voice agents and ads support are not. Those depend on the workflow, integrations, and level of support you actually need.',
} as const;

export const pricingTerms = {
  setupFee: '$2,000',
  minimumTerm: '6 months',
  setupDescription:
    'Covers the strategy foundation, market understanding, and positioning work before ongoing execution starts.',
  termDescription:
    'SEO needs time to compound. The minimum term is there so the work has room to show results.',
  includedLabel: 'Google Business Profile',
  includedDescription: 'Google Business Profile optimization is included across all three SEO packages.',
} as const;

export const seoPricingPlans: SeoPricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$499',
    cadence: '/month',
    summary: 'For teams that need a steady SEO baseline without overbuilding the program.',
    features: [
      '2 new content pieces each month',
      '1 optimization each month',
      'Google Business Profile optimization',
      'Monthly Metrics Executive Summary',
    ],
    inquirySubject: 'Caliperworks Pricing Inquiry - Starter SEO Plan',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$899',
    cadence: '/month',
    summary: 'For businesses that need more content velocity, more cleanup, and clearer reporting.',
    features: [
      '3 new content pieces each month',
      '3 optimizations each month',
      'Google Business Profile optimization',
      'Detailed Monthly Metrics',
      'Monthly strategy call',
    ],
    inquirySubject: 'Caliperworks Pricing Inquiry - Growth SEO Plan',
    featured: true,
  },
  {
    id: 'max',
    name: 'Max',
    price: '$1,199',
    cadence: '/month',
    summary: 'For businesses that want a faster content engine and tighter monthly support.',
    features: [
      '4 new content pieces each month',
      '5 optimizations each month',
      'Google Business Profile optimization',
      'Detailed Monthly Metrics',
      'Monthly strategy call',
      '2 social media posts',
      'Priority content',
    ],
    inquirySubject: 'Caliperworks Pricing Inquiry - Max SEO Plan',
  },
] as const;

export const customPricingItems: ContactPricingItem[] = [
  {
    id: 'voice-agents',
    name: 'Voice Agents',
    detail:
      'Custom pricing based on call flow complexity, booking logic, routing rules, integrations, and support scope.',
    inquirySubject: 'Caliperworks Pricing Inquiry - Voice Agents',
    ctaLabel: 'Ask about voice agents',
  },
  {
    id: 'ads-support',
    name: 'Ads Support',
    detail:
      'Custom pricing based on channel mix, account state, landing-page needs, reporting depth, and optimization cadence.',
    inquirySubject: 'Caliperworks Pricing Inquiry - Ads Support',
    ctaLabel: 'Ask about ads support',
  },
] as const;

export const pricingSeoStructuredOffers = seoPricingPlans.map((plan) => ({
  name: `${plan.name} SEO Plan`,
  description: plan.features.join(', '),
  price: plan.price.replace('$', ''),
  url: `/pricing/#${plan.id}`,
  category: 'SEO content creation and optimization',
}));
