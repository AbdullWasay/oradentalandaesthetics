import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import logoWhite from "@/assets/logo_white.png";
import { ORA_ADDRESS_LINES, ORA_MAPS_SHARE_URL } from "@/lib/location";
import { EmailLink } from "@/components/EmailLink";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const nav = [
  { href: "/#atelier", label: "Atelier" },
  { href: "/#doctors", label: "Founders" },
  { href: "/#treatments", label: "Treatments" },
  { href: "/#team", label: "Our Team" },
  { href: "/#contact", label: "Contact" },
  { href: "/#reviews", label: "Reviews" },
] as const;

function go(href: string) {
  const hash = href.replace(/^\/?#/, "");
  if (window.location.pathname !== "/") {
    window.location.assign(`/#${hash}`);
    return;
  }
  smoothScrollTo(hash);
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      {/* Mobile — compact stacked layout */}
      <div className="mx-auto max-w-7xl px-5 py-8 lg:hidden">
        <div className="flex items-center justify-between">
          <img
            src={logoWhite}
            alt="ORA Dental Wellness logo"
            className="h-6 w-auto"
            width={100}
            height={28}
            loading="lazy"
          />
          <div className="flex gap-2">
            <a
              href="https://www.instagram.com/oradentalwellness/?hl=en"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-foreground/20 p-2 text-foreground/70"
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61590825338018"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-foreground/20 p-2 text-foreground/70"
            >
              <Facebook className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <p className="font-sans-tight text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </p>
            <ul className="mt-2.5 space-y-2 text-[13px] text-foreground/75">
              <li>
                <a href="tel:+923398891919" className="inline-flex items-center gap-1.5">
                  <Phone className="h-3 w-3 text-[#666d57]" />
                  0339 8891919
                </a>
              </li>
              <li>
                <EmailLink className="inline-flex items-center gap-1.5 break-all">
                  <Mail className="h-3 w-3 shrink-0 text-[#666d57]" />
                  info@oradentalwellness.com
                </EmailLink>
              </li>
              <li>
                <a
                  href={ORA_MAPS_SHARE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-start gap-1.5 leading-snug"
                >
                  <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-[#666d57]" />
                  <span>
                    Bahria Paradise Commercial
                    <br />
                    Phase 4, Rawalpindi
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-sans-tight text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              Explore
            </p>
            <ul className="mt-2.5 space-y-1.5 text-[13px] text-foreground/75">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(n.href);
                    }}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-7 border-t border-border/50 pt-4 text-center font-sans-tight text-[10px] text-muted-foreground">
          © {new Date().getFullYear()} ORA Dental Wellness
        </p>
      </div>

      {/* Desktop */}
      <div className="mx-auto hidden max-w-7xl px-10 py-20 lg:block">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <img
                src={logoWhite}
                alt="ORA Dental Wellness logo"
                className="h-8 w-auto"
                width={120}
                height={32}
                loading="lazy"
              />
              <span className="h-7 w-px bg-foreground/30" />
              <span className="font-sans-tight text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                Dental Wellness
              </span>
            </div>
            <p className="mt-6 max-w-md font-display text-2xl leading-snug text-foreground/80">
              A quieter way to care for your smile — sculpted in light, guided by science.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/oradentalwellness/?hl=en"
                target="_blank"
                rel="noreferrer"
                aria-label="ORA Dental Wellness on Instagram"
                className="rounded-full border border-foreground/30 p-3 transition-colors hover:bg-foreground hover:text-background"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61590825338018"
                target="_blank"
                rel="noreferrer"
                aria-label="ORA Dental Wellness on Facebook"
                className="rounded-full border border-foreground/30 p-3 transition-colors hover:bg-foreground hover:text-background"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-sans-tight text-muted-foreground">Visit</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={ORA_MAPS_SHARE_URL} target="_blank" rel="noreferrer" className="hover:text-accent">
                  {ORA_ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-accent" />
                <a href="tel:+923398891919" className="hover:text-accent">
                  0339 8891919
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-accent" />
                <EmailLink className="hover:text-accent" />
              </li>
            </ul>
          </div>

          <div>
            <p className="font-sans-tight text-muted-foreground">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      go(n.href);
                    }}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="hidden border-t border-border/60 px-10 py-6 text-center font-sans-tight text-muted-foreground lg:block">
        © {new Date().getFullYear()} ORA Dental Wellness — All rights reserved
      </div>
    </footer>
  );
}
