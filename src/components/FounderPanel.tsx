import { useEffect, useRef, useState } from "react";

type FounderPanelProps = {
  img: string;
  name: string;
  role: string;
  bio: string;
  position: string;
  align: string;
  pad: string;
};

/**
 * Desktop: bio on hover.
 * Mobile: bio animates open when the panel scrolls into view.
 */
export function FounderPanel({ img, name, role, bio, position, align, pad }: FounderPanelProps) {
  const ref = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(max-width: 767px)");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!mq.matches) {
          setMobileOpen(false);
          return;
        }
        // Open when the panel is meaningfully on screen; close when it leaves
        setMobileOpen(entry.isIntersecting && entry.intersectionRatio >= 0.4);
      },
      { threshold: [0.2, 0.4, 0.55, 0.7], rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);

    const onMq = () => {
      if (!mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onMq);

    return () => {
      io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  return (
    <article
      ref={ref}
      className="doctors-duo-panel group relative isolate min-h-[58vh] overflow-hidden md:min-h-0"
    >
      <img
        src={img}
        alt={`Professional portrait of ${name}, ${role} at ORA Dental Wellness in Bahria Town, Rawalpindi`}
        className={`absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110 ${position}`}
        loading="lazy"
        decoding="async"
        width={680}
        height={1020}
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-[#000000]/25 transition-colors duration-700 group-hover:bg-[#000000]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/55 to-[#4d5645]/35" />
      <div className="absolute inset-x-0 top-0 hidden h-44 bg-gradient-to-b from-[#000000]/70 to-transparent md:block" />

      <div
        className={`absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-8 pb-10 pt-24 text-center md:pb-14 md:pt-32 ${align} ${pad}`}
      >
        <p className="font-sans-tight text-[9px] tracking-[0.3em] text-[#d8cdc3]">{role}</p>
        <h3 className="mt-3 font-display text-[clamp(1.55rem,2.8vw,2.2rem)] font-normal tracking-tight text-[#faf8f4]">
          {name}
        </h3>
        <p
          className={`max-w-sm overflow-hidden text-[0.82rem] font-light leading-relaxed text-[#eae2d6]/78 transition-all duration-700 ease-out md:text-[0.88rem] ${
            align.includes("end") ? "md:ml-auto" : "md:mr-auto"
          } ${
            mobileOpen
              ? "mt-4 max-h-56 translate-y-0 opacity-100"
              : "mt-0 max-h-0 translate-y-2 opacity-0"
          } md:mt-0 md:max-h-0 md:translate-y-2 md:opacity-0 md:group-hover:mt-4 md:group-hover:max-h-56 md:group-hover:translate-y-0 md:group-hover:opacity-100`}
        >
          {bio}
        </p>
      </div>
    </article>
  );
}
