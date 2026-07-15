import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import logoWhite from "@/assets/logo_white.png";
import { ORA_ADDRESS_FULL, ORA_MAPS_SHARE_URL } from "@/lib/location";

const nav = [
  { href: "#atelier", label: "Atelier" },
  { href: "#doctors", label: "Founders" },
  { href: "#treatments", label: "Treatments" },
  { href: "#team", label: "Our Team" },
  { href: "#contact", label: "Contact" },
  { href: "#reviews", label: "Reviews" },
] as const;

function go(href: string) {
  const hash = href.replace("#", "");
  document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-4 lg:px-10">
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
          <h4 className="font-sans-tight text-muted-foreground">Visit</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={ORA_MAPS_SHARE_URL} target="_blank" rel="noreferrer" className="hover:text-accent">
                {ORA_ADDRESS_FULL}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-accent" />{" "}
              <a href="tel:+923398891919" className="hover:text-accent">
                0339 8891919
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-accent" />{" "}
              <a href="tel:+92518891919" className="hover:text-accent">
                051 8891919
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-accent" />{" "}
              <a href="mailto:info@oradentalwellness.com" className="hover:text-accent">
                info@oradentalwellness.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans-tight text-muted-foreground">Explore</h4>
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
      <div className="border-t border-border/60 px-6 py-6 text-center font-sans-tight text-muted-foreground lg:px-10">
        © {new Date().getFullYear()} ORA Dental Wellness — All rights reserved
      </div>
    </footer>
  );
}
