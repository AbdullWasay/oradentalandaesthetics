import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ContactLeadPopup } from "@/components/ContactLeadPopup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  TREATMENT_PAGES,
  type TreatmentPage as TreatmentPageData,
} from "@/lib/treatments";
import {
  ORA_PHONE_DISPLAY,
  ORA_WHATSAPP_URL,
} from "@/lib/seo";
import { trackContact } from "@/lib/meta-pixel";

export function TreatmentPage({ page }: { page: TreatmentPageData }) {
  const others = TREATMENT_PAGES.filter((item) => item.slug !== page.slug);

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#2c3228]">
      <SiteHeader />

      <main id="main">
        <article>
          <header className="relative overflow-hidden bg-[#f7f3ec] pt-10 lg:pt-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#666d57] via-[#666d57] via-[42%] to-[#f7f3ec]"
            />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
              <a
                href="/#treatments"
                className="inline-flex items-center gap-2 font-sans-tight text-[10px] tracking-[0.18em] text-[#f5f1eb]/80 transition-colors hover:text-[#f5f1eb]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Treatments
              </a>

              <div className="mx-auto mt-10 grid max-w-6xl items-center gap-10 pb-12 lg:grid-cols-12 lg:gap-12 lg:pb-16">
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-4">
                    <span className="h-px w-10 bg-[#f5f1eb]/55" />
                    <p className="font-sans-tight text-[10px] tracking-[0.32em] text-[#f5f1eb]/80">
                      {page.kicker}
                    </p>
                  </div>
                  <h1 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.5rem)] font-bold leading-[1.06] tracking-tight text-[#f5f1eb]">
                    {page.headline}
                  </h1>
                  <p className="mt-5 max-w-xl text-[1.08rem] font-light leading-relaxed text-[#f5f1eb]/85">
                    {page.excerpt}
                  </p>
                  <a
                    href={ORA_WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContact("whatsapp")}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f5f1eb] px-6 py-3.5 font-sans-tight text-[11px] tracking-[0.14em] text-[#4d5645] transition-colors hover:bg-white"
                  >
                    WhatsApp
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                <figure className="lg:col-span-6">
                  <div className="overflow-hidden rounded-2xl bg-[#ebe4d8]/40 shadow-[0_28px_60px_-36px_rgba(26,28,24,0.55)]">
                    <img
                      src={page.hero.src}
                      alt={page.hero.alt}
                      width={page.hero.width}
                      height={page.hero.height}
                      className="mx-auto block h-auto max-h-[22rem] w-full object-cover object-center sm:max-h-[26rem]"
                      fetchPriority="high"
                    />
                  </div>
                </figure>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="min-w-0 space-y-14 lg:col-span-8">
                <section>
                  <p className="font-sans-tight text-[10px] tracking-[0.22em] text-[#666d57]">
                    Why ORA
                  </p>
                  <h2 className="mt-2 font-display text-[1.55rem] font-bold leading-tight tracking-tight text-[#4d5645]">
                    Care shaped around the visit — not a sales script.
                  </h2>
                  <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                    {page.highlights.map((item) => (
                      <li
                        key={item.title}
                        className="rounded-2xl bg-[#f5f1eb] px-5 py-5"
                      >
                        <p className="font-sans-tight text-[10px] font-semibold tracking-[0.18em] text-[#4d5645]">
                          {item.title}
                        </p>
                        <p className="mt-2 text-[0.95rem] font-light leading-relaxed text-[#3d4438]">
                          {item.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <p className="font-sans-tight text-[10px] tracking-[0.22em] text-[#666d57]">
                    What we include
                  </p>
                  <h2 className="mt-2 font-display text-[1.55rem] font-bold leading-tight tracking-tight text-[#4d5645]">
                    A clear scope before you begin.
                  </h2>
                  <ul className="mt-6 space-y-2.5 border-l-2 border-[#c4a35a]/70 pl-4">
                    {page.includes.map((item) => (
                      <li
                        key={item}
                        className="text-[1.02rem] font-light leading-relaxed text-[#3d4438]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <p className="font-sans-tight text-[10px] tracking-[0.22em] text-[#666d57]">
                    How it works
                  </p>
                  <h2 className="mt-2 font-display text-[1.55rem] font-bold leading-tight tracking-tight text-[#4d5645]">
                    Three calm steps.
                  </h2>
                  <ol className="mt-8 grid gap-4 sm:grid-cols-3">
                    {page.steps.map((step, index) => (
                      <li key={step.title} className="rounded-2xl bg-white/70 px-5 py-5">
                        <p className="font-sans-tight text-[10px] tracking-[0.2em] text-[#8a6d2f]">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-3 font-display text-[1.25rem] font-bold leading-snug text-[#4d5645]">
                          {step.title}
                        </p>
                        <p className="mt-2 text-[0.95rem] font-light leading-relaxed text-[#3d4438]">
                          {step.text}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>

                <section
                  id="faq"
                  className="scroll-mt-24"
                  aria-labelledby="treatment-faq-heading"
                >
                  <p className="font-sans-tight text-[10px] tracking-[0.22em] text-[#666d57]">
                    Questions
                  </p>
                  <h2
                    id="treatment-faq-heading"
                    className="mt-2 font-display text-[1.55rem] font-bold leading-tight tracking-tight text-[#4d5645]"
                  >
                    Before you book
                  </h2>
                  <div className="mt-6 overflow-hidden rounded-2xl bg-white/80">
                    <Accordion type="single" collapsible className="w-full">
                      {page.faqs.map((item, i) => (
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
                              <span className="font-display text-[1.02rem] font-normal leading-snug text-[#4d5645]">
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
              </div>

              <aside className="lg:col-span-4">
                <div className="sticky top-28 space-y-5">
                  <div className="rounded-2xl bg-[#666d57] px-5 py-6">
                    <p className="font-sans-tight text-[10px] tracking-[0.2em] text-[#d8cdc3]">
                      {page.cta.kicker}
                    </p>
                    <p className="mt-3 font-display text-[1.45rem] font-bold leading-snug text-[#f5f1eb]">
                      {page.cta.title}
                    </p>
                    <p className="mt-3 text-[0.92rem] font-light leading-relaxed text-[#f5f1eb]/85">
                      {page.cta.text}
                    </p>
                    <a
                      href={ORA_WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackContact("whatsapp")}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#f5f1eb] px-5 py-3.5 font-sans-tight text-[11px] tracking-[0.14em] text-[#4d5645] transition-colors hover:bg-white"
                    >
                      WhatsApp
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                    <p className="mt-3 text-center font-sans-tight text-[10px] tracking-[0.14em] text-[#d8cdc3]">
                      Or call {ORA_PHONE_DISPLAY}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f5f1eb] px-5 py-5">
                    <p className="font-sans-tight text-[10px] tracking-[0.2em] text-[#8a6d2f]">
                      Your dentist
                    </p>
                    <p className="mt-3 font-display text-[1.25rem] font-bold leading-snug text-[#4d5645]">
                      {page.doctor.name}
                    </p>
                    <p className="mt-1 text-[0.9rem] font-light text-[#4a5246]">
                      {page.doctor.role}
                    </p>
                    <p className="mt-3 text-[0.92rem] font-light leading-relaxed text-[#3d4438]">
                      {page.doctor.note}
                    </p>
                  </div>
                </div>
              </aside>
            </div>

            {others.length > 0 ? (
              <section className="mt-16 border-t border-[#4d5645]/10 pt-12">
                <p className="font-sans-tight text-[10px] tracking-[0.22em] text-[#666d57]">
                  Related care
                </p>
                <h2 className="mt-2 font-display text-[1.55rem] font-bold leading-tight tracking-tight text-[#4d5645]">
                  Other treatment pages
                </h2>
                <ul className="mt-8 grid gap-4 md:grid-cols-2">
                  {others.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to="/treatments/$slug"
                        params={{ slug: item.slug }}
                        className="group flex h-full flex-col rounded-2xl bg-[#f5f1eb] px-6 py-6 transition-colors hover:bg-[#efe8dc]"
                      >
                        <p className="font-sans-tight text-[10px] tracking-[0.18em] text-[#8a6d2f]">
                          {item.kicker}
                        </p>
                        <p className="mt-3 font-display text-[1.35rem] font-bold leading-snug text-[#4d5645] transition-colors group-hover:text-[#666d57]">
                          {item.headline}
                        </p>
                        <p className="mt-3 line-clamp-2 text-[0.95rem] font-light leading-relaxed text-[#3d4438]">
                          {item.excerpt}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 font-sans-tight text-[10px] tracking-[0.16em] text-[#4d5645]">
                          View page
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </article>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
      <ContactLeadPopup />
    </div>
  );
}
