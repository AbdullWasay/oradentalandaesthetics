import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ContactLeadPopup } from "@/components/ContactLeadPopup";
import { BlogPhoto } from "@/components/BlogPhoto";
import { BLOG_POSTS, formatBlogDate } from "@/lib/blog";
import { ORA_WHATSAPP_URL } from "@/lib/seo";
import { trackContact } from "@/lib/meta-pixel";

function useScrollRise(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".blog-rise"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [rootRef]);
}

export function BlogIndexPage() {
  const rootRef = useRef<HTMLElement>(null);
  const [featured, ...rest] = BLOG_POSTS;
  useScrollRise(rootRef);

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#2c3228]">
      <SiteHeader />

      <main id="main" ref={rootRef}>
        <section className="relative overflow-hidden bg-[#f7f3ec]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 top-8 select-none font-display text-[clamp(5.5rem,16vw,12rem)] font-light leading-none tracking-[-0.05em] text-[#4d5645]/[0.06] sm:right-8 lg:right-14"
          >
            ORA
          </div>

          <div className="relative mx-auto max-w-7xl px-6 pb-4 pt-14 sm:pt-16 lg:px-10 lg:pt-20">
            <div className="blog-rise max-w-3xl">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#666d57]" />
                <p className="font-sans-tight text-[10px] tracking-[0.4em] text-[#4d5645]/70">
                  Journal
                </p>
              </div>
              <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-light leading-[1.02] tracking-tight text-[#4d5645]">
                Guides from
                <span className="block italic text-[#666d57]">ORA Dental Wellness.</span>
              </h1>
              <p className="mt-5 max-w-md text-[1.05rem] font-light leading-relaxed text-[#4a5246]">
                Practical notes on dentistry — written the way we work.
              </p>
            </div>
          </div>
        </section>

        {featured ? (
          <section className="bg-[#f7f3ec] pb-8 pt-8 lg:pb-12 lg:pt-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <article className="blog-rise relative overflow-hidden rounded-[1.75rem] bg-[#f5f1eb] lg:grid lg:grid-cols-12 lg:items-stretch">
                <Link
                  to="/blog/$slug"
                  params={{ slug: featured.slug }}
                  className="relative flex items-center justify-center overflow-hidden bg-[#ebe4d8] px-5 py-8 lg:col-span-6 lg:px-8 lg:py-12"
                >
                  <div className="overflow-hidden rounded-2xl shadow-[0_24px_50px_-28px_rgba(44,50,40,0.45)]">
                    <BlogPhoto
                      media={featured.hero.src}
                      alt={featured.hero.alt}
                      priority
                      size="hero"
                    />
                  </div>
                </Link>
                <div className="relative flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:col-span-6 lg:px-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex w-fit items-center rounded-full bg-[#c4a35a] px-3 py-1 font-sans-tight text-[9px] tracking-[0.2em] text-[#1a1c18]">
                      Featured
                    </span>
                    <span className="font-sans-tight text-[10px] tracking-[0.18em] text-[#8a6d2f]">
                      {featured.category} · {formatBlogDate(featured.publishedAt)} ·{" "}
                      {featured.readingMinutes} min
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-[clamp(1.85rem,3.4vw,2.7rem)] font-light leading-[1.06] tracking-tight text-[#4d5645]">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: featured.slug }}
                      className="transition-colors hover:text-[#666d57]"
                    >
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-md text-[1.05rem] font-light leading-relaxed text-[#3d4438]">
                    {featured.excerpt}
                  </p>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: featured.slug }}
                    className="mt-8 inline-flex w-fit items-center gap-2 bg-[#4d5645] px-7 py-3.5 font-sans-tight text-[11px] tracking-[0.18em] text-[#f5f1eb] transition-colors hover:bg-[#3d4438]"
                  >
                    Read the guide <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </div>
          </section>
        ) : null}

        {rest.length > 0 ? (
          <section className="bg-[#f7f3ec] pb-16 pt-4 lg:pb-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="blog-rise flex items-center gap-4">
                <span className="h-px w-10 bg-[#666d57]" />
                <p className="font-sans-tight text-[10px] tracking-[0.4em] text-[#4d5645]/70">
                  Also in the journal
                </p>
              </div>
              <ul className="mt-10 space-y-10">
                {rest.map((post, i) => (
                  <li key={post.slug} className="blog-rise">
                    <article className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className={`overflow-hidden rounded-2xl bg-[#ebe4d8] md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}
                      >
                        <BlogPhoto
                          media={post.hero.src}
                          alt={post.hero.alt}
                          size="hero"
                        />
                      </Link>
                      <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                        <p className="font-sans-tight text-[10px] tracking-[0.2em] text-[#8a6d2f]">
                          {String(i + 2).padStart(2, "0")} · {post.category} ·{" "}
                          {formatBlogDate(post.publishedAt)}
                        </p>
                        <h2 className="mt-3 font-display text-[clamp(1.65rem,3vw,2.2rem)] font-light leading-tight tracking-tight text-[#4d5645]">
                          <Link
                            to="/blog/$slug"
                            params={{ slug: post.slug }}
                            className="transition-colors hover:text-[#666d57]"
                          >
                            {post.title}
                          </Link>
                        </h2>
                        <p className="mt-3 max-w-md text-[1.02rem] font-light leading-relaxed text-[#4a5246]">
                          {post.excerpt}
                        </p>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          className="mt-7 inline-flex w-fit items-center gap-2 font-sans-tight text-[11px] tracking-[0.16em] text-[#4d5645] transition-colors hover:text-[#2c3228]"
                        >
                          Read the note <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="relative overflow-hidden bg-[#4d5645]">
          <div className="grain pointer-events-none absolute inset-0 opacity-[0.1]" />
          <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 sm:flex-row sm:items-end sm:justify-between lg:px-10 lg:py-20">
            <div className="blog-rise max-w-lg">
              <p className="font-sans-tight text-[10px] tracking-[0.32em] text-[#d8cdc3]/70">
                Bahria Town Phase 4
              </p>
              <p className="mt-4 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-light leading-[1.08] text-[#f5f1eb]">
                Sit with us — the atelier is a short drive, with evening hours.
              </p>
            </div>
            <a
              href={ORA_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackContact("whatsapp")}
              className="blog-rise inline-flex items-center justify-center gap-2 bg-[#f5f1eb] px-7 py-4 font-sans-tight text-[11px] tracking-[0.18em] text-[#4d5645] transition-colors hover:bg-white"
            >
              Chat on WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ContactLeadPopup />
      <FloatingWhatsApp />
    </div>
  );
}
