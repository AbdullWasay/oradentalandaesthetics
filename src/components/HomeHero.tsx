import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import heroDesktop from "@/assets/her-section-bg.webp";
import heroMobilePoster from "@/assets/home-poster.webp";
import { useMediaQuery } from "@/hooks/use-media-query";
import { formatRating, formatReviewCount, type GoogleReviewsData } from "@/lib/google-reviews";

type HomeHeroProps = {
  ready: boolean;
  reviews?: GoogleReviewsData;
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Mobile — clinic video atmosphere behind centered copy + social proof.
 * iOS Low Power Mode blocks autoplay; we fall back to a still (never show the native ▶).
 */
function MobileHero({ ready, reviews }: { ready: boolean; reviews?: GoogleReviewsData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const avatars =
    reviews?.reviews.filter((r) => r.authorPhotoUrl).slice(0, 4) ?? [];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.controls = false;
    video.disablePictureInPicture = true;

    const markPlaying = () => setVideoPlaying(true);
    const markStopped = () => setVideoPlaying(false);

    const tryPlay = () => {
      video.muted = true;
      const result = video.play();
      if (result && typeof result.then === "function") {
        result.then(markPlaying).catch(markStopped);
      }
    };

    tryPlay();
    video.addEventListener("playing", markPlaying);
    video.addEventListener("pause", markStopped);
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    // First user gesture unlocks playback even under Low Power Mode on some iOS versions
    const unlock = () => tryPlay();
    document.addEventListener("touchstart", unlock, { once: true, passive: true });
    document.addEventListener("click", unlock, { once: true });

    return () => {
      video.removeEventListener("playing", markPlaying);
      video.removeEventListener("pause", markStopped);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", unlock);
    };
  }, [reducedMotion]);

  return (
    <section
      className={`relative flex h-[calc(100svh-7.75rem)] min-h-[520px] max-h-[720px] flex-col overflow-hidden bg-[#f5f1eb] lg:hidden ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Still always under the video — visible when iOS blocks autoplay */}
        <img
          src={heroMobilePoster}
          alt="ORA Dental Wellness clinic interior in Bahria Town Phase 4, Rawalpindi"
          className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
          width={1080}
          height={1440}
          fetchPriority="high"
          decoding="async"
        />
        {!reducedMotion ? (
          <video
            ref={videoRef}
            className={`hero-mobile-video absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-500 ${
              videoPlaying ? "opacity-100" : "opacity-0"
            }`}
            src="/clinic_video_mobile.mp4?v=3"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
          />
        ) : null}
        <div className="absolute inset-0 bg-[#f5f1eb]/55" />
        <div className="absolute inset-0 bg-[#4d5645]/18 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f1eb]/70 via-[#f5f1eb]/45 to-[#f5f1eb]/85" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-10 pt-8">
        <div className="flex items-center justify-center gap-2.5">
          <span className="h-px w-8 bg-[#666d57]/40" />
          <p className="font-sans-tight text-[9px] uppercase tracking-[0.3em] text-[#666d57]">
            Bahria Town · Rawalpindi
          </p>
          <span className="h-px w-8 bg-[#666d57]/40" />
        </div>

        {/* Document H1 lives in DesktopHero; mobile uses visual headline only */}
        <p
          data-speakable
          className="mx-auto mt-6 max-w-[20rem] text-center font-display text-[clamp(2.4rem,9.5vw,3.1rem)] font-light leading-[1.06] tracking-tight text-[#4d5645]"
        >
          Every detail,
          <br />
          crafted for{" "}
          <span className="italic text-[#666d57]">your smile.</span>
        </p>

        <p
          data-speakable
          className="mx-auto mt-4 max-w-[20rem] text-center text-[0.98rem] font-light leading-relaxed text-[#70796b]"
        >
          Experience dentistry that blends clinical precision with exceptional comfort
          at ORA Dental Wellness — your dentist in Bahria Town Phase 4, Rawalpindi.
        </p>

            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
              className="group mx-auto mt-7 flex w-full max-w-sm items-center justify-center gap-2.5 rounded-full bg-[#4d5645] px-6 py-4 font-sans-tight text-[11px] tracking-[0.16em] text-[#f5f1eb] shadow-[0_18px_48px_-16px_rgba(77,86,69,0.55)] transition-all active:scale-[0.98] active:bg-[#666d57]"
            >
              Book a visit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>

        {reviews && (
          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {avatars.map((r) => (
                <img
                  key={r.author}
                  src={r.authorPhotoUrl!}
                  alt={`${r.author}, Google review for ORA Dental Wellness`}
                  className="h-9 w-9 rounded-full border-2 border-[#f5f1eb] object-cover shadow-sm"
                  width={36}
                  height={36}
                  loading="lazy"
                  decoding="async"
                />
              ))}
              {avatars.length < 4 && (
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f5f1eb] bg-[#666d57]/15">
                  <Star className="h-3.5 w-3.5 fill-[#666d57] text-[#666d57]" />
                </span>
              )}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[#666d57] text-[#666d57]" />
                ))}
              </div>
              <p className="mt-0.5 font-sans-tight text-[10px] tracking-[0.06em] text-[#70796b]">
                {formatRating(reviews.rating)} · {formatReviewCount(reviews.totalReviews)} Google reviews
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Desktop — full-bleed reception photograph + olive copy plane. */
function DesktopHero({ ready }: { ready: boolean }) {
  const loadDesktopMedia = useMediaQuery("(min-width: 1024px)");

  return (
    <section className="relative hidden min-h-[min(calc(100dvh-11.25rem),740px)] overflow-hidden bg-[#666d57] lg:block">
      {loadDesktopMedia ? (
        <img
          src={heroDesktop}
          alt="ORA Dental Wellness reception desk and waiting area in Bahria Town Phase 4, Rawalpindi"
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-center ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          width={1750}
          height={899}
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
        />
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#4d5645]/25 via-transparent to-transparent"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl px-10 pt-11 pb-[5.5rem] lg:pt-[3.25rem] lg:pb-[6.5rem]">
        <div
          className={`max-w-2xl text-[#f5f1eb] ${ready ? "opacity-100" : "opacity-0"}`}
        >
            <div className="flex items-center gap-3 font-sans-tight text-[#f5f1eb]/80">
            <span className="h-px w-8 bg-[#f5f1eb]/70" />
            Dentist in Rawalpindi · Bahria Town
          </div>

          <h1
            data-speakable
            className="mt-8 font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-tight text-[#f5f1eb]"
          >
            Every detail,
            <br />
            crafted for
            <span className="italic text-[#f5f1eb]/90"> your</span>
            <br />
            <span className="italic text-[#f5f1eb]/90"> smile.</span>
          </h1>

          <p
            data-speakable
            className="mt-8 max-w-lg text-lg leading-relaxed text-[#f5f1eb]/85"
          >
            Experience dentistry that blends clinical precision with exceptional comfort at ORA Dental
            Wellness — a calm dentist practice in Bahria Town Phase 4, Rawalpindi.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
              className="group inline-flex items-center gap-3 rounded-full bg-[#f5f1eb] px-7 py-4 font-sans-tight text-[#4d5645] transition-all hover:gap-4 hover:bg-[#f5f1eb]/95"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/#treatments"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("treatments");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#f5f1eb]/55 px-7 py-4 font-sans-tight text-[#f5f1eb] transition-colors hover:border-[#f5f1eb]"
            >
              Our treatments
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeHero({ ready, reviews }: HomeHeroProps) {
  return (
    <>
      <MobileHero ready={ready} reviews={reviews} />
      <DesktopHero ready={ready} />
    </>
  );
}
