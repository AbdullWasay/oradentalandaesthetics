import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { ArrowRight, Sparkles, Award, Users, Clock, Smile, MapPin, Phone, CalendarDays, MessageCircle, User as UserIcon, Check, Mail } from "lucide-react";
import { ORA_ADDRESS_FULL, ORA_ADDRESS_LINES, ORA_MAPS_EMBED_URL, ORA_MAPS_SHARE_URL } from "@/lib/location";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";
import { HomeSplash } from "@/components/HomeSplash";
import { HomeHero } from "@/components/HomeHero";
import { StatRoll } from "@/components/StatRoll";
import { FounderPanel } from "@/components/FounderPanel";
import { EmailLink } from "@/components/EmailLink";
import { submitForm } from "@/lib/submit-form";
import { getGoogleReviews } from "@/lib/get-google-reviews";
import { formatReviewCount } from "@/lib/google-reviews";
import { bookingServices } from "@/lib/booking-services";
import { trackBookingLead, trackContact } from "@/lib/meta-pixel";
import {
  PAGE_SEO,
  buildPageLinks,
  buildPageMeta,
  homeJsonLdScripts,
  ORA_PHONE_DISPLAY,
  ORA_PHONE_PRIMARY,
  ORA_WHATSAPP_URL,
} from "@/lib/seo";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import aboutUs from "@/assets/about-us.webp";
import drAhmed from "@/assets/doctors/dr-ahmed-sultan.webp";
import drRoha from "@/assets/doctors/dr-roha-ejaz.webp";

const TreatmentsSection = lazy(() =>
  import("@/components/TreatmentsSection").then((m) => ({ default: m.TreatmentsSection })),
);
const TeamCarousel = lazy(() =>
  import("@/components/TeamCarousel").then((m) => ({ default: m.TeamCarousel })),
);
const BlogNewsCarousel = lazy(() =>
  import("@/components/BlogNewsCarousel").then((m) => ({ default: m.BlogNewsCarousel })),
);
const GoogleReviews = lazy(() =>
  import("@/components/GoogleReviews").then((m) => ({ default: m.GoogleReviews })),
);
const FaqSection = lazy(() =>
  import("@/components/FaqSection").then((m) => ({ default: m.FaqSection })),
);
const ContactLeadPopup = lazy(() =>
  import("@/components/ContactLeadPopup").then((m) => ({ default: m.ContactLeadPopup })),
);
const FloatingWhatsApp = lazy(() =>
  import("@/components/FloatingWhatsApp").then((m) => ({ default: m.FloatingWhatsApp })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: buildPageMeta(PAGE_SEO.home),
    links: buildPageLinks(PAGE_SEO.home),
    scripts: homeJsonLdScripts(),
  }),
  loader: () => getGoogleReviews(),
  component: HomePage,
});

const marqueeItems = [
  "Sculpted smiles, considered care",
  "Specialists in clear aligners",
  "Dental implants · General dentistry",
  "Bahria Town Phase 4 · Rawalpindi",
  "By appointment · Walk-ins welcome",
  "Mon – Sat · 12:00 PM – 9:00 PM",
];

function HomePage() {
  const googleReviews = Route.useLoaderData();
  const submit = useServerFn(submitForm);
  const [heroReady, setHeroReady] = useState(true);

  const stats = [
    { icon: Smile, k: "500+", v: "Smiles transformed", short: "Smiles" },
    { icon: Users, k: formatReviewCount(googleReviews.totalReviews), v: "Google reviews", short: "Reviews" },
    { icon: Award, k: "10+", v: "Years combined experience", short: "Years" },
    { icon: Clock, k: "98%", v: "Case predictability", short: "Cases" },
  ];
  const [bookingSent, setBookingSent] = useState(false);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingService, setBookingService] = useState("");

  const handleSplashComplete = useCallback(() => setHeroReady(true), []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = window.setTimeout(() => {
      smoothScrollTo(hash, { duration: 1.7 });
    }, 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <HomeSplash onComplete={handleSplashComplete} />
      <SiteHeader />

      <main id="main">
      {/* HERO */}
      <HomeHero ready={heroReady} reviews={googleReviews} />
      {/* Marquee */}
      <div className="relative border-y border-border bg-[#f3eee4] py-5 text-foreground">
          <div className="flex overflow-hidden">
            <div className="marquee flex shrink-0 items-center gap-16 whitespace-nowrap pr-16 font-sans-tight">
              {marqueeItems.map((t, i) => (
                <span key={`a-${i}`} className="flex items-center gap-3">
                  <Sparkles className="h-3 w-3 text-[#666d57]" />
                  {t}
                </span>
              ))}
            </div>
            <div className="marquee flex shrink-0 items-center gap-16 whitespace-nowrap pr-16 font-sans-tight" aria-hidden>
              {marqueeItems.map((t, i) => (
                <span key={`b-${i}`} className="flex items-center gap-3">
                  <Sparkles className="h-3 w-3 text-[#666d57]" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

      {/* STATS */}
      <section className="border-b border-border bg-[#4d5645] md:bg-background">
        {/* Mobile — quiet 2×2, no boxes */}
        <div className="grid grid-cols-2 gap-y-6 px-5 py-8 md:hidden">
          {stats.map((s) => (
            <div key={s.v} className="text-center">
              <div className="font-display text-[1.85rem] leading-none tracking-tight text-[#f5f1eb]">
                <StatRoll value={s.k} />
              </div>
              <div className="mt-1.5 font-sans-tight text-[10px] tracking-[0.2em] uppercase text-[#f5f1eb]/55">
                {s.short}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop — full KPIs */}
        <div className="mx-auto hidden max-w-7xl grid-cols-4 gap-px overflow-hidden border-x border-border bg-border md:grid">
          {stats.map((s) => (
            <div key={s.v} className="bg-background px-8 py-12 lg:px-10 lg:py-16">
              <s.icon className="h-6 w-6 text-accent" />
              <div className="mt-6 font-display text-4xl tracking-tight lg:text-5xl">
                <StatRoll value={s.k} />
              </div>
              <div className="mt-3 font-sans-tight text-sm text-foreground/60">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section id="atelier" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 lg:px-10 lg:py-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Copy first on mobile so content isn’t buried under the image */}
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7 lg:pt-12">
            <SectionLabel>The atelier</SectionLabel>
            <h2 className="mt-5 font-display text-[clamp(2rem,6vw,3rem)] leading-tight md:text-5xl">
              Dentistry, but slower.<br />
              <span className="italic text-foreground/60">Considered, sculptural, calm.</span>
            </h2>
            <p className="mt-5 text-foreground/70 lg:mt-6">
              We designed ORA the way we practice — with restraint. Arched alcoves, sage textiles, hand-thrown ceramics, warm shoji light. Every detail is engineered to lower your shoulders before we ever recline the chair.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-8">
              <a
                href={ORA_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackContact("whatsapp")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#666d57] px-6 py-3.5 font-sans-tight text-[11px] tracking-[0.14em] text-[#f5f1eb] transition-colors hover:bg-[#4d5645]"
              >
                Chat on WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`tel:${ORA_PHONE_PRIMARY}`}
                onClick={() => trackContact("phone")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#4d5645]/30 px-6 py-3.5 font-sans-tight text-[11px] tracking-[0.14em] text-[#4d5645] transition-colors hover:border-[#4d5645] hover:bg-[#4d5645]/5"
              >
                <Phone className="h-3.5 w-3.5" />
                Call {ORA_PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="arch-frame relative h-[280px] overflow-hidden bg-secondary sm:h-[360px] lg:h-[520px]">
              <img
                src={aboutUs}
                alt="Interior of ORA Dental Wellness atelier in Bahria Town Phase 4, with arched alcoves and soft lighting"
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
                width={420}
                height={560}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS — twin portrait panels (above treatments) */}
      <section
        id="doctors"
        className="doctors-duo relative z-20 scroll-mt-24 overflow-hidden bg-[#000000]"
      >
        <div className="relative">
          {/* Single outline heading — visuals below are aria-hidden duplicates */}
          <h2 className="sr-only">Two doctors. One philosophy of restraint.</h2>

          {/* Mobile masthead — sits above the portraits */}
          <div className="relative z-30 bg-[#4d5645] px-6 pb-8 pt-12 text-center md:hidden">
            <p className="font-sans-tight text-[10px] tracking-[0.38em] text-[#d8cdc3]/80">
              Founders
            </p>
            <p
              aria-hidden
              className="mx-auto mt-3 max-w-3xl font-display text-[clamp(2.2rem,8vw,3rem)] font-light leading-[1.02] tracking-tight text-[#faf8f4]"
            >
              Two doctors.
            </p>
            <p
              aria-hidden
              className="doctors-philosophy mx-auto mt-2 max-w-md font-display text-[clamp(1.15rem,4vw,1.35rem)] italic leading-snug text-[#eae2d6]/90"
            >
              One philosophy of restraint.
            </p>
          </div>

          {/* Desktop masthead — over portraits */}
          <div className="pointer-events-none absolute inset-x-0 top-10 z-30 hidden px-6 text-center md:block md:top-14 lg:top-16">
            <p className="font-sans-tight text-[10px] tracking-[0.38em] text-[#d8cdc3]/80">
              Founders
            </p>
            <p
              aria-hidden
              className="mx-auto mt-3 max-w-3xl font-display text-[clamp(2.2rem,5.5vw,3.85rem)] font-light leading-[1.02] tracking-tight text-[#faf8f4]"
            >
              Two doctors.
            </p>
            <p
              aria-hidden
              className="doctors-philosophy mx-auto mt-2 max-w-md font-display text-[clamp(1.2rem,2.2vw,1.5rem)] italic leading-snug text-[#eae2d6]/90"
            >
              One philosophy of restraint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:min-h-[92vh] md:grid-cols-2">
            {[
              {
                img: drAhmed,
                name: "Dr. Ahmed Sultan",
                role: "General Dentist · Aligners Specialist",
                bio: "A general dentist with a special interest in clear aligner therapy and oral surgery. His expertise spans clear aligners, routine extractions, restorative dentistry, and comprehensive care — always with precision, comfort, and lasting oral health in mind.",
                position: "object-[58%_18%]",
                align: "md:items-start md:text-left",
                pad: "md:pl-10 md:pr-8 lg:pl-14",
              },
              {
                img: drRoha,
                name: "Dr. Roha Ejaz",
                role: "General & Restorative Dentist",
                bio: "A general and restorative dentist with a special interest in cosmetic dentistry. Her work includes aesthetic composites, veneers, smile makeovers, whitening, diastema closure, enameloplasty, and painless root canals — minimally invasive care that elevates every smile.",
                position: "object-[center_14%]",
                align: "md:items-end md:text-right",
                pad: "md:pr-10 md:pl-8 lg:pr-14",
              },
            ].map((d) => (
              <FounderPanel key={d.name} {...d} />
            ))}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[16%] left-1/2 z-20 hidden h-[30%] w-px -translate-x-1/2 bg-gradient-to-b from-[#d8cdc3]/50 via-[#70796b]/35 to-transparent md:block"
          />
        </div>
      </section>

      {/* Bridge CTA — between doctors and treatments */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, #eae2d6 0%, #f5f1eb 42%, #eae2d6 78%, #d8cdc3 100%)",
          }}
        />
        {/* Oversized watermark typography — kept fully in-frame so “A” isn’t clipped */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-4 lg:px-8"
        >
          <span className="select-none font-display text-[clamp(7rem,18vw,15rem)] font-light leading-[0.85] tracking-[-0.04em] text-[#d8cdc3]/55">
            ORA
          </span>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-10 lg:py-28">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#666d57]" />
              <p className="font-sans-tight text-[10px] tracking-[0.4em] text-[#4d5645]/70">
                Appointment
              </p>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.75rem,7vw,5rem)] font-light leading-[0.95] tracking-tight text-[#4d5645]">
              Come sit
              <span className="block italic text-[#666d57]">with us.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-5 lg:pb-2">
            <p className="max-w-sm text-[1.05rem] font-light leading-relaxed text-[#70796b]">
              A quieter chair, considered hands, and care that never hurries the smile.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <a
                href={ORA_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackContact("whatsapp")}
                className="inline-flex flex-1 items-center justify-center gap-2 bg-[#4d5645] px-7 py-4 font-sans-tight text-[11px] tracking-[0.2em] text-[#f5f1eb] transition-colors hover:bg-[#666d57]"
              >
                Chat on WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`tel:${ORA_PHONE_PRIMARY}`}
                onClick={() => trackContact("phone")}
                className="inline-flex flex-1 items-center justify-center gap-2 border border-[#4d5645]/30 bg-[#f5f1eb]/70 px-7 py-4 font-sans-tight text-[11px] tracking-[0.2em] text-[#4d5645] transition-colors hover:border-[#4d5645] hover:bg-[#f5f1eb]"
              >
                Call now
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <TreatmentsSection />
      </Suspense>

      {/* MEET OUR TEAM — animated carousel */}
      <section id="team" className="relative scroll-mt-24 overflow-hidden bg-secondary/40">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#666d57]/[0.06] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#c4a35a]/[0.08] blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>The team</SectionLabel>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
              Meet our <span className="italic text-[#666d57]">specialists.</span>
            </h2>
            <p className="mt-4 text-foreground/70">
              An exceptionally trained team of dental surgeons and aesthetic specialists — quietly dedicated to your care in Bahria Town Phase 4, Rawalpindi.
            </p>
          </div>
          <div className="mt-10">
            <Suspense fallback={null}>
              <TeamCarousel />
            </Suspense>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <BlogNewsCarousel />
      </Suspense>

      <section
        id="locations"
        className="scroll-mt-24 overflow-hidden border-y border-border/60 bg-secondary/25"
      >
        <div className="grid lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-6 py-14 sm:px-10 lg:order-1 lg:py-24 lg:pr-12 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+2.5rem))]">
            <SectionLabel>Rawalpindi</SectionLabel>
            <h2
              data-speakable
              className="mt-5 max-w-xl font-display text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.08] tracking-tight text-[#4d5645]"
            >
              Care that feels local.
              <br />
              <span className="italic text-[#666d57]">Bahria Town, Phase 4.</span>
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] font-light leading-relaxed text-foreground/65">
              ORA sits in Bahria Paradise Commercial — a calm dental clinic for Rawalpindi
              families, and for patients who travel in from Islamabad. Clear aligners,
              restorative and cosmetic dentistry, root canals, and considered specialist care —
              without the rush.
            </p>
            <a
              href={ORA_MAPS_SHARE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-sans-tight text-[#666d57] transition-colors hover:text-[#4d5645]"
            >
              Find us on Google Maps <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="order-1 relative aspect-[5/4] w-full lg:order-2 lg:aspect-auto lg:min-h-[560px]">
            <img
              src="/aligners.webp"
              alt="Clear dental aligner held in hand — clear aligner care at ORA Dental Wellness in Bahria Town Phase 4, Rawalpindi"
              className="absolute inset-0 h-full w-full object-cover object-right"
              width={1157}
              height={932}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* BOOK NOW / CONTACT */}
      <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-foreground text-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, var(--accent) 0, transparent 40%), radial-gradient(circle at 80% 80%, var(--sage-deep) 0, transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-36">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <h2 className="sr-only">Book your appointment today at ORA Dental Wellness</h2>
            {/* LEFT — copy + details (desktop only) */}
            <div className="hidden lg:col-span-5 lg:block">
              <SectionLabel><span className="text-background/60">Book now</span></SectionLabel>
              <p
                aria-hidden
                className="mt-6 font-display text-4xl leading-[1.05] md:text-5xl"
              >
                Book Your<br />
                <span className="italic text-accent">Appointment</span> Today
              </p>
              <p className="mt-6 max-w-md text-background/70">
                Walk-ins welcome. Reserve a time that suits you and our team will confirm within minutes.
              </p>

              <div className="mt-12 space-y-6">
                <div className="flex items-start gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-background/20">
                    <MapPin className="h-4 w-4 text-accent" />
                  </span>
                  <div>
                    <p className="font-sans-tight text-xs uppercase tracking-[0.18em] text-background/50">Visit</p>
                    <a
                      href={ORA_MAPS_SHARE_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block max-w-xs leading-relaxed hover:text-accent"
                    >
                      {ORA_ADDRESS_FULL}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-background/20">
                    <Phone className="h-4 w-4 text-accent" />
                  </span>
                  <div>
                    <p className="font-sans-tight text-xs uppercase tracking-[0.18em] text-background/50">Call</p>
                    <a href="tel:+923398891919" className="mt-1 block hover:text-accent">0339 8891919</a>
                    <a href="tel:+92518891919" className="block hover:text-accent">051 8891919</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-background/20">
                    <Mail className="h-4 w-4 text-accent" />
                  </span>
                  <div>
                    <p className="font-sans-tight text-xs uppercase tracking-[0.18em] text-background/50">Email</p>
                    <EmailLink className="mt-1 block hover:text-accent" />
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-background/20">
                    <Clock className="h-4 w-4 text-accent" />
                  </span>
                  <div>
                    <p className="font-sans-tight text-xs uppercase tracking-[0.18em] text-background/50">Hours</p>
                    <p className="mt-1">Mon – Sat · 12:00 PM – 9:00 PM</p>
                  </div>
                </div>
              </div>

              <a
                href={ORA_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackContact("whatsapp")}
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-sans-tight text-foreground transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>

            {/* RIGHT — form (form-only on mobile) */}
            <div className="lg:col-span-7">
              <div className="mb-5 lg:hidden">
                <SectionLabel><span className="text-background/60">Book now</span></SectionLabel>
                <p
                  aria-hidden
                  className="mt-3 font-display text-[1.65rem] leading-tight"
                >
                  Book your <span className="italic text-accent">appointment</span>
                </p>
              </div>
              {bookingSent ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-background/15 bg-background/[0.03] p-6 text-center backdrop-blur-sm md:min-h-[420px] md:rounded-3xl md:p-12">
                  <div className="rounded-full bg-accent/30 p-5">
                    <Check className="h-8 w-8 text-background" />
                  </div>
                  <h3 className="mt-6 font-display text-3xl text-background">Request received.</h3>
                  <p className="mt-3 max-w-sm text-background/70">We'll confirm your appointment by email or phone shortly.</p>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setBookingError(null);
                    setBookingSubmitting(true);

                    const form = e.currentTarget;
                    const formData = new FormData(form);

                    try {
                      await submit({
                        data: {
                          formType: "booking",
                          name: String(formData.get("name") ?? ""),
                          email: String(formData.get("email") ?? ""),
                          phone: String(formData.get("phone") ?? ""),
                          preferredDate: String(formData.get("preferredDate") ?? ""),
                          service: bookingService,
                        },
                      });
                      trackBookingLead(bookingService);
                      setBookingSent(true);
                    } catch {
                      setBookingError("We couldn't send your request. Please try again or call us directly.");
                    } finally {
                      setBookingSubmitting(false);
                    }
                  }}
                  className="relative rounded-2xl border border-background/15 bg-background/[0.03] p-5 backdrop-blur-sm md:rounded-3xl md:p-12"
                >
                  <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

                  <h3 className="font-display text-xl md:text-3xl">Reserve a chair</h3>
                  <p className="mt-1 text-sm text-background/60 md:mt-2">We'll confirm by phone within minutes.</p>

                  <div className="mt-5 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="booking-name" className="font-sans-tight text-[10px] uppercase tracking-[0.2em] text-background/70 md:text-xs">Full name</label>
                      <div className="relative mt-1.5 md:mt-2">
                        <UserIcon className="pointer-events-none absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-background/50 md:h-4 md:w-4" aria-hidden />
                        <Input
                          id="booking-name"
                          required
                          name="name"
                          disabled={bookingSubmitting}
                          placeholder="Your name"
                          autoComplete="name"
                          className="h-10 rounded-none border-0 border-b border-background/20 bg-transparent pl-6 text-background placeholder:text-background/45 shadow-none focus-visible:border-accent focus-visible:ring-0 md:h-12 md:pl-7"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="booking-email" className="font-sans-tight text-[10px] uppercase tracking-[0.2em] text-background/70 md:text-xs">Email</label>
                      <div className="relative mt-1.5 md:mt-2">
                        <Mail className="pointer-events-none absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-background/50 md:h-4 md:w-4" aria-hidden />
                        <Input
                          id="booking-email"
                          required
                          name="email"
                          disabled={bookingSubmitting}
                          type="email"
                          placeholder="you@email.com"
                          autoComplete="email"
                          className="h-10 rounded-none border-0 border-b border-background/20 bg-transparent pl-6 text-background placeholder:text-background/45 shadow-none focus-visible:border-accent focus-visible:ring-0 md:h-12 md:pl-7"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="booking-phone" className="font-sans-tight text-[10px] uppercase tracking-[0.2em] text-background/70 md:text-xs">Phone</label>
                      <div className="relative mt-1.5 md:mt-2">
                        <Phone className="pointer-events-none absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-background/50 md:h-4 md:w-4" aria-hidden />
                        <Input
                          id="booking-phone"
                          required
                          name="phone"
                          disabled={bookingSubmitting}
                          type="tel"
                          placeholder="0339 8891919"
                          autoComplete="tel"
                          className="h-10 rounded-none border-0 border-b border-background/20 bg-transparent pl-6 text-background placeholder:text-background/45 shadow-none focus-visible:border-accent focus-visible:ring-0 md:h-12 md:pl-7"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="booking-preferred-date" className="font-sans-tight text-[10px] uppercase tracking-[0.2em] text-background/70 md:text-xs">Preferred date</label>
                      <div className="relative mt-1.5 md:mt-2">
                        <CalendarDays className="pointer-events-none absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-background/50 md:h-4 md:w-4" aria-hidden />
                        <Input
                          id="booking-preferred-date"
                          required
                          name="preferredDate"
                          disabled={bookingSubmitting}
                          type="date"
                          className="h-10 rounded-none border-0 border-b border-background/20 bg-transparent pl-6 text-background placeholder:text-background/45 shadow-none focus-visible:border-accent focus-visible:ring-0 [color-scheme:dark] md:h-12 md:pl-7"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label id="booking-service-label" htmlFor="booking-service" className="font-sans-tight text-[10px] uppercase tracking-[0.2em] text-background/70 md:text-xs">Service</label>
                      <Select
                        required
                        disabled={bookingSubmitting}
                        value={bookingService}
                        onValueChange={setBookingService}
                      >
                        <SelectTrigger
                          id="booking-service"
                          aria-labelledby="booking-service-label"
                          aria-label="Choose a treatment"
                          className="mt-1.5 h-11 min-h-11 rounded-none border-0 border-b border-background/20 bg-transparent px-0 text-background shadow-none focus:ring-0 [&>span]:text-background/90 data-[placeholder]:[&>span]:text-background/55 md:mt-2 md:h-12"
                        >
                          <SelectValue placeholder="Choose a treatment" />
                        </SelectTrigger>
                        <SelectContent>
                          {bookingServices.map((s) => (
                            <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>
                          ))}
                          <SelectItem value="General Consultation">General Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {bookingError && <p className="mt-4 text-sm text-red-300 md:mt-6">{bookingError}</p>}

                  <Button
                    type="submit"
                    disabled={bookingSubmitting || !bookingService}
                    className="mt-6 h-11 w-full rounded-full bg-accent text-foreground hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60 md:mt-10 md:h-14 md:w-auto md:px-10"
                  >
                    {bookingSubmitting ? "Sending…" : "Request appointment"} <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <GoogleReviews data={googleReviews} />
      </Suspense>

      <Suspense fallback={null}>
        <FaqSection />
      </Suspense>

      {/* VISIT — contact + map */}
      <section id="visit" className="scroll-mt-24 border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
            <div>
              <SectionLabel>Visit</SectionLabel>
              <h2 className="mt-4 font-display text-3xl leading-tight md:mt-6 md:text-5xl">
                Come <span className="italic text-foreground/50">in.</span>
              </h2>
            </div>
            <a
              href={ORA_MAPS_SHARE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 py-2 font-sans-tight text-xs uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-foreground"
            >
              Open in Google Maps <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile — compact detail list */}
          <ul className="mt-8 divide-y divide-border border-y border-border lg:hidden">
            <li className="flex gap-3 py-4">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#666d57]" strokeWidth={1.5} />
              <a
                href={ORA_MAPS_SHARE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm leading-relaxed text-foreground/80"
              >
                {ORA_ADDRESS_FULL}
              </a>
            </li>
            <li className="flex gap-3 py-4">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#666d57]" strokeWidth={1.5} />
              <div className="flex flex-col gap-1 text-sm">
                <a href="tel:+923398891919" className="text-foreground/80">
                  0339 889 1919
                </a>
                <a href="tel:+92518891919" className="text-foreground/80">
                  051 889 1919
                </a>
              </div>
            </li>
            <li className="flex gap-3 py-4">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#666d57]" strokeWidth={1.5} />
              <EmailLink className="text-sm text-foreground/80" />
            </li>
            <li className="flex gap-3 py-4">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#666d57]" strokeWidth={1.5} />
              <div className="text-sm text-foreground/80">
                <p>Mon – Sat · 12:00 – 9:00 PM</p>
                <p className="text-foreground/70">Sunday · By appointment</p>
              </div>
            </li>
          </ul>

          {/* Desktop — detail cards */}
          <div className="mt-14 hidden gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid lg:grid-cols-4">
            <div className="bg-background p-8">
              <MapPin className="h-4 w-4 text-foreground/35" strokeWidth={1.5} />
              <p className="mt-5 font-sans-tight text-[10px] uppercase tracking-[0.2em] text-foreground/65">
                Location
              </p>
              <a
                href={ORA_MAPS_SHARE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-sm leading-relaxed text-foreground/80 transition-colors hover:text-foreground"
              >
                {ORA_ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </a>
            </div>

            <div className="bg-background p-8">
              <Phone className="h-4 w-4 text-foreground/35" strokeWidth={1.5} />
              <p className="mt-5 font-sans-tight text-[10px] uppercase tracking-[0.2em] text-foreground/65">
                Phone
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="tel:+923398891919"
                    className="flex items-center gap-3 font-display text-xl tracking-[0.04em] text-foreground transition-colors hover:text-[#666d57]"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#666d57]" aria-hidden />
                    0339 889 1919
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+92518891919"
                    className="flex items-center gap-3 font-display text-xl tracking-[0.04em] text-foreground transition-colors hover:text-[#666d57]"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#666d57]" aria-hidden />
                    051 889 1919
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-background p-8">
              <Mail className="h-4 w-4 text-foreground/35" strokeWidth={1.5} />
              <p className="mt-5 font-sans-tight text-[10px] uppercase tracking-[0.2em] text-foreground/65">
                Email
              </p>
              <EmailLink className="mt-3 block text-sm text-foreground/80 transition-colors hover:text-foreground" />
            </div>

            <div className="bg-background p-8">
              <Clock className="h-4 w-4 text-foreground/35" strokeWidth={1.5} />
              <p className="mt-5 font-sans-tight text-[10px] uppercase tracking-[0.2em] text-foreground/65">
                Hours
              </p>
              <div className="mt-3 space-y-1 text-sm text-foreground/80">
                <p>Mon – Sat · 12:00 – 9:00 PM</p>
                <p className="text-foreground/70">Sunday · By appointment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map — shorter on mobile */}
        <div className="relative border-t border-border">
          <iframe
            title="Google Map showing ORA Dental Wellness at Bahria Paradise Commercial, Bahria Town Phase 4, Rawalpindi"
            src={ORA_MAPS_EMBED_URL}
            className="h-[220px] w-full border-0 sm:h-[320px] lg:h-[min(70vh,560px)]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25"
          />
        </div>
      </section>

      </main>

      <SiteFooter />

      <Suspense fallback={null}>
        <ContactLeadPopup />
        <FloatingWhatsApp />
      </Suspense>
    </div>
  );
}
