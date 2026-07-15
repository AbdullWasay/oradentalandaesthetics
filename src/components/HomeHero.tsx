import { ArrowRight } from "lucide-react";
import heroDesktop from "@/assets/reception-ediited-dark.png";
import heroMobile from "@/assets/home.png";

type HomeHeroProps = {
  ready: boolean;
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Mobile — editorial quiet-luxury.
 * Photo plane + cream dock blended as one composition (still fully readable).
 */
function MobileHero({ ready }: { ready: boolean }) {
  return (
    <section className="relative overflow-hidden bg-[#f5f1eb] lg:hidden">
      {/* Photography */}
      <div
        className={`relative h-[min(52svh,420px)] overflow-hidden ${
          ready ? "hero-image-ready" : "opacity-0"
        }`}
      >
        <img
          src={heroMobile}
          alt="ORA Dental Wellness reception in Bahria Town Phase 4, Rawalpindi"
          className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
          width={1080}
          height={1920}
          fetchPriority="high"
        />
        {/* Soft atmospheric fade into the copy dock */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f5f1eb] via-[#f5f1eb]/80 to-transparent"
        />
        {/* Thin brand hairline */}
        <div
          aria-hidden
          className="absolute inset-x-6 top-5 flex items-center gap-3"
        >
          <span className="h-px flex-1 bg-[#f5f1eb]/55" />
          <span className="font-sans-tight text-[9px] uppercase tracking-[0.32em] text-[#f5f1eb]/90 drop-shadow-sm">
            ORA
          </span>
          <span className="h-px flex-1 bg-[#f5f1eb]/55" />
        </div>
      </div>

      {/* Copy dock */}
      <div
        className={`relative z-10 -mt-10 px-6 pb-12 ${
          ready ? "hero-content-ready" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-[#666d57]" />
          <p className="font-sans-tight text-[10px] uppercase tracking-[0.28em] text-[#666d57]">
            Bahria Town · Rawalpindi
          </p>
        </div>

        <h1
          data-speakable
          className="mt-5 w-full max-w-md font-display text-[clamp(2.35rem,9.5vw,3.1rem)] font-light leading-[1.08] tracking-tight text-[#4d5645]"
        >
          Every detail, crafted for
          <br />
          <span className="italic text-[#666d57]">your smile.</span>
        </h1>

        <p
          data-speakable
          className="mt-5 max-w-[22rem] text-[1.02rem] font-light leading-relaxed text-[#70796b]"
        >
          Clinical precision with exceptional comfort — quiet-luxury dental wellness
          in Bahria Paradise Commercial.
        </p>

        <div className="mt-8">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("contact");
            }}
            className="group inline-flex w-full items-center justify-center gap-2.5 bg-[#4d5645] px-6 py-4 font-sans-tight text-[11px] tracking-[0.16em] text-[#f5f1eb] transition-colors active:bg-[#666d57]"
          >
            Book a consultation
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/** Desktop — cinematic full-bleed with darkened reception. */
function DesktopHero({ ready }: { ready: boolean }) {
  return (
    <section className="relative hidden min-h-[min(88vh,820px)] overflow-hidden bg-[#666d57] lg:block">
      <img
        src={heroDesktop}
        alt="ORA Dental Wellness reception desk and waiting area in Bahria Town Phase 4, Rawalpindi"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-center ${
          ready ? "hero-image-ready" : "opacity-0"
        }`}
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl px-10 pt-20 pb-28">
        <div
          className={`max-w-2xl text-[#f5f1eb] ${ready ? "hero-content-ready" : "opacity-0"}`}
        >
          <div className="flex items-center gap-3 font-sans-tight text-[#f5f1eb]/80">
            <span className="h-px w-8 bg-[#f5f1eb]/70" />
            Bahria Town · Rawalpindi
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
            Wellness in Bahria Town Phase 4, Rawalpindi.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
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
              href="#treatments"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("treatments");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#f5f1eb]/55 px-7 py-4 font-sans-tight text-[#f5f1eb] transition-colors hover:border-[#f5f1eb]"
            >
              Our Treatments
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeHero({ ready }: HomeHeroProps) {
  return (
    <>
      <MobileHero ready={ready} />
      <DesktopHero ready={ready} />
    </>
  );
}
