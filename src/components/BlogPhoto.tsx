import type { ReactNode } from "react";
import type { BlogMediaKey } from "@/lib/blog-media";
import { BLOG_MEDIA_META } from "@/lib/blog-media";

export function isLandscapeMedia(media: BlogMediaKey) {
  const { width, height } = BLOG_MEDIA_META[media];
  return width >= height;
}

type BlogPhotoProps = {
  media: BlogMediaKey;
  alt: string;
  priority?: boolean;
  size?: "hero" | "inline" | "card" | "portrait" | "thumb" | "modest";
  className?: string;
};

/** Full image, native ratio — scaled to fit, never cropped. */
export function BlogPhoto({
  media,
  alt,
  priority = false,
  size = "inline",
  className = "",
}: BlogPhotoProps) {
  const { src, width, height } = BLOG_MEDIA_META[media];
  const landscape = width >= height;

  const sizeClass = {
    hero: landscape
      ? "h-auto w-full"
      : "mx-auto h-auto w-auto max-h-[26rem] max-w-full",
    inline: landscape
      ? "h-auto w-full"
      : "h-auto w-auto max-h-[24rem] max-w-full",
    card: "h-auto w-auto max-h-56 max-w-full sm:max-h-64",
    portrait: "h-auto w-auto max-h-44 max-w-[9rem]",
    thumb: "h-auto w-auto max-h-[4.5rem] max-w-[6rem]",
    modest: "mx-auto h-auto w-auto max-h-[16rem] max-w-[20rem] sm:max-h-[18rem] sm:max-w-[24rem]",
  }[size];

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`block ${sizeClass} ${className}`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

/** Full-bleed cover with cream edge fade — same treatment as the lead popup. */
export function BlogIndexCover({
  media,
  alt,
  priority = false,
  fade = "to-right",
}: {
  media: BlogMediaKey;
  alt: string;
  priority?: boolean;
  fade?: "to-left" | "to-right";
}) {
  const { src, width, height } = BLOG_MEDIA_META[media];
  const desktopFade =
    fade === "to-left"
      ? "lg:bg-gradient-to-l lg:from-transparent lg:via-[#f5f1eb]/30 lg:to-[#f5f1eb]"
      : "md:bg-gradient-to-r md:from-transparent md:via-[#f5f1eb]/30 md:to-[#f5f1eb]";

  return (
    <>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-[#f5f1eb] via-[#f5f1eb]/55 to-[#f5f1eb]/10 ${desktopFade}`}
      />
    </>
  );
}

/** Soft sage wash over a photo — no box, no border. */
export function SageFrame({
  children,
  className = "",
  fill = false,
}: {
  children: ReactNode;
  className?: string;
  fill?: boolean;
}) {
  return (
    <div
      className={`${fill ? "block w-full" : "inline-block"} relative max-w-full overflow-hidden rounded-2xl shadow-[0_16px_40px_-24px_rgba(44,50,40,0.35)] ${className}`}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#4d5645]/18 mix-blend-multiply"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3d4438]/22 via-transparent to-[#666d57]/10"
      />
    </div>
  );
}
