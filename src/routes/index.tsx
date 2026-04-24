import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Star, Quote, Award, Users, Clock, Smile } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";
import interior from "@/assets/clinic-interior.png";
import reception from "@/assets/clinic-reception.png";
import drAhmed from "@/assets/dr-ahmed.jpg";
import drRoha from "@/assets/dr-roha.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ORA Dental & Aesthetic Clinic — Islamabad" },
      { name: "description", content: "Quiet-luxury dentistry and aesthetics in F-7 Islamabad. Specialists in clear aligners. Led by Dr. Ahmed Sultan & Dr. Roha Ejaz." },
      { property: "og:title", content: "ORA Dental & Aesthetic Clinic" },
      { property: "og:description", content: "Sculpted smiles. Quiet luxury dentistry in F-7 Islamabad." },
    ],
  }),
  component: HomePage,
});

const stats = [
  { icon: Smile, k: "1,200+", v: "Smiles transformed" },
  { icon: Users, k: "240+", v: "5-star reviews" },
  { icon: Award, k: "15+", v: "Years combined experience" },
  { icon: Clock, k: "98%", v: "Case predictability" },
];

const services = [
  { title: "Cosmetic Dentistry", desc: "Veneers, whitening, smile design — sculpted to your features." },
  { title: "Clear Aligners", desc: "Near-invisible, 3D-planned aligner therapy for discreet movement." },
  { title: "Implants & Restorative", desc: "Quiet, considered restorations that age beautifully." },
  { title: "Aesthetic Treatments", desc: "Subtle facial harmony — botox, fillers, skin care." },
  { title: "Pediatric Care", desc: "Gentle first visits in a calm, sensory-aware setting." },
  { title: "Preventive & Hygiene", desc: "Considered routines for a lifetime of healthy teeth." },
];

const pillars = [
  { n: "01", t: "Restraint", d: "We do less, more carefully. The smallest intervention that achieves the most natural result — always." },
  { n: "02", t: "Precision", d: "Digital scans, 3D treatment planning, microscope-aided dentistry. Modern tools, classical hands." },
  { n: "03", t: "Calm", d: "Long appointments. Real conversations. The pace and the space engineered to lower your shoulders before we recline the chair." },
];

const testimonials = [
  { name: "Sana Khalid", role: "Clear aligners · 9 months", quote: "ORA didn't feel like a clinic — it felt like a quiet ritual. My smile is finally mine, and the team made every step calm." },
  { name: "Hamza Riaz", role: "Veneers", quote: "Dr. Sultan's eye for proportion is extraordinary. People notice something different — they just can't place what." },
  { name: "Mehwish Tariq", role: "Aesthetic + dental", quote: "The space alone disarms you. Dr. Roha is gentle, precise, and unhurried. I drive across the city to come here." },
];

const marqueeItems = [
  "Sculpted smiles, considered care",
  "Specialists in clear aligners",
  "Cosmetic & aesthetic dentistry",
  "F-7 Markaz · Islamabad",
  "By appointment only",
  "Led by Dr. Ahmed Sultan & Dr. Roha Ejaz",
];

function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="hero-texture relative overflow-hidden">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pt-16 pb-24 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-24 lg:pb-32">
          <div className="lg:col-span-7">
            <SectionLabel>Islamabad · Est. 2024</SectionLabel>
            <h1 className="fade-up mt-8 font-display text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]">
              A quieter way<br />
              to care for<br />
              <span className="italic text-accent-foreground/80">your smile.</span>
            </h1>
            <p className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-foreground/70">
              ORA is a dental and aesthetic atelier in F-7 Islamabad — where clinical precision meets the calm of a private retreat. Sculpted smiles, considered care.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 font-sans-tight text-background transition-all hover:gap-4">
                Book a Consultation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/treatments" className="inline-flex items-center gap-2 rounded-full border border-foreground/30 px-7 py-4 font-sans-tight transition-colors hover:border-foreground">
                Our Treatments
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="arch-frame relative h-[480px] w-full overflow-hidden bg-secondary md:h-[560px]">
              <img src={reception} alt="ORA reception" className="h-full w-full object-cover" width={800} height={1000} />
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative border-y border-border bg-foreground py-5 text-background">
          <div className="flex overflow-hidden">
            <div className="marquee flex shrink-0 items-center gap-16 whitespace-nowrap pr-16 font-sans-tight">
              {marqueeItems.map((t, i) => (
                <span key={`a-${i}`} className="flex items-center gap-3">
                  <Sparkles className="h-3 w-3 text-accent" />
                  {t}
                </span>
              ))}
            </div>
            <div className="marquee flex shrink-0 items-center gap-16 whitespace-nowrap pr-16 font-sans-tight" aria-hidden>
              {marqueeItems.map((t, i) => (
                <span key={`b-${i}`} className="flex items-center gap-3">
                  <Sparkles className="h-3 w-3 text-accent" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden border-x border-border bg-border lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v} className="bg-background px-8 py-12 lg:px-10 lg:py-16">
              <s.icon className="h-6 w-6 text-accent" />
              <div className="mt-6 font-display text-4xl tracking-tight md:text-5xl">{s.k}</div>
              <div className="mt-3 font-sans-tight text-sm text-foreground/60">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="arch-frame relative h-[520px] overflow-hidden bg-secondary">
              <img src={interior} alt="Inside ORA clinic" className="h-full w-full object-cover" loading="lazy" width={800} height={1000} />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
            <SectionLabel>The atelier</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
              Dentistry, but slower.<br />
              <span className="italic text-foreground/60">Considered, sculptural, calm.</span>
            </h2>
            <p className="mt-6 text-foreground/70">
              We designed ORA the way we practice — with restraint. Arched alcoves, sage textiles, hand-thrown ceramics, warm shoji light. Every detail is engineered to lower your shoulders before we ever recline the chair.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 font-sans-tight text-accent hover:underline">
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel>What we do</SectionLabel>
              <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">Care, considered.</h2>
            </div>
            <Link to="/treatments" className="font-sans-tight text-foreground/70 hover:text-foreground">All treatments →</Link>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="group bg-background p-10 transition-colors hover:bg-secondary">
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-2xl">{s.title}</h3>
                  <ArrowRight className="h-5 w-5 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-4 text-foreground/65">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
        <SectionLabel>The hands</SectionLabel>
        <h2 className="mt-6 max-w-3xl font-display text-4xl leading-tight md:text-5xl">
          Two doctors. <span className="italic text-foreground/60">One philosophy of restraint.</span>
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {[
            { img: drAhmed, name: "Dr. Ahmed Sultan", role: "Cosmetic & Restorative", bio: "An eye for proportion shaped by a decade of cosmetic work — Dr. Sultan leads our smile-design and clear aligner cases." },
            { img: drRoha, name: "Dr. Roha Ejaz", role: "Aesthetic & Pediatric", bio: "Calm, precise, and unhurried — Dr. Ejaz brings a quiet warmth to aesthetic treatments and family dentistry." },
          ].map((d) => (
            <article key={d.name} className="group">
              <div className="arch-frame relative h-[560px] overflow-hidden bg-secondary">
                <img src={d.img} alt={d.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={768} height={960} />
              </div>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="font-display text-3xl">{d.name}</h3>
                <span className="font-sans-tight text-muted-foreground">{d.role}</span>
              </div>
              <p className="mt-3 max-w-md text-foreground/70">{d.bio}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY (replaces Aligno section) */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel><span className="text-background/60">Our philosophy</span></SectionLabel>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
                Three quiet<br />
                <span className="italic text-accent">commitments.</span>
              </h2>
              <p className="mt-6 max-w-md text-background/70">
                Everything we do at ORA — from the first consultation to the final polish — is shaped by these three ideas. They're how we practice. They're why patients stay.
              </p>
              <Link to="/about" className="mt-10 inline-flex items-center gap-3 rounded-full border border-background/40 px-7 py-4 font-sans-tight transition-colors hover:bg-background hover:text-foreground">
                Read our story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-px border border-background/15 bg-background/15">
                {pillars.map((p) => (
                  <div key={p.n} className="bg-foreground p-10">
                    <div className="flex items-baseline gap-6">
                      <span className="font-display text-3xl text-accent">{p.n}</span>
                      <h3 className="font-display text-3xl">{p.t}</h3>
                    </div>
                    <p className="mt-4 max-w-2xl text-background/70">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
        <div className="flex items-end justify-between">
          <div>
            <SectionLabel>Voices</SectionLabel>
            <h2 className="mt-6 font-display text-4xl md:text-5xl">Trusted, quietly.</h2>
          </div>
          <div className="hidden items-center gap-1 md:flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="bg-background p-10">
              <Quote className="h-7 w-7 text-accent" />
              <blockquote className="mt-6 font-display text-xl leading-relaxed text-foreground/85">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8">
                <div className="font-display text-lg">{t.name}</div>
                <div className="font-sans-tight text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/reviews" className="font-sans-tight text-accent hover:underline">
            Read all reviews →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="relative overflow-hidden rounded-sm bg-secondary px-8 py-20 text-center md:px-20 md:py-32">
          <SectionLabel><span className="mx-auto">Begin</span></SectionLabel>
          <h2 className="mt-6 font-display text-5xl leading-tight md:text-7xl">
            Your smile,<br />
            <span className="italic text-foreground/60">slowly considered.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-foreground/70">
            Book a private consultation. We'll listen first, plan with care, and never rush a single decision.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="rounded-full bg-foreground px-8 py-4 font-sans-tight text-background hover:bg-foreground/85">
              Book a Consultation
            </Link>
            <a href="tel:+925100000000" className="rounded-full border border-foreground/30 px-8 py-4 font-sans-tight hover:border-foreground">
              +92 51 000 0000
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
