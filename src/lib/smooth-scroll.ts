import { useEffect } from "react";
import type Lenis from "lenis";

const HEADER_OFFSET = -88;

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function animatedWindowScroll(to: number, durationMs: number) {
  const from = window.scrollY;
  const delta = to - from;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs);
    window.scrollTo(0, from + delta * easeOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** Slower, eased scroll for anchors and programmatic navigation. */
export function smoothScrollTo(
  target: string | number | HTMLElement,
  options?: { offset?: number; duration?: number },
) {
  const duration = options?.duration ?? 1.55;
  const offset = options?.offset ?? HEADER_OFFSET;

  if (typeof window === "undefined") return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    if (typeof target === "number") {
      window.scrollTo(0, target);
      return;
    }
    const el =
      typeof target === "string"
        ? document.getElementById(target.replace(/^#/, ""))
        : target;
    el?.scrollIntoView({ block: "start" });
    return;
  }

  if (lenis) {
    const scrollTarget =
      typeof target === "string"
        ? (document.getElementById(target.replace(/^#/, "")) ?? target)
        : target;
    lenis.scrollTo(scrollTarget, { offset, duration, easing: easeOutCubic });
    return;
  }

  if (typeof target === "number") {
    animatedWindowScroll(target, duration * 1000);
    return;
  }
  const el =
    typeof target === "string"
      ? document.getElementById(target.replace(/^#/, ""))
      : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  animatedWindowScroll(top, duration * 1000);
}

export function stopSmoothScroll() {
  lenis?.stop();
}

export function startSmoothScroll() {
  lenis?.start();
}

/** Site-wide Lenis — deferred until idle so it doesn't block TBT/FCP. */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const boot = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      document.documentElement.classList.add("lenis");
      const instance = new Lenis({
        duration: 1.65,
        easing: easeOutCubic,
        smoothWheel: true,
        wheelMultiplier: 0.72,
        touchMultiplier: 1,
        autoRaf: true,
      });
      lenis = instance;
    };

    const start = () => {
      void boot();
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 4000 });
    } else {
      timeoutId = setTimeout(start, 2000);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      lenis?.destroy();
      lenis = null;
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return null;
}
