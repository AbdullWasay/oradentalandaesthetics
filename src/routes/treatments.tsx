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
    id: "preventive",
    label: "Preventive",
    tagline: "The foundation of lasting health.",
    items: [
      { t: "Dental Check-ups & Oral Exams", d: "Thorough, unhurried examinations to catch concerns early and plan considered care.", minutes: "30 min", from: "Per visit" },
      { t: "Professional Teeth Cleaning", d: "Scaling and polishing that leaves teeth genuinely refreshed — never abrasive.", minutes: "45 min", from: "Per visit" },
      { t: "Fluoride Treatment", d: "Topical fluoride application to strengthen enamel and protect against decay.", minutes: "15 min", from: "Per visit" },
      { t: "Dental Sealants", d: "Thin protective coatings for molars — quietly preventing cavities for years.", minutes: "20 min", from: "Per tooth" },
      { t: "Digital Dental X-rays", d: "Low-radiation digital imaging for precise diagnosis and treatment planning.", minutes: "10 min", from: "Per visit" },
      { t: "Oral Hygiene Education", d: "Personalised brushing, flossing and dietary guidance for a healthier mouth at home.", minutes: "20 min", from: "Included" },
    ],
  },
  {
    id: "restorative",
    label: "Restorative",
    tagline: "Quietly engineered to last.",
    items: [
      { t: "Tooth-Colored Fillings", d: "Composite fillings hand-shaded to disappear into your natural enamel.", minutes: "30–45 min", from: "Per tooth" },
      { t: "Dental Bonding", d: "Sculpted composite repairs for chips, gaps and minor reshaping — no drilling.", minutes: "45 min", from: "Per tooth" },
      { t: "Crowns", d: "Custom porcelain crowns engineered for strength and to age the way your smile does.", minutes: "2 visits", from: "Per unit" },
      { t: "Bridges", d: "Fixed bridges to close gaps with seamless aesthetics and reliable function.", minutes: "2 visits", from: "Per unit" },
      { t: "Inlays & Onlays", d: "Conservative lab-made restorations when a filling isn't enough and a crown is too much.", minutes: "2 visits", from: "Per tooth" },
      { t: "Denture Repairs & Relining", d: "Refits, relines and repairs to keep your dentures comfortable and secure.", minutes: "Same day", from: "Per case" },
    ],
  },
  {
    id: "endodontics",
    label: "Endodontics",
    tagline: "Save the tooth. Quietly.",
    items: [
      { t: "Root Canal Therapy (RCT)", d: "Modern, comfortable endodontics — often completed in a single visit.", minutes: "60–90 min", from: "Per tooth" },
      { t: "Root Canal Retreatment", d: "Careful re-treatment of previously root-canalled teeth to resolve persistent issues.", minutes: "90 min", from: "Per tooth" },
      { t: "Pulp Capping", d: "A conservative step to protect the pulp and avoid full root canal therapy where possible.", minutes: "30 min", from: "Per tooth" },
    ],
  },
  {
    id: "extractions",
    label: "Extractions",
    tagline: "Gentle removal, calm recovery.",
    items: [
      { t: "Simple Tooth Extraction", d: "Atraumatic removal of damaged or non-restorable teeth under local anaesthetic.", minutes: "30 min", from: "Per tooth" },
      { t: "Surgical Tooth Extraction", d: "Surgical removal of broken, impacted or complex teeth — handled with care.", minutes: "45–60 min", from: "Per tooth" },
      { t: "Wisdom Tooth Evaluation", d: "X-ray based assessment and planning for wisdom teeth — only removed when needed.", minutes: "30 min", from: "Consult" },
      { t: "Emergency Tooth Removal", d: "Same-day extractions when a tooth is fractured, infected or beyond repair.", minutes: "Same day", from: "Per tooth" },
    ],
  },
  {
    id: "gums",
    label: "Gum Care",
    tagline: "Healthy gums, lasting smiles.",
    items: [
      { t: "Scaling & Root Planing", d: "Deep cleaning beneath the gumline to treat early periodontal disease.", minutes: "60 min", from: "Per quadrant" },
      { t: "Gingivitis Treatment", d: "Targeted treatment and home-care plans to reverse early gum inflammation.", minutes: "45 min", from: "Per visit" },
      { t: "Periodontal Maintenance", d: "Ongoing supportive cleanings for patients with a history of gum disease.", minutes: "60 min", from: "Per visit" },
      { t: "Gum Infection Management", d: "Diagnosis and management of acute gum infections and abscesses.", minutes: "30–45 min", from: "Per visit" },
    ],
  },
  {
    id: "emergency",
    label: "Emergency Care",
    tagline: "Same-day relief when it matters.",
    items: [
      { t: "Toothache Relief", d: "Same-day diagnosis and pain relief for acute dental pain.", minutes: "Same day", from: "Per visit" },
      { t: "Broken or Chipped Tooth Repair", d: "Quick aesthetic and structural repair for fractured front and back teeth.", minutes: "45 min", from: "Per tooth" },
      { t: "Lost Filling or Crown Replacement", d: "Re-cementing or replacement of fillings and crowns lost while eating.", minutes: "30 min", from: "Per tooth" },
      { t: "Swelling & Infection Treatment", d: "Antibiotic management and drainage for facial swelling and dental abscesses.", minutes: "Same day", from: "Per visit" },
      { t: "Emergency Extractions", d: "Urgent removal of unsalvageable teeth to resolve pain and infection.", minutes: "Same day", from: "Per tooth" },
    ],
  },
  {
    id: "pediatric",
    label: "Pediatric",
    tagline: "Calm care for little patients.",
    items: [
      { t: "Children's Dental Check-ups", d: "Sensory-aware first visits that build a lifelong, fearless relationship with dentistry.", minutes: "30 min", from: "Per visit" },
      { t: "Children's Teeth Cleaning", d: "Gentle scaling and polishing tailored to young patients.", minutes: "30 min", from: "Per visit" },
      { t: "Fluoride Applications", d: "Protective fluoride varnish for developing teeth.", minutes: "15 min", from: "Per visit" },
      { t: "Sealants for Children", d: "Protective coatings on permanent molars as they erupt.", minutes: "20 min", from: "Per tooth" },
      { t: "Baby Tooth Fillings", d: "Tooth-coloured fillings for primary teeth, placed with patience and care.", minutes: "30 min", from: "Per tooth" },
      { t: "Space Maintainers", d: "Custom appliances to preserve space for permanent teeth after early loss.", minutes: "2 visits", from: "Per appliance" },
    ],
  },
  {
    id: "minor-cosmetic",
    label: "Minor Cosmetic",
    tagline: "Small refinements, real difference.",
    items: [
      { t: "Tooth Contouring & Reshaping", d: "Subtle reshaping of edges and contours for a more harmonious smile line.", minutes: "30 min", from: "Per tooth" },
      { t: "Diastema (Gap) Bonding", d: "Composite bonding to close small midline and lateral gaps — same day.", minutes: "60 min", from: "Per case" },
      { t: "Temporary Crowns", d: "Provisional crowns to protect prepared teeth between visits.", minutes: "30 min", from: "Per tooth" },
      { t: "Temporary Fillings", d: "Interim restorations for staged treatments or emergency care.", minutes: "20 min", from: "Per tooth" },
    ],
  },
  {
    id: "oral-health",
    label: "Oral Health",
    tagline: "Beyond the chair.",
    items: [
      { t: "Bad Breath (Halitosis) Treatment", d: "Diagnosis and management of persistent bad breath — clinical and lifestyle.", minutes: "30 min", from: "Per visit" },
      { t: "Tooth Sensitivity Treatment", d: "Targeted desensitising treatments for cold, hot and sweet sensitivity.", minutes: "30 min", from: "Per visit" },
      { t: "Night Guards (Bruxism)", d: "Custom night guards to protect teeth from grinding and clenching.", minutes: "2 visits", from: "Per guard" },
      { t: "Sports Mouth Guards", d: "Custom-fitted mouth guards for athletes — comfortable, protective, durable.", minutes: "2 visits", from: "Per guard" },
    ],
  },
  {
    id: "diagnostic",
    label: "Diagnostic",
    tagline: "See clearly, plan precisely.",
    items: [
      { t: "Comprehensive Oral Examination", d: "Full-mouth assessment of teeth, gums, bite and soft tissues.", minutes: "45 min", from: "Per visit" },
      { t: "Digital X-rays", d: "High-resolution digital imaging with minimal radiation.", minutes: "10 min", from: "Per visit" },
      { t: "Treatment Planning & Consultation", d: "Detailed, written treatment plans with phased options and clear pricing.", minutes: "45 min", from: "Consult" },
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
