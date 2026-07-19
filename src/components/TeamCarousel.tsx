import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import drAhmed from "@/assets/doctors/dr-ahmed-sultan.webp";
import drRoha from "@/assets/doctors/dr-roha-ejaz.webp";
import drUsman from "@/assets/doctors/dr-usman-khattak.webp";
import drOzair from "@/assets/doctors/dr-ozair-shirazi.webp";
import drZain from "@/assets/doctors/dr-zain-iftikhar.webp";

type Member = {
  name: string;
  role: string;
  img: string;
  /** How long this slide stays centered before auto-advancing. */
  dwellMs: number;
};

const team: Member[] = [
  { name: "Dr. Ahmed Sultan", role: "General Dentist, Aligners Specialist", img: drAhmed, dwellMs: 7000 },
  { name: "Dr. Roha Ejaz", role: "General & Restorative Dentist", img: drRoha, dwellMs: 7000 },
  { name: "Dr. Usman Khattak", role: "Periodontist & Implantologist", img: drUsman, dwellMs: 2200 },
  { name: "Dr. Ozair Shirazi", role: "Oral & Maxillofacial Surgeon", img: drOzair, dwellMs: 2200 },
  {
    name: "Dr. Zain Iftikhar",
    role: "Prosthodontist · ITI Member",
    img: drZain,
    dwellMs: 2200,
  },
];

const SWIPE_THRESHOLD = 50;

type Slot = {
  key: string;
  index: number;
  member: Member;
  offset: number;
};

export function TeamCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const isMd = useMediaQuery("(min-width: 768px)");
  const isLg = useMediaQuery("(min-width: 1024px)");
  const len = team.length;

  const prev = () => setActive((a) => (a - 1 + len) % len);
  const next = () => setActive((a) => (a + 1) % len);

  useEffect(() => {
    if (paused) return;
    const dwell = team[active]?.dwellMs ?? 4000;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % len), dwell);
    return () => window.clearTimeout(id);
  }, [paused, len, active]);

  const startX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    setPaused(true);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (dx > SWIPE_THRESHOLD) prev();
    else if (dx < -SWIPE_THRESHOLD) next();
    startX.current = null;
    window.setTimeout(() => setPaused(false), 1800);
  };

  /** All five doctors: offsets −2 … +2, no duplicates. */
  const slots: Slot[] = [];
  const maxOffset = Math.floor(len / 2);
  for (let i = 0; i < len; i++) {
    let d = ((i - active) % len + len) % len;
    if (d > len / 2) d -= len;
    if (Math.abs(d) <= maxOffset) {
      slots.push({ key: `${i}`, index: i, member: team[i], offset: d });
    }
  }

  // Cover-flow spacing — stretch across the section like the reference
  const nearStep = isLg ? 220 : isMd ? 170 : 105;
  const farStep = isLg ? 400 : isMd ? 310 : 195;

  return (
    <div
      className="relative mx-auto w-full max-w-7xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative z-10 h-[400px] touch-pan-y select-none overflow-visible [perspective:1500px] sm:h-[460px] md:h-[540px] lg:h-[580px]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (startX.current = null)}
      >
        {slots.map(({ key, index, member: m, offset: d }) => {
          const abs = Math.abs(d);
          const translateX = d === 0 ? 0 : Math.sign(d) * (abs === 1 ? nearStep : farStep);
          const scale = abs === 0 ? 1 : abs === 1 ? 0.9 : 0.76;
          const rotateY = d * (isLg ? -20 : -16);
          const z = 50 - abs;
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.72 : 0.48;
          const isCenter = d === 0;

          const width = isCenter
            ? isLg
              ? 300
              : isMd
                ? 260
                : 220
            : abs === 1
              ? isLg
                ? 250
                : isMd
                  ? 220
                  : 185
              : isLg
                ? 210
                : isMd
                  ? 185
                  : 155;

          const height = isCenter
            ? isLg
              ? 430
              : isMd
                ? 380
                : 320
            : abs === 1
              ? isLg
                ? 370
                : isMd
                  ? 330
                  : 280
              : isLg
                ? 320
                : isMd
                  ? 285
                  : 245;

          return (
            <button
              key={key}
              onClick={() => setActive(index)}
              aria-label={`Show ${m.name}`}
              aria-current={isCenter}
              className="absolute left-1/2 top-1/2 overflow-hidden rounded-[1.5rem] border border-[#666d57]/10 bg-background transition-all duration-700 ease-out will-change-transform"
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                width: `${width}px`,
                height: `${height}px`,
                zIndex: z,
                opacity,
                filter: abs >= 1 ? `brightness(${abs === 1 ? 1.08 : 1.14})` : undefined,
                boxShadow: isCenter
                  ? "0 40px 90px -30px rgba(102,109,87,0.55)"
                  : "0 24px 55px -26px rgba(102,109,87,0.35)",
              }}
            >
              <img
                src={m.img}
                alt={`Portrait of ${m.name}, ${m.role} at ORA Dental Wellness in Bahria Town, Islamabad`}
                className={`pointer-events-none h-full w-full object-cover object-[center_18%] transition-transform duration-700 ${isCenter ? "scale-100" : "scale-105"}`}
                width={480}
                height={720}
                sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 85vw"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4d5645]/95 via-[#4d5645]/28 to-transparent" />
              {isCenter && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#c4a35a] to-transparent"
                />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-5 text-left sm:px-6 sm:pb-6">
                <h3
                  className={`font-display leading-tight text-[#f5f1eb] ${
                    isCenter ? "text-xl md:text-2xl" : "text-base md:text-lg"
                  }`}
                >
                  {m.name}
                </h3>
                <p
                  className={`mt-1 font-sans-tight uppercase tracking-[0.14em] text-[#f5f1eb]/70 ${
                    isCenter ? "text-[10px] md:text-xs" : "text-[9px] md:text-[10px]"
                  }`}
                >
                  {m.role}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={prev}
        aria-label="Previous team member"
        className="absolute left-0 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-[#666d57]/20 bg-background/95 p-3 shadow-lg backdrop-blur-sm transition-all hover:border-[#666d57]/40 hover:bg-[#f3eee4] md:left-2 lg:left-0"
      >
        <ChevronLeft className="h-5 w-5 text-[#666d57]" />
      </button>
      <button
        onClick={next}
        aria-label="Next team member"
        className="absolute right-0 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-[#666d57]/20 bg-background/95 p-3 shadow-lg backdrop-blur-sm transition-all hover:border-[#666d57]/40 hover:bg-[#f3eee4] md:right-2 lg:right-0"
      >
        <ChevronRight className="h-5 w-5 text-[#666d57]" />
      </button>

      <div className="relative z-10 mt-6 flex items-center justify-center gap-2">
        {team.map((m, i) => (
          <button
            key={m.name}
            onClick={() => setActive(i)}
            aria-label={`Go to ${m.name}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-10 bg-[#666d57]" : "w-1.5 bg-[#666d57]/25 hover:bg-[#666d57]/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
