import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const pricingPage = read('src/pages/pricing/index.astro');
const servicesIndex = read('src/pages/services/index.astro');
const serviceDetail = read('src/pages/services/[slug].astro');
const homeData = read('src/data/home.ts');
const landingPage = read('src/layouts/LandingPage.astro');
const gapReviewForm = read('src/components/GapReviewForm.astro');
const siteData = read('src/data/site.ts');
const searchBriefPage = read('src/pages/search-brief/[slug].astro');
const searchBriefData = JSON.parse(read('src/data/searchBriefs.json'));

for (const anchor of ['starter', 'growth', 'max', 'voice-agents', 'ads-support']) {
  assert(pricingPage.includes(`id={plan.id}`) || pricingPage.includes(`id="${anchor}"`) || pricingPage.includes(`id={service.id}`), `Missing pricing anchor handling for "${anchor}"`);
}

assert(servicesIndex.includes('pricingHref(service.slug)'), 'Expected pricing link usage in services index');
assert(serviceDetail.includes('pricingHref(service.slug)') && serviceDetail.includes('gapReviewHref'), 'Expected packaged and gap-review scoping CTAs in service detail');

for (const sectionId of ['solutions', 'results', 'expertise', 'faq', 'contact']) {
  assert(homeData.includes(`${sectionId}: '${sectionId}'`), `Missing home section id "${sectionId}" in src/data/home.ts`);
}

assert(landingPage.includes('homeSectionIds.solutions') || landingPage.includes('homeNavItems'), 'Expected centralized homepage section usage');
assert(landingPage.includes('id="gap-review"') && landingPage.includes('GapReviewForm'), 'Expected homepage gap-review entry offer');
assert(gapReviewForm.includes("fetch('/api/gap-review-request'") && fs.existsSync(path.join(root, 'functions/api/gap-review-request.js')), 'Expected working gap-review request path');
assert(siteData.includes("'/pricing/'"), 'Expected /pricing/ in shared site config');
assert(searchBriefPage.includes('noindex'), 'Personalized search briefs must remain out of the public search index');
assert(searchBriefPage.includes('brief-request-form'), 'Expected the search-brief request form');
assert(searchBriefData.length === 8, `Expected 8 Austin search briefs, found ${searchBriefData.length}`);
assert(searchBriefData.some((brief) => brief.slug === 'right-at-home-austin-west'), 'Missing Right at Home Austin West brief data');
assert(searchBriefData.every((brief) => brief.opportunities.length === 3), 'Every search brief must have exactly three evidence-backed opportunities');

for (const route of [
  'src/pages/index.astro',
  'src/pages/pricing/index.astro',
  'src/pages/use-cases/index.astro',
  'src/pages/use-cases/[slug].astro',
  'src/pages/services/index.astro',
  'src/pages/industries/index.astro',
  'src/pages/case-studies/index.astro',
]) {
  assert(fs.existsSync(path.join(root, route)), `Missing required route file ${route}`);
}

console.log('validate-site: ok');
