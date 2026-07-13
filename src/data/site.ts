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

export interface UseCase {
  slug: string;
  shortLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  body: string;
  observedCondition: string;
  consequence: string;
  outcome: string;
  mechanism: string[];
  deliverables: string[];
  relatedServices: string[];
  relatedCaseStudies: string[];
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
  results: Array<{ value: string; label: string; kind?: 'outcome' | 'implementation' }>;
  quote?: string;
  takeaways: string[];
}

export const siteConfig = {
  name: 'Caliperworks',
  siteUrl: 'https://caliperworks.com',
  email: 'pranit@caliperworks.com',
  defaultSubject: 'Caliperworks Gap Review Request',
  defaultTitle: 'Growth Systems for Service Businesses | Caliperworks',
  defaultDescription:
    'Caliperworks helps service businesses improve the path from local search or inbound call to a qualified, properly routed next step.',
  defaultOgImagePath: '/og-card.svg',
  tagline:
    'SEO execution, call coverage, ads workflows, and practical automation for service businesses that need stronger demand capture and cleaner follow-up.',
} as const;

export const gapReviewHref = '/#gap-review';

export const calEmbed = {
  namespace: '30min',
  link: 'caliperworks/30min',
  origin: 'https://app.cal.com',
  config: {
    layout: 'month_view',
    useSlotsViewOnSmallScreen: 'true',
  },
  ui: {
    hideEventTypeDetails: false,
    layout: 'month_view',
  },
  floatingButtonId: 'cal-discovery-floating-button',
  floatingButtonText: 'Schedule Discovery Call',
} as const;

export const mainNav = [
  { href: '/use-cases/', label: 'Use Cases' },
  { href: '/services/', label: 'Services' },
  { href: '/industries/', label: 'Industries' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/case-studies/', label: 'Case Studies' },
] as const;

export const services: Service[] = [
  {
    slug: 'ai-process-audits',
    name: 'Gap Review and Process Audit',
    shortLabel: 'Gap review',
    teaser:
      'Map the workflow first, then prioritize the voice, SEO, ad, and operational changes worth implementing.',
    metaTitle: 'Growth Gap Review and Process Audit | Caliperworks',
    metaDescription:
      'Caliperworks offers a free AI process audit for small businesses to map workflows, uncover revenue leaks, and prioritize the highest-impact automation opportunities.',
    heroTitle: 'Find the first growth or workflow constraint worth fixing',
    heroDescription:
      'Review intake, marketing, handoffs, and follow-up to uncover the automation opportunities that actually fit your business before you commit to implementation.',
    summary:
      'The gap review is a free discovery layer. It shows whether search visibility, voice handling, paid-demand flow, or workflow cleanup should come first.',
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
    relatedIndustries: ['home-care-agencies', 'hvac-and-plumbing', 'law-offices'],
    relatedCaseStudies: ['home-care-agency-seo-growth', 'med-spa-consultation-growth'],
    faq: [
      {
        question: 'How long does an AI process audit take?',
        answer:
          'Most audits can be scoped and delivered in days, not months. The timeline depends on how many systems, handoffs, and lead sources you want reviewed.',
      },
      {
        question: 'Is the audit paid?',
        answer:
          'No. The process audit is free. It is the fastest way to see where voice, search, ads, or workflow cleanup should start.',
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
    relatedIndustries: ['dentists', 'hvac-and-plumbing', 'med-spas'],
    relatedCaseStudies: ['med-spa-consultation-growth', 'hvac-lead-automation'],
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
    name: 'Local SEO and Growth Assets',
    shortLabel: 'Local SEO',
    teaser: 'Grow local search visibility with service pages, location pages, landing pages, and practical optimization work.',
    metaTitle: 'Local SEO and Growth Assets for Service Businesses | Caliperworks',
    metaDescription:
      'Caliperworks helps service businesses grow with local SEO execution, growth assets, landing pages, existing-page optimization, and practical ads workflow support.',
    heroTitle: 'Local SEO execution built for practical growth',
    heroDescription:
      'Build the service pages, location pages, growth assets, and conversion paths that help qualified local demand find you and take the next step.',
    summary:
      'This service focuses on local SEO execution first: growth assets, service and location coverage, internal linking, existing-page optimization, and conversion-focused landing pages.',
    problems: [
      'Local service businesses need more location and service-page coverage to rank consistently.',
      'Existing pages often miss buyer intent, local relevance, internal links, or a clear conversion path.',
      'Marketing spend grows, but lead quality and follow-up do not improve with it.',
    ],
    deliverables: [
      'A growth asset roadmap designed around high-intent services, locations, and buyer questions.',
      'New service pages, location pages, FAQ resources, comparison pages, or landing pages based on the plan.',
      'Existing-page optimization, internal linking, and conversion updates that connect search traffic to fast follow-up.',
    ],
    outcomes: [
      'Build more search visibility for core services and local intent queries.',
      'Turn thin or underused pages into clearer lead-capture paths.',
      'Create better alignment between marketing execution and operations.',
    ],
    relatedIndustries: ['home-care-agencies', 'med-spas', 'law-offices', 'hvac-and-plumbing'],
    relatedCaseStudies: ['home-care-agency-seo-growth', 'med-spa-consultation-growth', 'hvac-lead-automation'],
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
          'Yes, but the packaged plans focus on local SEO and landing-page execution. Ads workflows can be scoped when the audit shows paid traffic, landing pages, and follow-up need to be connected.',
      },
    ],
  },
];

export const useCases: UseCase[] = [
  {
    slug: 'local-visibility-growth',
    shortLabel: 'Local visibility growth',
    metaTitle: 'Local Visibility Growth for Service Businesses | Caliperworks',
    metaDescription: 'Build the service, location, and buyer-intent pages that help qualified local demand find your business and take the next step.',
    eyebrow: 'Use case · local visibility',
    headline: 'Build the search coverage qualified local demand is already looking for.',
    body: 'Turn gaps in service, location, treatment, practice-area, and buyer-question coverage into a prioritized execution plan.',
    observedCondition: 'Important services or locations are difficult to find, and existing pages do not match how buyers search or decide.',
    consequence: 'Qualified demand reaches competitors, paid traffic lands on weak pages, and marketing effort does not compound.',
    outcome: 'A clearer path from high-intent search to calls, consultations, quotes, or booked work.',
    mechanism: [
      'Map service, location, and buyer-intent gaps.',
      'Prioritize new growth assets and existing-page improvements.',
      'Connect each page to a clear conversion and follow-up path.',
    ],
    deliverables: ['Opportunity map', 'Priority asset list', 'Recommended execution pace', 'First-page brief'],
    relatedServices: ['seo-and-ads-automation', 'ai-process-audits'],
    relatedCaseStudies: ['home-care-agency-seo-growth', 'med-spa-consultation-growth'],
  },
  {
    slug: 'missed-call-coverage',
    shortLabel: 'Missed-call coverage',
    metaTitle: 'Missed-Call Coverage for Service Businesses | Caliperworks',
    metaDescription: 'Capture, qualify, route, or book inbound calls when staff are busy, at lunch, or offline.',
    eyebrow: 'Use case · call coverage',
    headline: 'When the office cannot answer, the inquiry should still move.',
    body: 'Create reliable coverage for busy periods, lunch breaks, after hours, and other windows where valuable calls reach voicemail.',
    observedCondition: 'Calls arrive while staff are serving customers, working in the field, at lunch, or already on another call.',
    consequence: 'Follow-up starts late, caller context has to be reconstructed, and time-sensitive demand goes elsewhere.',
    outcome: 'Clean caller details and a qualified, routed, or booked next step delivered to the existing team.',
    mechanism: [
      'Review call types, coverage windows, and booking rules.',
      'Define qualification, routing, and escalation logic.',
      'Connect the handoff to the systems staff already use.',
    ],
    deliverables: ['Coverage-window review', 'Call-type map', 'Escalation rules', 'Recommended first workflow'],
    relatedServices: ['voice-agents', 'ai-process-audits'],
    relatedCaseStudies: ['hvac-lead-automation'],
  },
  {
    slug: 'lead-handoff-cleanup',
    shortLabel: 'Lead handoff cleanup',
    metaTitle: 'Lead Handoff and Follow-Up Cleanup | Caliperworks',
    metaDescription: 'Reduce intake friction and move qualified inquiries to the right owner with better context and less manual chasing.',
    eyebrow: 'Use case · follow-up',
    headline: 'Make the next handoff clear before adding another tool.',
    body: 'Review how leads move between forms, phones, inboxes, calendars, and staff, then fix the steps that create delay or rework.',
    observedCondition: 'New inquiries arrive through several channels with inconsistent detail and no reliable next owner.',
    consequence: 'Staff chase missing information, promising leads wait, and reporting never reflects the real customer journey.',
    outcome: 'Qualified inquiries reach the right person with the context needed to act.',
    mechanism: [
      'Map the current intake and follow-up path.',
      'Find missing fields, unclear ownership, and duplicate work.',
      'Prioritize the smallest workflow changes with the largest operational effect.',
    ],
    deliverables: ['Current-state map', 'Friction and ownership gaps', 'Priority fixes', 'Implementation recommendation'],
    relatedServices: ['ai-process-audits', 'voice-agents'],
    relatedCaseStudies: ['med-spa-consultation-growth'],
  },
  {
    slug: 'paid-demand-efficiency',
    shortLabel: 'Paid-demand efficiency',
    metaTitle: 'Paid-Demand and Landing-Page Efficiency | Caliperworks',
    metaDescription: 'Improve the path from paid traffic to qualification, follow-up, and booked work without treating ad performance as a media-only problem.',
    eyebrow: 'Use case · paid demand',
    headline: 'Get more from active demand before increasing the budget.',
    body: 'Connect ad workflows, landing-page coverage, qualification, and follow-up so the existing spend has a better chance to convert.',
    observedCondition: 'Paid traffic is active, but landing pages, qualification, and operational follow-up are managed as separate systems.',
    consequence: 'Clicks increase without a comparable improvement in qualified opportunities or booked work.',
    outcome: 'A more efficient path from campaign intent to properly handled lead.',
    mechanism: [
      'Review campaign intent and landing-page alignment.',
      'Inspect qualification and speed-to-lead constraints.',
      'Prioritize workflow, page, and reporting changes before adding spend.',
    ],
    deliverables: ['Demand-path review', 'Landing-page gaps', 'Qualification gaps', 'Priority action plan'],
    relatedServices: ['seo-and-ads-automation', 'ai-process-audits'],
    relatedCaseStudies: ['hvac-lead-automation'],
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
    relatedCaseStudies: [],
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
    slug: 'law-offices',
    name: 'Law Offices',
    teaser: 'Build search coverage, intake routing, and follow-up systems around high-value legal matters.',
    metaTitle: 'Local SEO and AI Workflows for Law Offices | Caliperworks',
    metaDescription:
      'Caliperworks helps law offices build local SEO assets, intake workflows, and follow-up systems for high-value practice areas and service regions.',
    heroTitle: 'Local growth systems for law offices',
    heroDescription:
      'Build stronger practice-area visibility and cleaner intake follow-up so qualified legal inquiries move to the right next step faster.',
    summary:
      'Law offices need clear search coverage for high-value matters, fast intake qualification, and follow-up that does not leave serious prospects sitting in an inbox.',
    painPoints: [
      'Practice-area pages often miss local intent, urgency, or the questions prospects ask before contacting an attorney.',
      'Potential clients need quick routing, especially when the matter is time-sensitive or high value.',
      'Marketing, intake, and consultation scheduling can drift into separate manual processes.',
    ],
    automations: [
      'Practice-area, location, FAQ, and comparison pages built around qualified legal search intent.',
      'Intake workflows that collect matter type, urgency, location, and follow-up details before staff review.',
      'Routing and follow-up support so qualified inquiries reach the right person with cleaner context.',
    ],
    relatedServices: ['seo-and-ads-automation', 'ai-process-audits', 'voice-agents'],
    relatedCaseStudies: [],
    faq: [
      {
        question: 'Can SEO work for a specialized law practice?',
        answer:
          'Yes. Specialized practices often benefit from pages built around specific matters, locations, eligibility questions, costs, and comparison searches.',
      },
      {
        question: 'Can automation help without replacing legal intake staff?',
        answer:
          'Yes. The goal is to collect useful context, route inquiries, and reduce manual chasing while keeping legal review and client decisions with the firm.',
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
    slug: 'med-spas',
    name: 'Med Spas',
    teaser: 'Grow treatment visibility and capture consultation demand without overloading the front desk.',
    metaTitle: 'Local SEO and AI Workflows for Med Spas | Caliperworks',
    metaDescription:
      'Caliperworks helps med spas build treatment pages, local SEO assets, consultation intake workflows, and follow-up systems for higher-intent demand.',
    heroTitle: 'Local growth systems for med spas',
    heroDescription:
      'Build treatment-page coverage, consultation capture, and follow-up workflows around the procedures and questions that bring qualified patients in.',
    summary:
      'Med spas need stronger search visibility for treatments, comparisons, cost questions, and local intent, plus fast follow-up when prospects are ready to book.',
    painPoints: [
      'Treatment pages can be too thin to rank or too generic to convert high-intent prospects.',
      'Consultation requests lose momentum when staff are busy with in-office clients.',
      'Paid ads and social interest often need stronger landing pages and follow-up paths to turn into booked appointments.',
    ],
    automations: [
      'Treatment, comparison, cost, FAQ, and location pages built around local search demand.',
      'Consultation intake workflows that capture treatment interest, timing, and next-step details.',
      'Follow-up and landing-page support that connects search or ad traffic to booking intent.',
    ],
    relatedServices: ['seo-and-ads-automation', 'voice-agents', 'ai-process-audits'],
    relatedCaseStudies: ['med-spa-consultation-growth'],
    faq: [
      {
        question: 'Can local SEO help med spas beyond blog posts?',
        answer:
          'Yes. The most useful assets are often treatment pages, comparison pages, cost explainers, local pages, and consultation-focused landing pages.',
      },
      {
        question: 'Can AI help with consultation requests?',
        answer:
          'Yes. It can collect treatment interest, preferred timing, and contact details so staff can follow up from a cleaner queue.',
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
      { value: '199%', label: 'increase in engaged visitors', kind: 'outcome' },
      { value: 'Page 1', label: 'visibility for top keywords', kind: 'outcome' },
      { value: 'Lead qualification', label: 'workflow support added', kind: 'implementation' },
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
    location: 'Houston, Texas',
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
      { value: '25%', label: 'more leads on the same budget', kind: 'outcome' },
      { value: '30%', label: 'conversion lift', kind: 'outcome' },
      { value: '24/7', label: 'lead coverage implemented', kind: 'implementation' },
    ],
    quote:
      'The ad automation hyper-optimized the budget I was already spending. I saw 25% more leads without increasing my ad spend, and the lead conversion rate jumped by 30%.',
    takeaways: [
      'Efficiency gains often come from tightening conversion flow, not just media buying.',
      'Trade businesses benefit most when speed-to-lead and budget optimization work together.',
      'A better qualification layer can raise conversion rates without more spend.',
    ],
  },
  {
    slug: 'med-spa-consultation-growth',
    title: 'Med spa Page 1 search growth and voice-agent intake',
    teaser: 'A med spa moved a priority treatment search from Page 5 to Page 1 and added voice-agent coverage for consultation intake.',
    metaTitle: 'Med Spa SEO and Voice Agent Case Study | Caliperworks',
    metaDescription:
      'See how a med spa used Caliperworks SEO execution to move from Page 5 to Page 1 and implemented a voice agent to improve consultation intake.',
    heroTitle: 'From Page 5 to Page 1, with voice coverage ready for the demand',
    heroDescription:
      'A med spa needed stronger treatment visibility and a better way to capture consultation intent when staff could not answer immediately.',
    clientLabel: 'Med spa',
    location: 'Boston',
    industrySlug: 'med-spas',
    serviceSlugs: ['seo-and-ads-automation', 'voice-agents'],
    challenge: [
      'A priority treatment search was sitting on Page 5 instead of reaching high-intent prospects.',
      'The existing search coverage did not fully support how prospects compared treatments, pricing, and local providers.',
      'Consultation calls needed reliable capture and a cleaner handoff when the front desk was occupied or offline.',
    ],
    solution: [
      'Improved the priority treatment page and supporting local search structure around qualified treatment intent.',
      'Expanded the page coverage needed to support comparison, cost, FAQ, and local-intent searches.',
      'Implemented a voice agent to capture consultation interest and hand cleaner intake details to the team.',
    ],
    results: [
      { value: 'Page 5 → 1', label: 'priority treatment search improvement', kind: 'outcome' },
      { value: 'Voice agent', label: 'consultation coverage implemented', kind: 'implementation' },
      { value: 'Intake handoff', label: 'cleaner consultation details for staff follow-up', kind: 'implementation' },
    ],
    takeaways: [
      'Search growth creates more value when the intake path is ready to handle the resulting demand.',
      'Treatment visibility improves when the main page and supporting buyer questions are planned together.',
      'Voice coverage can preserve consultation intent when the front desk cannot answer immediately.',
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

export const useCaseMap = Object.fromEntries(useCases.map((useCase) => [useCase.slug, useCase])) as Record<
  string,
  UseCase
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

export function useCaseHref(slug: string) {
  return `/use-cases/${slug}/`;
}

export function pricingHref(slug?: string) {
  if (!slug) return '/pricing/';
  if (slug === 'voice-agents') return '/pricing/#voice-agents';
  if (slug === 'seo-and-ads-automation') return '/pricing/';
  return '/pricing/';
}

export function industryHref(slug: string) {
  return `/industries/${slug}/`;
}

export function caseStudyHref(slug: string) {
  return `/case-studies/${slug}/`;
}

export const publicRoutes = [
  '/',
  '/use-cases/',
  '/services/',
  '/pricing/',
  '/industries/',
  '/case-studies/',
  ...useCases.map((useCase) => useCaseHref(useCase.slug)),
  ...services.map((service) => serviceHref(service.slug)),
  ...industries.map((industry) => industryHref(industry.slug)),
  ...caseStudies.map((caseStudy) => caseStudyHref(caseStudy.slug)),
];
