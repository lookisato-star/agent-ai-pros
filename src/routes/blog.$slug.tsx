import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { getPostBySlug } from "@/lib/blog.functions";
import { trackCtaClick } from "@/lib/track";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPostBySlug({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article indisponible" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = loaderData.meta_title || loaderData.title;
    const description =
      loaderData.meta_description || loaderData.excerpt || "Article de Kenneth Padonou, consultant IA.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData.cover_image_url?.startsWith("https://")
          ? [
              { property: "og:image", content: loaderData.cover_image_url },
              { name: "twitter:image", content: loaderData.cover_image_url },
            ]
          : []),
      ],
    };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="heading-section">Article introuvable</h1>
        <Link to="/blog" className="cta-btn cta-btn-sm mt-8">
          Voir tous les articles
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <p className="p-10 text-center text-muted-foreground">L'article n'a pas pu être chargé.</p>
  ),
});

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogPost() {
  const post = Route.useLoaderData();
  const paragraphs = post.content.split(/\n{2,}/).filter((p) => p.trim().length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
        <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary">
          <i className="fa-solid fa-arrow-left mr-2" aria-hidden="true" />
          Tous les articles
        </Link>

        <article className="mt-6">
          <time className="text-xs uppercase tracking-wide text-muted-foreground">
            {formatDate(post.published_at)}
          </time>
          <h1 className="heading-section mt-3">{post.title}</h1>

          {post.cover_image_url ? (
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="mt-8 w-full rounded-2xl border border-border object-cover"
            />
          ) : null}

          <div className="mt-8 space-y-5">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-body whitespace-pre-line text-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>

          {post.linkedin_url ? (
            <p className="text-body mt-8 text-muted-foreground">
              <i className="fa-brands fa-linkedin mr-2 text-primary" aria-hidden="true" />
              <a
                href={post.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                Voir le post LinkedIn d'origine
              </a>
            </p>
          ) : null}
        </article>

        <section className="mt-14 rounded-2xl border border-border bg-secondary-bg p-8 text-center">
          <h2 className="heading-card">
            Envie d'appliquer ça à <span className="text-emphasis">votre agence</span> ?
          </h2>
          <p className="text-body mx-auto mt-3 max-w-xl text-muted-foreground">
            45 minutes pour identifier le process le plus chronophage de votre agence et le premier
            agent IA à mettre en place.
          </p>
          <Link
            to="/audit-gratuit"
            className="cta-btn heart-beat mt-6"
            onClick={() => trackCtaClick("article-blog")}
          >
            Réserver un audit gratuit
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </Link>
        </section>
      </main>
    </div>
  );
}
