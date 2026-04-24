import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";
import { ThreeScene } from "@/components/ThreeScene";
import aligners from "@/assets/aligners.jpg";

export const Route = createFileRoute("/aligno")({
  head: () => ({
    meta: [
      { title: "Aligno Clear Aligners — Exclusive Islamabad Provider | ORA" },
      { name: "description", content: "ORA Clinic is the only Aligno aligner provider in Islamabad. 3D-planned, near-invisible orthodontic care led by Dr. Ahmed Sultan and Dr. Roha Ejaz." },
      { property: "og:title", content: "Aligno × ORA — Exclusive Islamabad partner" },
      { property: "og:description", content: "Next-generation clear aligners, planned and delivered with sculptural precision." },
    ],
  }),
  component: AlignoPage,
});

const steps = [
  { n: "01", t: "Consultation", d: "A private appointment to understand your goals, lifestyle, and dental history." },
  { n: "02", t: "3D Scan & Plan", d: "Your treatment is mapped tooth-by-tooth in Aligno's planning software, reviewed by your doctor." },
  { n: "03", t: "Aligner Series", d: "A custom series of nearly invisible aligners, changed every 1–2 weeks, worn 22 hours a day." },
  { n: "04", t: "Refine & Retain", d: "Final polish, micro-adjustments, and discreet retainers to keep your smile still." },
];

const benefits = [
  "Near-invisible — wear them anywhere",
  "Removable for meals & cleaning",
  "3D-planned for predictable movement",
  "Fewer in-clinic visits than braces",
  "Clinician-led at every milestone",
  "Designed for adult & teen lifestyles",
];

function AlignoPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-20 pb-24 lg:grid-cols-12 lg:px-10 lg:pt-28 lg:pb-32">
          <div className="lg:col-span-7">
            <SectionLabel><span className="text-background/60">Exclusive partnership</span></SectionLabel>
            <h1 className="mt-8 font-display text-5xl leading-[1.02] md:text-7xl lg:text-[5.5rem]">
              Aligno <span className="italic text-accent">×</span> ORA<br />
              <span className="italic text-background/60">Islamabad's only<br />certified provider.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-background/70">
              We are the exclusive partner of <a className="underline decoration-accent underline-offset-4" href="https://aligno.co" target="_blank" rel="noreferrer">aligno.co</a> in Islamabad — bringing next-generation clear aligner technology to a city that's been waiting for it.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="rounded-full bg-background px-7 py-4 font-sans-tight text-foreground hover:bg-background/90">
                Book Aligno Consultation
              </Link>
              <a href="https://aligno.co" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-background/40 px-7 py-4 font-sans-tight hover:bg-background hover:text-foreground">
                Visit aligno.co <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <ThreeScene className="h-[420px] w-full lg:h-[520px]" />
            <div className="absolute bottom-4 right-4 rounded-full bg-accent px-4 py-2 font-sans-tight text-foreground">
              Certified provider
            </div>
          </div>
        </div>
      </section>

      {/* Image + benefits */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="arch-frame relative h-[560px] overflow-hidden bg-secondary">
              <img src={aligners} alt="Aligno clear aligners" className="h-full w-full object-cover" loading="lazy" width={1280} height={960} />
            </div>
          </div>
          <div className="lg:col-span-6 lg:pt-10">
            <SectionLabel>Why Aligno</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
              Quietly worn.<br />
              <span className="italic text-foreground/60">Precisely planned.</span>
            </h2>
            <p className="mt-6 text-foreground/70">
              Aligno is engineered for the way modern lives are actually lived — discreet enough for the boardroom, removable for dinner, and planned with a level of 3D precision that makes outcomes genuinely predictable.
            </p>
            <ul className="mt-8 grid gap-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 text-accent" />
                  <span className="text-foreground/80">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
          <SectionLabel>The journey</SectionLabel>
          <h2 className="mt-6 max-w-2xl font-display text-4xl md:text-5xl">Four quiet steps to your new smile.</h2>
          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="bg-background p-10">
                <div className="font-display text-5xl text-accent">{s.n}</div>
                <h3 className="mt-6 font-display text-2xl">{s.t}</h3>
                <p className="mt-3 text-foreground/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="rounded-sm bg-secondary px-8 py-20 text-center md:px-20 md:py-32">
          <h2 className="font-display text-5xl md:text-6xl">Ready to begin?</h2>
          <p className="mx-auto mt-6 max-w-xl text-foreground/70">
            Book your private Aligno consultation with Dr. Sultan or Dr. Ejaz. We'll scan, plan, and walk you through every step.
          </p>
          <Link to="/contact" className="mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 font-sans-tight text-background hover:bg-foreground/85">
            Book Consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
