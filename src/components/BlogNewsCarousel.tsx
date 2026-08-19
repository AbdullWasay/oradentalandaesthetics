import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BlogPhoto } from "@/components/BlogPhoto";
import { SectionLabel } from "@/components/SectionLabel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BLOG_POSTS, formatBlogDate } from "@/lib/blog";

export function BlogNewsCarousel() {
  if (BLOG_POSTS.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#f7f3ec]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <SectionLabel>Journal</SectionLabel>
            <h2 className="mt-5 font-display text-4xl leading-tight text-[#4d5645] md:text-5xl">
              Latest from the <span className="italic text-[#666d57]">journal.</span>
            </h2>
            <p className="mt-4 max-w-md text-foreground/70">
              Practical notes on dentistry — written the way we work.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-sans-tight text-[11px] tracking-[0.16em] text-[#4d5645] transition-colors hover:text-[#666d57]"
          >
            All guides <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <Carousel
          opts={{ align: "start", loop: BLOG_POSTS.length > 2 }}
          className="mt-10"
        >
          <CarouselContent className="-ml-4">
            {BLOG_POSTS.map((post) => (
              <CarouselItem
                key={post.slug}
                className="pl-4 basis-[88%] sm:basis-[55%] lg:basis-[38%]"
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-[#f5f1eb] transition-colors hover:bg-[#efe8dc]"
                >
                  <div className="flex min-h-[12rem] items-center justify-center bg-[#ebe4d8] px-5 py-6">
                    <div className="overflow-hidden rounded-xl">
                      <BlogPhoto
                        media={post.hero.src}
                        alt={post.hero.alt}
                        size="card"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-6 py-6">
                    <p className="font-sans-tight text-[10px] tracking-[0.18em] text-[#8a6d2f]">
                      {post.category}
                      <span className="mx-2 text-[#c4a35a]">·</span>
                      {formatBlogDate(post.publishedAt)}
                    </p>
                    <h3 className="mt-3 font-display text-[1.45rem] font-light leading-snug tracking-tight text-[#4d5645] transition-colors group-hover:text-[#666d57]">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-[0.95rem] font-light leading-relaxed text-[#3d4438]">
                      {post.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 font-sans-tight text-[10px] tracking-[0.16em] text-[#4d5645]">
                      Read the guide
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
            <CarouselItem className="pl-4 basis-[88%] sm:basis-[55%] lg:basis-[38%]">
              <Link
                to="/blog"
                className="flex h-full min-h-[22rem] flex-col justify-between rounded-[1.5rem] bg-[#666d57] px-6 py-8 text-[#f5f1eb] transition-colors hover:bg-[#4d5645]"
              >
                <p className="font-sans-tight text-[10px] tracking-[0.22em] text-[#d8cdc3]">
                  Journal
                </p>
                <div>
                  <p className="font-display text-[1.85rem] font-light leading-snug">
                    Browse every guide from ORA.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans-tight text-[10px] tracking-[0.16em]">
                    All guides <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </CarouselItem>
          </CarouselContent>
          <div className="mt-8 flex justify-end gap-2">
            <CarouselPrevious className="static left-auto top-auto h-11 w-11 translate-y-0 rounded-full border-[#4d5645]/20 bg-transparent text-[#4d5645] hover:bg-[#4d5645] hover:text-[#f5f1eb]" />
            <CarouselNext className="static left-auto top-auto h-11 w-11 translate-y-0 rounded-full border-[#4d5645]/20 bg-transparent text-[#4d5645] hover:bg-[#4d5645] hover:text-[#f5f1eb]" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
