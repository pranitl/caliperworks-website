import fs from 'node:fs';
import path from 'node:path';

const root = '/home/pranit/caliperworks-website';

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
const siteData = read('src/data/site.ts');

for (const anchor of ['starter', 'growth', 'max', 'voice-agents', 'ads-support']) {
  assert(pricingPage.includes(`id={plan.id}`) || pricingPage.includes(`id="${anchor}"`) || pricingPage.includes(`id={service.id}`), `Missing pricing anchor handling for "${anchor}"`);
}

assert(servicesIndex.includes('pricingHref(service.slug)'), 'Expected pricing link usage in services index');
assert(serviceDetail.includes('pricingLink') && serviceDetail.includes('View all pricing'), 'Expected pricing CTAs in service detail');

for (const sectionId of ['solutions', 'results', 'expertise', 'faq', 'contact']) {
  assert(homeData.includes(`${sectionId}: '${sectionId}'`), `Missing home section id "${sectionId}" in src/data/home.ts`);
}

assert(landingPage.includes('homeSectionIds.solutions') || landingPage.includes('homeNavItems'), 'Expected centralized homepage section usage');
assert(siteData.includes("'/pricing/'"), 'Expected /pricing/ in shared site config');

for (const route of [
  'src/pages/index.astro',
  'src/pages/pricing/index.astro',
  'src/pages/services/index.astro',
  'src/pages/industries/index.astro',
  'src/pages/case-studies/index.astro',
]) {
  assert(fs.existsSync(path.join(root, route)), `Missing required route file ${route}`);
}

console.log('validate-site: ok');
