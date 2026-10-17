import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import logoWhite from "@/assets/logo_white.webp";
import { ORA_WHATSAPP_URL } from "@/lib/seo";
import { TREATMENT_PAGES } from "@/lib/treatments";
import { trackContact } from "@/lib/meta-pixel";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const nav = [
  { href: "/#atelier", label: "Atelier" },
  { href: "/#doctors", label: "Founders" },
  { href: "/#team", label: "Our Team" },
  { href: "/blog", label: "Journal" },
  { href: "/#contact", label: "Contact" },
  { href: "/#reviews", label: "Reviews" },
] as const;

const MEGA_LINKS = TREATMENT_PAGES.map((page) => ({
  slug: page.slug,
  href: `/treatments/${page.slug}`,
  kicker: page.kicker,
  title: page.headline,
  excerpt: page.excerpt,
  image: page.hero.src,
}));

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function scrollToHash(href: string) {
  const id = href.replace(/^\/?#/, "");
  smoothScrollTo(id);
}

function goToSection(href: string) {
  if (!href.includes("#")) {
    window.location.assign(href);
    return;
  }
  const hash = href.replace(/^\/?#/, "");
  if (window.location.pathname !== "/") {
    window.location.assign(`/#${hash}`);
    return;
  }
  scrollToHash(href);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaButtonId = useId();
  const megaPanelId = useId();
  const closeTimer = useRef<number | null>(null);

  const go = (href: string) => {
    setOpen(false);
    setMegaOpen(false);
    setMobileTreatmentsOpen(false);
    goToSection(href);
  };

  const openMega = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 120);
  };

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-treatments-mega]")) return;
      setMegaOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4 lg:px-10">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-4"
          onClick={() => {
            setOpen(false);
            setMegaOpen(false);
            smoothScrollTo(0, { duration: 1.4, offset: 0 });
          }}
        >
          <img
            src={logoWhite}
            alt="ORA Dental Wellness logo"
            className="h-8 w-auto"
            width={212}
            height={64}
          />
          <span className="hidden h-7 w-px bg-foreground/30 xl:block" />
          <span className="hidden font-sans-tight text-[0.72rem] uppercase tracking-[0.18em] text-foreground/70 xl:inline">
            Dental Wellness
          </span>
        </Link>

        <nav
          className="ml-auto hidden items-center gap-x-5 xl:gap-x-7 lg:flex"
          aria-label="Primary"
        >
          {nav.slice(0, 2).map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={(e) => {
                e.preventDefault();
                go(n.href);
              }}
              className="shrink-0 whitespace-nowrap font-sans-tight tracking-[0.14em] text-foreground/70 transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}

          <div
            ref={megaRef}
            data-treatments-mega
            className="relative shrink-0"
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
          >
            <button
              type="button"
              id={megaButtonId}
              aria-expanded={megaOpen}
              aria-controls={megaPanelId}
              aria-haspopup="true"
              onClick={() => setMegaOpen((v) => !v)}
              onFocus={openMega}
              className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-sans-tight tracking-[0.14em] transition-colors ${
                megaOpen ? "text-foreground" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Treatments
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${
                  megaOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
          </div>

          {nav.slice(2).map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={(e) => {
                e.preventDefault();
                go(n.href);
              }}
              className="shrink-0 whitespace-nowrap font-sans-tight tracking-[0.14em] text-foreground/70 transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href={ORA_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackContact("whatsapp")}
          className="hidden shrink-0 items-center gap-2 rounded-full bg-[#666d57] px-5 py-2.5 font-sans-tight tracking-[0.14em] text-[#f5f1eb] transition-colors hover:bg-[#4d5645] lg:inline-flex"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </a>

        <button
          type="button"
          className="relative ml-auto flex h-10 w-10 shrink-0 items-center justify-center lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <Menu
            className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
            }`}
            aria-hidden
          />
          <X
            className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0"
            }`}
            aria-hidden
          />
        </button>
      </div>

      {/* Desktop mega menu */}
      <div
        id={megaPanelId}
        data-treatments-mega
        role="region"
        aria-labelledby={megaButtonId}
        aria-hidden={!megaOpen}
        className={`absolute inset-x-0 top-full z-50 hidden border-b border-[#4d5645]/10 bg-[#f7f3ec]/98 shadow-[0_28px_60px_-40px_rgba(44,50,40,0.45)] backdrop-blur-md transition-[opacity,transform] duration-200 lg:block ${
          megaOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        onMouseEnter={openMega}
        onMouseLeave={scheduleCloseMega}
      >
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-sans-tight text-[10px] tracking-[0.28em] text-[#8a6d2f]">
                Dedicated care
              </p>
              <p className="mt-2 font-display text-[1.65rem] font-light leading-tight text-[#4d5645]">
                Aligners, implants &amp; everyday dentistry.
              </p>
            </div>
            <a
              href="/#treatments"
              onClick={(e) => {
                e.preventDefault();
                go("/#treatments");
              }}
              className="hidden items-center gap-2 font-sans-tight text-[11px] tracking-[0.16em] text-[#4d5645] transition-colors hover:text-[#666d57] md:inline-flex"
            >
              Full treatment list <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {MEGA_LINKS.map((item) => (
              <Link
                key={item.slug}
                to="/treatments/$slug"
                params={{ slug: item.slug }}
                onClick={() => {
                  setMegaOpen(false);
                  setOpen(false);
                }}
                className="group flex overflow-hidden rounded-2xl bg-[#f5f1eb] transition-colors hover:bg-[#efe8dc]"
              >
                <div className="relative w-[5.5rem] shrink-0 overflow-hidden bg-[#ebe4d8] sm:w-28">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4">
                  <p className="font-sans-tight text-[9px] tracking-[0.18em] text-[#8a6d2f]">
                    {item.kicker}
                  </p>
                  <p className="mt-1.5 font-display text-[1.15rem] font-bold leading-snug text-[#4d5645] transition-colors group-hover:text-[#666d57]">
                    {item.title}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-[0.82rem] font-light leading-relaxed text-[#3d4438]">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#4d5645]/10 pt-5">
            <p className="max-w-md text-[0.9rem] font-light text-[#4a5246]">
              Prefer to talk it through? WhatsApp the clinic and we will find a time that suits.
            </p>
            <a
              href={ORA_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackContact("whatsapp");
                setMegaOpen(false);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#666d57] px-5 py-2.5 font-sans-tight text-[11px] tracking-[0.14em] text-[#f5f1eb] transition-colors hover:bg-[#4d5645]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Mobile"
            className={`border-t border-border/60 bg-background px-6 pb-5 pt-1 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="flex flex-col">
              {nav.slice(0, 2).map((n, i) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="py-3 font-sans-tight text-foreground/80 transition-colors hover:text-foreground"
                  style={{
                    transitionDelay: open ? `${40 + i * 35}ms` : "0ms",
                    transform: open ? "translateY(0)" : "translateY(-6px)",
                    opacity: open ? 1 : 0,
                    transitionProperty: "opacity, transform",
                    transitionDuration: "280ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    go(n.href);
                  }}
                >
                  {n.label}
                </a>
              ))}

              <div
                style={{
                  transitionDelay: open ? `${40 + 2 * 35}ms` : "0ms",
                  transform: open ? "translateY(0)" : "translateY(-6px)",
                  opacity: open ? 1 : 0,
                  transitionProperty: "opacity, transform",
                  transitionDuration: "280ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 font-sans-tight text-foreground/80"
                  aria-expanded={mobileTreatmentsOpen}
                  onClick={() => setMobileTreatmentsOpen((v) => !v)}
                >
                  Treatments
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileTreatmentsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    mobileTreatmentsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-1 border-l border-[#c4a35a]/50 pb-2 pl-4">
                      {MEGA_LINKS.map((item) => (
                        <Link
                          key={item.slug}
                          to="/treatments/$slug"
                          params={{ slug: item.slug }}
                          onClick={() => {
                            setOpen(false);
                            setMobileTreatmentsOpen(false);
                          }}
                          className="block py-2.5"
                        >
                          <p className="font-sans-tight text-[9px] tracking-[0.16em] text-[#8a6d2f]">
                            {item.kicker}
                          </p>
                          <p className="mt-0.5 font-display text-[1.05rem] leading-snug text-[#4d5645]">
                            {item.title}
                          </p>
                        </Link>
                      ))}
                      <a
                        href="/#treatments"
                        onClick={(e) => {
                          e.preventDefault();
                          go("/#treatments");
                        }}
                        className="inline-flex items-center gap-2 py-2.5 font-sans-tight text-[11px] tracking-[0.14em] text-[#4d5645]"
                      >
                        Full treatment list <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {nav.slice(2).map((n, i) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="py-3 font-sans-tight text-foreground/80 transition-colors hover:text-foreground"
                  style={{
                    transitionDelay: open ? `${40 + (i + 3) * 35}ms` : "0ms",
                    transform: open ? "translateY(0)" : "translateY(-6px)",
                    opacity: open ? 1 : 0,
                    transitionProperty: "opacity, transform",
                    transitionDuration: "280ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    go(n.href);
                  }}
                >
                  {n.label}
                </a>
              ))}

              <a
                href={ORA_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  trackContact("whatsapp");
                  setOpen(false);
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#666d57] px-5 py-3 text-center font-sans-tight text-[#f5f1eb] transition-colors hover:bg-[#4d5645]"
                style={{
                  transitionDelay: open ? `${40 + (nav.length + 1) * 35}ms` : "0ms",
                  transform: open ? "translateY(0)" : "translateY(-6px)",
                  opacity: open ? 1 : 0,
                  transitionProperty: "opacity, transform",
                  transitionDuration: "280ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
