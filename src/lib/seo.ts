import { ORA_ADDRESS_FULL, ORA_ADDRESS_LINES, ORA_MAPS_SHARE_URL, ORA_PLACE_ID } from "@/lib/location";
import { FALLBACK_GOOGLE_REVIEWS } from "@/lib/google-reviews";

const SERVICE_CATALOG = [
  { name: "Preventive Dentistry", description: "Check-ups, scaling & polishing, fluoride, sealants, digital X-rays" },
  { name: "Restorative Dentistry", description: "Composite fillings, crowns, bridges, inlays, denture repairs" },
  { name: "Endodontics", description: "Root canal treatment, retreatment, pulp capping" },
  { name: "Tooth Extractions", description: "Simple and surgical extractions, wisdom tooth evaluation" },
  { name: "Gum Care", description: "Gum disease treatment and periodontal maintenance" },
  { name: "Cosmetic Dentistry", description: "Whitening, bonding, smile aesthetics" },
  { name: "Clear Aligners", description: "Invisible aligner planning and smile design" },
  { name: "Pediatric Dentistry", description: "Gentle dental care for children" },
  { name: "Emergency Dental Care", description: "Urgent pain relief and emergency tooth removal" },
] as const;

/** Production origin — update if the live domain changes. */
export const SITE_URL = "https://oradentalwellness.com";

export const SITE_NAME = "ORA Dental Wellness";
export const SITE_TAGLINE = "Quiet-luxury dental wellness in Bahria Town, Rawalpindi";

export const ORA_PHONE_PRIMARY = "+923398891919";
export const ORA_PHONE_DISPLAY = "0339 8891919";
export const ORA_PHONE_LANDLINE = "+92518891919";
export const ORA_PHONE_LANDLINE_DISPLAY = "051 8891919";
export const ORA_EMAIL = "info@oradentalwellness.com";

/** Approximate coordinates from the clinic’s Google Maps listing. */
export const ORA_GEO = {
  latitude: 33.542181,
  longitude: 73.110376,
} as const;

export const ORA_HOURS = {
  days: "Monday – Saturday",
  opens: "12:00",
  closes: "21:00",
  display: "Mon – Sat · 12:00 PM – 9:00 PM",
} as const;

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const DEFAULT_OG_IMAGE_ALT =
  "ORA Dental Wellness reception in Bahria Town Phase 4, Rawalpindi — calm clinical atelier with soft lighting";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean;
};

export const PAGE_SEO = {
  home: {
    path: "/",
    title: "ORA Dental Wellness | Best Dentist in Bahria Town Phase 4, Rawalpindi",
    description:
      "ORA Dental Wellness is a quiet-luxury dental clinic in Bahria Paradise Commercial, Bahria Town Phase 4, Rawalpindi. Clear aligners, implants, cosmetic dentistry, root canals, and family care by Dr. Ahmed Sultan & Dr. Roha Ejaz. Book online.",
    keywords:
      "dentist Bahria Town, dental clinic Rawalpindi, clear aligners Rawalpindi, dental implants Islamabad, ORA Dental Wellness, dentist Phase 4 Bahria Town, cosmetic dentist Rawalpindi, root canal Bahria Town, teeth whitening Rawalpindi",
  },
  treatments: {
    path: "/treatments",
    title: "Dental Treatments in Bahria Town | Aligners, Implants & More — ORA",
    description:
      "Explore preventive, restorative, cosmetic, pediatric, and emergency dental treatments at ORA Dental Wellness in Bahria Town Phase 4, Rawalpindi — including clear aligners, crowns, root canals, and gum care.",
    keywords:
      "dental treatments Bahria Town, clear aligners Rawalpindi, teeth cleaning, root canal, dental crown, pediatric dentist Rawalpindi",
  },
  atelier: {
    path: "/atelier",
    title: "The Atelier | About ORA Dental Wellness — Bahria Town Clinic",
    description:
      "Discover the ORA atelier: a considered dental wellness space in Bahria Paradise Commercial designed for calm, precise care. Meet our philosophy of restraint in Bahria Town Phase 4.",
    keywords: "ORA Dental Wellness about, dental clinic Bahria Paradise, calm dentist Rawalpindi",
  },
  about: {
    path: "/about",
    title: "About ORA Dental Wellness | Dentists in Bahria Town Phase 4",
    description:
      "Learn about ORA Dental Wellness — Dr. Ahmed Sultan and Dr. Roha Ejaz’s quiet-luxury dental clinic in Bahria Town Phase 4, Rawalpindi. Aligners, cosmetic care, and family dentistry.",
    keywords: "about ORA Dental, dentists Bahria Town, Dr Ahmed Sultan, Dr Roha Ejaz",
  },
  contact: {
    path: "/contact",
    title: "Book a Visit | Contact ORA Dental Wellness — Bahria Town",
    description:
      "Book a consultation at ORA Dental Wellness. Ground Floor, Plot 35, Street 8, Bahria Paradise Commercial, Bahria Town Phase 4. Call 0339 8891919 or email info@oradentalwellness.com.",
    keywords: "book dentist Bahria Town, ORA Dental contact, dental appointment Rawalpindi",
  },
  reviews: {
    path: "/reviews",
    title: "Patient Reviews | ORA Dental Wellness — Bahria Town, Rawalpindi",
    description:
      "Read Google patient reviews for ORA Dental Wellness in Bahria Town Phase 4. Real experiences with clear aligners, scaling, root canals, and smile care from Dr. Ahmed Sultan and Dr. Roha Ejaz.",
    keywords: "ORA Dental reviews, dentist reviews Bahria Town, Google reviews dental clinic Rawalpindi",
  },
} as const satisfies Record<string, PageSeo>;

export const FAQ_ITEMS = [
  {
    question: "Where is ORA Dental Wellness located?",
    answer:
      "ORA Dental Wellness is on the Ground Floor, Plot 35, Street 8, Bahria Paradise Commercial, Bahria Town Phase 4, Rawalpindi 46220. Free parking is available nearby in the commercial area.",
  },
  {
    question: "What are ORA Dental Wellness opening hours?",
    answer:
      "We are open Monday to Saturday, 12:00 PM to 9:00 PM. Appointments are preferred; walk-ins are welcome subject to availability.",
  },
  {
    question: "Do you offer clear aligners in Bahria Town?",
    answer:
      "Yes. Dr. Ahmed Sultan specialises in clear aligner planning and smile design. Treatment begins with a consultation and digital assessment at our Bahria Town Phase 4 clinic.",
  },
  {
    question: "Which dentists practice at ORA?",
    answer:
      "ORA is led by Dr. Ahmed Sultan (General Dentist & Aligners Specialist) and Dr. Roha Ejaz (Cosmetic Dentist), supported by a trained clinical team.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Book through the form on our website, call 0339 8891919 or 051 8891919, or email info@oradentalwellness.com. We typically confirm by phone shortly after you enquire.",
  },
  {
    question: "Is ORA Dental Wellness near Islamabad?",
    answer:
      "Yes. Bahria Town Phase 4 sits between Rawalpindi and Islamabad, making ORA a convenient dental clinic for patients across the twin cities.",
  },
] as const;

type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }
  | { charSet: string };

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalised === "/" ? "" : normalised}` || SITE_URL;
}

export function buildPageMeta(page: PageSeo): MetaTag[] {
  const url = absoluteUrl(page.path);
  const ogImage = page.ogImage ?? DEFAULT_OG_IMAGE;
  const ogImageAlt = page.ogImageAlt ?? DEFAULT_OG_IMAGE_ALT;

  const tags: MetaTag[] = [
    { title: page.title },
    { name: "description", content: page.description },
    { name: "robots", content: page.noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { name: "googlebot", content: page.noIndex ? "noindex, nofollow" : "index, follow" },
    { name: "author", content: SITE_NAME },
    { name: "application-name", content: SITE_NAME },
    { name: "theme-color", content: "#666d57" },
    { name: "color-scheme", content: "light" },
    { name: "format-detection", content: "telephone=yes" },
    { name: "geo.region", content: "PK-PB" },
    { name: "geo.placename", content: "Rawalpindi" },
    { name: "geo.position", content: `${ORA_GEO.latitude};${ORA_GEO.longitude}` },
    { name: "ICBM", content: `${ORA_GEO.latitude}, ${ORA_GEO.longitude}` },
    { name: "language", content: "en-PK" },
    { name: "revisit-after", content: "7 days" },
    { name: "rating", content: "general" },
    { name: "coverage", content: "Bahria Town Phase 4, Rawalpindi, Islamabad Capital Territory, Pakistan" },
    { name: "target", content: "all" },
    { name: "audience", content: "all" },
    { name: "distribution", content: "global" },
    { property: "og:locale", content: "en_PK" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: page.title },
    { property: "og:description", content: page.description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:secure_url", content: ogImage },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: ogImageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: page.title },
    { name: "twitter:description", content: page.description },
    { name: "twitter:image", content: ogImage },
    { name: "twitter:image:alt", content: ogImageAlt },
  ];

  if (page.keywords) {
    tags.splice(2, 0, { name: "keywords", content: page.keywords });
  }

  return tags;
}

export function buildPageLinks(page: PageSeo) {
  const url = absoluteUrl(page.path);
  return [
    { rel: "canonical", href: url },
    { rel: "alternate", hrefLang: "en-PK", href: url },
    { rel: "alternate", hrefLang: "x-default", href: url },
  ];
}

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: "Ground Floor, Plot 35, Street 8, Bahria Paradise Commercial",
    addressLocality: "Rawalpindi",
    addressRegion: "Punjab",
    postalCode: "46220",
    addressCountry: "PK",
  };
}

function geo() {
  return {
    "@type": "GeoCoordinates",
    latitude: ORA_GEO.latitude,
    longitude: ORA_GEO.longitude,
  };
}

function openingHoursSpecification() {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: ORA_HOURS.opens,
      closes: ORA_HOURS.closes,
    },
  ];
}

export function buildDentistJsonLd() {
  const rating = FALLBACK_GOOGLE_REVIEWS.rating;
  const reviewCount = FALLBACK_GOOGLE_REVIEWS.totalReviews;

  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalClinic", "LocalBusiness"],
    "@id": `${SITE_URL}/#dentist`,
    name: SITE_NAME,
    alternateName: ["ORA Dental", "ORA Dental Clinic Bahria Town"],
    description: PAGE_SEO.home.description,
    url: SITE_URL,
    image: [DEFAULT_OG_IMAGE, `${SITE_URL}/logo.png`],
    logo: `${SITE_URL}/logo.png`,
    telephone: [ORA_PHONE_PRIMARY, ORA_PHONE_LANDLINE],
    email: ORA_EMAIL,
    priceRange: "$$",
    currenciesAccepted: "PKR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    address: postalAddress(),
    geo: geo(),
    hasMap: ORA_MAPS_SHARE_URL,
    sameAs: [
      ORA_MAPS_SHARE_URL,
      `https://www.google.com/maps/place/?q=place_id:${ORA_PLACE_ID}`,
      "https://www.instagram.com/oradentalwellness/",
      "https://www.facebook.com/profile.php?id=61590825338018",
    ],
    openingHoursSpecification: openingHoursSpecification(),
    areaServed: [
      { "@type": "City", name: "Rawalpindi" },
      { "@type": "City", name: "Islamabad" },
      { "@type": "Place", name: "Bahria Town Phase 4" },
      { "@type": "Place", name: "Bahria Paradise Commercial" },
    ],
    medicalSpecialty: [
      "Dentistry",
      "Cosmetic Dentistry",
      "Orthodontics",
      "Endodontics",
      "Periodontics",
      "Pediatric Dentistry",
    ],
    availableService: SERVICE_CATALOG.map((service) => ({
      "@type": "MedicalProcedure",
      name: service.name,
      description: service.description,
    })),
    employee: [
      {
        "@type": "Person",
        name: "Dr. Ahmed Sultan",
        jobTitle: "General Dentist · Aligners Specialist",
        worksFor: { "@id": `${SITE_URL}/#dentist` },
      },
      {
        "@type": "Person",
        name: "Dr. Roha Ejaz",
        jobTitle: "Cosmetic Dentist",
        worksFor: { "@id": `${SITE_URL}/#dentist` },
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
      reviewCount,
    },
    review: FALLBACK_GOOGLE_REVIEWS.reviews.slice(0, 5).map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      datePublished: review.publishedAt,
      reviewBody: review.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: ORA_PHONE_PRIMARY,
        contactType: "customer service",
        areaServed: "PK",
        availableLanguage: ["English", "Urdu"],
      },
    ],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    publisher: { "@id": `${SITE_URL}/#dentist` },
    inLanguage: "en-PK",
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildSpeakableJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    name: PAGE_SEO.home.title,
    url: SITE_URL,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#dentist` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: DEFAULT_OG_IMAGE,
      caption: DEFAULT_OG_IMAGE_ALT,
    },
  };
}

export function jsonLdScript(data: unknown) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify(data),
  };
}

export function homeJsonLdScripts() {
  return [
    jsonLdScript(buildDentistJsonLd()),
    jsonLdScript(buildWebsiteJsonLd()),
    jsonLdScript(buildFaqJsonLd()),
    jsonLdScript(buildSpeakableJsonLd()),
  ];
}

export function pageJsonLdScripts(page: PageSeo, crumbName: string) {
  return [
    jsonLdScript(buildDentistJsonLd()),
    jsonLdScript(
      buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: crumbName, path: page.path },
      ]),
    ),
  ];
}

export { ORA_ADDRESS_FULL, ORA_ADDRESS_LINES, ORA_MAPS_SHARE_URL };
