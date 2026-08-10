import { ArrowRight, Phone } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ContactLeadPopup } from "@/components/ContactLeadPopup";
import {
  ORA_PHONE_DISPLAY,
  ORA_PHONE_PRIMARY,
  ORA_WHATSAPP_URL,
} from "@/lib/seo";
import { trackContact } from "@/lib/meta-pixel";

const VIDEO_SRC = "/clinic_video_mobile.mp4";
const VIDEO_POSTER = "/clinic-video-poster.webp";

export function ClinicTourPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main id="main" className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-10 lg:py-20">
          <div className="lg:col-span-5">
            <SectionLabel>Clinic tour</SectionLabel>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-[#4d5645]">
              Step inside{" "}
              <span className="italic text-[#666d57]">ORA.</span>
            </h1>
            <p className="mt-5 max-w-md text-base font-light leading-relaxed text-foreground/65">
              A short walk through our Bahria Town Phase 4 atelier — soft light,
              quiet rooms, and the calm we designed for every visit.
            </p>
            <p className="mt-4 font-sans-tight text-[11px] tracking-[0.12em] text-foreground/40">
              Bahria Paradise Commercial · Rawalpindi · 17 seconds
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={ORA_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackContact("whatsapp")}
                className="inline-flex items-center gap-2 rounded-full bg-[#4d5645] px-6 py-3 font-sans-tight text-[11px] tracking-[0.14em] text-[#f5f1eb] transition-colors hover:bg-[#666d57]"
              >
                Chat on WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`tel:${ORA_PHONE_PRIMARY}`}
                onClick={() => trackContact("phone")}
                className="inline-flex items-center gap-2 font-sans-tight text-[#666d57] transition-colors hover:text-[#4d5645]"
              >
                <Phone className="h-3.5 w-3.5" />
                Call {ORA_PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-7 lg:justify-end">
            <div className="w-full max-w-[min(100%,22rem)]">
              <div className="overflow-hidden rounded-[1.75rem] border border-[#4d5645]/15 bg-[#1a1c18] shadow-[0_32px_80px_-40px_rgba(77,86,69,0.55)]">
                <video
                  className="aspect-[9/16] w-full bg-black object-cover"
                  style={{ aspectRatio: "9 / 16" }}
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
              <p className="mt-4 text-center font-sans-tight text-[10px] tracking-[0.18em] text-foreground/35">
                Portrait clinic walkthrough
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <ContactLeadPopup />
      <FloatingWhatsApp />
    </div>
  );
}
