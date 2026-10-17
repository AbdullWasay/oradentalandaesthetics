import { createFileRoute, notFound } from "@tanstack/react-router";
import { TreatmentPage } from "@/components/TreatmentPage";
import {
  getTreatmentPage,
  treatmentPageSeo,
} from "@/lib/treatments";
import {
  buildPageLinks,
  buildPageMeta,
  treatmentJsonLdScripts,
} from "@/lib/seo";

export const Route = createFileRoute("/treatments/$slug")({
  loader: ({ params }) => {
    const page = getTreatmentPage(params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    if (!page) return {};
    const seo = treatmentPageSeo(page);
    return {
      meta: buildPageMeta(seo),
      links: buildPageLinks(seo),
      scripts: treatmentJsonLdScripts(page),
    };
  },
  component: TreatmentRoute,
});

function TreatmentRoute() {
  const { page } = Route.useLoaderData();
  return <TreatmentPage page={page} />;
}
