import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { getPublishedPosts, type PublishedPost } from "@/lib/blog.functions";

export const Route = createFileRoute("/blog/")({
  loader: () => getPublishedPosts(),
  head: () => ({
    meta: [
      { title: "Articles IA pour agences digitales | Kenneth Padonou" },
      {
        name: "description",
        content:
          "Articles et retours d'expérience sur le conseil IA et l'implémentation d'agents IA sur mesure dans les agences digitales web, Ads et copywriting.",
      },
      { property: "og:title", content: "Articles IA pour agences digitales | Kenneth Padonou" },
      {
        property: "og:description",
        content:
          "Retours d'expérience concrets sur l'IA appliquée aux agences digitales : prospection, reporting, onboarding.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://agent-ai-pros.lovable.app/blog" }],
  }),
  component: BlogIndex,
  errorComponent: () => (
    <p className="p-10 text-center text-muted-foreground">Les articles n'ont pas pu être chargés.</p>
  ),
});

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogIndex() {
  const posts = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <h1 className="heading-section">
          Articles sur <span className="text-emphasis">l'IA en agence</span>
        </h1>
        <p className="text-subtitle mt-4 max-w-2xl text-muted-foreground">
          Des retours concrets sur le conseil IA et les agents IA sur mesure pour les agences
          digitales web, Ads et copywriting.
        </p>

        {posts.length === 0 ? (
          <p className="text-body mt-12 text-muted-foreground">
            Aucun article publié pour le moment. Revenez bientôt.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: PublishedPost) => (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
              >
                {post.cover_image_url ? (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    loading="lazy"
                    className="h-44 w-full object-cover"
                  />
                ) : null}
                <div className="flex flex-1 flex-col p-5">
                  <time className="text-xs uppercase tracking-wide text-muted-foreground">
                    {formatDate(post.published_at)}
                  </time>
                  <h2 className="heading-card mt-2 text-foreground group-hover:text-primary">
                    {post.title}
                  </h2>
                  {post.excerpt ? (
                    <p className="text-body mt-3 line-clamp-3 text-muted-foreground">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Lire l'article
                    <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
