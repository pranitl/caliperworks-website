import type { CaseStudy, FaqEntry, Service } from '../data/site';
import { absoluteUrl, siteConfig } from '../data/site';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface ItemListEntry {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faq: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    description: siteConfig.tagline,
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.defaultDescription,
  };
}

interface OfferEntry {
  name: string;
  description: string;
  price?: string;
  priceCurrency?: string;
  url: string;
  category?: string;
}

export function offerCatalogSchema(name: string, offers: OfferEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: offers.map((offer, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Offer',
          name: offer.name,
          description: offer.description,
          url: absoluteUrl(offer.url),
          category: offer.category,
          ...(offer.price
            ? {
                price: offer.price,
                priceCurrency: offer.priceCurrency ?? 'USD',
              }
            : {}),
        },
      })),
    },
  };
}

export function itemListSchema(name: string, items: ItemListEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: service.name,
    description: service.metaDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: 'United States',
    url: absoluteUrl(`/services/${service.slug}/`),
  };
}

export function caseStudyArticleSchema(caseStudy: CaseStudy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.heroTitle,
    description: caseStudy.metaDescription,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    url: absoluteUrl(`/case-studies/${caseStudy.slug}/`),
    about: caseStudy.title,
  };
}
