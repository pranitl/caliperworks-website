import searchBriefData from './searchBriefs.json';

export interface SearchBriefWin {
  label: string;
  search: string;
  explanation: string;
}

export interface SearchBriefOpportunity {
  search: string;
  evidence: string;
  heading: string;
  explanation: string;
}

export interface SearchBriefGeo {
  city: string;
  state: string;
  territoryLabel: string;
  searchAreaLabel: string;
}

export interface SearchBriefOffer {
  name: string;
  headline: string;
  promise: string;
  deliverables: string[];
  effort: string;
}

export interface SearchBrief {
  slug: string;
  businessName: string;
  geo: SearchBriefGeo;
  title: string;
  description: string;
  headline: string;
  framing: string;
  metrics: Array<{ value: string; label: string }>;
  winsHeading: string;
  noWinsExplanation: string | null;
  wins: SearchBriefWin[];
  opportunities: SearchBriefOpportunity[];
  offer: SearchBriefOffer;
  proof: string;
  proofQualification: string;
}

export const searchBriefs = searchBriefData as SearchBrief[];

export const searchBriefMap = Object.fromEntries(
  searchBriefs.map((brief) => [brief.slug, brief]),
) as Record<string, SearchBrief>;
