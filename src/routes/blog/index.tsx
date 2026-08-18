import { createFileRoute } from "@tanstack/react-router";
import { BlogIndexPage } from "@/components/BlogIndexPage";
import { BLOG_POSTS } from "@/lib/blog";
import {
  PAGE_SEO,
  blogIndexJsonLdScripts,
  buildPageLinks,
  buildPageMeta,
} from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: buildPageMeta(PAGE_SEO.blog),
    links: buildPageLinks(PAGE_SEO.blog),
    scripts: blogIndexJsonLdScripts(
      BLOG_POSTS.map((post) => ({ slug: post.slug, title: post.title })),
    ),
  }),
  component: BlogIndexPage,
});
