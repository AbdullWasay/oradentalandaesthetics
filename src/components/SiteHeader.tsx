import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoWhite from "@/assets/logo_white.webp";
import { ORA_WHATSAPP_URL } from "@/lib/seo";
import { trackContact } from "@/lib/meta-pixel";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const nav = [
  { href: "/#atelier", label: "Atelier" },
  { href: "/#doctors", label: "Founders" },
  { href: "/#treatments", label: "Treatments" },
  { href: "/#team", label: "Our Team" },
  { href: "/#contact", label: "Contact" },
  { href: "/#reviews", label: "Reviews" },
] as const;

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
  const hash = href.replace(/^\/?#/, "");
  if (window.location.pathname !== "/") {
    window.location.assign(`/#${hash}`);
    return;
  }
  scrollToHash(href);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const go = (href: string) => {
    setOpen(false);
    goToSection(href);
  };

  return (
    <header className="ora-crit-header sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          to="/"
          className="flex items-center gap-4"
          onClick={() => {
            setOpen(false);
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
          <span className="hidden h-7 w-px bg-foreground/30 sm:block" />
          <span className="hidden font-sans-tight text-[0.72rem] uppercase tracking-[0.18em] text-foreground/70 sm:inline">
            Dental Wellness
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={(e) => {
                e.preventDefault();
                go(n.href);
              }}
              className="font-sans-tight text-foreground/70 transition-colors hover:text-foreground"
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
          className="hidden items-center gap-2 rounded-full bg-[#666d57] px-5 py-2.5 font-sans-tight text-[#f5f1eb] transition-colors hover:bg-[#4d5645] lg:inline-flex"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </a>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center lg:hidden"
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
              {nav.map((n, i) => (
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
                  transitionDelay: open ? `${40 + nav.length * 35}ms` : "0ms",
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
