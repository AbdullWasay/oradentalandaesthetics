import { useEffect, useState } from "react";
import { initialsFromName, compactGooglePhotoUrl, type GoogleReview } from "@/lib/google-reviews";

const AVATAR_COLORS = [
  "#3f4638",
  "#343a2e",
  "#2f3529",
  "#3a4034",
  "#454b3c",
  "#2a3024",
  "#383e32",
  "#32382c",
];

function colorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

type ReviewAvatarProps = {
  review: GoogleReview;
  className?: string;
  active?: boolean;
  textClassName?: string;
};

/**
 * Always renders a visible avatar.
 * Initials paint immediately; Google profile photos load after idle so they
 * don't compete with LCP / show up in mobile Lighthouse as cache/format issues.
 */
export function ReviewAvatar({
  review,
  className = "h-12 w-12",
  active = false,
  textClassName = "text-lg",
}: ReviewAvatarProps) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const [allowRemotePhoto, setAllowRemotePhoto] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const enable = () => setAllowRemotePhoto(true);
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(enable, { timeout: 10000 });
    } else {
      timeoutId = setTimeout(enable, 8000);
    }
    return () => {
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  const photoUrl = compactGooglePhotoUrl(
    review.authorPhotoUrl,
    className.includes("h-12") || className.includes("h-14") ? 72 : 48,
  );
  const showPhoto = allowRemotePhoto && Boolean(photoUrl) && !photoFailed;
  const initials = initialsFromName(review.author);
  const background = colorForName(review.author);

  const ring = active
    ? "ring-[3px] ring-[#666d57] ring-offset-2 ring-offset-background"
    : className.includes("ring-0")
      ? ""
      : "ring-1 ring-white/80";

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)] ${ring} ${className}`}
    >
      <div
        className={`flex h-full w-full items-center justify-center font-display font-medium text-white ${textClassName}`}
        style={{ backgroundColor: background }}
        aria-hidden={!showPhoto}
      >
        {initials}
      </div>

      {showPhoto && photoUrl && (
        <img
          src={photoUrl}
          alt={`Google profile photo of ${review.author}, ORA Dental Wellness patient`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          draggable={false}
          onError={() => setPhotoFailed(true)}
        />
      )}
      {!showPhoto && <span className="sr-only">Avatar for {review.author}</span>}
    </div>
  );
}
