import { ChevronDown, MapPin, Clock, MessageCircle } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/seo";
import { SectionLabel } from "@/components/SectionLabel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HIGHLIGHTS = [
  { icon: MapPin, label: "Bahria Town Phase 4" },
  { icon: Clock, label: "Mon – Sat · 12–9 PM" },
  { icon: MessageCircle, label: "Appointments preferred" },
] as const;


export function FaqSection() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden border-t border-border/60 bg-secondary/40"
      aria-labelledby="faq-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-16 h-80 w-80 rounded-full bg-[#666d57]/[0.07] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#c4a35a]/[0.08] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Intro column */}
          <div className="lg:col-span-5">
            <SectionLabel>Questions</SectionLabel>
            <h2
              id="faq-heading"
              data-speakable
              className="mt-5 font-display text-4xl leading-tight tracking-tight md:text-5xl"
            >
              Before you{" "}
              <span className="italic text-[#666d57]">arrive.</span>
            </h2>
            <p className="mt-5 max-w-md text-[1.05rem] font-light leading-relaxed text-foreground/65">
              Quiet answers on location, hours, aligners, and booking — so your
              visit feels considered from the first enquiry.
            </p>

            <ul className="mt-10 hidden space-y-4 lg:block">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 font-sans-tight text-sm text-foreground/55"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#666d57]/15 bg-background/70 text-[#666d57]">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Accordion column */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[1.35rem] border border-[#4d5645]/10 bg-background/80 shadow-[0_24px_60px_-36px_rgba(77,86,69,0.35)] backdrop-blur-sm">
              <Accordion
                type="single"
                collapsible
                className="w-full"
              >
                {FAQ_ITEMS.map((item, i) => (
                  <AccordionItem
                    key={item.question}
                    value={`faq-${i}`}
                    className="border-0 border-b border-border/60 px-5 last:border-b-0 sm:px-7"
                  >
                    <AccordionTrigger className="group gap-4 py-5 hover:no-underline sm:py-6 [&>svg]:hidden">
                      <span className="flex min-w-0 flex-1 items-start gap-4 text-left">
                        <span className="mt-0.5 font-sans-tight text-[10px] tracking-[0.18em] text-[#666d57]/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[1.1rem] font-normal leading-snug text-foreground sm:text-[1.25rem]">
                          {item.question}
                        </span>
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3eee4] text-[#5c564e] transition-colors group-data-[state=open]:bg-[#666d57] group-data-[state=open]:text-[#f5f1eb]">
                        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pl-10 pr-12 text-[0.98rem] font-light leading-relaxed text-foreground/60 sm:pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
