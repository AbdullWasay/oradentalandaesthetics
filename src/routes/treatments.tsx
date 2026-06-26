import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Treatments — ORA Dental Wellness" },
      { name: "description", content: "Clear aligners, dental implants and general dentistry in Bahria Town Phase 4, Rawalpindi." },
      { property: "og:title", content: "Treatments — ORA Clinic" },
      { property: "og:description", content: "Considered dentistry and aesthetics, end to end." },
    ],
  }),
  component: TreatmentsPage,
});

type Item = { t: string; d: string; minutes: string; from: string };
type Group = { id: string; label: string; tagline: string; items: Item[] };

const groups: Group[] = [
  {
    id: "cosmetic",
    label: "Cosmetic",
    tagline: "Light, proportion, restraint.",
    items: [
      { t: "Smile Design", d: "Bespoke planning of shape, shade and proportion — built around your face, not a template.", minutes: "60 min", from: "Consult" },
      { t: "Porcelain Veneers", d: "Hand-layered ceramics that catch light the way natural enamel does.", minutes: "2 visits", from: "PKR — on plan" },
      { t: "Professional Whitening", d: "Calibrated, gentle protocols for a clean, true-to-you brightness.", minutes: "75 min", from: "Single visit" },
    ],
  },
  {
    id: "orthodontics",
    label: "Orthodontics",
    tagline: "Discreet movement, predictable result.",
    items: [
      { t: "Clear Aligners", d: "Near-invisible, 3D-planned aligner therapy. Predictable, discreet, and lifestyle-friendly.", minutes: "6–18 mo", from: "Plan-based" },
      { t: "Retention", d: "Discreet retainers and lifetime guidance to keep your result still.", minutes: "30 min", from: "Per arch" },
    ],
  },
  {
    id: "restorative",
    label: "Restorative",
    tagline: "Quietly engineered to last.",
    items: [
      { t: "Dental Implants", d: "Single, multiple and full-arch — restored with surgical precision and aesthetic intent.", minutes: "Staged", from: "Per implant" },
      { t: "Crowns & Bridges", d: "Materials chosen to age the way your smile does.", minutes: "2 visits", from: "Per unit" },
      { t: "Root Canal Therapy", d: "Modern, comfortable, often single-visit.", minutes: "60–90 min", from: "Per tooth" },
    ],
  },
  {
    id: "aesthetic",
    label: "Aesthetic",
    tagline: "Subtle facial harmony.",
    items: [
      { t: "Botox & Fillers", d: "Subtle facial harmony — never overdone. Lip, jaw, smile-line refinement.", minutes: "30–45 min", from: "Per area" },
      { t: "Skin & Glow", d: "Medical-grade facials and peels for luminous, healthy skin.", minutes: "60 min", from: "Per session" },
    ],
  },
  {
    id: "family",
    label: "Family & Pediatric",
    tagline: "Calm care, all ages.",
    items: [
      { t: "Pediatric Dentistry", d: "Gentle first visits in a calm, sensory-aware setting.", minutes: "30 min", from: "Per visit" },
      { t: "Family Care Plans", d: "Coordinated, considered care for every member of your family.", minutes: "Annual", from: "Plan-based" },
    ],
  },
  {
    id: "hygiene",
    label: "Hygiene & Prevention",
    tagline: "Quiet maintenance, lasting health.",
    items: [
      { t: "Scale & Polish", d: "Quiet, thorough hygiene visits that leave you genuinely refreshed.", minutes: "45 min", from: "Per visit" },
      { t: "Preventive Care", d: "Considered routines for a lifetime of healthy teeth.", minutes: "Ongoing", from: "Plan-based" },
    ],
  },
];

function TreatmentsPage() {
  const [activeId, setActiveId] = useState(groups[0].id);
  const [hover, setHover] = useState<string | null>(null);
  const active = groups.find((g) => g.id === activeId)!;

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden hero-texture">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 lg:px-10 lg:pt-36 lg:pb-28">
          <SectionLabel>The Treatment Index</SectionLabel>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <h1 className="lg:col-span-8 font-display text-5xl leading-[1.02] md:text-7xl lg:text-[5.5rem]">
              A quiet catalogue of<br />
              <span className="italic text-foreground/55">considered care.</span>
            </h1>
            <div className="lg:col-span-4 lg:pt-6">
              <p className="text-foreground/70 text-lg max-w-md">
                From a single hygiene visit to a full smile transformation — every treatment is delivered with the same restraint and the same standard.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-sans-tight text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{groups.reduce((n, g) => n + g.items.length, 0)} treatments · 6 disciplines</span>
              </div>
            </div>
          </div>

          {/* Marquee of disciplines */}
          <div className="relative mt-20 overflow-hidden border-y border-border/60 py-6">
            <div className="marquee flex w-max items-center gap-12 whitespace-nowrap font-display text-3xl md:text-5xl">
              {[...groups, ...groups].map((g, i) => (
                <span key={i} className="flex items-center gap-12 text-foreground/30">
                  {g.label}
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE INDEX */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky vertical category nav */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionLabel>Disciplines</SectionLabel>
              <ul className="mt-8 space-y-1">
                {groups.map((g, i) => {
                  const isActive = g.id === activeId;
                  return (
                    <li key={g.id}>
                      <button
                        onClick={() => setActiveId(g.id)}
                        className={`group flex w-full items-baseline gap-4 border-b border-border py-4 text-left transition-colors ${
                          isActive ? "text-foreground" : "text-foreground/45 hover:text-foreground/80"
                        }`}
                      >
                        <span className="font-sans-tight w-8 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 font-display text-2xl md:text-3xl leading-tight">
                          {g.label}
                        </span>
                        <span
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-all ${
                            isActive
                              ? "bg-foreground text-background rotate-0"
                              : "bg-transparent border border-border -rotate-45 group-hover:rotate-0"
                          }`}
                          aria-hidden
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Active discipline panel */}
          <div className="lg:col-span-8">
            <div key={active.id} className="fade-up">
              <div className="flex items-end justify-between gap-6 pb-8 border-b border-border">
                <div>
                  <div className="font-sans-tight text-accent">— {active.label}</div>
                  <h2 className="mt-3 font-display text-4xl md:text-5xl italic text-foreground/80">
                    {active.tagline}
                  </h2>
                </div>
                <span className="hidden md:block font-sans-tight text-muted-foreground">
                  {active.items.length} treatments
                </span>
              </div>

              <ul className="mt-2">
                {active.items.map((item, idx) => {
                  const key = `${active.id}-${idx}`;
                  const isHover = hover === key;
                  return (
                    <li
                      key={key}
                      onMouseEnter={() => setHover(key)}
                      onMouseLeave={() => setHover(null)}
                      className="group relative border-b border-border"
                    >
                      {/* Sage wash on hover */}
                      <span
                        className={`pointer-events-none absolute inset-0 origin-left transition-transform duration-700 ease-out ${
                          isHover ? "scale-x-100" : "scale-x-0"
                        }`}
                        style={{ background: "color-mix(in oklab, var(--sage) 18%, transparent)" }}
                        aria-hidden
                      />
                      <div className="relative grid grid-cols-12 items-start gap-4 py-8 md:py-10">
                        <div className="col-span-2 md:col-span-1 font-sans-tight text-foreground/40 pt-2">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <div className="col-span-10 md:col-span-7">
                          <h3
                            className={`font-display text-3xl md:text-4xl transition-transform duration-500 ${
                              isHover ? "translate-x-2" : "translate-x-0"
                            }`}
                          >
                            {item.t}
                          </h3>
                          <p
                            className={`mt-3 max-w-xl text-foreground/70 transition-all duration-500 ${
                              isHover ? "opacity-100 translate-y-0" : "opacity-70 translate-y-0"
                            }`}
                          >
                            {item.d}
                          </p>
                        </div>
                        <div className="col-span-12 md:col-span-3 flex md:flex-col md:items-end gap-4 md:gap-1 pt-2 md:text-right">
                          <div className="font-sans-tight text-foreground/60">{item.minutes}</div>
                          <div className="text-sm text-muted-foreground">{item.from}</div>
                        </div>
                        <div className="col-span-12 md:col-span-1 hidden md:flex justify-end pt-2">
                          <span
                            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/30 transition-all ${
                              isHover ? "bg-foreground text-background border-foreground rotate-0 scale-110" : "rotate-[-30deg]"
                            }`}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="relative overflow-hidden rounded-sm bg-foreground px-8 py-20 text-center text-background md:px-20">
          <div className="grain absolute inset-0 opacity-60" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl">Not sure where to begin?</h2>
            <p className="mx-auto mt-6 max-w-xl text-background/70">
              Book a 30-minute private consultation. We'll listen, examine, and show you the smallest path to the result you want.
            </p>
            <Link to="/contact" className="mt-10 inline-flex items-center gap-3 rounded-full bg-background px-8 py-4 font-sans-tight text-foreground hover:bg-background/90">
              Book Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
