import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoWhite from "@/assets/logo_white.png";

const nav = [
  { href: "#atelier", label: "Atelier" },
  { href: "#doctors", label: "Founders" },
  { href: "#treatments", label: "Treatments" },
  { href: "#results", label: "Results" },
  { href: "#team", label: "Our Team" },
  { href: "#contact", label: "Contact" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
] as const;

function scrollToHash(href: string) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const go = (href: string) => {
    setOpen(false);
    scrollToHash(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          to="/"
          className="flex items-center gap-4"
          onClick={() => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={logoWhite}
            alt="ORA Dental Wellness logo"
            className="h-8 w-auto"
            width={120}
            height={32}
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
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            go("#contact");
          }}
          className="hidden rounded-full border border-foreground px-5 py-2.5 font-sans-tight transition-colors hover:bg-foreground hover:text-background lg:inline-flex"
        >
          Book Visit
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
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go("#contact");
                }}
                className="mt-2 rounded-full bg-foreground px-5 py-3 text-center font-sans-tight text-background transition-transform duration-300 hover:scale-[1.01]"
                style={{
                  transitionDelay: open ? `${40 + nav.length * 35}ms` : "0ms",
                  transform: open ? "translateY(0)" : "translateY(-6px)",
                  opacity: open ? 1 : 0,
                  transitionProperty: "opacity, transform",
                  transitionDuration: "280ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                Book Visit
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
