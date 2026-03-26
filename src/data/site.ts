export interface FaqEntry {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  shortLabel: string;
  teaser: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  summary: string;
  problems: string[];
  deliverables: string[];
  outcomes: string[];
  relatedIndustries: string[];
  relatedCaseStudies: string[];
  faq: FaqEntry[];
}

export interface Industry {
  slug: string;
  name: string;
  teaser: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  summary: string;
  painPoints: string[];
  automations: string[];
  relatedServices: string[];
  relatedCaseStudies: string[];
  faq: FaqEntry[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  teaser: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  clientLabel: string;
  location: string;
  industrySlug: string;
  serviceSlugs: string[];
  challenge: string[];
  solution: string[];
  results: Array<{ value: string; label: string }>;
  quote: string;
  takeaways: string[];
}

export const siteConfig = {
  name: 'Caliperworks',
  siteUrl: 'https://caliperworks.com',
  email: 'pranit@caliperworks.com',
  defaultSubject: 'Caliperworks Inquiry - AI Process Audit',
  defaultTitle: 'AI Process Audits, Voice Agents, and SEO for Service Businesses | Caliperworks',
  defaultDescription:
    'Caliperworks helps service businesses run AI process audits to uncover where voice agents, SEO, ad automation, and workflow improvements will have the most impact.',
  defaultOgImagePath: '/og-card.svg',
  tagline:
    'AI process audits and implementation for service businesses that need clearer workflows, stronger follow-up, and better operational leverage.',
} as const;

export const mainNav = [
  { href: '/services/', label: 'Services' },
  { href: '/industries/', label: 'Industries' },
  { href: '/case-studies/', label: 'Case Studies' },
  { href: '/#faq', label: 'FAQ' },
] as const;

export const services: Service[] = [
  {
    slug: 'ai-process-audits',
    name: 'AI Process Audits',
    shortLabel: 'Process audits',
    teaser:
      'Map the workflow first, then prioritize the voice, SEO, ad, and operational changes worth implementing.',
    metaTitle: 'AI Process Audits for Small Businesses | Caliperworks',
    metaDescription:
      'Caliperworks runs AI process audits for small businesses to map workflows, uncover revenue leaks, and prioritize the highest-impact automation opportunities.',
    heroTitle: 'AI process audits for small businesses',
    heroDescription:
      'Review intake, marketing, handoffs, and follow-up to uncover the automation opportunities that actually fit your business.',
    summary:
      'The audit is the discovery layer. It shows whether voice handling, search growth, ad automation, or workflow cleanup should come first.',
    problems: [
      'Teams spend too much time on repetitive intake, quoting, follow-up, and admin work.',
      'Lead handoffs break between phone, inbox, CRM, and scheduling tools.',
      'Owners know AI is useful, but do not have a clear order of operations.',
    ],
    deliverables: [
      'A workflow map of the steps that create the most friction or delay.',
      'A prioritized roadmap tied to operational drag, visibility gaps, follow-up friction, and revenue impact.',
      'Implementation recommendations across voice agents, SEO, ad automation, routing, and reporting.',
    ],
    outcomes: [
      'Reduce manual admin load and disconnected handoffs before adding more tools.',
      'Clarify which use cases deserve implementation first and which should wait.',
      'Give the team a rollout order it can actually execute.',
    ],
    relatedIndustries: ['home-care-agencies', 'hvac-and-plumbing', 'real-estate-teams'],
    relatedCaseStudies: ['home-care-agency-seo-growth', 'hvac-lead-automation'],
    faq: [
      {
        question: 'How long does an AI process audit take?',
        answer:
          'Most audits can be scoped and delivered in days, not months. The timeline depends on how many systems, handoffs, and lead sources you want reviewed.',
      },
      {
        question: 'Do you need to replace our current software stack?',
        answer:
          'No. The audit is designed to work from your current tools first, then identify where integrations or replacements are actually justified.',
      },
      {
        question: 'What do we get at the end of the audit?',
        answer:
          'You get a prioritized plan showing what to automate, why it matters, and what the expected operational payoff looks like.',
      },
    ],
  },
  {
    slug: 'voice-agents',
    name: 'AI Voice Agents',
    shortLabel: 'Voice agents',
    teaser: 'Capture calls, qualify leads, and book appointments even when your staff is busy or off the clock.',
    metaTitle: 'AI Voice Agents and AI Receptionists | Caliperworks',
    metaDescription:
      'Caliperworks builds AI voice agents for small businesses that answer calls, qualify leads, and book appointments without adding front-desk overhead.',
    heroTitle: 'AI voice agents that answer, qualify, and book',
    heroDescription:
      'Turn missed calls into booked appointments with AI receptionists built for real customer conversations, after-hours coverage, and operational follow-through.',
    summary:
      'Voice agents handle inbound calls, gather the right information, and route or book qualified leads into your existing workflow.',
    problems: [
      'Missed calls after hours or during peak hours turn into lost revenue.',
      'Front-desk teams get buried in repetitive screening and scheduling work.',
      'Businesses need faster qualification without sounding robotic or confusing.',
    ],
    deliverables: [
      'Voice flows tailored to your booking rules, service areas, and qualifying questions.',
      'Calendar, CRM, or lead-routing integrations so calls do not end in a dead end.',
      'Escalation logic for emergencies, edge cases, and high-value prospects.',
    ],
    outcomes: [
      'Capture more phone leads without adding receptionist headcount.',
      'Improve speed to lead for emergency jobs and time-sensitive appointments.',
      'Give staff more time for in-office work instead of repetitive triage.',
    ],
    relatedIndustries: ['dentists', 'hvac-and-plumbing', 'real-estate-teams'],
    relatedCaseStudies: ['home-care-agency-seo-growth', 'hvac-lead-automation'],
    faq: [
      {
        question: 'Will callers know they are speaking with AI?',
        answer:
          'The goal is a clear and helpful interaction, not deception. The system is scripted to sound professional, collect the right details, and escalate when needed.',
      },
      {
        question: 'Can voice agents book directly into our calendar?',
        answer:
          'Yes, when the scheduling rules are clear. We can connect the agent to booking or routing systems so qualified calls move straight into the next step.',
      },
      {
        question: 'What happens if the caller asks something unusual?',
        answer:
          'The voice agent can hand off to your team, collect details for follow-up, or trigger emergency routing based on the scenario.',
      },
    ],
  },
  {
    slug: 'seo-and-ads-automation',
    name: 'SEO and Ads Automation',
    shortLabel: 'SEO and ads',
    teaser: 'Grow search visibility and squeeze more results from existing ad spend with AI-supported execution.',
    metaTitle: 'SEO and Ads Automation for Small Businesses | Caliperworks',
    metaDescription:
      'Caliperworks helps small businesses grow with AI-assisted SEO and ads automation, from landing pages and local search coverage to budget optimization.',
    heroTitle: 'SEO and ads automation built for local growth',
    heroDescription:
      'Use AI where it actually compounds: faster landing-page production, stronger local search coverage, and tighter ad-budget optimization tied to lead quality.',
    summary:
      'This service combines local SEO execution with ad-optimization workflows so your existing marketing budget produces more qualified demand.',
    problems: [
      'Local service businesses need more location and service-page coverage to rank consistently.',
      'Ad accounts drift because bids, copy, and landing pages are not reviewed often enough.',
      'Marketing spend grows, but lead quality and follow-up do not improve with it.',
    ],
    deliverables: [
      'A content and landing-page plan designed around high-intent services and locations.',
      'Optimization workflows for campaign budgets, routing, and reporting.',
      'Conversion-focused pages that connect search traffic to fast follow-up.',
    ],
    outcomes: [
      'Build more search visibility for core services and local intent queries.',
      'Improve lead efficiency from paid search or local campaigns.',
      'Create better alignment between marketing execution and operations.',
    ],
    relatedIndustries: ['home-care-agencies', 'laundromats', 'hvac-and-plumbing'],
    relatedCaseStudies: ['home-care-agency-seo-growth', 'hvac-lead-automation'],
    faq: [
      {
        question: 'Is this just automated content publishing?',
        answer:
          'No. The goal is not to flood the site with thin pages. The work focuses on service intent, local relevance, internal linking, and conversion paths.',
      },
      {
        question: 'Can you work with our current ad budget?',
        answer:
          'Yes. The point is to improve efficiency first, especially if you are already spending but not getting enough qualified leads back.',
      },
      {
        question: 'Do you handle both SEO and paid search?',
        answer:
          'Yes. The strongest results usually come from connecting search visibility, landing pages, lead capture, and follow-up instead of treating them separately.',
      },
    ],
  },
];

export const industries: Industry[] = [
  {
    slug: 'home-care-agencies',
    name: 'Home Care Agencies',
    teaser: 'Support caregiver recruitment and client intake with faster lead qualification and stronger search visibility.',
    metaTitle: 'AI Automation for Home Care Agencies | Caliperworks',
    metaDescription:
      'Caliperworks helps home care agencies improve caregiver recruitment and client intake with AI automation, voice agents, and SEO systems.',
    heroTitle: 'AI automation for home care agencies',
    heroDescription:
      'Build a smoother client-intake and caregiver-recruitment pipeline with AI systems that qualify leads, tighten follow-up, and support local search growth.',
    summary:
      'Home care agencies need reliable lead qualification on both the client and caregiver side. AI helps keep intake moving without creating more admin burden.',
    painPoints: [
      'Incoming client inquiries and caregiver applications often wait too long for a response.',
      'Marketing generates demand, but intake teams still have to chase missing information manually.',
      'Local search competition makes it hard to rank for priority care services and locations.',
    ],
    automations: [
      'Voice or intake agents that gather the right details before staff step in.',
      'Lead-routing workflows for applications, consultations, and service-area fit.',
      'SEO execution focused on high-intent care services and local coverage.',
    ],
    relatedServices: ['ai-process-audits', 'voice-agents', 'seo-and-ads-automation'],
    relatedCaseStudies: ['home-care-agency-seo-growth'],
    faq: [
      {
        question: 'Can AI help on both caregiver recruitment and client intake?',
        answer:
          'Yes. Both flows usually share the same operational bottlenecks: delayed follow-up, missing information, and inconsistent routing.',
      },
      {
        question: 'Does this work for multi-location agencies?',
        answer:
          'Yes. Multi-location agencies benefit from tighter local SEO coverage and more consistent intake rules across locations.',
      },
    ],
  },
  {
    slug: 'dentists',
    name: 'Dentists',
    teaser: 'Catch appointment requests and emergency calls without overloading the front desk.',
    metaTitle: 'AI Voice Agents for Dental Practices | Caliperworks',
    metaDescription:
      'Caliperworks helps dental practices use AI voice agents and workflow automation to capture appointment requests, emergency calls, and front-desk overflow.',
    heroTitle: 'AI systems for dental practices',
    heroDescription:
      'Give your front desk relief while keeping new patient calls, appointment requests, and urgent inquiries moving to the right next step.',
    summary:
      'Dental practices lose appointments when calls pile up, voicemail sits too long, or intake details never make it cleanly into the schedule.',
    painPoints: [
      'Front-desk teams juggle phones, in-office patients, and scheduling at the same time.',
      'Missed emergency or new-patient calls can create immediate revenue loss.',
      'Routine questions and qualification work take up staff time that should stay patient-facing.',
    ],
    automations: [
      'Voice agents for appointment requests, common questions, and after-hours triage.',
      'Qualification flows that collect insurance, service type, and scheduling intent.',
      'Escalation logic for urgent or complex cases that need a human handoff.',
    ],
    relatedServices: ['voice-agents', 'ai-process-audits'],
    relatedCaseStudies: ['hvac-lead-automation'],
    faq: [
      {
        question: 'Can AI handle after-hours appointment requests?',
        answer:
          'Yes. After-hours booking and intake is one of the clearest use cases because the practice can collect demand that would otherwise hit voicemail.',
      },
      {
        question: 'Do dental practices still need a human front desk?',
        answer:
          'Yes. AI works best as a pressure-release valve that handles repetitive calls, gathers details, and routes the right conversations to your staff.',
      },
    ],
  },
  {
    slug: 'laundromats',
    name: 'Laundromats',
    teaser: 'Grow pickup and delivery demand with better local search coverage and leaner ad spend.',
    metaTitle: 'SEO and Ads Automation for Laundromats | Caliperworks',
    metaDescription:
      'Caliperworks helps laundromats use AI-supported SEO and ads automation to grow pickup and delivery demand in local markets.',
    heroTitle: 'AI growth systems for laundromats',
    heroDescription:
      'Win more pickup and delivery demand with local search coverage, sharper paid campaigns, and faster lead handling for service inquiries.',
    summary:
      'Laundromat growth usually depends on dominating a tight geographic area. That makes local SEO and ad efficiency especially important.',
    painPoints: [
      'Pickup and delivery offers need stronger local visibility to break through crowded markets.',
      'Paid campaigns can waste budget on low-intent searches or the wrong neighborhoods.',
      'Store owners often do not have time to build and maintain new landing pages regularly.',
    ],
    automations: [
      'Location and service pages built around local-intent search demand.',
      'Ad and landing-page workflows tuned around delivery zones and high-margin services.',
      'Lead capture paths for commercial and recurring laundry inquiries.',
    ],
    relatedServices: ['seo-and-ads-automation', 'ai-process-audits'],
    relatedCaseStudies: ['home-care-agency-seo-growth'],
    faq: [
      {
        question: 'Why does SEO matter so much for laundromats?',
        answer:
          'Because searchers usually need a nearby option right away. Better local visibility can create steady demand for pickup, delivery, and commercial services.',
      },
      {
        question: 'Can AI help without a huge ad budget?',
        answer:
          'Yes. The work is often about increasing efficiency and local coverage before spend increases at all.',
      },
    ],
  },
  {
    slug: 'hvac-and-plumbing',
    name: 'HVAC and Plumbing',
    teaser: 'Coordinate urgent calls, qualification, and marketing without letting operations get fragmented.',
    metaTitle: 'AI Automation for HVAC and Plumbing Companies | Caliperworks',
    metaDescription:
      'Caliperworks helps HVAC and plumbing businesses use voice agents, process automation, and SEO or ads systems to capture more qualified service leads.',
    heroTitle: 'AI automation for HVAC and plumbing teams',
    heroDescription:
      'Tighten dispatch intake, qualification, and marketing workflows so emergency demand does not create operational chaos.',
    summary:
      'Trades businesses need fast execution, but the bigger issue is usually workflow coordination across calls, qualification, dispatch, and demand generation.',
    painPoints: [
      'Emergency calls come in after hours, during jobs, or when dispatch is overloaded.',
      'Lead quality varies, but teams still spend time qualifying everyone manually.',
      'Ad budgets are often active, but conversion flow and follow-up lag behind.',
    ],
    automations: [
      'Voice agents that screen emergency calls, capture details, and route urgent jobs.',
      'Process automation for lead qualification, dispatch prep, and follow-up.',
      'SEO and paid-search workflows built around high-intent service demand.',
    ],
    relatedServices: ['voice-agents', 'seo-and-ads-automation', 'ai-process-audits'],
    relatedCaseStudies: ['hvac-lead-automation'],
    faq: [
      {
        question: 'Can AI handle emergency-service calls?',
        answer:
          'Yes, with the right escalation logic. Emergency trade calls are one of the most valuable places to automate because speed matters so much.',
      },
      {
        question: 'Should HVAC and plumbing companies start with voice agents or SEO?',
        answer:
          'That depends on where the biggest leak is. If calls are being missed, voice comes first. If demand is the main constraint, search growth may be the better starting point.',
      },
    ],
  },
  {
    slug: 'real-estate-teams',
    name: 'Real Estate Teams',
    teaser: 'Qualify buyer and seller leads earlier so agents spend more time on serious prospects.',
    metaTitle: 'AI Automation for Real Estate Teams | Caliperworks',
    metaDescription:
      'Caliperworks helps real estate teams use AI voice agents and lead-qualification systems to respond faster and focus on serious buyers and sellers.',
    heroTitle: 'AI systems for real estate teams',
    heroDescription:
      'Build a cleaner lead-qualification and follow-up system so agents stay focused on the buyers and sellers most likely to move.',
    summary:
      'Real estate teams need cleaner qualification, routing, and follow-up so agents are not forced to manually sort every inquiry.',
    painPoints: [
      'Leads go cold when they sit in a form inbox or voicemail too long.',
      'Agents waste time on low-intent prospects who should have been screened earlier.',
      'Showing, scheduling, and follow-up work creates friction when volume spikes.',
    ],
    automations: [
      'Voice and intake agents for buyer and seller lead qualification.',
      'Routing logic based on geography, price band, readiness, or transaction type.',
      'Follow-up workflows that keep warm leads moving without manual chasing.',
    ],
    relatedServices: ['voice-agents', 'ai-process-audits'],
    relatedCaseStudies: ['hvac-lead-automation'],
    faq: [
      {
        question: 'Can AI qualify both buyer and seller leads?',
        answer:
          'Yes. The screening criteria differ, but the value is the same: capture intent, timeline, and fit before an agent spends time manually sorting.',
      },
      {
        question: 'Is this only for large brokerages?',
        answer:
          'No. Smaller teams often get the most leverage because every missed lead and every wasted follow-up hour matters more.',
      },
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'home-care-agency-seo-growth',
    title: 'Home care agency search growth and lead qualification',
    teaser: 'A home care agency improved engaged traffic and kept qualified intake moving with search and automation support.',
    metaTitle: 'Home Care Agency SEO and Intake Case Study | Caliperworks',
    metaDescription:
      'See how a home care agency used Caliperworks to improve search visibility, grow engaged traffic, and strengthen lead qualification workflows.',
    heroTitle: 'Home care agency search growth and intake automation',
    heroDescription:
      'A home care agency needed more qualified visibility in search and a better way to keep new client intake moving once leads arrived.',
    clientLabel: 'Home care agency',
    location: 'Boston',
    industrySlug: 'home-care-agencies',
    serviceSlugs: ['seo-and-ads-automation', 'voice-agents'],
    challenge: [
      'The agency needed stronger local visibility for its highest-value search terms.',
      'New inquiries required faster qualification and follow-up to avoid leakage.',
      'Marketing and intake were operating as separate systems instead of one pipeline.',
    ],
    solution: [
      'Built an SEO execution plan around high-intent service terms and visibility gaps.',
      'Improved the conversion path from search traffic into lead qualification.',
      'Added automation support so intake moved faster after the first touch.',
    ],
    results: [
      { value: '199%', label: 'increase in engaged visitors' },
      { value: 'Page 1', label: 'visibility for top keywords' },
      { value: 'Faster', label: 'lead qualification workflow' },
    ],
    quote:
      "Our monthly engaged visitors shot up by 199% and we're finally holding Page 1 rankings for our top keywords. The automated lead qualification has transformed how we handle new client intake.",
    takeaways: [
      'Search growth works better when the intake path is ready to absorb new demand.',
      'Operational follow-through matters as much as rankings for service businesses.',
      'Local service pages and qualification workflows can compound each other.',
    ],
  },
  {
    slug: 'hvac-lead-automation',
    title: 'HVAC lead growth from ad optimization and faster qualification',
    teaser: 'An HVAC company improved lead volume and conversion rate without increasing ad spend.',
    metaTitle: 'HVAC Lead Automation Case Study | Caliperworks',
    metaDescription:
      'See how an HVAC business improved lead volume and conversion rate through ad optimization and faster qualification workflows with Caliperworks.',
    heroTitle: 'HVAC lead growth without increasing ad spend',
    heroDescription:
      'An HVAC business needed to get more value from the budget it was already spending while improving how quickly new calls were qualified.',
    clientLabel: 'HVAC business',
    location: 'Austin, Texas',
    industrySlug: 'hvac-and-plumbing',
    serviceSlugs: ['seo-and-ads-automation', 'voice-agents'],
    challenge: [
      'The company wanted more qualified leads without increasing budget.',
      'Manual qualification slowed response time when volume spiked.',
      'Campaign performance and operational follow-up were not tightly connected.',
    ],
    solution: [
      'Optimized ad workflows around lead efficiency instead of raw click volume.',
      'Improved qualification and response flow so promising leads moved faster.',
      'Connected marketing execution with operational handling to reduce waste.',
    ],
    results: [
      { value: '25%', label: 'more leads on the same budget' },
      { value: '30%', label: 'conversion lift' },
      { value: '24/7', label: 'better coverage for lead capture' },
    ],
    quote:
      'The ad automation hyper-optimized the budget I was already spending. I saw 25% more leads without increasing my ad spend, and the lead conversion rate jumped by 30%.',
    takeaways: [
      'Efficiency gains often come from tightening conversion flow, not just media buying.',
      'Trade businesses benefit most when speed-to-lead and budget optimization work together.',
      'A better qualification layer can raise conversion rates without more spend.',
    ],
  },
];

export const homeFaqs: FaqEntry[] = [
  {
    question: 'How is this different from using ChatGPT on our own?',
    answer:
      'ChatGPT is a tool. Caliperworks builds AI systems that fit into your business operations, from voice workflows and qualification logic to SEO and marketing execution.',
  },
  {
    question: 'Do small businesses really need an AI process audit first?',
    answer:
      'Usually yes. The audit shows whether the next step should be voice, SEO, ads, routing, or another operational fix instead of guessing and buying tools out of order.',
  },
  {
    question: 'Can you work with our existing software and ad accounts?',
    answer:
      'Yes. The goal is to improve the systems you already rely on before recommending any larger change in stack or budget.',
  },
  {
    question: 'What kinds of businesses are the best fit?',
    answer:
      'The best fit is a small business with repeatable lead flow, repetitive admin work, or time-sensitive inbound demand, especially in local service industries.',
  },
];

export const serviceMap = Object.fromEntries(services.map((service) => [service.slug, service])) as Record<
  string,
  Service
>;

export const industryMap = Object.fromEntries(industries.map((industry) => [industry.slug, industry])) as Record<
  string,
  Industry
>;

export const caseStudyMap = Object.fromEntries(caseStudies.map((caseStudy) => [caseStudy.slug, caseStudy])) as Record<
  string,
  CaseStudy
>;

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function createMailto(subject = siteConfig.defaultSubject) {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}

export function serviceHref(slug: string) {
  return `/services/${slug}/`;
}

export function industryHref(slug: string) {
  return `/industries/${slug}/`;
}

export function caseStudyHref(slug: string) {
  return `/case-studies/${slug}/`;
}

export const publicRoutes = [
  '/',
  '/services/',
  '/industries/',
  '/case-studies/',
  ...services.map((service) => serviceHref(service.slug)),
  ...industries.map((industry) => industryHref(industry.slug)),
  ...caseStudies.map((caseStudy) => caseStudyHref(caseStudy.slug)),
];
