import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ContactLeadPopup } from "@/components/ContactLeadPopup";
import { BlogShareBar } from "@/components/BlogShareBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlogPhoto, SageFrame, isLandscapeMedia } from "@/components/BlogPhoto";
import { BLOG_MEDIA_META, BLOG_PORTRAIT_FOCUS } from "@/lib/blog-media";
import {
  BLOG_POSTS,
  formatBlogDate,
  type BlogPost,
} from "@/lib/blog";
import {
  ORA_PHONE_DISPLAY,
  ORA_PHONE_PRIMARY,
  ORA_WHATSAPP_URL,
} from "@/lib/seo";
import { trackContact } from "@/lib/meta-pixel";

const PLAIN_PHOTOS = new Set(["whiteningSmile", "whiteningBeforeAfter"]);

function useScrollRise(rootRef: React.RefObject<HTMLElement | null>, key: string) {
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
  }, [rootRef, key]);
}

function BlogSplit({
  src,
  width,
  height,
  alt,
  kicker,
  title,
  text,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  kicker?: string;
  title: string;
  text: string;
}) {
  return (
    <div className="blog-rise grid items-center gap-5 rounded-2xl bg-[#f5f1eb] p-3 md:grid-cols-2 md:gap-8 md:p-4">
      <figure className="relative m-0 overflow-hidden rounded-2xl bg-[#ebe4d8]">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="block h-auto w-full rounded-2xl"
          loading="lazy"
        />
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-[#1f241c]/55 px-3 py-1 font-sans-tight text-[9px] tracking-[0.18em] text-[#f5f1eb]">
          Before
        </span>
        <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-[#1f241c]/55 px-3 py-1 font-sans-tight text-[9px] tracking-[0.18em] text-[#f5f1eb]">
          After
        </span>
      </figure>
      <div className="flex flex-col justify-center px-4 py-5 sm:px-8 sm:py-8 md:px-10">
        {kicker ? (
          <p className="font-sans-tight text-[10px] tracking-[0.2em] text-[#8a6d2f]">
            {kicker}
          </p>
        ) : null}
        <h2 className="mt-2 font-display text-[1.7rem] font-bold leading-snug tracking-tight text-[#4d5645] sm:text-[2rem]">
          {title}
        </h2>
        <p className="mt-4 max-w-md text-[1.05rem] font-light leading-relaxed text-[#3d4438]">
          {text}
        </p>
      </div>
    </div>
  );
}

function BlogFigure({
  media,
  alt,
  caption,
  priority = false,
}: {
  media: BlogPost["hero"]["src"];
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  const photo = (
    <BlogPhoto
      media={media}
      alt={alt}
      priority={priority}
      size={PLAIN_PHOTOS.has(media) ? "modest" : "inline"}
    />
  );
  const framed = PLAIN_PHOTOS.has(media) ? (
    <div className="inline-block overflow-hidden rounded-2xl">{photo}</div>
  ) : (
    <SageFrame fill={isLandscapeMedia(media)}>{photo}</SageFrame>
  );

  return (
    <figure className="blog-rise my-2 text-center">
      {framed}
      {caption ? (
        <figcaption className="mt-2.5 text-[0.82rem] font-light leading-relaxed text-[#6a7364]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function BlogClinicCta({
  kicker,
  title,
  text,
  address,
  showCall = false,
}: {
  kicker: string;
  title: string;
  text?: string;
  address?: string;
  showCall?: boolean;
}) {
  const { src, width, height } = BLOG_MEDIA_META.reception;
  return (
    <aside className="blog-rise relative overflow-hidden">
      <div className="relative flex min-h-[22rem] items-center px-6 py-16 sm:min-h-[26rem] sm:py-20 lg:px-10">
        <img
          src={src}
          alt=""
          width={width}
          height={height}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[#4d5645]/72 mix-blend-multiply"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#2c3228]/80 via-[#3d4438]/50 to-[#4d5645]/30"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="font-sans-tight text-[10px] tracking-[0.22em] text-[#d8cdc3]">
            {kicker}
          </p>
          <p className="mt-3 max-w-xl font-display text-[clamp(1.75rem,3.8vw,2.7rem)] font-bold leading-[1.08] text-[#f5f1eb]">
            {title}
          </p>
          {text ? (
            <p className="mt-4 max-w-md text-[1.02rem] font-light leading-relaxed text-[#f5f1eb]/82">
              {text}
            </p>
          ) : null}
          {address ? (
            <p className="mt-3 max-w-md text-[0.88rem] font-light leading-relaxed text-[#d8cdc3]/90">
              {address}
            </p>
          ) : null}
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <a
              href={ORA_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackContact("whatsapp")}
              className="inline-flex items-center gap-2 rounded-full bg-[#f5f1eb] px-5 py-3 font-sans-tight text-[11px] tracking-[0.14em] text-[#4d5645] transition-colors hover:bg-white"
            >
              WhatsApp {ORA_PHONE_DISPLAY} <ArrowRight className="h-4 w-4" />
            </a>
            {showCall ? (
              <a
                href={`tel:${ORA_PHONE_PRIMARY}`}
                onClick={() => trackContact("phone")}
                className="font-sans-tight text-[11px] tracking-[0.14em] text-[#f5f1eb]/80 transition-colors hover:text-white"
              >
                Call {ORA_PHONE_DISPLAY}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}

function BlogBody({ post }: { post: BlogPost }) {
  return (
    <div className="space-y-8">
      {post.body.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={`${post.slug}-h2-${index}`}
              className="blog-rise pt-4 font-display text-[1.45rem] font-bold leading-snug tracking-tight text-[#4d5645] sm:text-[1.6rem]"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul
              key={`${post.slug}-ul-${index}`}
              className="blog-rise space-y-2.5 border-l-2 border-[#c4a35a]/70 pl-4"
            >
              {block.items.map((item) => (
                <li
                  key={item}
                  className="text-[1.02rem] font-light leading-relaxed text-[#3d4438]"
                >
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "partner") {
          return (
            <aside
              key={`${post.slug}-partner-${index}`}
              className="blog-rise flex flex-col gap-4 rounded-2xl bg-[#4d5645]/[0.07] p-5 sm:flex-row sm:items-center sm:gap-5"
            >
              <a
                href={block.href}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 self-start"
              >
                <img
                  src={block.logo}
                  alt={`${block.name} logo`}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-xl bg-black object-contain p-1.5"
                />
              </a>
              <div>
                <p className="font-sans-tight text-[10px] tracking-[0.2em] text-[#8a6d2f]">
                  Official partner
                </p>
                <p className="mt-1 font-display text-[1.35rem] font-bold text-[#4d5645]">
                  {block.name}
                </p>
                <p className="mt-1.5 text-[0.95rem] font-light leading-relaxed text-[#4a5246]">
                  {block.note}
                </p>
              </div>
            </aside>
          );
        }
        if (block.type === "notes") {
          return (
            <ul
              key={`${post.slug}-notes-${index}`}
              className="blog-rise grid gap-3 sm:grid-cols-2"
            >
              {block.items.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl bg-[#f5f1eb] px-5 py-4"
                >
                  <p className="font-sans-tight text-[10px] font-semibold tracking-[0.18em] text-[#4d5645]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[0.98rem] font-light leading-relaxed text-[#3d4438]">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "cta") {
          return null;
        }
        if (block.type === "split") {
          return (
            <BlogSplit
              key={`${post.slug}-split-${index}`}
              src={BLOG_MEDIA_META[block.src].src}
              width={BLOG_MEDIA_META[block.src].width}
              height={BLOG_MEDIA_META[block.src].height}
              alt={block.alt}
              kicker={block.kicker}
              title={block.title}
              text={block.text}
            />
          );
        }
        if (block.type === "image") {
          return (
            <BlogFigure
              key={`${post.slug}-img-${index}`}
              media={block.src}
              alt={block.alt}
              caption={block.caption}
            />
          );
        }
        if (block.type === "portraits") {
          return (
            <ul
              key={`${post.slug}-portraits-${index}`}
              className={`blog-rise grid gap-4 ${block.people.length > 1 ? "sm:grid-cols-2" : "max-w-md"}`}
            >
              {block.people.map((person) => {
                const { src, width, height } = BLOG_MEDIA_META[person.src];
                const focus =
                  BLOG_PORTRAIT_FOCUS[person.src] ?? "object-[center_18%]";
                return (
                  <li
                    key={person.name}
                    className="relative overflow-hidden rounded-2xl"
                  >
                    <div className="relative h-72 w-full sm:h-80">
                      <img
                        src={src}
                        alt={`${person.name} — ${person.role} at ORA Dental Wellness, Rawalpindi`}
                        width={width}
                        height={height}
                        className={`h-full w-full object-cover ${focus}`}
                        loading="lazy"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3d4438]/90 via-[#3d4438]/20 to-transparent"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
                      <p className="font-display text-[1.35rem] font-light leading-tight text-[#f5f1eb]">
                        {person.name}
                      </p>
                      <p className="mt-1 text-[0.92rem] font-light text-[#f5f1eb]/80">
                        {person.role}
                      </p>
                      {person.detail ? (
                        <p className="mt-1.5 font-sans-tight text-[10px] tracking-[0.16em] text-[#d8cdc3]">
                          {person.detail}
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          );
        }
        return (
          <p
            key={`${post.slug}-p-${index}`}
            className="blog-rise text-[1.08rem] font-light leading-[1.85] text-[#3d4438]"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const articleRef = useRef<HTMLElement>(null);
  const others = BLOG_POSTS.filter((item) => item.slug !== post.slug);
  const cta = post.body.find((block) => block.type === "cta");
  useScrollRise(articleRef, post.slug);

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#2c3228]">
      <SiteHeader />

      <main id="main" ref={articleRef}>
        <article className="border-b border-[#4d5645]/10">
          <header className="bg-[#4d5645]">
            <div className="blog-rise mx-auto grid max-w-7xl items-center gap-8 px-6 py-10 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-14">
              <div className={PLAIN_PHOTOS.has(post.hero.src) ? "lg:order-2" : undefined}>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 font-sans-tight text-[10px] tracking-[0.18em] text-[#f5f1eb]/70 transition-colors hover:text-[#f5f1eb]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Journal
                </Link>
                <p className="mt-8 font-sans-tight text-[10px] tracking-[0.2em] text-[#c4a35a]">
                  {post.category} · {formatBlogDate(post.publishedAt)} ·{" "}
                  {post.readingMinutes} min
                </p>
                <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.1rem,4.8vw,3.35rem)] font-bold leading-[1.08] tracking-tight text-[#f5f1eb]">
                  {post.title}
                </h1>
                <p className="mt-5 max-w-xl text-[1.05rem] font-light leading-relaxed text-[#f5f1eb]/80">
                  {post.excerpt}
                </p>
                <div className="mt-7">
                  <BlogShareBar post={post} onSage />
                </div>
              </div>
              <figure className={PLAIN_PHOTOS.has(post.hero.src) ? "lg:order-1" : undefined}>
                {PLAIN_PHOTOS.has(post.hero.src) ? (
                  <div className="overflow-hidden rounded-2xl">
                    <BlogPhoto
                      media={post.hero.src}
                      alt={post.hero.alt}
                      priority
                      size="hero"
                    />
                  </div>
                ) : (
                  <SageFrame fill={isLandscapeMedia(post.hero.src)}>
                    <BlogPhoto
                      media={post.hero.src}
                      alt={post.hero.alt}
                      priority
                      size="hero"
                    />
                  </SageFrame>
                )}
                <figcaption className="mt-2.5 text-[0.82rem] font-light text-[#f5f1eb]">
                  {post.hero.caption}
                </figcaption>
              </figure>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <BlogBody post={post} />

            <section
              id="faq"
              className="blog-rise mt-14 scroll-mt-24"
              aria-labelledby="blog-faq-heading"
            >
              <p className="font-sans-tight text-[10px] tracking-[0.22em] text-[#666d57]">
                Questions
              </p>
              <h2
                id="blog-faq-heading"
                className="mt-2 font-display text-[1.55rem] font-bold leading-tight tracking-tight text-[#4d5645]"
              >
                {post.faqTitle}
              </h2>
              <p className="mt-2 text-[0.95rem] font-light leading-relaxed text-[#4a5246]">
                {post.faqIntro}
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl bg-white/80">
                <Accordion type="single" collapsible className="w-full">
                  {post.faqs.map((item, i) => (
                    <AccordionItem
                      key={item.question}
                      value={`faq-${i}`}
                      className="border-0 border-b border-[#4d5645]/10 px-4 last:border-b-0"
                    >
                      <AccordionTrigger className="group gap-3 py-4 hover:no-underline [&>svg]:hidden">
                        <span className="flex min-w-0 flex-1 items-start gap-3 text-left">
                          <span className="mt-0.5 font-sans-tight text-[9px] tracking-[0.16em] text-[#8a6d2f]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-[1.02rem] font-bold leading-snug text-[#4d5645]">
                            {item.question}
                          </span>
                        </span>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f3eee4] text-[#4d5645] transition-colors group-data-[state=open]:bg-[#666d57] group-data-[state=open]:text-[#f5f1eb]">
                          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pl-9 pr-10 text-[0.95rem] font-light leading-relaxed text-[#4a5246]">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>

            <div className="blog-rise mt-10 flex flex-col gap-4 border-t border-[#4d5645]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-sans-tight text-[10px] tracking-[0.18em] text-[#6a7364]">
                Pass this guide on
              </p>
              <BlogShareBar post={post} compact />
            </div>
          </div>

          <BlogClinicCta
            kicker={cta?.kicker ?? "Bahria Town Phase 4"}
            title={cta?.title ?? "Book a visit this week."}
            text={cta?.text}
            address={
              cta?.address ??
              "Plot 35, Street 8, Bahria Paradise Commercial. Mon–Sat, 12:00 PM – 9:00 PM."
            }
            showCall={!cta}
          />
        </article>

        {others.length > 0 ? (
          <aside className="bg-[#faf8f4]">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
              <p className="blog-rise font-sans-tight text-[10px] tracking-[0.22em] text-[#666d57]">
                Continue reading
              </p>
              <ul className="mt-5 space-y-3">
                {others.map((item) => (
                  <li key={item.slug} className="blog-rise">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: item.slug }}
                      className="group flex items-center gap-4 rounded-2xl bg-white/70 p-3"
                    >
                      <SageFrame>
                        <BlogPhoto
                          media={item.hero.src}
                          alt=""
                          size="thumb"
                        />
                      </SageFrame>
                      <div className="min-w-0">
                        <p className="font-sans-tight text-[9px] tracking-[0.16em] text-[#8a6d2f]">
                          {item.category}
                        </p>
                        <p className="mt-1 font-display text-[1.12rem] font-bold leading-snug text-[#4d5645] transition-colors group-hover:text-[#3d4438]">
                          {item.title}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        ) : null}
      </main>

      <SiteFooter />
      <ContactLeadPopup />
      <FloatingWhatsApp />
    </div>
  );
}
