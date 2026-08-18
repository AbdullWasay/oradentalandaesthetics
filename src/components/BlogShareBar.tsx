import { useEffect, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { blogPostUrl, type BlogPost } from "@/lib/blog";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const btnClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#4d5645]/15 bg-background/80 text-[#4d5645] transition-colors hover:border-[#4d5645]/40 hover:bg-[#666d57] hover:text-[#f5f1eb]";

const btnClassOnSage =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#f5f1eb]/25 bg-[#f5f1eb]/10 text-[#f5f1eb] transition-colors hover:border-[#f5f1eb]/50 hover:bg-[#f5f1eb] hover:text-[#4d5645]";

export function BlogShareBar({
  post,
  compact = false,
  onSage = false,
}: {
  post: BlogPost;
  compact?: boolean;
  onSage?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const buttonClass = onSage ? btnClassOnSage : btnClass;
  const url = blogPostUrl(post.slug);
  const shareText = `${post.title} — ${url}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(post.title);

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const nativeShare = async () => {
    if (typeof navigator.share !== "function") return;
    try {
      await navigator.share({ title: post.title, text: post.excerpt, url });
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className={compact ? "flex items-center gap-2" : "flex flex-wrap items-center gap-2"}>
      {!compact ? (
        <p
          className={`mr-2 font-sans-tight text-[10px] tracking-[0.18em] ${onSage ? "text-[#f5f1eb]/55" : "text-foreground/40"}`}
        >
          Share
        </p>
      ) : null}
      {canNativeShare ? (
        <button type="button" onClick={nativeShare} className={buttonClass} aria-label="Share article">
          <Share2 className="h-4 w-4" />
        </button>
      ) : null}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noreferrer"
        className={buttonClass}
        aria-label="Share on WhatsApp"
      >
        <WhatsAppGlyph className="h-4 w-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className={buttonClass}
        aria-label="Share on Facebook"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v8h4v-8h3.2l.8-4H13V9c0-.6.4-1 1-1z" />
        </svg>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
        target="_blank"
        rel="noreferrer"
        className={buttonClass}
        aria-label="Share on X"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
          <path d="M18.9 2H22l-6.8 7.8L23 22h-6.6l-5.2-6.8L5.4 22H2.3l7.3-8.3L1 2h6.7l4.7 6.2L18.9 2zm-1.2 18h1.8L6.4 3.9H4.5L17.7 20z" />
        </svg>
      </a>
      <button
        type="button"
        onClick={copy}
        className={buttonClass}
        aria-label={copied ? "Link copied" : "Copy link"}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
