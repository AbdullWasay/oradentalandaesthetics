import { SITE_URL, type PageSeo } from "@/lib/seo";
import type { BlogMediaKey } from "@/lib/blog-media";

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "image"; src: BlogMediaKey; alt: string; caption?: string }
  | {
      type: "split";
      src: BlogMediaKey;
      alt: string;
      kicker?: string;
      title: string;
      text: string;
    }
  | {
      type: "notes";
      items: { title: string; text: string }[];
    }
  | {
      type: "portraits";
      people: { src: BlogMediaKey; name: string; role: string; detail?: string }[];
    }
  | {
      type: "partner";
      name: string;
      href: string;
      logo: string;
      note: string;
    }
  | {
      type: "cta";
      kicker: string;
      title: string;
      text: string;
      address: string;
    };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  modifiedAt?: string;
  readingMinutes: number;
  hero: { src: BlogMediaKey; alt: string; caption: string };
  ogImage: string;
  ogImageAlt: string;
  faqs: BlogFaq[];
  faqTitle: string;
  faqIntro: string;
  body: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "teeth-whitening-in-bahria-town-rawalpindi",
    title: "Why Teeth Whitening Matters — and How We Do It at ORA",
    description:
      "Why professional teeth whitening matters in Bahria Town: stains from tea and coffee, enamel safety, and how ORA Dental Wellness brightens a smile without rushing the exam.",
    keywords:
      "teeth whitening Bahria Town, teeth whitening Rawalpindi, professional teeth whitening, teeth bleaching Bahria Town Phase 4, dentist Bahria Town, ORA Dental Wellness whitening",
    excerpt:
      "Whitening is not a shortcut around dentistry. Here is why a brighter smile is worth doing properly — and how we plan it at ORA Dental Wellness",
    category: "Cosmetic care",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-18",
    readingMinutes: 6,
    hero: {
      src: "whiteningSmile",
      alt: "Before and after teeth whitening — left side natural yellow, right side brighter white",
      caption: "The change professional whitening can make, when the mouth is ready for it.",
    },
    ogImage: `${SITE_URL}/teeth-whiteing.jpg`,
    ogImageAlt:
      "Before and after teeth whitening at ORA Dental Wellness, Bahria Town Phase 4",
    faqTitle: "Whitening at ORA",
    faqIntro:
      "Practical answers if you are considering professional teeth whitening in Bahria Town.",
    faqs: [
      {
        question: "Is professional teeth whitening safe?",
        answer:
          "When a dentist has checked the enamel and gums first, yes. We do not bleach over decay, leaking fillings, or inflamed gums. Sensitivity is discussed before we start, and the gel strength is chosen for your mouth — not a one-size kit.",
      },
      {
        question: "Why not use strips or a whitening kit at home?",
        answer:
          "Over-the-counter trays rarely fit well, so some teeth lighten and others do not. Gels can sit on the gums. Crowns and fillings do not bleach, which is easy to miss until the smile looks patchy. A clinic visit is how you avoid that.",
      },
      {
        question: "How long does teeth whitening last?",
        answer:
          "It depends on tea, coffee, smoking, and how you clean. Many people keep a result for months to a couple of years, then refresh. Daily habits matter more than the brand name on the gel.",
      },
      {
        question: "Who should wait before whitening?",
        answer:
          "Anyone with untreated decay, gum disease, or very worn enamel. Pregnant patients are usually asked to postpone. If you have many front crowns or veneers, those pieces will not change colour — we say so before you book.",
      },
      {
        question: "Where can I get teeth whitening in Bahria Town?",
        answer:
          "At ORA Dental Wellness, Ground Floor, Plot 35, Street 8, Bahria Paradise Commercial, Bahria Town Phase 4. Dr. Roha Ejaz leads cosmetic and restorative care, including whitening. Monday to Saturday, 12:00 PM to 9:00 PM. WhatsApp 0339 8891919.",
      },
    ],
    body: [
      {
        type: "p",
        text: "A dull smile is often treated as a small vanity. It is usually something more ordinary: years of chai, coffee, and the way enamel naturally yellows. People notice it in photographs, then in the mirror, then they buy a strip that burns the gums and barely moves the colour.",
      },
      {
        type: "p",
        text: "Teeth whitening matters because the colour of your teeth is part of how you are read. It also matters because the wrong gel, on the wrong mouth, can leave you sensitive and uneven. At ORA Dental Wellness we treat it as dentistry: enamel, gums, and restorations first, brightness second.",
      },
      {
        type: "h2",
        text: "Why colour is not only cosmetic",
      },
      {
        type: "p",
        text: "Stain sits in two places. Surface stain from tea, coffee, tobacco, and spices often lifts with a proper scale and polish. Deeper colour lives inside the tooth — that is what bleaching is for. Mixing the two up is how clinics sell whitening to someone who only needed a clean, or skip the clean and bleach over plaque.",
      },
      {
        type: "notes",
        items: [
          {
            title: "We clean first",
            text: "Tea and coffee leave a film. Once that is gone, we can see the real colour of your teeth — and whether whitening is even needed.",
          },
          {
            title: "Broken teeth come first",
            text: "Cavities and leaking fillings have to be repaired. Whitening gel cannot fix a damaged tooth; it only changes colour.",
          },
          {
            title: "Crowns stay the same",
            text: "Crowns, veneers, and many fillings do not bleach. We show you which teeth will look lighter, and which will not, before you start.",
          },
          {
            title: "Gums must be calm",
            text: "If your gums bleed, we treat that first. Whitening trays on sore gums only make the visit worse.",
          },
        ],
      },
      {
        type: "split",
        src: "whiteningBeforeAfter",
        alt: "Before and after teeth whitening — yellowed teeth above, brighter white smile below",
        kicker: "What it actually does",
        title: "Brighter, not theatrical.",
        text: "Clinic gels lift stain that toothpaste will never reach. They cannot make enamel new, and they will not match a filter. Dr. Roha Ejaz checks the enamel and gums first. If a clean is enough, we stop there. If gel is right, we talk through sensitivity and what tea and coffee will do to the result.",
      },
      {
        type: "h2",
        text: "How to keep the result",
      },
      {
        type: "p",
        text: "Whitening is not a one-afternoon trick. Colour returns with stain. We ask patients to be kind to the first forty-eight hours — less tea, coffee, and dark sauces — then return to ordinary life with decent cleaning. A night guard matters if you grind; worn enamel looks darker even after bleach.",
      },
      {
        type: "cta",
        kicker: "Book a whitening consult",
        title: "Start with a look at the teeth, not a kit.",
        text: "WhatsApp us and we will find a time that suits. Dr. Roha will check the enamel first, then talk through whether whitening is right.",
        address:
          "ORA Dental Wellness — Plot 35, Street 8, Bahria Paradise Commercial, Bahria Town Phase 4.",
      },
    ],
  },
  /*
  {
    slug: "best-dental-clinic-in-rawalpindi",
    title: "How ORA Dental Wellness Is the Best Dental Clinic in Rawalpindi",
    description:
      "How ORA Dental Wellness became a trusted dental clinic in Bahria Town Phase 4, Rawalpindi — named dentists, calm rooms, honest fees, and care you can reach after work.",
    keywords:
      "ORA Dental Wellness, best dental clinic in Rawalpindi, best dental clinic near me, dentist Bahria Town Phase 4, dental clinic Rawalpindi, nearest dental clinic Bahria Town",
    excerpt:
      "If you are looking for a dental clinic in Bahria Town that feels considered — named dentists, unhurried exams, and a chair you will actually return to — here is how ORA works.",
    category: "Clinic guide",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    readingMinutes: 7,
    hero: {
      src: "reception",
      alt: "ORA Dental Wellness reception in Bahria Town Phase 4, Rawalpindi",
      caption: "Reception at Bahria Paradise Commercial, Bahria Town Phase 4.",
    },
    ogImage: `${SITE_URL}/og-image.webp`,
    ogImageAlt:
      "ORA Dental Wellness reception — Bahria Town Phase 4, Rawalpindi",
    faqTitle: "Visiting ORA",
    faqIntro:
      "A few practical answers if you are choosing a dentist in Rawalpindi or Bahria Town.",
    faqs: [
      {
        question: "Where is ORA Dental Wellness?",
        answer:
          "Ground Floor, Plot 35, Street 8, Bahria Paradise Commercial, Bahria Town Phase 4, Rawalpindi 46220. Parking is nearby in the commercial area. Many patients searching for a dental clinic near them in Phase 4, 7 or 8 find us a short drive.",
      },
      {
        question: "What are your hours?",
        answer:
          "Monday to Saturday, 12:00 PM to 9:00 PM. Appointments are preferred; walk-ins are welcome when the diary allows.",
      },
      {
        question: "Why do patients call ORA one of the best dental clinics in Rawalpindi?",
        answer:
          "They mention the calm rooms, time in the chair, and dentists they can name — Dr. Ahmed Sultan and Dr. Roha Ejaz — rather than a rotating duty doctor. Google reviews are the honest record; we would rather you read those than take a slogan.",
      },
      {
        question: "Is ORA convenient from Islamabad?",
        answer:
          "Yes. Bahria Town Phase 4 sits between Rawalpindi and Islamabad, so twin-city patients visit for aligners, restorative work, and family dentistry.",
      },
      {
        question: "How do I book?",
        answer:
          "WhatsApp 0339 8891919, call 051 8891919, or use the form on this site.",
      },
    ],
    body: [
      {
        type: "p",
        text: "When someone in Bahria Town types “best dental clinic near me,” they are usually not hunting for a trophy. They want a clean room, a dentist who explains the plan, and a clinic they can reach on a weeknight. That is the standard we built ORA Dental Wellness around — in Bahria Paradise Commercial, Phase 4.",
      },
      {
        type: "p",
        text: "ORA is a quiet-luxury atelier, not a high-volume hall. Dr. Ahmed Sultan and Dr. Roha Ejaz lead the practice. We think “best” is something you feel in the first hour: sterilisation you can see, fees before treatment starts, and enough time in the chair that nothing important is rushed.",
      },
      {
        type: "h2",
        text: "What we hold ourselves to",
      },
      {
        type: "p",
        text: "Use this list on a first visit here — or anywhere else in Rawalpindi. A good clinic should be able to show its work.",
      },
      {
        type: "ul",
        items: [
          "Sterilisation that is visible: pouched instruments, not a hurried open tray.",
          "Named dentists. You should know who is treating you, and whether a specialist will join.",
          "An unhurried exam. Decay, gums, and bite problems are easy to miss when the clock is the priority.",
          "Reviews that mention aftercare, parking, and how pain was handled — not only a star count.",
          "Fees discussed before work begins.",
          "A location you will actually return to. Aligners, crowns, and gum care need more than one appointment.",
        ],
      },
      {
        type: "image",
        src: "atelier",
        alt: "Consultation lounge at ORA Dental Wellness, Bahria Town Phase 4",
        caption: "The consultation lounge — first visits without hurry.",
      },
      {
        type: "h2",
        text: "Why Bahria Town Phase 4 matters",
      },
      {
        type: "p",
        text: "Families in Phase 4, 7, and 8 often still search “best dentist in Islamabad.” The cities share a corridor, but follow-ups are local. We are open Monday to Saturday, 12:00 PM to 9:00 PM, so checks can sit after work. If you are coming from DHA, Bahria Enclave, or central Rawalpindi, we are on Street 8, Plot 35, Ground Floor, with parking in the commercial pocket.",
      },
      {
        type: "h2",
        text: "Who you will see",
      },
      {
        type: "p",
        text: "Dr. Ahmed Sultan focuses on general dentistry and clear aligners. Dr. Roha Ejaz leads general and restorative care. Periodontists, oral surgeons, and prosthodontists support more complex cases. The point is continuity: the same hands, not a new face every visit.",
      },
      {
        type: "portraits",
        people: [
          {
            src: "drAhmed",
            name: "Dr. Ahmed Sultan",
            role: "General dentist · Aligners",
          },
          {
            src: "drRoha",
            name: "Dr. Roha Ejaz",
            role: "General & restorative",
          },
        ],
      },
      {
        type: "h2",
        text: "Come sit with us",
      },
      {
        type: "p",
        text: "We would rather you walk the rooms, ask about sterilisation, and read recent Google reviews than take our word for “best.” A short clinic tour is on this site if you want a look first. When you are ready, WhatsApp 0339 8891919, call, or use the form — ORA Dental Wellness, Bahria Town Phase 4.",
      },
    ],
  },
  {
    slug: "clear-aligners-in-bahria-town-rawalpindi",
    title: "Clear Aligners in Bahria Town — Official Aligno Partner",
    description:
      "Clear aligners in Bahria Town Phase 4 at ORA Dental Wellness, an official Aligno partner. How treatment is planned, who it suits, and what follow-ups look like in Rawalpindi.",
    keywords:
      "clear aligners Bahria Town, Aligno partner Rawalpindi, clear aligners Rawalpindi, invisible braces Bahria Town, dentist Bahria Town Phase 4, ORA Dental Wellness aligners",
    excerpt:
      "ORA is an official Aligno partner in Bahria Town Phase 4. Here is how we plan clear aligners — scans, honest wear time, and reviews you can actually attend.",
    category: "Aligners",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    readingMinutes: 6,
    hero: {
      src: "aligners",
      alt: "Clear aligner held in hand — Aligno treatment at ORA Dental Wellness, Bahria Town Phase 4",
      caption: "Clear aligners planned at ORA, Bahria Town Phase 4.",
    },
    ogImage: `${SITE_URL}/aligners.webp`,
    ogImageAlt:
      "Clear aligners at ORA Dental Wellness, official Aligno partner in Bahria Town, Rawalpindi",
    faqTitle: "Aligners at ORA",
    faqIntro:
      "Practical answers if you are considering clear aligners in Bahria Town.",
    faqs: [
      {
        question: "Does ORA offer Aligno clear aligners in Bahria Town?",
        answer:
          "Yes. ORA Dental Wellness is an official Aligno partner. Dr. Ahmed Sultan plans your case at our Bahria Town Phase 4 clinic, then Aligno fabricates the trays. Follow-ups stay here — you are not sent across the city for every check.",
      },
      {
        question: "Who are clear aligners for?",
        answer:
          "They can straighten crowding, close modest spaces, and refine a smile after old braces. They are a poor fit when gums are inflamed, when the bite needs surgery or fixed appliances, or when trays cannot be worn most of the day. A consult should say no as clearly as yes.",
      },
      {
        question: "How long does treatment take?",
        answer:
          "It depends on the movement, not the brand name on the box. Simpler alignment may take a few months; more complex staging takes longer and often needs a refinement set. We discuss a realistic window before you start.",
      },
      {
        question: "Will I need to come in every month?",
        answer:
          "Reviews matter. Trays that sit in a drawer stall. We are open Monday to Saturday, 12:00 PM to 9:00 PM, so checks can sit after work in Phase 4.",
      },
      {
        question: "How do I start?",
        answer:
          "WhatsApp 0339 8891919 or book on this site. Bring recent X-rays if you have them, and a note of what bothers you in photographs.",
      },
    ],
    body: [
      {
        type: "p",
        text: "Clear aligners are one of the most asked-for treatments in Bahria Town: quieter than metal braces, easier to live with, and easy to oversell. At ORA Dental Wellness we plan them as dentistry first — bite, gums, and enamel — then the sequence of trays.",
      },
      {
        type: "p",
        text: "ORA is an official partner of Aligno, Pakistan’s clear-aligner manufacturer. That means your case is designed here, the trays are made to that plan, and your reviews stay in Bahria Town Phase 4 with Dr. Ahmed Sultan — not a clinic you will postpone in traffic.",
      },
      {
        type: "partner",
        name: "Aligno",
        href: "https://aligno.co/",
        logo: "/aligno-logo.png",
        note: "ORA Dental Wellness is an official Aligno partner. Your smile is planned in our atelier; Aligno fabricates the aligners.",
      },
      {
        type: "h2",
        text: "Who aligners help — and who they do not",
      },
      {
        type: "p",
        text: "Aligners can straighten crowding, close modest spaces, and refine a smile that has drifted after old braces. They are the wrong tool when gums are inflamed, when large skeletal discrepancies need surgery or fixed appliances, or when someone cannot wear trays about 20–22 hours a day. Night-only wear almost never finishes on the advertised timeline.",
      },
      {
        type: "ul",
        items: [
          "Healthy gums and a stable bite plan come before cosmetic staging.",
          "Decay and failing fillings are treated first, so trays are not built on a moving foundation.",
          "If a clinic promises “no attachments, no refinements, done in three months,” ask what happens if a tooth does not track.",
        ],
      },
      {
        type: "image",
        src: "atelier",
        alt: "Consultation lounge at ORA Dental Wellness where aligner records are taken",
        caption: "Records and planning in the atelier, Bahria Town Phase 4.",
      },
      {
        type: "h2",
        text: "What the first visits look like",
      },
      {
        type: "p",
        text: "We start with photographs, an exam, and digital records so you see your proposed movement — not a stock before-and-after from another city. Small tooth-coloured attachments and careful space between teeth are sometimes part of an honest Aligno plan. Fees, including a lost tray, are discussed before you commit.",
      },
      {
        type: "p",
        text: "Follow-ups matter as much as the first scan. We are in Bahria Paradise Commercial, Monday to Saturday, 12:00 PM to 9:00 PM. When teeth have moved, retainers are how the result stays — they are not optional.",
      },
      {
        type: "image",
        src: "drAhmed",
        alt: "Dr. Ahmed Sultan, aligners dentist at ORA Dental Wellness, Bahria Town Phase 4",
        caption: "Dr. Ahmed Sultan — aligner planning at ORA.",
      },
      {
        type: "h2",
        text: "Start with a consult, not a package",
      },
      {
        type: "p",
        text: "Bring recent X-rays if you have them, and a note of what bothers you in photographs. WhatsApp 0339 8891919, call, or use the form. ORA Dental Wellness — official Aligno partner in Bahria Town Phase 4.",
      },
    ],
  },
  */
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function blogPostSeo(post: BlogPost): PageSeo {
  return {
    path: `/blog/${post.slug}`,
    title: `${post.title} | ORA Dental Wellness`,
    description: post.description,
    keywords: post.keywords,
    ogType: "article",
    ogImage: post.ogImage,
    ogImageAlt: post.ogImageAlt,
  };
}

export function formatBlogDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00+05:00`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Karachi",
  }).format(date);
}

export function blogPostUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}
