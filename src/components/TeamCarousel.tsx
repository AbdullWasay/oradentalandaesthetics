import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Member = {
  name: string;
  role: string;
  img: string;
};

const team: Member[] = [
  { name: "Hannan Hassan", role: "Smile Design Coordinator", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=800&fit=crop&crop=faces" },
  { name: "Dr. Saqib Zia", role: "Cosmetic Dentist", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=800&fit=crop&crop=faces" },
  { name: "Dr. Yahya Zia", role: "Implantologist", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=800&fit=crop&crop=faces" },
  { name: "Dr. Saud Iqbal", role: "Maxillofacial Surgeon", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=800&fit=crop&crop=faces" },
  { name: "Dr. Nayyab Bukhari", role: "Orthodontist", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=800&fit=crop&crop=faces" },
  { name: "Dr. Mehak Babar", role: "Aesthetic Dentist", img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=800&fit=crop&crop=faces" },
  { name: "Dr. Muhammad Muaaz", role: "Restorative Dentist", img: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=600&h=800&fit=crop&crop=faces" },
];

export function TeamCarousel() {
  const [active, setActive] = useState(0);
  const len = team.length;

  const prev = () => setActive((a) => (a - 1 + len) % len);
  const next = () => setActive((a) => (a + 1) % len);

  // Compute relative offset for each card (-3..-2..-1..0..1..2..3)
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > len / 2) d -= len;
    if (d < -len / 2) d += len;
    return d;
  };

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div className="relative h-[460px] md:h-[560px]">
        {team.map((m, i) => {
          const d = offsetOf(i);
          const abs = Math.abs(d);
          if (abs > 3) return null;

          // Center card biggest, others step down + behind
          const translateX = d * 130; // px spacing between cards
          const scale = 1 - abs * 0.12;
          const z = 50 - abs;
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.85 : abs === 2 ? 0.55 : 0.3;
          const blur = abs >= 2 ? "blur-[1px]" : "";
          const isCenter = d === 0;

          return (
            <button
              key={m.name}
              onClick={() => setActive(i)}
              aria-label={`Show ${m.name}`}
              className={`absolute left-1/2 top-1/2 overflow-hidden rounded-2xl transition-all duration-700 ease-out ${blur}`}
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                width: "260px",
                height: "380px",
                zIndex: z,
                opacity,
                boxShadow: isCenter
                  ? "0 30px 80px -30px rgba(0,0,0,0.45)"
                  : "0 20px 50px -25px rgba(0,0,0,0.35)",
              }}
            >
              <img
                src={m.img}
                alt={m.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              {/* gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
              {/* caption */}
              <div className="absolute inset-x-0 bottom-0 px-5 pb-5 text-left">
                <h3
                  className={`font-display text-background ${isCenter ? "text-2xl" : "text-lg"}`}
                >
                  {m.name}
                </h3>
                <p
                  className={`font-sans-tight text-background/80 ${isCenter ? "text-sm" : "text-xs"}`}
                >
                  {m.role}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-0 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-border bg-background p-3 shadow-md transition-colors hover:bg-sage-soft md:left-4"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-0 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-border bg-background p-3 shadow-md transition-colors hover:bg-sage-soft md:right-4"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>
    </div>
  );
}
