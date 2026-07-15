import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import drAhmed from "@/assets/doctors/dr-ahmed-sultan.png";
import drRoha from "@/assets/doctors/dr-roha-ejaz.png";
import drUsman from "@/assets/doctors/dr-usman-khattak.png";
import drOzair from "@/assets/doctors/dr-ozair-shirazi.png";

type Member = {
  name: string;
  role: string;
  img: string;
};

const team: Member[] = [
  { name: "Dr. Ahmed Sultan", role: "General Dentist, Aligners Specialist", img: drAhmed },
  { name: "Dr. Roha Ejaz", role: "Cosmetic Dentist", img: drRoha },
  { name: "Dr. Usman Khattak", role: "Periodontist & Implantologist", img: drUsman },
  { name: "Dr. Ozair Shirazi", role: "Oral & Maxillofacial Surgeon", img: drOzair },
];

const AUTOPLAY_MS = 4000;
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
  const len = team.length;

  const prev = () => setActive((a) => (a - 1 + len) % len);
  const next = () => setActive((a) => (a + 1) % len);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % len), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, len]);

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

  /** Build a balanced ring: neighbors at ±1, opposite doctor mirrored at ±2. */
  const slots: Slot[] = [];
  for (let i = 0; i < len; i++) {
    let d = ((i - active) % len + len) % len;
    if (d > len / 2) d -= len;
    if (Math.abs(d) <= 1) {
      slots.push({ key: `${i}`, index: i, member: team[i], offset: d });
    }
  }
  // Even count: show the 4th (opposite) doctor on both ends for symmetry
  if (len % 2 === 0) {
    const opposite = (active + len / 2) % len;
    slots.push(
      { key: `${opposite}-left`, index: opposite, member: team[opposite], offset: -2 },
      { key: `${opposite}-right`, index: opposite, member: team[opposite], offset: 2 },
    );
  }

  return (
    <div
      className="relative mx-auto w-full max-w-6xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative z-10 h-[440px] touch-pan-y select-none [perspective:1200px] md:h-[520px]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (startX.current = null)}
      >
        {slots.map(({ key, index, member: m, offset: d }) => {
          const abs = Math.abs(d);
          const translateX = d * 145;
          const scale = 1 - abs * 0.12;
          const rotateY = d * -16;
          const z = 50 - abs;
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.82 : 0.4;
          const isCenter = d === 0;

          return (
            <button
              key={key}
              onClick={() => setActive(index)}
              aria-label={`Show ${m.name}`}
              aria-current={isCenter}
              className="absolute left-1/2 top-1/2 overflow-hidden rounded-[1.35rem] border border-[#666d57]/10 bg-background transition-all duration-700 ease-out will-change-transform"
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                width: isCenter ? "260px" : abs === 1 ? "220px" : "180px",
                height: isCenter ? "370px" : abs === 1 ? "315px" : "270px",
                zIndex: z,
                opacity,
                boxShadow: isCenter
                  ? "0 32px 72px -26px rgba(102,109,87,0.45)"
                  : "0 18px 46px -24px rgba(102,109,87,0.25)",
              }}
            >
              <img
                src={m.img}
                alt={`Portrait of ${m.name}, ${m.role} at ORA Dental Wellness`}
                className={`pointer-events-none h-full w-full object-cover object-[center_18%] transition-transform duration-700 ${isCenter ? "scale-100" : "scale-105"}`}
                loading="lazy"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#666d57]/90 via-[#666d57]/25 to-transparent" />
              {isCenter && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#c4a35a] to-transparent"
                />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-5 text-left">
                <h3 className={`font-display text-[#f3eee4] ${isCenter ? "text-2xl" : "text-lg"}`}>
                  {m.name}
                </h3>
                <p className={`font-sans-tight text-[#f3eee4]/75 ${isCenter ? "text-sm" : "text-xs"}`}>
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
        className="absolute left-0 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-[#666d57]/20 bg-background/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:border-[#666d57]/40 hover:bg-[#f3eee4] md:left-2"
      >
        <ChevronLeft className="h-5 w-5 text-[#666d57]" />
      </button>
      <button
        onClick={next}
        aria-label="Next team member"
        className="absolute right-0 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-[#666d57]/20 bg-background/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:border-[#666d57]/40 hover:bg-[#f3eee4] md:right-2"
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
