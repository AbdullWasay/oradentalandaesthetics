import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogPostPage } from "@/components/BlogPostPage";
import { blogPostSeo, getBlogPost } from "@/lib/blog";
import {
  blogPostJsonLdScripts,
  buildPageLinks,
  buildPageMeta,
} from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};
    const seo = blogPostSeo(post);
    return {
      meta: [
        ...buildPageMeta(seo),
        { property: "article:published_time", content: post.publishedAt },
        {
          property: "article:modified_time",
          content: post.modifiedAt ?? post.publishedAt,
        },
      ],
      links: buildPageLinks(seo),
      scripts: blogPostJsonLdScripts(post),
    };
  },
  component: BlogPostRoute,
});

function BlogPostRoute() {
  const { post } = Route.useLoaderData();
  return <BlogPostPage post={post} />;
}
