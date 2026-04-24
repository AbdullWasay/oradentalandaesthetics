import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/ora-logo.png";

const treatments = [
  { to: "/treatments", hash: "cosmetic", label: "Cosmetic Dentistry" },
  { to: "/treatments", hash: "orthodontics", label: "Clear Aligners" },
  { to: "/treatments", hash: "restorative", label: "Implants & Restorative" },
  { to: "/treatments", hash: "aesthetic", label: "Aesthetic Treatments" },
  { to: "/treatments", hash: "family", label: "Family & Pediatric" },
  { to: "/treatments", hash: "hygiene", label: "Hygiene & Prevention" },
] as const;

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/reviews", label: "Reviews" },
  { to: "/atelier", label: "Atelier" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-4">
          <img src={logo} alt="ORA" className="h-10 w-10" width={40} height={40} />
          <div className="flex items-center gap-4">
            <span className="font-display text-3xl leading-none tracking-tight text-foreground">ORA</span>
            <span className="hidden h-7 w-px bg-foreground/30 sm:block" />
            <span className="hidden font-sans-tight text-[0.7rem] text-foreground/70 sm:inline">
              Dental &amp; Aesthetic Clinic
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            to="/"
            className="font-sans-tight text-foreground/70 transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>

          {/* Treatments dropdown */}
          <div className="group relative">
            <Link
              to="/treatments"
              className="inline-flex items-center gap-1 font-sans-tight text-foreground/70 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              Treatments
              <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-sm border border-border bg-background p-2 shadow-lg">
                {treatments.map((t) => (
                  <Link
                    key={t.label}
                    to={t.to}
                    hash={t.hash}
                    className="block rounded-sm px-4 py-2.5 font-sans-tight text-sm text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {nav.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="font-sans-tight text-foreground/70 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden rounded-full border border-foreground px-5 py-2.5 font-sans-tight transition-colors hover:bg-foreground hover:text-background lg:inline-flex"
        >
          Book Visit
        </Link>

        <button
          className="lg:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <div className="flex flex-col px-6 py-4">
            <Link to="/" className="py-3 font-sans-tight text-foreground/80" onClick={() => setOpen(false)}>
              Home
            </Link>

            <button
              className="flex items-center justify-between py-3 font-sans-tight text-foreground/80"
              onClick={() => setMobileTreatmentsOpen((v) => !v)}
            >
              Treatments
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileTreatmentsOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileTreatmentsOpen && (
              <div className="ml-4 flex flex-col border-l border-border/60 pl-4">
                <Link to="/treatments" className="py-2 font-sans-tight text-sm text-foreground/70" onClick={() => setOpen(false)}>
                  All treatments
                </Link>
                {treatments.map((t) => (
                  <Link
                    key={t.label}
                    to={t.to}
                    hash={t.hash}
                    className="py-2 font-sans-tight text-sm text-foreground/70"
                    onClick={() => setOpen(false)}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            )}

            {nav.slice(1).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="py-3 font-sans-tight text-foreground/80"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-foreground px-5 py-3 text-center font-sans-tight text-background"
            >
              Book Visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
