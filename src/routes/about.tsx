import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";
import interior from "@/assets/clinic-interior.png";
import reception from "@/assets/clinic-reception.png";
import drAhmed from "@/assets/dr-ahmed.jpg";
import drRoha from "@/assets/dr-roha.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ORA Dental Wellness" },
      { name: "description", content: "ORA is a dental wellness atelier in Bahria Town Phase 4, Rawalpindi founded by Dr. Ahmed Sultan and Dr. Roha Ejaz. Quiet luxury, considered care." },
      { property: "og:title", content: "About ORA — Dentistry, but slower." },
      { property: "og:description", content: "A clinic shaped like a sanctuary. Meet the doctors and the philosophy." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { k: "01", t: "Restraint", d: "We do less, more carefully. Every treatment is the smallest intervention that achieves the most natural result." },
  { k: "02", t: "Material honesty", d: "From hand-thrown ceramics in our reception to the porcelain in your veneers — we choose materials that age with grace." },
  { k: "03", t: "Time", d: "Long appointments. Real conversations. Decisions made together, never sold." },
  { k: "04", t: "Calm", d: "The space, the music, the pace — engineered to lower your nervous system before we ever begin." },
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-10 lg:pt-32">
        <SectionLabel>About ORA</SectionLabel>
        <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">
          A clinic shaped<br />
          like a <span className="italic text-foreground/60">sanctuary.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-foreground/70">
          Founded in Bahria Town Phase 4, Rawalpindi, ORA is the work of two clinicians who believe great dentistry should feel like rest, not procedure. We built a space, a team, and a method around a single idea: care, considered — focused on clear aligners, implants and general dentistry.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 lg:grid-cols-2 lg:px-10">
        <div className="arch-frame relative h-[480px] overflow-hidden bg-secondary">
          <img src={reception} alt="" className="h-full w-full object-cover" loading="lazy" width={800} height={1000} />
        </div>
        <div className="relative h-[480px] overflow-hidden bg-secondary">
          <img src={interior} alt="" className="h-full w-full object-cover" loading="lazy" width={800} height={1000} />
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
        <SectionLabel>Our values</SectionLabel>
        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2">
          {values.map((v) => (
            <div key={v.k} className="bg-background p-10">
              <div className="font-display text-5xl text-accent">{v.k}</div>
              <h3 className="mt-6 font-display text-2xl">{v.t}</h3>
              <p className="mt-3 text-foreground/70">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors */}
      <section className="border-t border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
          <SectionLabel>The doctors</SectionLabel>
          <h2 className="mt-6 font-display text-4xl md:text-5xl">Meet the team.</h2>

          <div className="mt-16 space-y-32">
            <article className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="arch-frame relative h-[600px] overflow-hidden bg-background">
                  <img src={drAhmed} alt="Dr. Ahmed Sultan" className="h-full w-full object-cover" loading="lazy" width={768} height={960} />
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
                <span className="font-sans-tight text-muted-foreground">Co-founder · Cosmetic & Restorative</span>
                <h3 className="mt-4 font-display text-5xl">Dr. Ahmed Sultan</h3>
                <p className="mt-6 text-foreground/75">
                  Dr. Sultan trained in cosmetic and restorative dentistry with a particular obsession for proportion. After a decade across leading clinics, he co-founded ORA to build the kind of practice he always wished existed — slow, sculptural, and quietly excellent.
                </p>
                <p className="mt-4 text-foreground/75">
                  He leads ORA's smile-design, veneer, and clear aligner work.
                </p>
                <ul className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-8 font-sans-tight text-foreground/70">
                  <li>BDS, FCPS Restorative</li>
                  <li>Clear Aligner Specialist</li>
                  <li>10+ years experience</li>
                  <li>Cosmetic Lead</li>
                </ul>
              </div>
            </article>

            <article className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6 lg:order-2">
                <div className="arch-frame relative h-[600px] overflow-hidden bg-background">
                  <img src={drRoha} alt="Dr. Roha Ejaz" className="h-full w-full object-cover" loading="lazy" width={768} height={960} />
                </div>
              </div>
              <div className="lg:col-span-5 lg:order-1 lg:pt-12">
                <span className="font-sans-tight text-muted-foreground">Co-founder · Aesthetic & Pediatric</span>
                <h3 className="mt-4 font-display text-5xl">Dr. Roha Ejaz</h3>
                <p className="mt-6 text-foreground/75">
                  Dr. Ejaz brings a calm, intuitive presence to ORA. Her work in aesthetic treatments and pediatric dentistry is defined by restraint — subtle results, gentle hands, unhurried care that families return to for years.
                </p>
                <p className="mt-4 text-foreground/75">
                  She leads ORA's aesthetic, hygiene, and family programmes.
                </p>
                <ul className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-8 font-sans-tight text-foreground/70">
                  <li>BDS, MSc Aesthetics</li>
                  <li>Pediatric Specialist</li>
                  <li>Facial Aesthetic Cert.</li>
                  <li>Hygiene Lead</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
