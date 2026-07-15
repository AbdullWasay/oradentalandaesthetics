import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import case1Before from "@/assets/cases/case-1-before.png";
import case1After from "@/assets/cases/case-1-after.png";
import case2Before from "@/assets/cases/case-2-before.png";
import case2After from "@/assets/cases/case-2-after.png";
import case3Before from "@/assets/cases/case-3-before.png";
import case3After from "@/assets/cases/case-3-after.png";

type CaseStudy = {
  id: string;
  title: string;
  before: string;
  after: string;
};

const CASES: CaseStudy[] = [
  {
    id: "case-1",
    title: "Smile Makeover",
    before: case1Before,
    after: case1After,
  },
  {
    id: "case-2",
    title: "Anterior Restoration",
    before: case2Before,
    after: case2After,
  },
  {
    id: "case-3",
    title: "Gap Closure",
    before: case3Before,
    after: case3After,
  },
];

function BeforeAfterSlider({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(52);
  const labelId = useId();

  const updateFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(92, Math.max(8, next)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={frameRef}
      className="relative aspect-[16/10] touch-none select-none overflow-hidden bg-[#1a1c18]"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        updateFromClientX(e.clientX);
      }}
    >
      <img
        src={after}
        alt={`${title} — after`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${title} — before`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Soft edge fade on the wipe */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/25 to-transparent"
        style={{ left: `${pos}%` }}
      />

      <div
        className="absolute inset-y-0 z-10 w-px bg-[#f5f1eb]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <button
          type="button"
          aria-labelledby={labelId}
          aria-valuemin={8}
          aria-valuemax={92}
          aria-valuenow={Math.round(pos)}
          role="slider"
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#4d5645]/20 bg-[#f5f1eb] text-[#4d5645] shadow-[0_8px_28px_-10px_rgba(0,0,0,0.45)] transition-transform hover:scale-105 active:scale-95"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(8, p - 3));
            if (e.key === "ArrowRight") setPos((p) => Math.min(92, p + 3));
          }}
        >
          <ChevronsLeftRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>

      <span
        className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#1a1c18]/80 px-3 py-1 font-sans-tight text-[9px] uppercase tracking-[0.2em] text-[#f5f1eb] backdrop-blur-sm"
      >
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-[#666d57]/95 px-3 py-1 font-sans-tight text-[9px] uppercase tracking-[0.2em] text-[#f5f1eb]">
        After
      </span>

      <span id={labelId} className="sr-only">
        Drag to compare before and after for {title}
      </span>
    </div>
  );
}

export function CasesSection() {
  return (
    <section
      id="results"
      className="relative scroll-mt-24 overflow-hidden border-y border-border/50 bg-[#faf8f4]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#666d57]/[0.05] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-[#4d5645]/[0.04] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="max-w-2xl">
          <SectionLabel>Real results</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight md:text-5xl">
            Smile transformations{" "}
            <span className="italic text-[#666d57]">from our patients.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[1.05rem] font-light leading-relaxed text-foreground/65">
            Drag each slider to compare before and after. Individual results may
            vary.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {CASES.map((c) => (
            <article key={c.id} className="group flex flex-col">
              <div className="overflow-hidden rounded-[1.15rem] border border-[#4d5645]/10 bg-background shadow-[0_20px_50px_-32px_rgba(77,86,69,0.45)]">
                <BeforeAfterSlider
                  before={c.before}
                  after={c.after}
                  title={c.title}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
