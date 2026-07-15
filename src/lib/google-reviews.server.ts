import {
  FALLBACK_GOOGLE_REVIEWS,
  GOOGLE_WRITE_REVIEW_URL,
  formatPublishDate,
  mergeGoogleReviews,
  type GoogleReview,
  type GoogleReviewsData,
} from "@/lib/google-reviews";

const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // refresh every 6 hours
const CACHE_VERSION = 6;

type CacheEntry = {
  version: number;
  data: GoogleReviewsData;
  expiresAt: number;
};

let cache: CacheEntry | null = null;

type PlacesReview = {
  name?: string;
  rating?: number;
  publishTime?: string;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type PlacesDetailsResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
  error?: { message?: string; status?: string };
};

function getEnv(name: string): string | undefined {
  return process.env[name]?.trim() || undefined;
}

function mapReview(review: PlacesReview, index: number): GoogleReview | null {
  const text =
    review.text?.text?.trim() ||
    review.originalText?.text?.trim() ||
    "";

  if (!text) return null;

  const author = review.authorAttribution?.displayName?.trim() || "Google user";
  const publishedAt = formatPublishDate(review.publishTime);

  return {
    id: review.name ?? `google-review-${index}`,
    author,
    authorPhotoUrl: review.authorAttribution?.photoUri ?? null,
    rating: Math.min(5, Math.max(1, Math.round(review.rating ?? 5))),
    text,
    publishedAt: publishedAt || "Google review",
    authorUrl: review.authorAttribution?.uri ?? null,
  };
}

async function fetchFromPlacesApi(): Promise<GoogleReviewsData | null> {
  const apiKey = getEnv("GOOGLE_PLACES_API_KEY");
  const placeId = getEnv("GOOGLE_PLACE_ID");

  if (!apiKey || !placeId) return null;

  const placePath = placeId.startsWith("places/") ? placeId : `places/${placeId}`;
  const url = `https://places.googleapis.com/v1/${placePath}`;

  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
    },
  });

  const payload = (await response.json()) as PlacesDetailsResponse;

  if (!response.ok) {
    console.error(
      "[google-reviews] Places API error:",
      payload.error?.message ?? response.statusText,
    );
    return null;
  }

  const reviews = (payload.reviews ?? [])
    .map(mapReview)
    .filter((review): review is GoogleReview => review !== null)
    .slice(0, 5);

  if (!payload.rating && reviews.length === 0) return null;

  return {
    rating: payload.rating ?? FALLBACK_GOOGLE_REVIEWS.rating,
    totalReviews: payload.userRatingCount ?? FALLBACK_GOOGLE_REVIEWS.totalReviews,
    mapsUrl: payload.googleMapsUri ?? FALLBACK_GOOGLE_REVIEWS.mapsUrl,
    writeReviewUrl: GOOGLE_WRITE_REVIEW_URL,
    reviews: mergeGoogleReviews(reviews),
    source: "google",
  };
}

export async function loadGoogleReviews(): Promise<GoogleReviewsData> {
  if (cache && cache.version === CACHE_VERSION && cache.expiresAt > Date.now()) {
    return cache.data;
  }

  try {
    const live = await fetchFromPlacesApi();
    const data = live ?? FALLBACK_GOOGLE_REVIEWS;
    cache = { version: CACHE_VERSION, data, expiresAt: Date.now() + CACHE_TTL_MS };
    return data;
  } catch (error) {
    console.error("[google-reviews] Failed to load reviews:", error);
    if (cache?.version === CACHE_VERSION) return cache.data;
    return FALLBACK_GOOGLE_REVIEWS;
  }
}
