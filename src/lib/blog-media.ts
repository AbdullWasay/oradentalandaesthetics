import atelier from "@/assets/about-us.webp";
import reception from "@/assets/her-section-bg.webp";
import drAhmed from "@/assets/doctors/dr-ahmed-sultan.webp";
import drRoha from "@/assets/doctors/dr-roha-ejaz.webp";

export const BLOG_MEDIA_META = {
  atelier: { src: atelier, width: 420, height: 560 },
  reception: { src: reception, width: 1440, height: 740 },
  drAhmed: { src: drAhmed, width: 480, height: 722 },
  drRoha: { src: drRoha, width: 480, height: 722 },
  aligners: { src: "/aligners.webp", width: 1157, height: 932 },
  clinicTour: { src: "/clinic-video-poster.webp", width: 720, height: 1280 },
  whiteningSmile: { src: "/teeth-whiteing.jpg", width: 900, height: 599 },
  whiteningBeforeAfter: {
    src: "/teeth-whiteing-before-after.jpg",
    width: 800,
    height: 532,
  },
} as const;

export type BlogMediaKey = keyof typeof BLOG_MEDIA_META;

export const BLOG_MEDIA = {
  atelier: BLOG_MEDIA_META.atelier.src,
  reception: BLOG_MEDIA_META.reception.src,
  drAhmed: BLOG_MEDIA_META.drAhmed.src,
  drRoha: BLOG_MEDIA_META.drRoha.src,
  aligners: BLOG_MEDIA_META.aligners.src,
  clinicTour: BLOG_MEDIA_META.clinicTour.src,
  whiteningSmile: BLOG_MEDIA_META.whiteningSmile.src,
  whiteningBeforeAfter: BLOG_MEDIA_META.whiteningBeforeAfter.src,
} as const;

/** Face framing used on the homepage portraits. */
export const BLOG_PORTRAIT_FOCUS: Partial<Record<BlogMediaKey, string>> = {
  drAhmed: "object-[58%_18%]",
  drRoha: "object-[center_14%]",
};
