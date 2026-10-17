import { SITE_URL, type PageSeo } from "@/lib/seo";
import atelier from "@/assets/about-us.webp";
import reception from "@/assets/her-section-bg.webp";

export type TreatmentFaq = {
  question: string;
  answer: string;
};

export type TreatmentPage = {
  slug: "clear-aligners" | "dental-implants" | "general-dentistry";
  title: string;
  headline: string;
  description: string;
  keywords: string;
  excerpt: string;
  kicker: string;
  hero: { src: string; alt: string; width: number; height: number };
  highlights: { title: string; text: string }[];
  includes: string[];
  steps: { title: string; text: string }[];
  doctor: { name: string; role: string; note: string };
  faqs: TreatmentFaq[];
  cta: { kicker: string; title: string; text: string };
};

export const TREATMENT_PAGES: TreatmentPage[] = [
  {
    slug: "clear-aligners",
    title: "Clear Aligners in Bahria Town, Rawalpindi",
    headline: "Clear aligners, planned properly.",
    description:
      "Clear aligners in Bahria Town Phase 4 at ORA Dental Wellness — official Aligno partner. Digital planning with Dr. Ahmed Sultan for discreet teeth straightening in Rawalpindi.",
    keywords:
      "clear aligners Rawalpindi, clear aligners Bahria Town, Aligno partner, invisible braces Rawalpindi, teeth straightening Bahria Town Phase 4, ORA Dental Wellness aligners",
    excerpt:
      "Quiet trays. Honest wear time. Reviews you can keep in Bahria Town Phase 4 — not a plan you abandon in traffic.",
    kicker: "Aligno partner",
    hero: {
      src: "/aligners.webp",
      alt: "Clear dental aligner held in hand — Aligno clear aligners at ORA Dental Wellness, Bahria Town Phase 4",
      width: 1157,
      height: 932,
    },
    highlights: [
      {
        title: "Dentistry first",
        text: "Bite, gums, and enamel are checked before any tray sequence is designed.",
      },
      {
        title: "Local reviews",
        text: "Follow-ups stay at ORA in Bahria Paradise Commercial — same chair, same team.",
      },
      {
        title: "Official Aligno partner",
        text: "Your case is planned here; Aligno fabricates the aligners to that plan.",
      },
    ],
    includes: [
      "Consultation and digital assessment",
      "Smile and bite planning with Dr. Ahmed Sultan",
      "Custom Aligno clear aligner trays",
      "Progress reviews at ORA Bahria Town Phase 4",
      "Retention guidance after active treatment",
    ],
    steps: [
      {
        title: "Consult",
        text: "We examine the bite, gums, and enamel, then talk through whether aligners are the right path.",
      },
      {
        title: "Plan",
        text: "Records are taken and a staged tray sequence is designed around how you actually live.",
      },
      {
        title: "Wear & review",
        text: "You wear the trays as directed and return for reviews so small adjustments stay small.",
      },
    ],
    doctor: {
      name: "Dr. Ahmed Sultan",
      role: "General Dentist · Aligners Specialist",
      note: "Leads clear aligner planning and smile design at ORA.",
    },
    faqs: [
      {
        question: "Does ORA offer Aligno clear aligners in Bahria Town?",
        answer:
          "Yes. ORA Dental Wellness is an official Aligno partner. Cases are planned at our Bahria Town Phase 4 clinic with Dr. Ahmed Sultan.",
      },
      {
        question: "Who are clear aligners for?",
        answer:
          "Mild to moderate crowding, spacing, and many bite concerns. Not every smile is an aligner case — we will say so plainly after the exam.",
      },
      {
        question: "How long does treatment take?",
        answer:
          "It depends on the plan. Many cases run several months; complex movements take longer. We give a realistic range before you start.",
      },
    ],
    cta: {
      kicker: "Book an aligner consult",
      title: "Start with a look at the bite, not a kit.",
      text: "WhatsApp us to reserve a clear aligner consultation in Bahria Town Phase 4.",
    },
  },
  {
    slug: "dental-implants",
    title: "Dental Implants in Bahria Town, Rawalpindi",
    headline: "Dental implants, considered carefully.",
    description:
      "Dental implants in Bahria Town Phase 4 at ORA Dental Wellness. Specialist-supported implant planning for missing teeth — calm exams, clear options, and restorative finish in Rawalpindi.",
    keywords:
      "dental implants Rawalpindi, dental implants Bahria Town, tooth implant Bahria Town Phase 4, implant dentist Rawalpindi, missing tooth replacement, ORA Dental Wellness implants",
    excerpt:
      "A missing tooth is not only a gap. We plan implants with bone, gums, and the final crown in mind — then restore the smile you can live with.",
    kicker: "Implant support",
    hero: {
      src: reception,
      alt: "ORA Dental Wellness clinic interior in Bahria Town Phase 4, Rawalpindi — calm setting for implant consults",
      width: 1440,
      height: 740,
    },
    highlights: [
      {
        title: "Specialist support",
        text: "Periodontist and prosthodontist support when the case needs more than a single visit.",
      },
      {
        title: "Plan before place",
        text: "Bone, soft tissue, and the final tooth shape guide the sequence — not a rush to surgery day.",
      },
      {
        title: "Restorative finish",
        text: "The crown or bridge is designed to match neighbouring teeth and how you bite.",
      },
    ],
    includes: [
      "Implant consultation and clinical assessment",
      "Digital X-rays where indicated",
      "Treatment sequencing with specialist input",
      "Surgical placement when appropriate",
      "Crown or bridge restoration on the implant",
      "Aftercare and review visits at ORA",
    ],
    steps: [
      {
        title: "Assess",
        text: "We review the space, bone, gums, and medical history to see whether an implant is suitable.",
      },
      {
        title: "Place",
        text: "When indicated, the implant is placed and given time to integrate before the final tooth.",
      },
      {
        title: "Restore",
        text: "A custom crown or bridge restores function and appearance — then we keep the site under review.",
      },
    ],
    doctor: {
      name: "Specialist-supported team",
      role: "Periodontist · Prosthodontist · Restorative dentists",
      note: "Implant cases at ORA are planned with the right hands for each stage.",
    },
    faqs: [
      {
        question: "Do you place dental implants at ORA?",
        answer:
          "Yes. Implant care is offered with specialist support for planning, placement, and the restorative finish at our Bahria Town Phase 4 clinic.",
      },
      {
        question: "Am I a candidate for an implant?",
        answer:
          "It depends on bone volume, gum health, bite, and overall health. The consult answers that before any commitment to surgery.",
      },
      {
        question: "How long does implant treatment take?",
        answer:
          "Healing and integration usually take months before the final crown. We outline the timeline once records and X-rays are reviewed.",
      },
    ],
    cta: {
      kicker: "Book an implant consult",
      title: "Replace a missing tooth with a clear plan.",
      text: "WhatsApp us to book a dental implant consultation in Bahria Town Phase 4.",
    },
  },
  {
    slug: "general-dentistry",
    title: "General Dentistry in Bahria Town, Rawalpindi",
    headline: "Everyday dentistry, done with care.",
    description:
      "General dentistry in Bahria Town Phase 4 at ORA Dental Wellness — check-ups, cleaning, fillings, root canals, and family care by Dr. Ahmed Sultan and Dr. Roha Ejaz in Rawalpindi.",
    keywords:
      "general dentistry Rawalpindi, family dentist Bahria Town, dental check-up Bahria Town Phase 4, teeth cleaning Rawalpindi, fillings root canal Bahria Town, ORA Dental Wellness",
    excerpt:
      "Check-ups, cleaning, fillings, and the quiet work that keeps a smile steady — without the rush, and with dentists you will see again.",
    kicker: "Family care",
    hero: {
      src: atelier,
      alt: "ORA Dental Wellness atelier interior — general dentistry in Bahria Town Phase 4, Rawalpindi",
      width: 420,
      height: 560,
    },
    highlights: [
      {
        title: "Named dentists",
        text: "Dr. Ahmed Sultan and Dr. Roha Ejaz lead day-to-day care — continuity, not a rotating chair.",
      },
      {
        title: "Prevention first",
        text: "Exams, scaling, and hygiene advice so small issues stay small.",
      },
      {
        title: "Restorative when needed",
        text: "Tooth-coloured fillings, crowns, root canals, and calm emergency support.",
      },
    ],
    includes: [
      "Dental check-ups and oral examinations",
      "Professional cleaning (scaling & polishing)",
      "Tooth-coloured composite fillings",
      "Root canal treatment when needed",
      "Crowns, bridges, and simple extractions",
      "Children’s check-ups and gentle care",
      "Digital X-rays and emergency relief",
    ],
    steps: [
      {
        title: "Examine",
        text: "A thorough look at teeth, gums, and bite — with X-rays when they add clarity.",
      },
      {
        title: "Explain",
        text: "You leave knowing what is urgent, what can wait, and what we recommend next.",
      },
      {
        title: "Treat",
        text: "Care is scheduled around your week — cleaning, fillings, or deeper work without the scramble.",
      },
    ],
    doctor: {
      name: "Dr. Ahmed Sultan & Dr. Roha Ejaz",
      role: "General · Restorative · Aligners",
      note: "Founders of ORA — the dentists most patients see for routine and restorative care.",
    },
    faqs: [
      {
        question: "What does general dentistry cover at ORA?",
        answer:
          "Check-ups, cleaning, fillings, root canals, crowns, extractions, children’s visits, and urgent pain relief — planned in Bahria Town Phase 4.",
      },
      {
        question: "Do you accept walk-ins?",
        answer:
          "Appointments are preferred. Walk-ins are welcome when the diary allows — WhatsApp or call ahead if you can.",
      },
      {
        question: "Is ORA suitable for families?",
        answer:
          "Yes. Adults and children are seen in the same calm clinic, with hours that suit after-school and after-work visits.",
      },
    ],
    cta: {
      kicker: "Book a check-up",
      title: "Reserve a visit for everyday dental care.",
      text: "WhatsApp us to book a general dentistry appointment in Bahria Town Phase 4.",
    },
  },
];

export function getTreatmentPage(slug: string): TreatmentPage | undefined {
  return TREATMENT_PAGES.find((page) => page.slug === slug);
}

export function treatmentPageSeo(page: TreatmentPage): PageSeo {
  return {
    path: `/treatments/${page.slug}`,
    title: `${page.title} | ORA Dental Wellness`,
    description: page.description,
    keywords: page.keywords,
    ogImage:
      typeof page.hero.src === "string" && page.hero.src.startsWith("http")
        ? page.hero.src
        : page.slug === "clear-aligners"
          ? `${SITE_URL}/aligners.webp`
          : `${SITE_URL}/og-image.webp`,
    ogImageAlt: page.hero.alt,
  };
}

export function formatTreatmentPath(slug: TreatmentPage["slug"]) {
  return `/treatments/${slug}`;
}
