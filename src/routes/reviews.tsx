import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Quote, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — ORA Dental & Aesthetic Clinic" },
      { name: "description", content: "Read what our patients say about ORA Dental & Aesthetic Clinic in Islamabad." },
      { property: "og:title", content: "Patient Reviews — ORA Clinic" },
      { property: "og:description", content: "Trusted, quietly. Voices from the chair." },
    ],
  }),
  component: ReviewsPage,
});

const reviews = [
  { name: "Sana Khalid", role: "Clear aligners · 9 months", quote: "ORA didn't feel like a clinic — it felt like a quiet ritual. My smile is finally mine, and the team made every step calm." },
  { name: "Hamza Riaz", role: "Veneers", quote: "Dr. Sultan's eye for proportion is extraordinary. People notice something different — they just can't place what." },
  { name: "Mehwish Tariq", role: "Aesthetic + dental", quote: "The space alone disarms you. Dr. Roha is gentle, precise, and unhurried. I drive across the city to come here." },
  { name: "Bilal Ahmed", role: "Dental implants", quote: "I was anxious about implants. Three appointments later I forgot which tooth was the implant. Genuinely life-changing work." },
  { name: "Ayesha Noor", role: "Smile design", quote: "Months of consultations at other clinics felt transactional. ORA actually listened. The result is mine — not a template." },
  { name: "Faisal Khan", role: "Whitening + hygiene", quote: "Calm, clean, and the most thorough hygiene visit I've ever had. The space feels more like a spa than a clinic." },
  { name: "Zara Qureshi", role: "Pediatric · my daughter", quote: "My 6-year-old looks forward to her appointments. That alone says everything about how Dr. Roha works with kids." },
  { name: "Omar Sheikh", role: "Botox & fillers", quote: "Subtle, never overdone — exactly what I wanted. My friends keep asking if I've been on holiday." },
  { name: "Hina Malik", role: "Crowns", quote: "The match to my natural teeth is invisible. ORA treats dentistry like art, and the proof is in the mirror." },
];

function ReviewsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-10 lg:pt-32">
        <SectionLabel>Reviews</SectionLabel>
        <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
          <h1 className="font-display text-5xl leading-[1.05] md:col-span-8 md:text-7xl">
            Trusted,<br />
            <span className="italic text-foreground/60">quietly.</span>
          </h1>
          <div className="md:col-span-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <div className="mt-3 font-display text-3xl">4.9 / 5</div>
            <p className="mt-2 font-sans-tight text-muted-foreground">Based on 240+ patient reviews</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((t) => (
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
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="rounded-sm bg-secondary px-8 py-20 text-center md:px-20">
          <h2 className="font-display text-4xl md:text-5xl">Join them.</h2>
          <p className="mx-auto mt-5 max-w-xl text-foreground/70">
            Begin your story with a private consultation at ORA.
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 font-sans-tight text-background hover:bg-foreground/85">
            Book Visit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
