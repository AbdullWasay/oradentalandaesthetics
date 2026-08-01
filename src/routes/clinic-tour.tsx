import { createFileRoute } from "@tanstack/react-router";
import { ClinicTourPage } from "@/components/ClinicTourPage";
import {
  PAGE_SEO,
  buildPageLinks,
  buildPageMeta,
  clinicTourJsonLdScripts,
} from "@/lib/seo";

export const Route = createFileRoute("/clinic-tour")({
  head: () => ({
    meta: buildPageMeta(PAGE_SEO.clinicTour),
    links: buildPageLinks(PAGE_SEO.clinicTour),
    scripts: clinicTourJsonLdScripts(),
  }),
  component: ClinicTourPage,
});
