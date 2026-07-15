import { useEffect, useRef, useState } from "react";
import {
  PreventiveIcon,
  RestorativeIcon,
  EndodonticsIcon,
  ExtractionIcon,
  GumCareIcon,
  EmergencyIcon,
  PediatricIcon,
  CosmeticIcon,
  OralHealthIcon,
  DiagnosticIcon,
  type DentalIconComponent,
} from "@/components/DentalIcons";
import smileTeeth from "@/assets/smile-teeth.png";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TreatmentCategory = {
  icon: DentalIconComponent;
  num: string;
  title: string;
  short: string;
  items: string[];
};

export const treatmentCategories: TreatmentCategory[] = [
  {
    icon: PreventiveIcon,
    num: "01",
    title: "Preventive Dentistry",
    short: "Preventive",
    items: [
      "Dental Check-ups & Oral Examinations",
      "Professional Teeth Cleaning (Scaling & Polishing)",
      "Fluoride Treatment",
      "Dental Sealants",
      "Digital Dental X-rays",
      "Preventive Care & Oral Hygiene Education",
    ],
  },
  {
    icon: RestorativeIcon,
    num: "02",
    title: "Restorative Dentistry",
    short: "Restorative",
    items: [
      "Tooth-Colored Fillings (Composite Fillings)",
      "Dental Bonding",
      "Crowns",
      "Bridges",
      "Inlays & Onlays",
      "Denture Repairs & Relining",
    ],
  },
  {
    icon: EndodonticsIcon,
    num: "03",
    title: "Endodontics",
    short: "Endodontics",
    items: ["Root Canal Treatment (RCT)", "Root Canal Retreatment", "Pulp Capping"],
  },
  {
    icon: ExtractionIcon,
    num: "04",
    title: "Tooth Extractions",
    short: "Extractions",
    items: [
      "Simple Tooth Extraction",
      "Surgical Tooth Extraction",
      "Wisdom Tooth Evaluation",
      "Emergency Tooth Removal",
    ],
  },
  {
    icon: GumCareIcon,
    num: "05",
    title: "Gum Care",
    short: "Gum care",
    items: [
      "Scaling & Root Planing (Deep Cleaning)",
      "Gingivitis Treatment (Gingivectomy)",
      "Periodontal Maintenance",
      "Gum Infection Management",
    ],
  },
  {
    icon: EmergencyIcon,
    num: "06",
    title: "Emergency Dental Care",
    short: "Emergency",
    items: [
      "Toothache Relief",
      "Broken or Chipped Tooth Repair",
      "Lost Filling or Crown Replacement",
      "Swelling & Infection Treatment",
      "Emergency Extractions",
    ],
  },
  {
    icon: PediatricIcon,
    num: "07",
    title: "Pediatric General Dentistry",
    short: "Pediatric",
    items: [
      "Children's Dental Check-ups",
      "Children's Teeth Cleaning",
      "Fluoride Applications",
      "Dental Sealants for Children",
      "Baby Tooth Fillings",
      "Space Maintainers",
    ],
  },
  {
    icon: CosmeticIcon,
    num: "08",
    title: "Minor Restorative & Cosmetic",
    short: "Cosmetic",
    items: [
      "Tooth Contouring & Reshaping",
      "Diastema (Gap) Bonding",
      "Temporary Crowns",
      "Temporary Fillings",
      "Enameloplasty",
      "Gingivectomy"
    ],
  },
  {
    icon: OralHealthIcon,
    num: "09",
    title: "Oral Health Services",
    short: "Oral health",
    items: [
      "Bad Breath (Halitosis) Treatment",
      "Tooth Sensitivity Treatment",
      "Night Guards for Teeth Grinding (Bruxism)",
      "Mouth Guards for Sports",
    ],
  },
  {
    icon: DiagnosticIcon,
    num: "10",
    title: "Diagnostic Services",
    short: "Diagnostics",
    items: [
      "Comprehensive Oral Examination",
      "Digital X-rays",
      "Treatment Planning & Consultation",
    ],
  },
];

export const services = [
  { title: "Dental Check-up & Consultation" },
  { title: "Teeth Cleaning (Scaling & Polishing)" },
  { title: "Tooth-Colored Fillings" },
  { title: "Root Canal Treatment" },
  { title: "Tooth Extractions" },
  { title: "Crowns & Bridges" },
  { title: "Dentures" },
  { title: "Gum Disease Treatment" },
  { title: "Children's Dentistry" },
  { title: "Emergency Dental Care" },
  { title: "Digital X-rays" },
  { title: "Preventive Dental Care" },
];

const NAV_TOP_REM = "4.5rem"; // match sticky header (~72px)
const NAV_TOP_PX = 72;
const SCROLL_STEP = "48vh";
const LAST_STEP_COMPLETE_H = "48vh";
const CONTENT_STICKY_PX = 72;

function panelStickScrollY(panel: HTMLElement) {
  return panel.getBoundingClientRect().top + window.scrollY - CONTENT_STICKY_PX;
}

function computeScrollState(panels: HTMLElement[], completionPanel: HTMLElement | null) {
  const count = panels.length;
  if (count === 0) return { active: 0, progress: 0, segmentT: 0, scrollPosition: 0 };

  let active = 0;
  for (let i = 0; i < count; i++) {
    if (panels[i].getBoundingClientRect().top <= CONTENT_STICKY_PX + 2) {
      active = i;
    }
  }

  let segmentT = 0;
  if (active < count - 1) {
    const startY = panelStickScrollY(panels[active]);
    const endY = panelStickScrollY(panels[active + 1]);
    segmentT = (window.scrollY - startY) / Math.max(endY - startY, 1);
    segmentT = Math.min(Math.max(segmentT, 0), 1);
  } else {
    const startY = panelStickScrollY(panels[active]);
    const endY = completionPanel
      ? panelStickScrollY(completionPanel)
      : startY + panels[active].offsetHeight;
    segmentT = (window.scrollY - startY) / Math.max(endY - startY, 1);
    segmentT = Math.min(Math.max(segmentT, 0), 1);
  }

  const progress = Math.min((active + segmentT) / count, 1);
  return { active, progress, segmentT, scrollPosition: active + segmentT };
}

function TreatmentsHeading({
  className = "",
  tone = "onOlive",
}: {
  className?: string;
  tone?: "onOlive" | "onCream";
}) {
  const isOlive = tone === "onOlive";
  return (
    <div className={`${className}`}>
      <p
        className={`font-sans-tight text-[10px] uppercase tracking-[0.36em] ${
          isOlive ? "text-[#d8cdc3]/80" : "text-[#666d57]/75"
        }`}
      >
        Treatments
      </p>
      <h2
        className={`mt-3 max-w-md font-display text-[clamp(1.85rem,3.2vw,2.4rem)] font-light leading-[1.05] tracking-tight ${
          isOlive ? "text-[#f5f1eb]" : "text-[#4d5645]"
        }`}
      >
        Ten disciplines.
        <span className={`mt-1 block italic ${isOlive ? "text-[#eae2d6]" : "text-[#70796b]"}`}>
          One quiet standard.
        </span>
      </h2>
    </div>
  );
}

function SmileProgress({ progress }: { progress: number }) {
  const [smooth, setSmooth] = useState(progress);
  const smoothRef = useRef(progress);
  const frameRef = useRef(0);

  useEffect(() => {
    const tick = () => {
      const current = smoothRef.current;
      const next = current + (progress - current) * 0.08;
      if (Math.abs(progress - next) < 0.0008) {
        smoothRef.current = progress;
        setSmooth(progress);
        return;
      }
      smoothRef.current = next;
      setSmooth(next);
      frameRef.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [progress]);

  const t = Math.min(1, Math.max(0, smooth));
  const s = t * t * (3 - 2 * t);
  // Upper completes first (L→R), then lower (R→L)
  const upperT = Math.min(1, s / 0.48);
  const lowerT = Math.min(1, Math.max(0, (s - 0.5) / 0.5));

  const feather = 12;
  const u = upperT * 100;
  const l = lowerT * 100;

  // Upper: left → right
  const upperMask = `linear-gradient(90deg, #000 0%, #000 ${Math.max(0, u - feather)}%, transparent ${Math.min(100, u + feather)}%)`;
  // Lower: right → left
  const lowerMask = `linear-gradient(90deg, transparent ${Math.max(0, 100 - l - feather)}%, #000 ${Math.min(100, 100 - l + feather)}%, #000 100%)`;

  return (
    <div className="pointer-events-none absolute left-1/2 top-[48%] z-0 h-[30%] w-[44%] -translate-x-1/2 -translate-y-1/2 lg:h-[32%] lg:w-[46%]">
      {/* Ghost full smile */}
      <img
        src={smileTeeth}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-contain opacity-[0.14] grayscale"
        draggable={false}
      />

      {/* Upper arch — left → right */}
      <div
        className="absolute inset-0"
        style={{
          opacity: upperT > 0.01 ? 1 : 0,
          WebkitMaskImage: upperMask,
          maskImage: upperMask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          clipPath: "inset(0 0 46% 0)",
        }}
      >
        <img
          src={smileTeeth}
          alt=""
          aria-hidden
          className="h-full w-full object-contain grayscale contrast-[1.05] brightness-[1.05]"
          draggable={false}
        />
      </div>

      {/* Lower arch — right → left */}
      <div
        className="absolute inset-0"
        style={{
          opacity: lowerT > 0.01 ? 1 : 0,
          WebkitMaskImage: lowerMask,
          maskImage: lowerMask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          clipPath: "inset(50% 0 0 0)",
        }}
      >
        <img
          src={smileTeeth}
          alt=""
          aria-hidden
          className="h-full w-full object-contain grayscale contrast-[1.05] brightness-[1.05]"
          draggable={false}
        />
      </div>
    </div>
  );
}

function ToothHub({
  active,
  progress,
  segmentT,
  onSelect,
}: {
  active: number;
  progress: number;
  segmentT: number;
  onSelect: (index: number) => void;
}) {
  const count = treatmentCategories.length;
  const iconRadius = 44;
  const iconRingR = 17;
  const iconRingCirc = 2 * Math.PI * iconRingR;

  return (
    <div className="relative mx-auto h-[min(84vw,400px)] w-[min(84vw,400px)] lg:mx-0 lg:h-[440px] lg:w-full lg:max-w-[440px]">
      <SmileProgress progress={progress} />

      {treatmentCategories.map((cat, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * iconRadius;
        const y = Math.sin(angle) * iconRadius;
        const Icon = cat.icon;
        const isActive = i === active;
        const isPast = i < active;
        const iconProgress = isPast ? 1 : isActive ? segmentT : 0;

        return (
          <div
            key={cat.title}
            className={`absolute ${isActive ? "z-20" : "z-10"}`}
            style={{
              left: `calc(50% + ${x}%)`,
              top: `calc(50% + ${y}%)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <button
              type="button"
              aria-label={cat.title}
              aria-current={isActive}
              onClick={() => onSelect(i)}
              className={`flex flex-col items-center transition-all duration-700 ease-out ${
                isActive ? "scale-105" : isPast ? "scale-95 opacity-70" : "scale-90 opacity-45 hover:opacity-65"
              }`}
            >
              <span className="relative flex h-9 w-9 items-center justify-center lg:h-10 lg:w-10">
                <svg
                  aria-hidden
                  className="pointer-events-none absolute -inset-0.5 h-[calc(100%+4px)] w-[calc(100%+4px)] -rotate-90"
                  viewBox="0 0 40 40"
                >
                  <circle
                    cx="20"
                    cy="20"
                    r={iconRingR}
                    fill="none"
                    stroke="#eae2d6"
                    strokeOpacity={isActive ? 0.35 : 0.18}
                    strokeWidth="0.8"
                  />
                  {iconProgress > 0.01 && (
                    <circle
                      cx="20"
                      cy="20"
                      r={iconRingR}
                      fill="none"
                      stroke="#f5f1eb"
                      strokeWidth={isActive ? 1.4 : 1}
                      strokeLinecap="round"
                      strokeDasharray={iconRingCirc}
                      strokeDashoffset={-iconRingCirc * (1 - iconProgress)}
                      className={isActive ? "treatment-icon-progress" : undefined}
                    />
                  )}
                </svg>
                <span
                  className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-700 ease-out lg:h-8 lg:w-8 ${
                    isActive
                      ? "bg-[#f5f1eb] text-[#4d5645] shadow-[0_4px_14px_-4px_rgba(0,0,0,0.25)]"
                      : isPast
                        ? "border border-[#eae2d6]/40 bg-[#70796b]/35 text-[#eae2d6]"
                        : "border border-[#d8cdc3]/30 bg-[#4d5645]/40 text-[#d8cdc3]/80"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                </span>
              </span>
              <span
                className={`mt-2 max-w-[5rem] whitespace-nowrap text-center font-sans-tight text-[6.5px] uppercase leading-tight tracking-[0.12em] transition-all duration-700 sm:text-[7px] lg:text-[7.5px] ${
                  isActive
                    ? "font-medium text-[#f5f1eb]"
                    : isPast
                      ? "text-[#eae2d6]/70"
                      : "text-[#d8cdc3]/45"
                }`}
                style={{
                  transform: `translate(${Math.cos(angle) * 4}px, ${Math.sin(angle) * 4}px)`,
                }}
              >
                {cat.short}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

function TreatmentDetailCard({
  cat,
  active,
  segmentT,
  compact = false,
}: {
  cat: TreatmentCategory;
  active: number;
  segmentT: number;
  compact?: boolean;
}) {
  const Icon = cat.icon;
  const progressPct = ((active + segmentT) / treatmentCategories.length) * 100;

  return (
    <div className="treatment-detail-card relative w-full">
      {compact ? (
        <div className="border-b border-[#666d57]/15 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8cdc3] bg-[#eae2d6] text-[#666d57]">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="font-sans-tight text-[9px] uppercase tracking-[0.3em] text-[#666d57]/55">
                {cat.short}
              </p>
              <h3 className="mt-1 font-display text-[1.55rem] font-normal leading-[1.1] tracking-tight text-[#4d5645]">
                {cat.title}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-end justify-between gap-4 border-b border-[#666d57]/15 pb-5">
          <div className="flex items-end gap-4">
            <span className="font-display text-[clamp(2.5rem,6vw,4rem)] font-light leading-none tracking-tighter text-[#666d57]/20">
              {cat.num}
            </span>
            <div className="pb-0.5">
              <p className="font-sans-tight text-[9px] uppercase tracking-[0.3em] text-[#666d57]/55">
                {cat.short}
              </p>
              <h3 className="mt-1 max-w-md font-display text-[clamp(1.4rem,2.8vw,2.05rem)] font-normal leading-[1.08] tracking-tight text-[#4d5645]">
                {cat.title}
              </h3>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8cdc3] bg-[#eae2d6] text-[#666d57]">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="font-sans-tight text-[9px] tracking-[0.22em] text-[#70796b]">
              {String(active + 1).padStart(2, "0")} / {treatmentCategories.length}
            </span>
          </div>
        </div>
      )}

      <div className="mt-5 h-px w-full bg-[#d8cdc3]">
        <div className="h-px bg-[#666d57]" style={{ width: `${progressPct}%` }} />
      </div>

      <ul className={`mt-6 grid gap-x-8 gap-y-0 ${compact ? "" : "sm:grid-cols-2"}`}>
        {cat.items.map((item, j) => (
          <li key={item} className="group border-b border-[#d8cdc3]/80 py-3">
            <div className="flex items-baseline gap-4">
              <span className="w-5 shrink-0 font-sans-tight text-[9px] tracking-[0.18em] text-[#70796b]">
                {String(j + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.9rem] font-light leading-snug tracking-wide text-[#4d5645] transition-colors group-hover:text-[#666d57]">
                {item}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Tap-to-select layout — heading + detail in one cohesive mobile block. */
function MobileTreatments() {
  const [active, setActive] = useState(0);
  const cat = treatmentCategories[active];
  const Icon = cat.icon;
  const progressPct = ((active + 1) / treatmentCategories.length) * 100;

  const go = (next: number) => {
    setActive((next + treatmentCategories.length) % treatmentCategories.length);
  };

  return (
    <div className="bg-[#f5f1eb] lg:hidden">
      <div className="px-5 pb-16 pt-12">
        <TreatmentsHeading className="mb-8" tone="onCream" />

        {/* Discipline pills — scrollable, full labels */}
        <div
          className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5 pb-1"
          role="tablist"
          aria-label="Treatment disciplines"
        >
          {treatmentCategories.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-full px-4 py-2.5 font-sans-tight text-[11px] tracking-[0.06em] transition-colors ${
                  isActive
                    ? "bg-[#4d5645] text-[#f5f1eb]"
                    : "border border-[#d8cdc3] bg-[#faf8f4] text-[#4d5645]"
                }`}
              >
                {item.short}
              </button>
            );
          })}
        </div>

        {/* Selected discipline — heading + full list together */}
        <div
          key={cat.title}
          className="treatment-detail-enter mt-8 border-t border-[#d8cdc3] pt-8"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eae2d6] text-[#4d5645]">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="font-sans-tight text-[10px] uppercase tracking-[0.28em] text-[#666d57]/70">
                  {cat.num} · {cat.short}
                </p>
              </div>
              <h3 className="mt-4 font-display text-[1.75rem] font-normal leading-[1.1] tracking-tight text-[#4d5645]">
                {cat.title}
              </h3>
            </div>

            <div className="flex shrink-0 gap-2 pt-1">
              <button
                type="button"
                aria-label="Previous treatment"
                onClick={() => go(active - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8cdc3] text-[#4d5645]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next treatment"
                onClick={() => go(active + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8cdc3] text-[#4d5645]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 h-px w-full bg-[#d8cdc3]">
            <div className="h-px bg-[#666d57] transition-[width] duration-300" style={{ width: `${progressPct}%` }} />
          </div>

          <ul className="mt-2">
            {cat.items.map((item, j) => (
              <li key={item} className="border-b border-[#d8cdc3]/80 py-3.5">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 w-5 shrink-0 font-sans-tight text-[9px] tracking-[0.18em] text-[#70796b]">
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.95rem] font-light leading-snug text-[#4d5645]">
                    {item}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-center font-sans-tight text-[10px] tracking-[0.22em] text-[#70796b]">
            {String(active + 1).padStart(2, "0")} / {String(treatmentCategories.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}

function DesktopTreatments() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [segmentT, setSegmentT] = useState(0);
  const enabled = useMediaQuery("(min-width: 1024px)");
  const stackRef = useRef<HTMLDivElement>(null);
  const scrollStageRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLElement | null)[]>([]);
  const completionRef = useRef<HTMLDivElement | null>(null);
  const [trackPullUp, setTrackPullUp] = useState("-100vh");
  const [stageHeight, setStageHeight] = useState<number | undefined>(undefined);
  const calibrateRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!enabled) return;

    const calibrateScrollStage = () => {
      const shell = shellRef.current;
      const bg = bgRef.current;
      const stage = scrollStageRef.current;
      const completion = completionRef.current;
      const panels = trackRefs.current.filter(Boolean) as HTMLElement[];
      if (!shell || !bg || !stage || !completion || panels.length < 10) return;

      const shellHeight = bg.offsetHeight;
      setTrackPullUp(`-${shellHeight}px`);

      const stageTop = stage.getBoundingClientRect().top + window.scrollY;
      const endY = panelStickScrollY(completion);
      setStageHeight(Math.ceil(endY - stageTop + NAV_TOP_PX + shellHeight));
    };

    calibrateRef.current = calibrateScrollStage;
    calibrateScrollStage();
    const raf1 = requestAnimationFrame(calibrateScrollStage);
    const raf2 = requestAnimationFrame(() => requestAnimationFrame(calibrateScrollStage));

    const bgEl = bgRef.current;
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(calibrateScrollStage);
    });
    if (bgEl) resizeObserver.observe(bgEl);

    window.addEventListener("resize", calibrateScrollStage);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      resizeObserver.disconnect();
      window.removeEventListener("resize", calibrateScrollStage);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const raf = requestAnimationFrame(() => calibrateRef.current());
    return () => cancelAnimationFrame(raf);
  }, [active, enabled]);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;

    const updateScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const panels = trackRefs.current.filter(Boolean) as HTMLElement[];
        if (panels.length === 0) return;

        const { active: nextActive, progress: nextProgress, segmentT: nextSegmentT } =
          computeScrollState(panels, completionRef.current);
        setActive(nextActive);
        setProgress(nextProgress);
        setSegmentT(nextSegmentT);
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [enabled]);

  const scrollToPanel = (index: number) => {
    const panel = trackRefs.current[index];
    if (!panel) return;
    const y = panel.getBoundingClientRect().top + window.scrollY - CONTENT_STICKY_PX;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="relative hidden lg:block">
      <div ref={stackRef} className="relative">
        <div
          ref={scrollStageRef}
          className="relative"
          style={stageHeight ? { height: stageHeight } : undefined}
        >
          <div
            ref={shellRef}
            className="sticky z-10"
            style={{ top: NAV_TOP_REM }}
          >
            <div
              ref={bgRef}
              className="treatments-atmosphere relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
              style={{ minHeight: `calc(100dvh - ${NAV_TOP_REM})` }}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div
                  className="absolute inset-y-0 left-0 w-1/2"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 70% at 40% 45%, #70796b 0%, transparent 55%), linear-gradient(165deg, #666d57 0%, #4d5645 100%)",
                  }}
                />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-[#f5f1eb]" />
              </div>

              <div className="relative z-10 mx-auto grid min-h-[inherit] max-w-7xl grid-cols-2">
                <div className="flex flex-col justify-center px-10 py-8 lg:py-10">
                  <TreatmentsHeading className="mb-6" tone="onOlive" />
                  <div className="flex justify-start">
                    <ToothHub
                      active={active}
                      progress={progress}
                      segmentT={segmentT}
                      onSelect={scrollToPanel}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center px-12 py-8 lg:py-10 xl:px-16">
                  <div key={active} className="treatment-detail-enter w-full">
                    <TreatmentDetailCard
                      cat={treatmentCategories[active]}
                      active={active}
                      segmentT={segmentT}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none"
            data-treatment-track
            style={{ marginTop: trackPullUp }}
            aria-hidden
          >
            {treatmentCategories.map((cat, i) => (
              <div
                key={cat.title}
                ref={(el) => {
                  trackRefs.current[i] = el;
                }}
                style={{ height: SCROLL_STEP }}
              />
            ))}
            <div ref={completionRef} style={{ height: LAST_STEP_COMPLETE_H }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TreatmentsSection() {
  return (
    <section id="treatments" className="relative scroll-mt-[4.5rem]">
      <MobileTreatments />
      <DesktopTreatments />
    </section>
  );
}
