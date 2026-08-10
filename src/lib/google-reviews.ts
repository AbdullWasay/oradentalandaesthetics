export type GoogleReview = {
  id: string;
  author: string;
  authorPhotoUrl: string | null;
  rating: number;
  text: string;
  publishedAt: string;
  authorUrl: string | null;
};

export type GoogleReviewsData = {
  rating: number;
  totalReviews: number;
  mapsUrl: string;
  writeReviewUrl: string;
  reviews: GoogleReview[];
  source: "google" | "fallback";
};

/** Shrink Google profile photos for avatar display (saves bandwidth on mobile). */
export function compactGooglePhotoUrl(url: string | null | undefined, size = 96): string | null {
  if (!url) return null;
  // Only rewrite the size token — keep the rest of Google's flags intact
  if (/=s\d+/i.test(url)) {
    return url.replace(/=s\d+/i, `=s${size}`);
  }
  if (/=w\d+-h\d+/i.test(url)) {
    return url.replace(/=w\d+-h\d+/i, `=w${size}-h${size}`);
  }
  return url;
}

/** Opens Google's "Write a review" flow for ORA Dental Wellness. */
export const GOOGLE_WRITE_REVIEW_URL =
  "https://www.google.com/search?sca_esv=537f0f8c76537249&rlz=1C5CHFA_enPK1186PK1186&sxsrf=APpeQnt7FxLoCQs876NY2tK8-kQc4rcz-g:1783151475420&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_1KxKv6c1uV3rcxYuzCBc2NMBYXP1uUp321oG-l7k-WyHijhm81BkMxUJd8Nw9mK0EPybxKNT3B-gVxI6e8wppa3ph0Pl-0LUqjHk_-7MHDodO0t6w%3D%3D&q=ORA+Dental+Wellness+Reviews&sa=X&ved=2ahUKEwiknpfyxLiVAxWqdaQEHY_gJd0Q0bkNegQIORAH&biw=1440&bih=812&dpr=2#lrd=0x38dfed8e72778f4b:0xdec0f601e0a8ed50,3,,,,";

/** Curated Google patient reviews (Places API only returns 5). */
export const CURATED_GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "curated-asma-sajid",
    author: "Asma Sajid",
    authorPhotoUrl: "https://lh3.googleusercontent.com/a-/ALV-UjWJukKKTBKh8z460NjQrHI7VXz0N-Wm2RPQxtibtlleNxxUjEtVwQ=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "I have been taking aligners treatment from Dr. Ahmed and Dr. Roha. Also got deep scaling done from Dr. Roha. Both are very cooperative and nice. Highly recommended for any dental procedure.",
    publishedAt: "2 July 2026",
    authorUrl: null,
  },
  {
    id: "curated-umama-aleem",
    author: "Umama Aleem",
    authorPhotoUrl: null,
    rating: 5,
    text: "I had my aligner treatment done with Dr. Ahmed, and the entire experience was smooth from start to finish. The team was informative, supportive, and guided me through every step of the process. They were always cooperative and made everything easy to understand. I've recommended them to my friends and family, and even my sister has started her treatment with them. Highly recommended!",
    publishedAt: "2 July 2026",
    authorUrl: null,
  },
  {
    id: "curated-abdul-basit",
    author: "Abdul Basit",
    authorPhotoUrl: "https://lh3.googleusercontent.com/a-/ALV-UjUYP3bCaz9B8Io_5ivZxLCRw6kW1KnVslwdzTzKqqglRlsoyWdo=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "I had a great experience at this dental clinic. The staff was welcoming, professional, and made me feel comfortable throughout the visit. The dentist explained everything clearly and took the time to answer my questions. The clinic was clean, well organized, and the treatment was handled with care. I really appreciated the attention to detail and overall patient experience. Highly recommended for anyone looking for quality dental care.",
    publishedAt: "2 July 2026",
    authorUrl: null,
  },
  {
    id: "curated-maham-munir",
    author: "Maham Munir",
    authorPhotoUrl: "https://lh3.googleusercontent.com/a-/ALV-UjU8L0jjfFrbICl0os4jzP4Q52OqNbGD_EsFemkZ_-RuRmLNCZA=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "I had an excellent experience at ORA Dental Wellness. I've visited the clinic 3–4 times for teeth scaling, a root canal treatment, and a dental crown, and every visit has been outstanding. Dr. Ahmad and Dr. Roha did an amazing job. They were extremely professional, gentle, and made me feel comfortable throughout every procedure. This has honestly been one of the best experiences I've ever had with a dentist. The staff is humble and welcoming, and the clinic is clean, comfortable, and well-maintained. Highly recommended for anyone looking for quality dental care.",
    publishedAt: "30 June 2026",
    authorUrl: null,
  },
  {
    id: "curated-nayab-aqeel",
    author: "Nayab Aqeel",
    authorPhotoUrl: null,
    rating: 5,
    text: "My visit to ORA Clinic with Dr Roha for scaling, polishing, and whitening was honestly such a pleasant experience. From the beginning, she was gentle, friendly, and very thorough in explaining the procedure, which made everything feel easy and stress-free. I'm loving my smile now and already looking forward to going back for aligners. The clinic is also super clean and beautifully designed, giving it such a calm and welcoming feel. Highly recommend ORA Dental Clinic for anyone looking for great dental care.",
    publishedAt: "29 June 2026",
    authorUrl: null,
  },
  {
    id: "curated-ayra-umer",
    author: "Ayra Umer",
    authorPhotoUrl: null,
    rating: 5,
    text: "I recently started my clear aligners treatment at ORA Dental Wellness, and the experience has been amazing. The doctors explained everything clearly, and the entire process has been smooth and comfortable. The clinic is modern, hygienic, and the staff is very professional. If you're looking for clear aligners, invisible braces, or smile correction in Rawalpindi and Islamabad, I highly recommend Dr Ahmed and Dr Roha at ORA Dental Wellness in Bahria Town Phase 4.",
    publishedAt: "29 June 2026",
    authorUrl: null,
  },
  {
    id: "curated-abdullah-gaming",
    author: "Abdullah Gaming",
    authorPhotoUrl: null,
    rating: 5,
    text: "Today visited ORA dental wellness. Excellent/healthy environment, competent doctors along with well trained staff with latest dental equipments.",
    publishedAt: "29 June 2026",
    authorUrl: null,
  },
  {
    id: "curated-suleman-khan",
    author: "Suleman Khan",
    authorPhotoUrl: "https://lh3.googleusercontent.com/a-/ALV-UjWGvRORAGUCp-el99zmfZhlQLxt9Xusho-MObVvQCYrE8m7dj3w=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Best dental clinic in the twin cities. Highly recommended.",
    publishedAt: "29 June 2026",
    authorUrl: null,
  },
  {
    id: "curated-bilal-ahmad",
    author: "Bilal Ahmad",
    authorPhotoUrl: null,
    rating: 5,
    text: "Neat and clean environment, best dental clinic in Rawalpindi / Islamabad, highly recommended.",
    publishedAt: "29 June 2026",
    authorUrl: null,
  },
  {
    id: "curated-abdulhaq-khan",
    author: "Abdulhaq Khan",
    authorPhotoUrl: null,
    rating: 5,
    text: "Best dental clinic in Bahria Town Phase 4.",
    publishedAt: "28 June 2026",
    authorUrl: null,
  },
  {
    id: "curated-aqeel-ahmed",
    author: "Aqeel Ahmed",
    authorPhotoUrl: null,
    rating: 5,
    text: "I visited ORA dental wellness today for scaling, polishing and crown cementation by Dr. Ahmed Sultan. I was happy to see that the clinic was very aesthetically maintained and the services were also excellent. In short I can say that it was a pleasant experience.",
    publishedAt: "27 June 2026",
    authorUrl: null,
  },
  {
    id: "curated-mohid-saleem",
    author: "Mohid Saleem",
    authorPhotoUrl: "https://lh3.googleusercontent.com/a-/ALV-UjUwvouxVDQtyrNCC1TYT7yyhbw2_ZQLqf_WckDhWPGOkN3tww17=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "The doctors are highly professional, and I am extremely satisfied with the treatment I received. Their expertise, care, and attention to detail were outstanding. I would highly recommend this clinic to anyone experiencing dental issues.",
    publishedAt: "27 June 2026",
    authorUrl: null,
  },
];

function hashId(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (Math.imul(31, hash) + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/** Authors to keep well apart on the orbits. */
const SPREAD_AUTHORS = ["asma sajid", "maham munir", "ayra umer"];

function authorMatches(author: string, target: string): boolean {
  const a = author.toLowerCase().trim();
  const t = target.toLowerCase().trim();
  return a === t || a.includes(t) || t.includes(a);
}

/** Place specific reviewers at evenly spaced slots so they are not clustered. */
function spreadSpecificAuthors(reviews: GoogleReview[]): GoogleReview[] {
  const special: GoogleReview[] = [];
  const rest: GoogleReview[] = [];

  for (const review of reviews) {
    const isSpecial = SPREAD_AUTHORS.some((name) => authorMatches(review.author, name));
    if (isSpecial) special.push(review);
    else rest.push(review);
  }

  if (special.length === 0) return reviews;

  // Asma, Maham, Ayra Umer — one on each orbit (indices 0, 1, 2 → orbits 0, 1, 2)
  special.sort((a, b) => {
    const ai = SPREAD_AUTHORS.findIndex((name) => authorMatches(a.author, name));
    const bi = SPREAD_AUTHORS.findIndex((name) => authorMatches(b.author, name));
    return ai - bi;
  });

  const result: (GoogleReview | null)[] = Array.from({ length: reviews.length }, () => null);

  special.forEach((review, i) => {
    result[i] = review;
  });

  let restIndex = 0;
  for (let i = special.length; i < result.length; i++) {
    result[i] = rest[restIndex++] ?? null;
  }

  return result.filter((review): review is GoogleReview => review !== null);
}

/** Mix photo and initials avatars so they are not clustered together. */
export function shuffleReviews(reviews: GoogleReview[]): GoogleReview[] {
  const withPhoto = reviews
    .filter((review) => Boolean(review.authorPhotoUrl))
    .sort((a, b) => hashId(a.id) - hashId(b.id));
  const withoutPhoto = reviews
    .filter((review) => !review.authorPhotoUrl)
    .sort((a, b) => hashId(a.id) - hashId(b.id));

  const mixed: GoogleReview[] = [];
  const max = Math.max(withPhoto.length, withoutPhoto.length);

  for (let i = 0; i < max; i++) {
    if (i < withPhoto.length) mixed.push(withPhoto[i]);
    if (i < withoutPhoto.length) mixed.push(withoutPhoto[i]);
  }

  return spreadSpecificAuthors(mixed);
}

/** Prefer live Google reviews (with profile photos), then curated ones. */
export function mergeGoogleReviews(
  live: GoogleReview[],
  curated: GoogleReview[] = CURATED_GOOGLE_REVIEWS,
): GoogleReview[] {
  const byAuthor = new Map<string, GoogleReview>();

  for (const review of live) {
    byAuthor.set(review.author.toLowerCase().trim(), review);
  }

  for (const review of curated) {
    const key = review.author.toLowerCase().trim();
    const existing = byAuthor.get(key);
    if (!existing) {
      byAuthor.set(key, review);
      continue;
    }
    // Attach curated Google photo when live entry has none
    if (!existing.authorPhotoUrl && review.authorPhotoUrl) {
      byAuthor.set(key, { ...existing, authorPhotoUrl: review.authorPhotoUrl });
    }
  }

  return shuffleReviews([...byAuthor.values()]);
}

/** Shown when the Places API is not configured or the request fails. */
export const FALLBACK_GOOGLE_REVIEWS: GoogleReviewsData = {
  rating: 5,
  totalReviews: 18,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=ORA+Dental+Wellness+Bahria+Town+Rawalpindi",
  writeReviewUrl: GOOGLE_WRITE_REVIEW_URL,
  source: "fallback",
  reviews: shuffleReviews(CURATED_GOOGLE_REVIEWS),
};

export function formatReviewCount(count: number): string {
  if (count >= 1000) {
    const thousands = count / 1000;
    return `${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}k+`;
  }
  return `${count}+`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function formatPublishDate(iso?: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "G";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

