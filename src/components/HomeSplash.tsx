import { useEffect, useState } from "react";
import horizontalLogo from "@/assets/horizontal-logo-dark.webp";

type SplashPhase = "brand" | "tagline" | "exit";

/**
 * Desktop brand intro only.
 * Mobile skips splash to avoid LCP/Speed Index delay and layout shift.
 */
export function HomeSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<SplashPhase>("brand");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    onComplete();

    if (window.matchMedia("(max-width: 1023px)").matches) {
      setVisible(false);
      return;
    }

    const taglineTimer = window.setTimeout(() => setPhase("tagline"), 350);
    const exitTimer = window.setTimeout(() => setPhase("exit"), 700);
    const doneTimer = window.setTimeout(() => setVisible(false), 900);

    return () => {
      window.clearTimeout(taglineTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  // Don't SSR-paint splash on first HTML for mobile crawlers: hide until we know desktop
  // Desktop: visible from first paint via lg styles; mobile: null after effect (and CSS lg-only)
  if (!visible) return null;

  const showRest = phase === "tagline" || phase === "exit";

  return (
    <div
      className={`splash-screen fixed inset-0 z-[100] hidden flex-col items-center justify-center bg-[#666d57] lg:flex ${phase === "exit" ? "splash-fade-out" : ""}`}
      aria-hidden={phase === "exit"}
    >
      <div className="grain absolute inset-0 opacity-[0.08]" aria-hidden />

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="splash-brand-show flex flex-col items-center">
          <img
            src={horizontalLogo}
            alt="ORA Dental Wellness"
            className="h-auto w-[260px]"
            width={260}
            height={64}
            decoding="async"
            fetchPriority="low"
          />
          <p className="mt-6 font-sans-tight text-[0.65rem] tracking-[0.22em] text-shoji/55 md:text-xs">
            Dental Wellness
          </p>
        </div>

        <div className={`mt-6 flex flex-col items-center ${showRest ? "splash-rest-show" : "opacity-0"}`}>
          <div className="splash-divider h-px w-0 bg-shoji/40 splash-divider-show" />
          <p className="mt-7 font-sans-tight text-[0.62rem] tracking-[0.26em] text-shoji/85 md:text-xs">
            Aligners · Implants · Dentistry
          </p>
        </div>
      </div>
    </div>
  );
}
