import { useState } from "react";
import { initialsFromName, type GoogleReview } from "@/lib/google-reviews";

const AVATAR_COLORS = [
  "#666d57",
  "#5c634c",
  "#7a8464",
  "#4f5642",
  "#8a7a5c",
  "#6b7358",
  "#55604a",
  "#9a8b6a",
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
 * Uses the Google profile photo when Places API provides one;
 * otherwise a colored initials portrait (API only returns photos for 5 reviews).
 */
export function ReviewAvatar({
  review,
  className = "h-12 w-12",
  active = false,
  textClassName = "text-lg",
}: ReviewAvatarProps) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const photoUrl = review.authorPhotoUrl;
  const showPhoto = Boolean(photoUrl) && !photoFailed;
  const initials = initialsFromName(review.author);
  const background = colorForName(review.author);

  const ring = active
    ? "ring-[3px] ring-[#666d57] ring-offset-2 ring-offset-background"
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
