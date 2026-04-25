import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Star, Award, Users, Clock, Smile, Scissors, AlignLeft, Gem, Wand2, Baby, Leaf, MapPin, Phone, CalendarDays, MessageCircle, User as UserIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";
import { TeamCarousel } from "@/components/TeamCarousel";
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
  { icon: Gem, num: "01", title: "Cosmetic Dentistry", desc: "Veneers, whitening, smile design — sculpted to your features.", tag: "Signature" },
  { icon: AlignLeft, num: "02", title: "Clear Aligners", desc: "Near-invisible, 3D-planned aligner therapy for discreet movement.", tag: "Specialty" },
  { icon: Scissors, num: "03", title: "Implants & Restorative", desc: "Quiet, considered restorations that age beautifully.", tag: "Precision" },
  { icon: Wand2, num: "04", title: "Aesthetic Treatments", desc: "Subtle facial harmony — botox, fillers, considered skin care.", tag: "Aesthetic" },
  { icon: Baby, num: "05", title: "Pediatric Care", desc: "Gentle first visits in a calm, sensory-aware setting.", tag: "Family" },
  { icon: Leaf, num: "06", title: "Preventive & Hygiene", desc: "Considered routines for a lifetime of healthy teeth.", tag: "Wellness" },
];

const pillars = [
  { n: "01", t: "Restraint", d: "We do less, more carefully. The smallest intervention that achieves the most natural result — always." },
  { n: "02", t: "Precision", d: "Digital scans, 3D treatment planning, microscope-aided dentistry. Modern tools, classical hands." },
  { n: "03", t: "Calm", d: "Long appointments. Real conversations. The pace and the space engineered to lower your shoulders before we recline the chair." },
];

type Testimonial = {
  name: string; role: string; quote: string; initials: string; tone: "sage" | "ink" | "soft";
};
const testimonials: Testimonial[] = [
  { name: "Sana Khalid", role: "Clear aligners · 9 months", initials: "SK", tone: "sage", quote: "ORA didn't feel like a clinic — it felt like a quiet ritual. My smile is finally mine, and the team made every step calm." },
  { name: "Hamza Riaz", role: "Veneers", initials: "HR", tone: "ink", quote: "Dr. Sultan's eye for proportion is extraordinary. People notice something different — they just can't place what." },
  { name: "Mehwish Tariq", role: "Aesthetic + dental", initials: "MT", tone: "soft", quote: "The space alone disarms you. Dr. Roha is gentle, precise, and unhurried. I drive across the city to come here." },
  { name: "Ayesha Noor", role: "Whitening", initials: "AN", tone: "sage", quote: "A whitening result that actually looks like me — just rested. Subtle, not theatrical. Exactly what I wanted." },
  { name: "Bilal Ahmed", role: "Implants", initials: "BA", tone: "soft", quote: "Months later I forget which tooth was replaced. Dr. Sultan's restoration is genuinely indistinguishable." },
  { name: "Zara Imran", role: "Aligners + hygiene", initials: "ZI", tone: "ink", quote: "The most patient, considered care I've experienced. They explained everything without ever rushing." },
  { name: "Faisal Khan", role: "Smile design", initials: "FK", tone: "sage", quote: "I came in nervous. I left planning my next visit. The atelier feels nothing like a dental clinic." },
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

      {/* SERVICES — minimal symmetric grid */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>What we do</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Six disciplines.<br />
              <span className="italic text-foreground/55">One quiet practice.</span>
            </h2>
            <p className="mt-6 text-foreground/65">
              Each treatment is its own discipline — planned slowly, performed precisely.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.title}
                  to="/treatments"
                  className="group relative flex flex-col border-b border-r border-border bg-background p-10 transition-colors duration-500 hover:bg-sage-soft/40 lg:p-12"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans-tight text-xs uppercase tracking-[0.2em] text-foreground/40">
                      {s.num}
                    </span>
                    <Icon className="h-5 w-5 text-foreground/40 transition-colors group-hover:text-sage-deep" strokeWidth={1.4} />
                  </div>
                  <h3 className="mt-12 font-display text-2xl leading-tight md:text-3xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">{s.desc}</p>
                  <span className="mt-8 inline-flex items-center gap-2 font-sans-tight text-xs uppercase tracking-[0.18em] text-foreground/45 transition-all group-hover:gap-3 group-hover:text-foreground">
                    Explore <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <Link to="/treatments" className="inline-flex items-center gap-3 rounded-full border border-foreground/30 px-7 py-4 font-sans-tight transition-colors hover:border-foreground">
              View all treatments <ArrowRight className="h-4 w-4" />
            </Link>
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

      {/* MEET OUR TEAM — carousel */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>The team</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
              Meet Our <span className="italic text-sage-deep">Specialists</span>
            </h2>
            <p className="mt-6 text-foreground/70">
              An exceptionally trained team of dental surgeons and aesthetic specialists — quietly dedicated to your care in F-7 Islamabad.
            </p>
          </div>
          <div className="mt-16">
            <TeamCarousel />
          </div>
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

      {/* TESTIMONIALS — floating portraits with flip cards */}
      <section className="relative overflow-hidden bg-background">
        {/* faint vertical guide lines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, transparent 0 calc(100%/8 - 1px), color-mix(in oklab, var(--sage-deep) 18%, transparent) calc(100%/8 - 1px) calc(100%/8))",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 lg:px-10 lg:pt-32 lg:pb-44">
          {/* Floating cards row */}
          <div className="relative mx-auto h-[420px] w-full max-w-6xl md:h-[460px]">
            {testimonials.map((t, i) => {
              // Hand-placed positions to mimic a staggered portrait constellation
              const positions = [
                "left-[2%]   top-[42%] w-[120px] h-[160px] md:w-[150px] md:h-[200px] float-slow rotate-[-3deg]",
                "left-[14%]  top-[14%] w-[130px] h-[170px] md:w-[170px] md:h-[220px] float-med  rotate-[2deg]",
                "left-[28%]  top-[48%] w-[120px] h-[160px] md:w-[150px] md:h-[200px] float-fast rotate-[-2deg]",
                "left-[40%]  top-[6%]  w-[140px] h-[180px] md:w-[180px] md:h-[230px] float-slow rotate-[1deg] hidden sm:block",
                "right-[28%] top-[44%] w-[120px] h-[160px] md:w-[150px] md:h-[200px] float-med  rotate-[-1deg] hidden sm:block",
                "right-[12%] top-[10%] w-[130px] h-[170px] md:w-[170px] md:h-[220px] float-fast rotate-[3deg] hidden md:block",
                "right-[2%]  top-[46%] w-[120px] h-[160px] md:w-[150px] md:h-[200px] float-slow rotate-[-2deg] hidden md:block",
              ];
              const toneBg: Record<Testimonial["tone"], string> = {
                sage: "bg-gradient-to-br from-sage-soft via-shoji to-sage/30",
                ink:  "bg-gradient-to-br from-foreground via-foreground to-foreground/85 text-background",
                soft: "bg-gradient-to-br from-shoji via-secondary to-sage-soft",
              };
              const toneInitials: Record<Testimonial["tone"], string> = {
                sage: "text-sage-deep",
                ink:  "text-background",
                soft: "text-foreground/70",
              };
              const toneBack: Record<Testimonial["tone"], string> = {
                sage: "bg-foreground text-background",
                ink:  "bg-shoji text-foreground border border-border",
                soft: "bg-sage-deep text-background",
              };
              return (
                <div
                  key={t.name}
                  className={`flip-card absolute ${positions[i]} rounded-[14px] shadow-[0_18px_50px_-22px_rgba(0,0,0,0.35)]`}
                  tabIndex={0}
                >
                  <div className="flip-card-inner rounded-[14px]">
                    {/* FRONT — portrait */}
                    <div className={`flip-face rounded-[14px] ${toneBg[t.tone]} flex flex-col items-center justify-center p-3`}>
                      <div className={`font-display text-5xl ${toneInitials[t.tone]} md:text-6xl`}>
                        {t.initials}
                      </div>
                      <div className={`mt-3 font-sans-tight text-[10px] uppercase tracking-[0.16em] ${t.tone === "ink" ? "text-background/70" : "text-foreground/55"}`}>
                        {t.role.split("·")[0].trim()}
                      </div>
                    </div>
                    {/* BACK — quote */}
                    <div className={`flip-face flip-back rounded-[14px] ${toneBack[t.tone]} flex flex-col justify-between p-4`}>
                      <p className="font-display text-[11px] leading-snug md:text-[13px]">
                        “{t.quote}”
                      </p>
                      <div className="mt-2">
                        <div className="font-display text-sm md:text-base">{t.name}</div>
                        <div className={`font-sans-tight text-[9px] uppercase tracking-[0.14em] ${t.tone === "ink" ? "text-foreground/55" : "text-background/65"}`}>
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centered headline */}
          <div className="relative mx-auto mt-10 max-w-3xl text-center">
            <span className="inline-block rounded-full bg-secondary px-4 py-1.5 font-sans-tight text-xs uppercase tracking-[0.18em] text-foreground/70">
              Testimonials
            </span>
            <h2 className="mt-7 font-display text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Trusted by patients<br />
              <span className="italic text-foreground/55">who chose quieter care.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-foreground/65">
              Hover any portrait to read why patients from across Islamabad — and beyond — make the drive to ORA.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-sage-deep text-sage-deep" />
              ))}
              <span className="ml-2 font-sans-tight text-sm text-foreground/60">4.9 · 240+ reviews</span>
            </div>
            <Link
              to="/reviews"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 font-sans-tight text-background transition-all hover:gap-4"
            >
              Read all reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
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
