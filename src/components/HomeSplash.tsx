import { useEffect, useState } from "react";
import horizontalLogo from "@/assets/horizontal-logo-dark.webp";

type SplashPhase = "brand" | "tagline" | "exit";

/** Brand intro splash — same olive field + horizontal logo on mobile and desktop. */
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
      <div className="grain absolute inset-0 opacity-[0.08]" aria-hidden />

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="splash-brand-show flex flex-col items-center">
          <img
            src={horizontalLogo}
            alt="ORA Dental Wellness"
            className="h-auto w-[min(220px,60vw)] md:w-[260px]"
            width={360}
            height={110}
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
