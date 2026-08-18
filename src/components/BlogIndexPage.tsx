import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ContactLeadPopup } from "@/components/ContactLeadPopup";
import { BlogIndexCover } from "@/components/BlogPhoto";
import { BLOG_POSTS, formatBlogDate } from "@/lib/blog";
import { ORA_WHATSAPP_URL } from "@/lib/seo";
import { trackContact } from "@/lib/meta-pixel";

export function BlogIndexPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#2c3228]">
      <SiteHeader />

      <main id="main">
        <section className="border-b border-[#4d5645]/10 bg-[#faf8f4]">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
            <SectionLabel>Journal</SectionLabel>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,3.4rem)] font-bold leading-[1.05] tracking-tight text-[#4d5645]">
              Notes from the{" "}
              <span className="italic text-[#666d57]">atelier.</span>
            </h1>
          </div>
        </section>

        {featured ? (
          <section className="bg-[#faf8f4] pb-4 pt-2 lg:pb-6">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <article className="overflow-hidden rounded-[1.5rem] bg-[#f5f1eb] shadow-[0_18px_50px_-32px_rgba(44,50,40,0.28)] lg:grid lg:grid-cols-2 lg:items-stretch">
                <Link
                  to="/blog/$slug"
                  params={{ slug: featured.slug }}
                  className="relative block h-[42vw] min-h-[170px] max-h-[220px] overflow-hidden lg:order-2 lg:h-auto lg:min-h-[320px] lg:max-h-none"
                >
                  <BlogIndexCover
                    media={featured.hero.src}
                    alt={featured.hero.alt}
                    priority
                    fade="to-left"
                  />
                </Link>
                <div className="relative z-10 flex flex-col justify-center px-6 py-7 sm:px-9 sm:py-9 lg:order-1">
                  <span className="inline-flex w-fit items-center rounded-full bg-[#c4a35a] px-3 py-1 font-sans-tight text-[9px] tracking-[0.2em] text-[#1a1c18]">
                    Featured
                  </span>
                  <p className="mt-5 font-sans-tight text-[10px] tracking-[0.18em] text-[#8a6d2f]">
                    {featured.category} · {formatBlogDate(featured.publishedAt)} ·{" "}
                    {featured.readingMinutes} min
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(1.75rem,3.2vw,2.45rem)] font-bold leading-[1.08] tracking-tight text-[#4d5645]">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: featured.slug }}
                      className="transition-colors hover:text-[#666d57]"
                    >
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-[1.02rem] font-light leading-relaxed text-[#3d4438] sm:text-[1.08rem]">
                    {featured.excerpt}
                  </p>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: featured.slug }}
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#4d5645] px-5 py-3 font-sans-tight text-[11px] tracking-[0.14em] text-[#f5f1eb] transition-colors hover:bg-[#3d4438]"
                  >
                    Read the guide <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </div>
          </section>
        ) : null}

        {rest.length > 0 ? (
          <section className="border-t border-[#4d5645]/8 bg-[#f7f3ec]">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
              <p className="font-sans-tight text-[10px] tracking-[0.22em] text-[#666d57]">
                Also in the journal
              </p>
              <ul className="mt-8 space-y-8">
                {rest.map((post) => (
                  <li key={post.slug}>
                    <article className="overflow-hidden rounded-[1.5rem] bg-[#f5f1eb] shadow-[0_18px_50px_-32px_rgba(44,50,40,0.28)] md:grid md:grid-cols-12 md:items-stretch">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="relative block h-[42vw] min-h-[170px] max-h-[220px] overflow-hidden md:col-span-5 md:h-auto md:min-h-[240px] md:max-h-none"
                      >
                        <BlogIndexCover
                          media={post.hero.src}
                          alt={post.hero.alt}
                          fade="to-right"
                        />
                      </Link>
                      <div className="relative z-10 flex flex-col justify-center px-6 py-7 sm:px-9 sm:py-10 md:col-span-7">
                        <p className="font-sans-tight text-[10px] tracking-[0.2em] text-[#8a6d2f]">
                          {post.category} · {formatBlogDate(post.publishedAt)} ·{" "}
                          {post.readingMinutes} min
                        </p>
                        <h2 className="mt-3 font-display text-[clamp(1.55rem,2.6vw,2rem)] font-bold leading-tight tracking-tight text-[#4d5645]">
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

        <section className="bg-[#4d5645]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <p className="max-w-md text-[1.05rem] font-light leading-relaxed text-[#f5f1eb]/88">
              Looking for a dentist in Bahria Town Phase 4? Sit with us — the
              atelier is a short drive, with evening hours.
            </p>
            <a
              href={ORA_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackContact("whatsapp")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5f1eb] px-6 py-3.5 font-sans-tight text-[11px] tracking-[0.14em] text-[#4d5645] transition-colors hover:bg-white"
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
