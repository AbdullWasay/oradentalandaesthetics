import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, PenLine, Star, X } from "lucide-react";
import {
  formatRating,
  formatReviewCount,
  type GoogleReview,
  type GoogleReviewsData,
} from "@/lib/google-reviews";
import { ReviewAvatar } from "@/components/ReviewAvatar";
import { useMediaQuery } from "@/hooks/use-media-query";

/** Slow shared angular speed for every face on every fixed orbit. */
const ORBIT_SPEED = 0.0022;

/**
 * Fixed concentric elliptical orbits (inner → outer).
 * Faces stay on these paths; start angle is random but spaced so they don’t pile up.
 */
const ORBITS = [
  { rx: 0.36, ry: 0.32 },
  { rx: 0.56, ry: 0.48 },
  { rx: 0.76, ry: 0.64 },
] as const;

/** Minimum angular gap (radians) between faces on the same orbit. */
const MIN_ORBIT_GAP = 0.55;

/** Soft screen-space push when faces from different orbits get too close (fraction of stage). */
const MIN_FACE_DIST = 0.14;

type OrbitAssignment = {
  id: string;
  orbitIndex: number;
  phase: number;
};

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (Math.imul(31, hash) + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Random orbit + spaced phases.
 * Same angular speed keeps gaps on a ring stable (no same-orbit collisions).
 */
function assignToOrbitsRandom(reviews: GoogleReview[]): OrbitAssignment[] {
  const buckets: string[][] = ORBITS.map(() => []);

  reviews.forEach((review) => {
    const h = hashString(review.id + review.author);
    buckets[h % ORBITS.length].push(review.id);
  });

  // Rebalance if one ring is overcrowded (harder to keep gaps)
  const maxPerOrbit = Math.ceil(reviews.length / ORBITS.length) + 1;
  for (let i = 0; i < ORBITS.length; i++) {
    while (buckets[i].length > maxPerOrbit) {
      const moved = buckets[i].pop();
      if (!moved) break;
      const target = buckets.reduce(
        (best, b, idx) => (b.length < buckets[best].length ? idx : best),
        0,
      );
      buckets[target].push(moved);
    }
  }

  const assignments: OrbitAssignment[] = [];

  buckets.forEach((ids, orbitIndex) => {
    if (ids.length === 0) return;
    const seed = hashString(ids.join("|") + String(orbitIndex));
    const rand = mulberry32(seed);
    const gap = Math.max(MIN_ORBIT_GAP, (Math.PI * 2) / ids.length);
    const base = rand() * Math.PI * 2;

    // Nearly even spacing with a small random jitter (clamped so they don’t overlap)
    const jitterMax = Math.min(0.12, gap * 0.2);
    ids.forEach((id, idx) => {
      const jitter = (rand() - 0.5) * 2 * jitterMax;
      assignments.push({
        id,
        orbitIndex,
        phase: base + idx * gap + jitter,
      });
    });
  });

  return assignments;
}

function GoogleMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
      />
    </svg>
  );
}

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-[#c4a35a] text-[#c4a35a]" : "text-foreground/15"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewsHeader({ data }: { data: GoogleReviewsData }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-3 font-sans-tight text-xs uppercase tracking-[0.22em] text-foreground/45">
        <GoogleMark className="h-4 w-4" />
        Google reviews
      </div>
      <h2 className="mt-6 font-display text-[clamp(2.75rem,6vw,5rem)] leading-[1.02] tracking-tight">
        Trusted by patients
        <br />
        <span className="italic text-foreground/50">who chose quieter care.</span>
      </h2>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-foreground/70">
        <Stars rating={Math.round(data.rating)} />
        <span className="font-display text-2xl tracking-tight text-foreground">
          {formatRating(data.rating)}
        </span>
        <span className="h-4 w-px bg-foreground/15" aria-hidden />
        <span className="font-sans-tight text-[11px] uppercase tracking-[0.18em] text-foreground/45">
          {formatReviewCount(data.totalReviews)} on Google
        </span>
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  onClose,
  showClose,
}: {
  review: GoogleReview;
  onClose?: () => void;
  showClose?: boolean;
}) {
  return (
    <div className="rounded-[1.5rem] border border-border/80 bg-background p-5 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.28)] sm:p-6 md:rounded-[1.75rem] md:p-8">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <ReviewAvatar review={review} className="h-12 w-12" active textClassName="text-lg" />
          <div>
            <div className="font-display text-xl leading-tight">{review.author}</div>
            <div className="mt-0.5 font-sans-tight text-[10px] uppercase tracking-[0.16em] text-foreground/45">
              {review.publishedAt}
            </div>
          </div>
        </div>
        {showClose && onClose ? (
          <button
            type="button"
            aria-label="Close review"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground/50"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <Stars rating={review.rating} className="mt-4" />

      <p className="mt-4 font-display text-lg leading-relaxed text-foreground/80 md:text-xl">
        “{review.text}”
      </p>
    </div>
  );
}

/** Tap-friendly carousel — review card + arrows only (no avatar strip). */
function MobileReviews({ reviews }: { reviews: GoogleReview[] }) {
  const [index, setIndex] = useState(0);
  const active = reviews[index] ?? reviews[0];

  const goTo = (next: number) => {
    setIndex((next + reviews.length) % reviews.length);
  };

  return (
    <div className="px-5 pb-10 lg:hidden">
      <div key={active.id} className="treatment-detail-enter">
        <ReviewCard review={active} />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => goTo(index - 1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/70"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="font-sans-tight text-[11px] tracking-[0.2em] text-foreground/45">
          {String(index + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          aria-label="Next review"
          onClick={() => goTo(index + 1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/70"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function DesktopOrbitReviews({ reviews, data }: { reviews: GoogleReview[]; data: GoogleReviewsData }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const timeRef = useRef(0);
  const pausedRef = useRef(false);
  const activeIdRef = useRef<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 1200, h: 640 });

  const [activeId, setActiveId] = useState<string | null>(null);
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  const assignments = useMemo(() => assignToOrbitsRandom(reviews), [reviews]);
  const assignmentById = useMemo(() => {
    const map = new Map<string, OrbitAssignment>();
    assignments.forEach((a) => map.set(a.id, a));
    return map;
  }, [assignments]);

  const active = useMemo(
    () => reviews.find((r) => r.id === activeId) ?? null,
    [reviews, activeId],
  );

  useEffect(() => {
    activeIdRef.current = activeId;
    pausedRef.current = activeId !== null;
  }, [activeId]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      sizeRef.current = {
        w: Math.max(rect.width, 320),
        h: Math.max(rect.height, 420),
      };
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;

    const tick = () => {
      if (!pausedRef.current) {
        timeRef.current += ORBIT_SPEED;
      }

      const { w, h } = sizeRef.current;
      const halfW = w / 2;
      const halfH = h / 2;
      const currentActive = activeIdRef.current;
      const t = timeRef.current;
      const minDist = Math.min(halfW, halfH) * MIN_FACE_DIST;

      const positions: { id: string; x: number; y: number; depth: number }[] = [];

      reviews.forEach((review) => {
        const slot = assignmentById.get(review.id);
        if (!slot) return;

        const orbit = ORBITS[slot.orbitIndex];
        const angle = t + slot.phase;
        positions.push({
          id: review.id,
          x: Math.cos(angle) * halfW * orbit.rx,
          y: Math.sin(angle) * halfH * orbit.ry,
          depth: (Math.sin(angle) + 1) / 2,
        });
      });

      // Soft repulsion across orbits so faces don’t stack visually
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < positions.length; i++) {
          for (let j = i + 1; j < positions.length; j++) {
            const a = positions[i];
            const b = positions[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.hypot(dx, dy) || 0.001;
            if (dist >= minDist) continue;
            const push = ((minDist - dist) / dist) * 0.5;
            const ox = dx * push;
            const oy = dy * push;
            a.x -= ox;
            a.y -= oy;
            b.x += ox;
            b.y += oy;
          }
        }
      }

      positions.forEach((pos) => {
        const node = nodeRefs.current[pos.id];
        if (!node) return;

        const scale = 0.78 + pos.depth * 0.28;
        const opacity = 0.58 + pos.depth * 0.42;
        const isActive = currentActive === pos.id;
        const finalScale = isActive ? scale * 1.08 : scale;

        node.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${finalScale})`;
        node.style.opacity = isActive ? "1" : String(opacity);
        node.style.zIndex = String(isActive ? 50 : Math.round(10 + pos.depth * 30));
      });

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [reviews, assignmentById]);

  const cancelClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    if (!canHover) return;
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setActiveId(null);
      closeTimerRef.current = null;
    }, 80);
  };

  const openReview = (id: string) => {
    cancelClose();
    setActiveId(id);
  };

  const toggleReview = (id: string) => {
    cancelClose();
    setActiveId((prev) => (prev === id ? null : id));
  };

  useEffect(() => () => cancelClose(), []);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId]);

  return (
    <div ref={stageRef} className="relative mt-2 hidden w-full lg:block">
      <div className="relative h-[min(85vh,800px)] w-full min-h-[560px]">
        {ORBITS.map((orbit, i) => (
          <div
            key={i}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-[50%] border border-foreground/[0.08]"
            style={{
              width: `${orbit.rx * 100}%`,
              height: `${orbit.ry * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-border/60 bg-background/85 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.28)] backdrop-blur-md md:h-44 md:w-44">
          <GoogleMark className="h-6 w-6 md:h-7 md:w-7" />
          <div className="mt-1.5 font-display text-3xl leading-none tracking-tight md:text-4xl">
            {formatRating(data.rating)}
          </div>
          <div className="mt-1 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-2.5 w-2.5 ${
                  i < Math.round(data.rating)
                    ? "fill-[#c4a35a] text-[#c4a35a]"
                    : "text-foreground/15"
                }`}
              />
            ))}
          </div>
        </div>

        {reviews.map((review) => {
          const isActive = activeId === review.id;
          return (
            <button
              key={review.id}
              ref={(el) => {
                nodeRefs.current[review.id] = el;
              }}
              type="button"
              aria-label={`Review by ${review.author}`}
              aria-expanded={isActive}
              className="absolute left-1/2 top-1/2 z-10 -ml-11 -mt-11 cursor-pointer border-0 bg-transparent p-0 will-change-transform md:-ml-12 md:-mt-12"
              onMouseEnter={canHover ? () => openReview(review.id) : undefined}
              onMouseLeave={canHover ? scheduleClose : undefined}
              onFocus={canHover ? () => openReview(review.id) : undefined}
              onBlur={canHover ? scheduleClose : undefined}
              onClick={() => (canHover ? openReview(review.id) : toggleReview(review.id))}
            >
              <ReviewAvatar
                review={review}
                active={isActive}
                className="h-[5.5rem] w-[5.5rem] md:h-24 md:w-24"
                textClassName="text-2xl md:text-3xl"
              />
            </button>
          );
        })}

        <div
          className={`absolute inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl transition-all duration-300 md:inset-x-auto md:bottom-10 md:left-1/2 md:w-[min(680px,92vw)] md:-translate-x-1/2 ${
            active
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0"
          }`}
          onMouseEnter={canHover ? cancelClose : undefined}
          onMouseLeave={canHover ? scheduleClose : undefined}
        >
          {active && (
            <ReviewCard review={active} showClose={!canHover} onClose={() => setActiveId(null)} />
          )}
        </div>
      </div>
    </div>
  );
}

type GoogleReviewsProps = {
  data: GoogleReviewsData;
};

export function GoogleReviews({ data }: GoogleReviewsProps) {
  const reviews = data.reviews;

  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="relative scroll-mt-24 bg-background lg:overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-24 lg:px-10 lg:pt-32">
        <ReviewsHeader data={data} />
      </div>

      <div className="mt-10 lg:mt-2">
        <MobileReviews reviews={reviews} />
        <DesktopOrbitReviews reviews={reviews} data={data} />
      </div>

      <div className="relative mx-auto flex max-w-7xl justify-center px-6 pb-6 lg:px-10">
        <a
          href={data.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-sans-tight text-xs uppercase tracking-[0.18em] text-foreground/45 transition-colors hover:text-foreground"
        >
          All reviews on Google <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-secondary/40 px-8 py-12 md:px-14 md:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 font-sans-tight text-xs uppercase tracking-[0.2em] text-[#666d57]">
                <PenLine className="h-4 w-4" />
                Your turn
              </div>
              <h3 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
                Experienced ORA?
                <span className="italic text-foreground/55"> Leave a review.</span>
              </h3>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <a
                href={data.writeReviewUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[#666d57] px-8 py-4 font-sans-tight text-background transition-all hover:gap-4 hover:bg-[#666d57]/90"
              >
                Leave a review
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
