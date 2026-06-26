import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";
import interior from "@/assets/clinic-interior.png";
import reception from "@/assets/clinic-reception.png";

export const Route = createFileRoute("/atelier")({
  head: () => ({
    meta: [
      { title: "The Atelier — ORA Dental Wellness" },
      { name: "description", content: "Step inside ORA — a dental wellness atelier in Bahria Town Phase 4, Rawalpindi. Arched alcoves, sage textiles, hand-thrown ceramics, and shoji light." },
      { property: "og:title", content: "The Atelier — ORA Clinic" },
      { property: "og:description", content: "A clinic shaped like a sanctuary." },
    ],
  }),
  component: AtelierPage,
});

const details = [
  { t: "Arched alcoves", d: "Soft-curved doorways and ceilings — borrowed from quiet Mediterranean architecture — to slow the eye and lower the shoulders." },
  { t: "Sage textiles", d: "Linen, raw cotton, and undyed wool. Materials that breathe, absorb sound, and feel like a private home." },
  { t: "Hand-thrown ceramics", d: "Vessels, basins, and trays thrown locally — a quiet refusal of the disposable, clinical default." },
  { t: "Shoji light", d: "Diffused, warm, never fluorescent. Light shaped to make you — and your smile — look genuinely well." },
];

function AtelierPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-10 lg:pt-32">
        <SectionLabel>The atelier</SectionLabel>
        <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">
          A clinic shaped<br />
          like <span className="italic text-foreground/60">a sanctuary.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-foreground/70">
          ORA was designed before it was built. Every alcove, surface, and source of light was chosen to dissolve the dental-clinic feeling — and replace it with the calm of a private retreat.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="arch-frame relative h-[520px] overflow-hidden bg-secondary md:h-[640px]">
              <img src={reception} alt="ORA reception" className="h-full w-full object-cover" loading="lazy" width={1280} height={1600} />
            </div>
          </div>
          <div className="md:col-span-5 md:pt-20">
            <div className="arch-frame relative h-[420px] overflow-hidden bg-secondary md:h-[480px]">
              <img src={interior} alt="ORA interior" className="h-full w-full object-cover" loading="lazy" width={1000} height={1280} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>Material palette</SectionLabel>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
                Designed in <span className="italic text-foreground/60">restraint.</span>
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-px border border-border bg-border md:grid-cols-2">
                {details.map((d) => (
                  <div key={d.t} className="bg-background p-10">
                    <h3 className="font-display text-2xl">{d.t}</h3>
                    <p className="mt-3 text-foreground/70">{d.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="rounded-sm bg-foreground px-8 py-20 text-center text-background md:px-20">
          <h2 className="font-display text-4xl md:text-6xl">Visit us.</h2>
          <p className="mx-auto mt-6 max-w-xl text-background/70">
            The space speaks for itself. Book a consultation and let us show you around.
          </p>
          <Link to="/contact" className="mt-10 inline-flex items-center gap-3 rounded-full bg-background px-8 py-4 font-sans-tight text-foreground hover:bg-background/90">
            Book Visit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
