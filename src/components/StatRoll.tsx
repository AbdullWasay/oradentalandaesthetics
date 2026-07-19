import { useEffect, useRef, useState } from "react";

type StatRollProps = {
  value: string;
  className?: string;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Parse display strings like "500+", "98%", "1.2k+", "18+". */
function parseValue(raw: string): {
  target: number;
  suffix: string;
  isK: boolean;
  decimals: number;
} {
  const trimmed = raw.trim();
  if (trimmed.endsWith("%")) {
    const n = Number.parseFloat(trimmed);
    return { target: n, suffix: "%", isK: false, decimals: Number.isInteger(n) ? 0 : 1 };
  }
  const kMatch = trimmed.match(/^([\d.]+)k\+?$/i);
  if (kMatch) {
    return {
      target: Number.parseFloat(kMatch[1]) * 1000,
      suffix: "+",
      isK: true,
      decimals: 0,
    };
  }
  const match = trimmed.match(/^([\d.]+)(.*)$/);
  if (!match) return { target: 0, suffix: trimmed, isK: false, decimals: 0 };
  const n = Number.parseFloat(match[1]);
  return {
    target: n,
    suffix: match[2] || "",
    isK: false,
    decimals: Number.isInteger(n) ? 0 : 1,
  };
}

function formatRolling(n: number, isK: boolean, decimals: number, suffix: string) {
  if (isK) {
    const thousands = n / 1000;
    const shown =
      thousands >= 10 || thousands % 1 === 0
        ? Math.floor(thousands).toString()
        : thousands.toFixed(1);
    return `${shown}k${suffix}`;
  }
  const shown = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  return `${shown}${suffix}`;
}

/**
 * Counts up when scrolled into view; resets and re-rolls when leaving
 * and re-entering (from above or below).
 */
export function StatRoll({ value, className }: StatRollProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);
  const { target, suffix, isK, decimals } = parseValue(value);
  const [display, setDisplay] = useState(() =>
    formatRolling(0, isK, decimals, suffix),
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(formatRolling(target, isK, decimals, suffix));
      return;
    }

    const animate = () => {
      cancelAnimationFrame(frameRef.current);
      const duration = 1200;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = easeOutCubic(t);
        setDisplay(formatRolling(target * eased, isK, decimals, suffix));
        if (t < 1) frameRef.current = requestAnimationFrame(tick);
      };
      frameRef.current = requestAnimationFrame(tick);
    };

    const reset = () => {
      cancelAnimationFrame(frameRef.current);
      setDisplay(formatRolling(0, isK, decimals, suffix));
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) animate();
        else reset();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, [target, suffix, isK, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
