import { useEffect, useState } from "react";
import horizontalLogo from "@/assets/horizontal-logo-dark.webp";

type SplashPhase = "brand" | "tagline" | "exit";

export function HomeSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<SplashPhase>("brand");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Reveal hero immediately under splash so LCP can paint without waiting
    onComplete();

    const taglineTimer = window.setTimeout(() => setPhase("tagline"), 700);
    const exitTimer = window.setTimeout(() => setPhase("exit"), 1250);
    const doneTimer = window.setTimeout(() => setVisible(false), 1650);

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
      className={`splash-screen fixed inset-0 z-[100] flex flex-col items-center justify-center ${phase === "exit" ? "splash-fade-out" : ""}`}
      style={{ backgroundColor: "#666d57" }}
      aria-hidden={phase === "exit"}
    >
      <div className="grain absolute inset-0 opacity-[0.08]" aria-hidden />

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="splash-brand-show flex flex-col items-center">
          <img
            src={horizontalLogo}
            alt="ORA Dental Wellness"
            className="h-auto w-[min(220px,60vw)] md:w-[260px]"
            width={440}
            height={134}
            decoding="async"
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
