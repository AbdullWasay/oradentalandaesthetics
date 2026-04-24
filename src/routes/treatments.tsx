import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Treatments — ORA Dental & Aesthetic Clinic" },
      { name: "description", content: "Cosmetic dentistry, clear aligners, implants, aesthetic treatments and pediatric care in Islamabad." },
      { property: "og:title", content: "Treatments — ORA Clinic" },
      { property: "og:description", content: "Considered dentistry and aesthetics, end to end." },
    ],
  }),
  component: TreatmentsPage,
});

const groups = [
  {
    id: "cosmetic",
    label: "Cosmetic",
    items: [
      { t: "Smile Design", d: "Bespoke planning of shape, shade and proportion — built around your face, not a template." },
      { t: "Porcelain Veneers", d: "Hand-layered ceramics that catch light the way natural enamel does." },
      { t: "Professional Whitening", d: "Calibrated, gentle protocols for a clean, true-to-you brightness." },
    ],
  },
  {
    id: "orthodontics",
    label: "Orthodontics",
    items: [
      { t: "Clear Aligners", d: "Near-invisible, 3D-planned aligner therapy. Predictable, discreet, and lifestyle-friendly." },
      { t: "Retention", d: "Discreet retainers and lifetime guidance to keep your result still." },
    ],
  },
  {
    id: "restorative",
    label: "Restorative",
    items: [
      { t: "Dental Implants", d: "Single, multiple and full-arch — restored with surgical precision and aesthetic intent." },
      { t: "Crowns & Bridges", d: "Materials chosen to age the way your smile does." },
      { t: "Root Canal Therapy", d: "Modern, comfortable, often single-visit." },
    ],
  },
  {
    id: "aesthetic",
    label: "Aesthetic",
    items: [
      { t: "Botox & Fillers", d: "Subtle facial harmony — never overdone. Lip, jaw, smile-line refinement." },
      { t: "Skin & Glow", d: "Medical-grade facials and peels for luminous, healthy skin." },
    ],
  },
  {
    id: "family",
    label: "Family & Pediatric",
    items: [
      { t: "Pediatric Dentistry", d: "Gentle first visits in a calm, sensory-aware setting." },
      { t: "Family Care Plans", d: "Coordinated, considered care for every member of your family." },
    ],
  },
  {
    id: "hygiene",
    label: "Hygiene & Prevention",
    items: [
      { t: "Scale & Polish", d: "Quiet, thorough hygiene visits that leave you genuinely refreshed." },
      { t: "Preventive Care", d: "Considered routines for a lifetime of healthy teeth." },
    ],
  },
];

function TreatmentsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pt-20 pb-12 lg:px-10 lg:pt-32">
        <SectionLabel>Treatments</SectionLabel>
        <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">
          End to end,<br />
          <span className="italic text-foreground/60">considered care.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-foreground/70">
          From a single hygiene visit to a full smile transformation — every treatment at ORA is delivered with the same restraint and the same standard.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="space-y-24">
          {groups.map((g) => (
            <div key={g.id} id={g.id} className="grid scroll-mt-24 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <div className="font-sans-tight text-accent">— {g.label}</div>
              </div>
              <div className="lg:col-span-9">
                <div className="grid gap-px border border-border bg-border md:grid-cols-2">
                  {g.items.map((s) => (
                    <div key={s.t} className="bg-background p-10">
                      <h3 className="font-display text-2xl">{s.t}</h3>
                      <p className="mt-3 text-foreground/70">{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="rounded-sm bg-foreground px-8 py-20 text-center text-background md:px-20">
          <h2 className="font-display text-4xl md:text-6xl">Not sure where to begin?</h2>
          <p className="mx-auto mt-6 max-w-xl text-background/70">
            Book a 30-minute private consultation. We'll listen, examine, and show you the smallest path to the result you want.
          </p>
          <Link to="/contact" className="mt-10 inline-flex items-center gap-3 rounded-full bg-background px-8 py-4 font-sans-tight text-foreground hover:bg-background/90">
            Book Consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
