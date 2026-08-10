import { useEffect, useState } from "react";
import horizontalLogo from "@/assets/horizontal-logo-dark.webp";
import logoWhite from "@/assets/logo_white.webp";
import heroMobilePoster from "@/assets/home-poster-mobile.webp";

type SplashPhase = "brand" | "tagline" | "exit";

/**
 * Brand intro splash.
 * Mobile keeps a short branded intro; poster is a CSS background (not a competing
 * <img fetchpriority=high>) so desktop LCP is not starved by the mobile asset.
 */
export function HomeSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<SplashPhase>("brand");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    onComplete();

    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    const taglineAt = mobile ? 320 : 350;
    const exitAt = mobile ? 650 : 700;
    const doneAt = mobile ? 850 : 900;

    const taglineTimer = window.setTimeout(() => setPhase("tagline"), taglineAt);
    const exitTimer = window.setTimeout(() => setPhase("exit"), exitAt);
    const doneTimer = window.setTimeout(() => setVisible(false), doneAt);

    return () => {
      window.clearTimeout(taglineTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (!visible) return null;

  const showRest = phase === "tagline" || phase === "exit";

  return (
    <div
      className={`splash-screen fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#666d57] ${phase === "exit" ? "splash-fade-out" : ""}`}
      aria-hidden={phase === "exit"}
    >
      {/* Mobile only: CSS background — browsers skip this when display:none on lg */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-[center_28%] lg:hidden"
        style={{ backgroundImage: `url(${heroMobilePoster})` }}
      />
      <div aria-hidden className="absolute inset-0 bg-[#4d5645]/70 lg:hidden" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#4d5645]/35 via-transparent to-[#4d5645]/80 lg:hidden"
      />

      <div className="grain absolute inset-0 hidden opacity-[0.08] lg:block" aria-hidden />

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="splash-brand-show flex flex-col items-center">
          {/* One logo per viewport — avoid downloading both */}
          <picture>
            <source media="(min-width: 1024px)" srcSet={horizontalLogo} />
            <img
              src={logoWhite}
              alt="ORA Dental Wellness"
              className="h-auto w-[min(200px,58vw)] lg:w-[260px]"
              width={212}
              height={64}
              decoding="async"
              fetchPriority="low"
            />
          </picture>
          <p className="mt-6 font-sans-tight text-[0.65rem] tracking-[0.22em] text-shoji/70 md:text-xs lg:text-shoji/55">
            Dental Wellness
          </p>
        </div>

        <div className={`mt-6 flex flex-col items-center ${showRest ? "splash-rest-show" : "opacity-0"}`}>
          <div className="splash-divider h-px w-0 bg-shoji/40 splash-divider-show" />
          <p className="mt-7 font-sans-tight text-[0.62rem] tracking-[0.26em] text-shoji/90 md:text-xs lg:text-shoji/85">
            Aligners · Implants · Dentistry
          </p>
        </div>
      </div>
    </div>
  );
}
