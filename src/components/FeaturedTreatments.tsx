import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import { TREATMENT_PAGES } from "@/lib/treatments";

export function FeaturedTreatments() {
  return (
    <section className="relative overflow-hidden bg-[#f7f3ec]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <SectionLabel>Dedicated care</SectionLabel>
            <h2 className="mt-5 font-display text-4xl leading-tight text-[#4d5645] md:text-5xl">
              Aligners, implants &amp;{" "}
              <span className="italic text-[#666d57]">everyday dentistry.</span>
            </h2>
            <p className="mt-4 max-w-md text-foreground/70">
              Three focused guides for the treatments patients ask for most in Bahria Town Phase 4.
            </p>
          </div>
          <a
            href="/#treatments"
            className="inline-flex items-center gap-2 font-sans-tight text-[11px] tracking-[0.16em] text-[#4d5645] transition-colors hover:text-[#666d57]"
          >
            Full treatment list <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {TREATMENT_PAGES.map((page) => (
            <li key={page.slug}>
              <Link
                to="/treatments/$slug"
                params={{ slug: page.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-[#f5f1eb] transition-colors hover:bg-[#efe8dc]"
              >
                <div className="relative aspect-[5/3] overflow-hidden bg-[#ebe4d8]">
                  <img
                    src={page.hero.src}
                    alt=""
                    width={page.hero.width}
                    height={page.hero.height}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 py-6">
                  <p className="font-sans-tight text-[10px] tracking-[0.18em] text-[#8a6d2f]">
                    {page.kicker}
                  </p>
                  <h3 className="mt-3 font-display text-[1.4rem] font-bold leading-snug tracking-tight text-[#4d5645] transition-colors group-hover:text-[#666d57]">
                    {page.headline}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[0.95rem] font-light leading-relaxed text-[#3d4438]">
                    {page.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans-tight text-[10px] tracking-[0.16em] text-[#4d5645]">
                    View treatment
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
