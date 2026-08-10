import { useCallback, useEffect, useState } from "react";
import { Facebook, Instagram, Phone, X } from "lucide-react";
import popupImage from "@/assets/about-us.webp";
import {
  ORA_PHONE_DISPLAY,
  ORA_PHONE_PRIMARY,
  ORA_WHATSAPP_URL,
} from "@/lib/seo";
import { trackContact } from "@/lib/meta-pixel";
import { startSmoothScroll, stopSmoothScroll } from "@/lib/smooth-scroll";

const STORAGE_KEY = "ora-contact-popup-seen";
const EXIT_MS = 420;
const IG_URL = "https://www.instagram.com/oradentalwellness/?hl=en";
const FB_URL = "https://www.facebook.com/profile.php?id=61590825338018";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** Scroll-triggered lead modal — Call / WhatsApp (once per session). */
export function ContactLeadPopup() {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* private mode */
    }

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setExiting(false);
      setMounted(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    };

    const doctors = document.getElementById("doctors");
    if (!doctors) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        show();
        io.disconnect();
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px 0px -50% 0px",
      },
    );

    io.observe(doctors);
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => {
    setExiting(true);
    window.setTimeout(() => {
      setMounted(false);
      setExiting(false);
    }, EXIT_MS);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    stopSmoothScroll();
    const lockId = window.setTimeout(() => {
      document.body.style.overflow = "hidden";
    }, 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(lockId);
      document.body.style.overflow = prev;
      startSmoothScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted, close]);

  if (!mounted) return null;

  const overlayClass = exiting ? "ora-lead-overlay-exit" : "ora-lead-overlay-enter";
  const panelClass = exiting ? "ora-lead-panel-exit" : "ora-lead-panel-enter";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ora-lead-title"
    >
      <button
        type="button"
        aria-label="Dismiss"
        className={`absolute inset-0 bg-[#1a1c18]/55 opacity-0 backdrop-blur-[2px] ${overlayClass}`}
        onClick={close}
      />

      <div
        className={`relative z-10 flex max-h-[min(88dvh,640px)] w-full max-w-[min(420px,100%)] flex-col overflow-hidden rounded-[1.25rem] bg-[#f5f1eb] opacity-0 shadow-[0_40px_100px_-40px_rgba(26,28,24,0.55)] will-change-transform sm:max-w-[860px] sm:flex-row ${panelClass}`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f1eb]/95 text-[#4d5645] shadow-sm transition-colors hover:bg-[#f5f1eb] sm:right-4 sm:top-4"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Atelier image — cream fade into content */}
        <div className="relative h-[42vw] min-h-[160px] max-h-[220px] w-full shrink-0 overflow-hidden sm:h-auto sm:max-h-none sm:min-h-[420px] sm:w-[44%]">
          <img
            src={popupImage}
            alt="ORA Dental Wellness atelier in Bahria Town Phase 4"
            className="absolute inset-0 h-full w-full object-cover object-center"
            width={420}
            height={560}
            decoding="async"
          />
          {/* Mobile: fade up into cream · Desktop: fade right into cream */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#f5f1eb] via-[#f5f1eb]/55 to-[#f5f1eb]/10 sm:bg-gradient-to-r sm:from-transparent sm:via-[#f5f1eb]/25 sm:to-[#f5f1eb]"
          />
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center overflow-y-auto bg-[#f5f1eb] px-5 pb-6 pt-1 sm:px-10 sm:py-12">
          <p className="font-sans-tight text-[10px] uppercase tracking-[0.28em] text-[#4d5645]">
            Prefer to talk?
          </p>
          <h2
            id="ora-lead-title"
            className="mt-2.5 font-display text-[clamp(1.55rem,5vw,2.25rem)] font-light leading-[1.08] tracking-tight text-[#4d5645] sm:mt-3"
          >
            Skip the form.
            <span className="mt-1 block italic text-[#666d57]">Call or WhatsApp us.</span>
          </h2>
          <p className="mt-3 max-w-sm text-[0.92rem] font-light leading-relaxed text-[#5a6358] sm:mt-4 sm:text-[0.95rem]">
            Most patients prefer a quick message. We’ll confirm your visit within minutes.
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:mt-7 sm:gap-3">
            <a
              href={ORA_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackContact("whatsapp");
                close();
              }}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#666d57] px-6 py-3.5 font-sans-tight text-[11px] tracking-[0.16em] text-[#f5f1eb] transition-colors hover:bg-[#4d5645]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${ORA_PHONE_PRIMARY}`}
              onClick={() => {
                trackContact("phone");
                close();
              }}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#4d5645]/35 bg-transparent px-6 py-3.5 font-sans-tight text-[11px] tracking-[0.16em] text-[#4d5645] transition-colors hover:border-[#4d5645] hover:bg-[#4d5645]/5"
            >
              <Phone className="h-4 w-4" />
              Call {ORA_PHONE_DISPLAY}
            </a>
          </div>

          <div className="mt-5 flex items-center gap-3 sm:mt-6">
            <a
              href={IG_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="ORA Dental Wellness on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#4d5645]/25 text-[#4d5645] transition-colors hover:border-[#666d57] hover:bg-[#666d57]/10"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={FB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="ORA Dental Wellness on Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#4d5645]/25 text-[#4d5645] transition-colors hover:border-[#666d57] hover:bg-[#666d57]/10"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <p className="font-sans-tight text-[10px] tracking-[0.12em] text-[#5a6358]">
              Mon – Sat · 12:00 – 9:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
