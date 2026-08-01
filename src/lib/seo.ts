import { ORA_ADDRESS_FULL, ORA_ADDRESS_LINES, ORA_MAPS_SHARE_URL, ORA_PLACE_ID } from "@/lib/location";
import { FALLBACK_GOOGLE_REVIEWS } from "@/lib/google-reviews";

const SERVICE_CATALOG = [
  { name: "Preventive Dentistry", description: "Check-ups, scaling & polishing, fluoride, sealants, digital X-rays" },
  { name: "Restorative Dentistry", description: "Composite fillings, crowns, bridges, inlays, denture repairs" },
  { name: "Endodontics", description: "Root canal treatment, retreatment, pulp capping" },
  { name: "Tooth Extractions", description: "Simple and surgical extractions, wisdom tooth evaluation" },
  { name: "Gum Care", description: "Gum disease treatment and periodontal maintenance" },
  { name: "Cosmetic Dentistry", description: "Whitening, bonding, smile aesthetics, veneers" },
  { name: "Clear Aligners", description: "Invisible aligner planning and smile design" },
  { name: "Pediatric Dentistry", description: "Gentle dental care for children" },
  { name: "Emergency Dental Care", description: "Urgent pain relief and emergency tooth removal" },
  { name: "Dental Implants Support", description: "Implant planning with specialist periodontist & prosthodontist support" },
] as const;

/** Production origin — always the www host (matches live redirects). */
export const SITE_URL = "https://www.oradentalwellness.com";

export const SITE_NAME = "ORA Dental Wellness";
export const SITE_TAGLINE =
  "Quiet-luxury dental clinic in Bahria Town Phase 4, Rawalpindi";

export const ORA_PHONE_PRIMARY = "+923398891919";
export const ORA_PHONE_DISPLAY = "0339 8891919";
export const ORA_PHONE_LANDLINE = "+92518891919";
export const ORA_PHONE_LANDLINE_DISPLAY = "051 8891919";
export const ORA_WHATSAPP_URL = "https://wa.me/923398891919";
export const ORA_EMAIL = "info@oradentalwellness.com";

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

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
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
    title: "ORA Dental Wellness | Dental Clinic in Rawalpindi",
    description:
      "ORA Dental Wellness — dentist in Bahria Town Phase 4, Rawalpindi. Clear aligners, cosmetic & restorative care by Dr. Ahmed Sultan & Dr. Roha Ejaz. Book online.",
    keywords:
      "dentist Rawalpindi, dental clinic Rawalpindi, dentist Bahria Town, dental clinic Bahria Town Phase 4, clear aligners Rawalpindi, cosmetic dentist Rawalpindi, root canal Rawalpindi, ORA Dental Wellness, dental clinic near me",
  },
  treatments: {
    path: "/treatments",
    title: "Dental Treatments in Rawalpindi | Aligners, Implants & More — ORA",
    description:
      "Explore preventive, restorative, cosmetic, pediatric, and emergency dental treatments at ORA Dental Wellness in Bahria Town Phase 4, Rawalpindi.",
    keywords:
      "dental treatments Rawalpindi, clear aligners Rawalpindi, root canal Rawalpindi, dental crown Bahria Town",
  },
  atelier: {
    path: "/atelier",
    title: "The Atelier | About ORA Dental Wellness — Rawalpindi Clinic",
    description:
      "Discover the ORA atelier: a calm dental wellness space in Bahria Paradise Commercial, Bahria Town Phase 4, Rawalpindi.",
    keywords: "ORA Dental Wellness about, dental clinic Bahria Paradise Rawalpindi",
  },
  about: {
    path: "/about",
    title: "About ORA Dental Wellness | Dentists in Rawalpindi Bahria Town",
    description:
      "Meet Dr. Ahmed Sultan and Dr. Roha Ejaz — founders of ORA Dental Wellness in Bahria Town Phase 4, Rawalpindi.",
    keywords: "about ORA Dental, dentists Rawalpindi, Dr Ahmed Sultan, Dr Roha Ejaz",
  },
  contact: {
    path: "/contact",
    title: "Book a Visit | Contact ORA Dental Wellness — Rawalpindi",
    description:
      "Book a consultation at ORA Dental Wellness, Bahria Paradise Commercial, Bahria Town Phase 4, Rawalpindi. Call 0339 8891919.",
    keywords: "book dentist Rawalpindi, ORA Dental contact, dental appointment Bahria Town",
  },
  reviews: {
    path: "/reviews",
    title: "Patient Reviews | ORA Dental Wellness — Rawalpindi",
    description:
      "Read Google patient reviews for ORA Dental Wellness in Bahria Town Phase 4, Rawalpindi.",
    keywords: "ORA Dental reviews Rawalpindi, dentist reviews Bahria Town",
  },
  clinicTour: {
    path: "/clinic-tour",
    title: "Clinic Tour | ORA Dental Wellness Rawalpindi",
    description:
      "Watch a short clinic tour of ORA Dental Wellness in Bahria Town Phase 4, Rawalpindi. See the atelier, then book a visit.",
    keywords:
      "ORA Dental clinic tour, dental clinic Rawalpindi video, Bahria Town dentist tour, ORA Dental Wellness walkthrough",
    ogImage: `${SITE_URL}/clinic-video-poster.jpg`,
    ogImageAlt:
      "Still from the ORA Dental Wellness clinic tour video — Bahria Town Phase 4, Rawalpindi",
  },
} as const satisfies Record<string, PageSeo>;

export const FAQ_ITEMS = [
  {
    question: "Where is ORA Dental Wellness located in Rawalpindi?",
    answer:
      "ORA Dental Wellness is on the Ground Floor, Plot 35, Street 8, Bahria Paradise Commercial, Bahria Town Phase 4, Rawalpindi 46220. Free parking is available nearby in the commercial area.",
  },
  {
    question: "What are ORA Dental Wellness opening hours?",
    answer:
      "We are open Monday to Saturday, 12:00 PM to 9:00 PM. Appointments are preferred; walk-ins are welcome subject to availability.",
  },
  {
    question: "Why choose ORA as a dental clinic in Rawalpindi?",
    answer:
      "Patients choose ORA for specialist-led care in a calm clinic — clear aligners with Dr. Ahmed Sultan, restorative and cosmetic care with Dr. Roha Ejaz, plus implants, periodontal care, and oral surgery support in Bahria Town Phase 4.",
  },
  {
    question: "Do you offer clear aligners in Bahria Town, Rawalpindi?",
    answer:
      "Yes. Dr. Ahmed Sultan specialises in clear aligner planning and smile design. Treatment begins with a consultation and digital assessment at our Bahria Town Phase 4 clinic.",
  },
  {
    question: "Which dentists practice at ORA?",
    answer:
      "ORA is led by Dr. Ahmed Sultan (General Dentist & Aligners Specialist) and Dr. Roha Ejaz (General & Restorative Dentist), supported by periodontists, oral surgeons, and prosthodontists.",
  },
  {
    question: "How do I book a dental appointment in Rawalpindi?",
    answer:
      "Book through the form on our website, call 0339 8891919 or 051 8891919, WhatsApp us, or email info@oradentalwellness.com. We typically confirm shortly after you enquire.",
  },
  {
    question: "Is ORA convenient for patients from Islamabad?",
    answer:
      "Yes. Bahria Town Phase 4 sits between Rawalpindi and Islamabad, so many twin-city patients visit ORA for aligners, restorative care, and family dentistry.",
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

/** Best-effort ISO date for schema (reviews may use human-readable strings). */
function toIsoDate(value: string): string | undefined {
  const parsed = Date.parse(value);
  if (!Number.isNaN(parsed)) return new Date(parsed).toISOString().slice(0, 10);
  return undefined;
}

export function buildPageMeta(page: PageSeo): MetaTag[] {
  const url = absoluteUrl(page.path);
  const ogImage = page.ogImage ?? DEFAULT_OG_IMAGE;
  const ogImageAlt = page.ogImageAlt ?? DEFAULT_OG_IMAGE_ALT;

  const tags: MetaTag[] = [
    { title: page.title },
    { name: "description", content: page.description },
    {
      name: "robots",
      content: page.noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
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
    { name: "revisit-after", content: "3 days" },
    {
      name: "coverage",
      content: "Bahria Town Phase 4, Rawalpindi, Punjab, Pakistan",
    },
    { property: "og:locale", content: "en_PK" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: page.title },
    { property: "og:description", content: page.description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:secure_url", content: ogImage },
    { property: "og:image:type", content: "image/jpeg" },
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

function logoImage() {
  return {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/google-logo.png`,
    contentUrl: `${SITE_URL}/google-logo.png`,
    width: 512,
    height: 512,
    caption: SITE_NAME,
  };
}

function founderPersons() {
  return [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#dr-ahmed-sultan`,
      name: "Dr. Ahmed Sultan",
      jobTitle: "General Dentist · Aligners Specialist",
      description:
        "General dentist with a special interest in clear aligner therapy and oral surgery, offering clear aligners, extractions, restorative dentistry, and comprehensive care in Rawalpindi.",
      worksFor: { "@id": `${SITE_URL}/#dentist` },
      url: `${SITE_URL}/#doctors`,
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#dr-roha-ejaz`,
      name: "Dr. Roha Ejaz",
      jobTitle: "General & Restorative Dentist",
      description:
        "General and restorative dentist with a special interest in cosmetic dentistry, including aesthetic composites, veneers, smile makeovers, whitening, and painless root canal treatment.",
      worksFor: { "@id": `${SITE_URL}/#dentist` },
      url: `${SITE_URL}/#doctors`,
    },
  ];
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["ORA Dental", "ORA Dental Clinic Rawalpindi"],
    url: SITE_URL,
    logo: logoImage(),
    image: DEFAULT_OG_IMAGE,
    email: ORA_EMAIL,
    telephone: [ORA_PHONE_PRIMARY, ORA_PHONE_LANDLINE],
    address: postalAddress(),
    sameAs: [
      ORA_MAPS_SHARE_URL,
      `https://www.google.com/maps/place/?q=place_id:${ORA_PLACE_ID}`,
      "https://www.instagram.com/oradentalwellness/",
      "https://www.facebook.com/profile.php?id=61590825338018",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: ORA_PHONE_PRIMARY,
        contactType: "reservations",
        areaServed: ["Rawalpindi", "Islamabad", "PK"],
        availableLanguage: ["English", "Urdu"],
      },
      {
        "@type": "ContactPoint",
        telephone: ORA_PHONE_LANDLINE,
        contactType: "customer service",
        areaServed: "PK",
        availableLanguage: ["English", "Urdu"],
      },
    ],
  };
}

export function buildDentistJsonLd() {
  const rating = FALLBACK_GOOGLE_REVIEWS.rating;
  const reviewCount = FALLBACK_GOOGLE_REVIEWS.totalReviews;
  const founders = founderPersons();

  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalClinic", "LocalBusiness"],
    "@id": `${SITE_URL}/#dentist`,
    name: SITE_NAME,
    legalName: SITE_NAME,
    alternateName: [
      "ORA Dental",
      "ORA Dental Clinic Bahria Town",
      "ORA Dental Clinic Rawalpindi",
      "Best Dental Clinic Bahria Town Phase 4",
    ],
    description: PAGE_SEO.home.description,
    url: SITE_URL,
    mainEntityOfPage: { "@id": `${SITE_URL}/#webpage` },
    image: [DEFAULT_OG_IMAGE, logoImage()],
    logo: logoImage(),
    telephone: [ORA_PHONE_PRIMARY, ORA_PHONE_LANDLINE],
    email: ORA_EMAIL,
    priceRange: "$$",
    currenciesAccepted: "PKR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    address: postalAddress(),
    geo: geo(),
    hasMap: ORA_MAPS_SHARE_URL,
    identifier: [
      {
        "@type": "PropertyValue",
        name: "Google Place ID",
        value: ORA_PLACE_ID,
      },
    ],
    sameAs: [
      ORA_MAPS_SHARE_URL,
      `https://www.google.com/maps/place/?q=place_id:${ORA_PLACE_ID}`,
      "https://www.instagram.com/oradentalwellness/",
      "https://www.facebook.com/profile.php?id=61590825338018",
    ],
    openingHoursSpecification: openingHoursSpecification(),
    areaServed: [
      { "@type": "City", name: "Rawalpindi" },
      { "@type": "AdministrativeArea", name: "Punjab" },
      { "@type": "Place", name: "Bahria Town Phase 4" },
      { "@type": "Place", name: "Bahria Paradise Commercial" },
      { "@type": "Place", name: "Bahria Town" },
      { "@type": "City", name: "Islamabad" },
    ],
    medicalSpecialty: [
      "Dentistry",
      "Cosmetic Dentistry",
      "Orthodontics",
      "Endodontics",
      "Periodontics",
      "Pediatric Dentistry",
      "Oral Surgery",
      "Prosthodontics",
    ],
    knowsAbout: [
      "Dental clinic Rawalpindi",
      "Clear aligners Rawalpindi",
      "Cosmetic dentistry Rawalpindi",
      "Restorative dentistry",
      "Root canal treatment",
      "Teeth whitening",
      "Dental implants",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dental treatments at ORA Dental Wellness",
      itemListElement: SERVICE_CATALOG.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: { "@id": `${SITE_URL}/#dentist` },
          areaServed: { "@type": "City", name: "Rawalpindi" },
        },
        position: index + 1,
      })),
    },
    availableService: SERVICE_CATALOG.map((service) => ({
      "@type": "MedicalProcedure",
      name: service.name,
      description: service.description,
    })),
    founder: founders.map((p) => ({ "@id": p["@id"] })),
    employee: [
      ...founders,
      {
        "@type": "Person",
        name: "Dr. Usman Khattak",
        jobTitle: "Periodontist & Implantologist",
        worksFor: { "@id": `${SITE_URL}/#dentist` },
      },
      {
        "@type": "Person",
        name: "Dr. Ozair Shirazi",
        jobTitle: "Oral & Maxillofacial Surgeon",
        worksFor: { "@id": `${SITE_URL}/#dentist` },
      },
      {
        "@type": "Person",
        name: "Dr. Zain Iftikhar",
        jobTitle: "Prosthodontist · ITI Member",
        worksFor: { "@id": `${SITE_URL}/#dentist` },
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: reviewCount,
      reviewCount,
    },
    review: FALLBACK_GOOGLE_REVIEWS.reviews.slice(0, 5).map((review) => {
      const iso = toIsoDate(review.publishedAt);
      return {
        "@type": "Review",
        author: { "@type": "Person", name: review.author },
        ...(iso ? { datePublished: iso } : {}),
        reviewBody: review.text,
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1,
        },
      };
    }),
    potentialAction: [
      {
        "@type": "ReserveAction",
        name: "Book a dental appointment",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/#contact`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
        result: {
          "@type": "Reservation",
          name: "Dental consultation",
        },
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: ORA_PHONE_PRIMARY,
        contactType: "customer service",
        areaServed: "PK",
        availableLanguage: ["English", "Urdu"],
      },
    ],
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "ORA Dental Clinic Rawalpindi",
    url: SITE_URL,
    description: SITE_TAGLINE,
    inLanguage: "en-PK",
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: { "@id": `${SITE_URL}/#dentist` },
    copyrightHolder: { "@id": `${SITE_URL}/#organization` },
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    url: `${SITE_URL}/#faq`,
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
    "@id": `${SITE_URL}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildHomeBreadcrumbJsonLd() {
  return buildBreadcrumbJsonLd([{ name: "Home", path: "/" }]);
}

export function buildServicesItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#services`,
    name: "Dental services in Rawalpindi — ORA Dental Wellness",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: SERVICE_CATALOG.length,
    itemListElement: SERVICE_CATALOG.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      description: service.description,
      url: `${SITE_URL}/#treatments`,
    })),
  };
}

export function buildSpeakableJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    name: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    url: SITE_URL,
    inLanguage: "en-PK",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#dentist` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
      caption: DEFAULT_OG_IMAGE_ALT,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
    significantLink: [
      `${SITE_URL}/#doctors`,
      `${SITE_URL}/#treatments`,
      `${SITE_URL}/#contact`,
      `${SITE_URL}/#reviews`,
      `${SITE_URL}/#faq`,
    ],
    mainContentOfPage: {
      "@type": "WebPageElement",
      cssSelector: "#main",
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
    jsonLdScript(buildOrganizationJsonLd()),
    jsonLdScript(buildDentistJsonLd()),
    jsonLdScript(buildWebsiteJsonLd()),
    jsonLdScript(buildFaqJsonLd()),
    jsonLdScript(buildSpeakableJsonLd()),
    jsonLdScript(buildHomeBreadcrumbJsonLd()),
    jsonLdScript(buildServicesItemListJsonLd()),
  ];
}

export function pageJsonLdScripts(page: PageSeo, crumbName: string) {
  return [
    jsonLdScript(buildOrganizationJsonLd()),
    jsonLdScript(buildDentistJsonLd()),
    jsonLdScript(
      buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: crumbName, path: page.path },
      ]),
    ),
  ];
}

export function buildClinicTourVideoJsonLd() {
  const page = PAGE_SEO.clinicTour;
  const pageUrl = absoluteUrl(page.path);
  const contentUrl = absoluteUrl("/clinic_video_mobile.mp4");
  const thumbnailUrl = absoluteUrl("/clinic-video-poster.jpg");

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl}#video`,
    name: "ORA Dental Wellness clinic tour — Bahria Town Phase 4, Rawalpindi",
    description: page.description,
    thumbnailUrl: [thumbnailUrl],
    contentUrl,
    embedUrl: pageUrl,
    uploadDate: "2026-07-20",
    duration: "PT17S",
    inLanguage: "en",
    isFamilyFriendly: true,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/google-logo.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
      name: page.title,
      url: pageUrl,
      description: page.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    about: { "@id": `${SITE_URL}/#dentist` },
    contentLocation: {
      "@type": "Place",
      name: SITE_NAME,
      address: postalAddress(),
      geo: {
        "@type": "GeoCoordinates",
        latitude: ORA_GEO.latitude,
        longitude: ORA_GEO.longitude,
      },
    },
  };
}

export function clinicTourJsonLdScripts() {
  const page = PAGE_SEO.clinicTour;
  return [
    ...pageJsonLdScripts(page, "Clinic tour"),
    jsonLdScript(buildClinicTourVideoJsonLd()),
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": absoluteUrl(page.path),
      url: absoluteUrl(page.path),
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#dentist` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl("/clinic-video-poster.jpg"),
      },
      video: { "@id": `${absoluteUrl(page.path)}#video` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "main p"],
      },
    }),
  ];
}

export { ORA_ADDRESS_FULL, ORA_ADDRESS_LINES, ORA_MAPS_SHARE_URL };
