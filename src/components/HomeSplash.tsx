import { useEffect, useState } from "react";
import horizontalLogo from "@/assets/horizontal-logo-dark.webp";
import logoWhite from "@/assets/logo_white.webp";

type SplashPhase = "brand" | "tagline" | "exit";

/**
 * Brand intro splash.
 * Mobile: translucent logo overlay only — hero LCP poster stays visible underneath
 * (opaque splash was causing ~1.8s LCP element render delay + poor Speed Index).
 * Desktop: solid olive field (unchanged).
 */
export function HomeSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<SplashPhase>("brand");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    onComplete();

    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    const taglineAt = mobile ? 280 : 350;
    const exitAt = mobile ? 580 : 700;
    const doneAt = mobile ? 780 : 900;

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
      className={`splash-screen fixed inset-0 z-[100] flex flex-col items-center justify-center bg-transparent lg:bg-[#666d57] ${phase === "exit" ? "splash-fade-out" : ""}`}
      aria-hidden={phase === "exit"}
    >
      {/* Mobile: soft vignette only — must not fully obscure hero LCP */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[#4d5645]/40 lg:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#4d5645]/25 via-transparent to-[#4d5645]/55 lg:hidden"
      />

      <div className="grain absolute inset-0 hidden opacity-[0.08] lg:block" aria-hidden />

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="splash-brand-show flex flex-col items-center">
          <picture>
            <source media="(min-width: 1024px)" srcSet={horizontalLogo} />
            <img
              src={logoWhite}
              alt="ORA Dental Wellness"
              className="h-auto w-[min(200px,58vw)] drop-shadow-[0_8px_24px_rgba(26,28,24,0.35)] lg:w-[260px] lg:drop-shadow-none"
              width={212}
              height={64}
              decoding="async"
              fetchPriority="low"
            />
          </picture>
          <p className="mt-6 font-sans-tight text-[0.65rem] tracking-[0.22em] text-shoji/90 drop-shadow-sm md:text-xs lg:text-shoji/55 lg:drop-shadow-none">
            Dental Wellness
          </p>
        </div>

        <div className={`mt-6 flex flex-col items-center ${showRest ? "splash-rest-show" : "opacity-0"}`}>
          <div className="splash-divider h-px w-0 bg-shoji/50 splash-divider-show lg:bg-shoji/40" />
          <p className="mt-7 font-sans-tight text-[0.62rem] tracking-[0.26em] text-shoji drop-shadow-sm md:text-xs lg:text-shoji/85 lg:drop-shadow-none">
            Aligners · Implants · Dentistry
          </p>
        </div>
      </div>
    </div>
  );
}
