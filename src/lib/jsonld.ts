import { DATA } from "@/data/resume";

const PERSON_ID = `${DATA.url}/#person`;
const WEBSITE_ID = `${DATA.url}/#website`;

export function getSameAs(): string[] {
  return [
    DATA.contact.social.GitHub.url,
    DATA.contact.social.LinkedIn.url,
    DATA.contact.social.X.url,
  ];
}

export function getPersonJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: DATA.name,
    url: DATA.url,
    image: `${DATA.url}${DATA.avatarUrl}`,
    jobTitle: DATA.work[0]?.title ?? "Software Engineer",
    description: DATA.description,
    email: DATA.contact.social.email.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    worksFor: {
      "@type": "Organization",
      name: DATA.work[0]?.company,
      url: DATA.work[0]?.href,
    },
    sameAs: getSameAs(),
  };
}

export function getWebsiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: DATA.name,
    alternateName: ["mohsin.xyz", "Mohsin", "mdmohsin7"],
    url: DATA.url,
    description: DATA.description,
    inLanguage: "en-US",
    publisher: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
  };
}

export function getHomepageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [getPersonJsonLd(), getWebsiteJsonLd()],
  };
}
