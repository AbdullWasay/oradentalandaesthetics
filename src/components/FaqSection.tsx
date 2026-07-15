import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-[#eae2d6] bg-[#faf8f4]"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="text-center">
          <p className="font-sans-tight text-[0.7rem] uppercase tracking-[0.32em] text-[#8a7a5c]">
            Questions
          </p>
          <h2
            id="faq-heading"
            data-speakable
            className="mt-4 font-display text-[clamp(2.2rem,5vw,3.25rem)] font-light leading-[1.08] tracking-tight text-[#2c2a26]"
          >
            Before you arrive.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[1.02rem] font-light leading-relaxed text-[#6b6560]">
            A few quiet answers on location, hours, aligners, and booking.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          className="mt-14 w-full"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`faq-${i}`}
              className="border-0 border-b border-[#e4ddd3] last:border-b-0"
            >
              <AccordionTrigger className="group gap-5 py-6 hover:no-underline [&>svg]:hidden">
                <span className="min-w-0 flex-1 text-left font-display text-[1.15rem] font-normal leading-snug text-[#2c2a26] sm:text-[1.3rem]">
                  {item.question}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#efe9e0] text-[#5c564e] transition-colors group-data-[state=open]:bg-[#2c2a26] group-data-[state=open]:text-[#faf8f4]">
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pr-12 text-[0.98rem] font-light leading-relaxed text-[#6b6560]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
