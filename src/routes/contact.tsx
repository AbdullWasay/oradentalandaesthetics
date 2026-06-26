import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Visit — ORA Dental Wellness, Rawalpindi" },
      { name: "description", content: "Visit ORA in Bahria Town Phase 4, Rawalpindi. Book a consultation for aligners, implants or general dentistry." },
      { property: "og:title", content: "Visit ORA — Bahria Town, Rawalpindi" },
      { property: "og:description", content: "Book a private dental wellness consultation." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pt-20 pb-12 lg:px-10 lg:pt-32">
        <SectionLabel>Contact & Visit</SectionLabel>
        <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">
          Come <span className="italic text-foreground/60">in.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-foreground/70">
          Step into our Bahria Town atelier or send a note — we'll respond personally within one working day.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-12 lg:px-10">
        {/* Form */}
        <div className="lg:col-span-7">
          <div className="border border-border bg-card p-10 md:p-14">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="rounded-full bg-accent/30 p-5">
                  <Check className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="mt-6 font-display text-3xl">Note received.</h3>
                <p className="mt-3 max-w-sm text-foreground/70">Thank you. One of our team will reach out within one working day to schedule your visit.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-6"
              >
                <h2 className="font-display text-3xl">Book a consultation</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="First name" name="first" required />
                  <Field label="Last name" name="last" required />
                  <Field label="Email" type="email" name="email" required />
                  <Field label="Phone" type="tel" name="phone" required />
                </div>
                <div>
                  <label className="font-sans-tight text-muted-foreground">Interested in</label>
                  <select className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground focus:border-foreground focus:outline-none" name="service">
                    <option>General dentistry</option>
                    <option>Clear aligners</option>
                    <option>Dental implants</option>
                    <option>Cosmetic / Whitening</option>
                    <option>Pediatric / Family</option>
                  </select>
                </div>
                <div>
                  <label className="font-sans-tight text-muted-foreground">Message</label>
                  <textarea rows={4} name="message" className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground focus:border-foreground focus:outline-none" placeholder="Tell us a little about what you'd like to explore…" />
                </div>
                <button type="submit" className="mt-4 w-full rounded-full bg-foreground px-8 py-4 font-sans-tight text-background hover:bg-foreground/85">
                  Send Note
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Info */}
        <aside className="space-y-10 lg:col-span-5">
          <InfoBlock icon={<MapPin className="h-5 w-5" />} title="Location" lines={["Ground Floor, Plot 35, Street 8", "Bahria Paradise Commercial", "Bahria Town Phase 4, Rawalpindi 46220"]} />
          <InfoBlock icon={<Phone className="h-5 w-5" />} title="Phone" lines={["0339 8891919", "051 8891919"]} />
          <InfoBlock icon={<Mail className="h-5 w-5" />} title="Email" lines={["info@oradentalwellness.com"]} />
          <InfoBlock
            icon={<Clock className="h-5 w-5" />}
            title="Hours"
            lines={["Mon – Sat · 12:00 PM – 9:00 PM", "Sunday · By appointment"]}
          />
        </aside>
      </section>

      {/* Map / Location */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="flex items-end justify-between">
            <div>
              <SectionLabel>Find us</SectionLabel>
              <h2 className="mt-6 font-display text-4xl md:text-5xl">Bahria Paradise Commercial, Rawalpindi</h2>
            </div>
            <a href="https://maps.google.com/?q=ORA+Dental+Wellness+Bahria+Town+Phase+4+Rawalpindi" target="_blank" rel="noreferrer" className="hidden font-sans-tight text-accent hover:underline md:inline">
              Open in Google Maps →
            </a>
          </div>
          <div className="mt-10 overflow-hidden rounded-sm border border-border">
            <iframe
              title="ORA Dental Wellness location"
              src="https://www.google.com/maps?q=Bahria+Paradise+Commercial+Bahria+Town+Phase+4+Rawalpindi&output=embed"
              className="h-[480px] w-full grayscale"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="font-sans-tight text-muted-foreground" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground focus:border-foreground focus:outline-none"
      />
    </div>
  );
}

function InfoBlock({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="border-l-2 border-accent pl-6">
      <div className="flex items-center gap-3 font-sans-tight text-muted-foreground">
        <span className="text-accent">{icon}</span> {title}
      </div>
      <div className="mt-3 space-y-1 font-display text-2xl">
        {lines.map((l) => (<div key={l}>{l}</div>))}
      </div>
    </div>
  );
}
