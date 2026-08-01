import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ORA_WHATSAPP_URL } from "@/lib/seo";
import { trackContact } from "@/lib/meta-pixel";

const VIDEO_SRC = "/clinic_video_mobile.mp4";
const VIDEO_POSTER = "/clinic-video-poster.jpg";

export function ClinicTourPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main id="main">
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(102,109,87,0.12),transparent_55%),radial-gradient(ellipse_at_90%_40%,rgba(77,86,69,0.08),transparent_50%)]"
          />
          <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-14 lg:px-10 lg:pb-14 lg:pt-20">
            <SectionLabel>Clinic tour</SectionLabel>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,7vw,4.25rem)] leading-[1.05] tracking-tight">
              Step inside{" "}
              <span className="italic text-foreground/55">ORA.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
              A short walk through our Bahria Town Phase 4 atelier — soft light,
              quiet rooms, and the calm we designed for every visit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/"
                hash="contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-sans-tight text-background transition-transform hover:scale-[1.01]"
              >
                Book a visit <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={ORA_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackContact("whatsapp")}
                className="inline-flex items-center gap-2 font-sans-tight text-[#666d57] transition-colors hover:text-[#4d5645]"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </section>

        <section
          aria-label="ORA Dental Wellness clinic tour video"
          className="bg-sage-deep"
        >
          <div className="mx-auto max-w-5xl">
            <video
              className="mx-auto block max-h-[min(85vh,880px)] w-full bg-black object-contain"
              controls
              playsInline
              preload="metadata"
              poster={VIDEO_POSTER}
              title="ORA Dental Wellness clinic tour — Bahria Town Phase 4, Rawalpindi"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-20">
            <div className="max-w-xl">
              <SectionLabel>Visit</SectionLabel>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                Ready when you are.
              </h2>
              <p className="mt-3 text-foreground/65">
                Bahria Paradise Commercial · Phase 4, Rawalpindi · Mon–Sat,
                12:00–9:00 PM
              </p>
            </div>
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 font-sans-tight text-[#666d57] hover:underline"
            >
              Reserve a chair <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
