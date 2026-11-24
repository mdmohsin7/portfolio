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
  const currentRole = (
    DATA.work as ReadonlyArray<{
      company: string;
      href: string;
      title: string;
      end?: string;
    }>
  ).find((job) => !job.end || job.end === "Present");

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: DATA.name,
    url: DATA.url,
    image: `${DATA.url}${DATA.avatarUrl}`,
    jobTitle: currentRole?.title ?? "Software Engineer",
    description: DATA.description,
    email: DATA.contact.social.email.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    ...(currentRole
      ? {
          worksFor: {
            "@type": "Organization",
            name: currentRole.company,
            url: currentRole.href,
          },
        }
      : {}),
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
