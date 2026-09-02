import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import {
  adminDeletePost,
  adminDeleteTestimonial,
  adminListPosts,
  adminListTestimonials,
  adminLogin,
  adminLogout,
  adminSavePost,
  adminSaveTestimonial,
  adminStatus,
  slugify,
} from "@/lib/blog.functions";

export const Route = createFileRoute("/kenneth")({
  head: () => ({
    meta: [
      { title: "Administration | Kenneth Padonou" },
      { name: "description", content: "Espace d'administration privé du site." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Administration" },
      { property: "og:description", content: "Espace privé." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  status: string;
  published_at: string;
  meta_title: string | null;
  meta_description: string | null;
  linkedin_url: string | null;
};

type Testimonial = {
  id: string;
  client_name: string;
  company: string | null;
  role: string | null;
  quote: string;
  photo_url: string | null;
  status: string;
};

const emptyPost = () => ({
  id: null as string | null,
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  status: "draft" as "draft" | "published",
  published_at: new Date().toISOString().slice(0, 10),
  meta_title: "",
  meta_description: "",
  linkedin_url: "",
});

const emptyTestimonial = () => ({
  id: null as string | null,
  client_name: "",
  company: "",
  role: "",
  quote: "",
  photo_url: "",
  status: "visible" as "visible" | "hidden",
});

const inputClass =
  "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary";
const labelClass = "block text-sm font-medium text-foreground";

function AdminPage() {
  const status = useServerFn(adminStatus);
  const login = useServerFn(adminLogin);
  const logout = useServerFn(adminLogout);

  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    status().then((r) => setUnlocked(r.unlocked));
  }, [status]);

  if (unlocked === null) {
    return <p className="p-10 text-center text-muted-foreground">Chargement…</p>;
  }

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await login({ data: { password } });
            if (res.ok) setUnlocked(true);
            else setLoginError(true);
          }}
          className="w-full max-w-sm rounded-2xl border border-border bg-card p-8"
        >
          <h1 className="heading-card text-foreground">Espace administration</h1>
          <p className="text-body mt-2 text-muted-foreground">Entrez le mot de passe pour continuer.</p>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputClass} mt-5`}
            placeholder="Mot de passe"
          />
          {loginError ? (
            <p className="mt-2 text-sm text-destructive">Mot de passe incorrect.</p>
          ) : null}
          <button type="submit" className="cta-btn mt-5 w-full justify-center">
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-5 py-10 text-foreground">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="heading-section">Administration</h1>
          <button
            className="text-sm font-medium text-muted-foreground hover:text-primary"
            onClick={async () => {
              await logout();
              setUnlocked(false);
            }}
          >
            Se déconnecter
          </button>
        </div>
        <PostsSection />
        <TestimonialsSection />
      </div>
    </div>
  );
}

function PostsSection() {
  const list = useServerFn(adminListPosts);
  const save = useServerFn(adminSavePost);
  const remove = useServerFn(adminDeletePost);

  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<ReturnType<typeof emptyPost> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = () => list().then((rows) => setPosts(rows as Post[]));
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between">
        <h2 className="heading-card">Articles</h2>
        <button className="cta-btn cta-btn-sm" onClick={() => setForm(emptyPost())}>
          Nouvel article
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {posts.length === 0 ? (
          <p className="text-body text-muted-foreground">Aucun article pour le moment.</p>
        ) : null}
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
          >
            <div>
              <p className="font-medium text-foreground">{post.title}</p>
              <p className="text-sm text-muted-foreground">
                /{post.slug} · {new Date(post.published_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  post.status === "published"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary-bg text-muted-foreground"
                }`}
              >
                {post.status === "published" ? "Publié" : "Brouillon"}
              </span>
              <button
                className="text-sm text-primary hover:underline"
                onClick={() =>
                  setForm({
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt ?? "",
                    content: post.content,
                    cover_image_url: post.cover_image_url ?? "",
                    status: post.status === "published" ? "published" : "draft",
                    published_at: post.published_at.slice(0, 10),
                    meta_title: post.meta_title ?? "",
                    meta_description: post.meta_description ?? "",
                    linkedin_url: post.linkedin_url ?? "",
                  })
                }
              >
                Modifier
              </button>
              <button
                className="text-sm text-destructive hover:underline"
                onClick={async () => {
                  if (!confirm(`Supprimer « ${post.title} » ?`)) return;
                  await remove({ data: { id: post.id } });
                  refresh();
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {form ? (
        <form
          className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-6"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            try {
              await save({ data: { ...form, slug: form.slug || slugify(form.title) } });
              setForm(null);
              refresh();
            } catch (err) {
              setError(err instanceof Error ? err.message : "Erreur inconnue");
            }
          }}
        >
          <div>
            <label className={labelClass}>Titre</label>
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              maxLength={200}
            />
          </div>
          <div>
            <label className={labelClass}>Lien de l'article (slug)</label>
            <input
              className={inputClass}
              value={form.slug}
              placeholder={slugify(form.title) || "mon-article"}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              maxLength={120}
            />
          </div>
          <div>
            <label className={labelClass}>Extrait</label>
            <textarea
              className={inputClass}
              rows={2}
              maxLength={500}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Contenu (markdown simple, paragraphes séparés par une ligne vide)</label>
            <textarea
              className={`${inputClass} font-mono`}
              rows={12}
              maxLength={50000}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Image de couverture (URL)</label>
            <input
              className={inputClass}
              value={form.cover_image_url}
              placeholder="https://…"
              onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
              maxLength={1000}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Statut</label>
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as "draft" | "published" })
                }
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Date de publication</label>
              <input
                type="date"
                className={inputClass}
                value={form.published_at}
                onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Meta title (SEO)</label>
            <input
              className={inputClass}
              value={form.meta_title}
              placeholder={form.title}
              onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
              maxLength={200}
            />
          </div>
          <div>
            <label className={labelClass}>
              Meta description (SEO, 150 à 160 caractères recommandés) — {form.meta_description.length}
            </label>
            <textarea
              className={inputClass}
              rows={2}
              maxLength={300}
              value={form.meta_description}
              onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Lien source LinkedIn (optionnel)</label>
            <input
              className={inputClass}
              value={form.linkedin_url}
              placeholder="https://www.linkedin.com/posts/…"
              onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
              maxLength={1000}
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <div className="flex gap-3">
            <button type="submit" className="cta-btn cta-btn-sm">
              Enregistrer
            </button>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-primary"
              onClick={() => setForm(null)}
            >
              Annuler
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
}

function TestimonialsSection() {
  const list = useServerFn(adminListTestimonials);
  const save = useServerFn(adminSaveTestimonial);
  const remove = useServerFn(adminDeleteTestimonial);

  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<ReturnType<typeof emptyTestimonial> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = () => list().then((rows) => setItems(rows as Testimonial[]));
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mt-16 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="heading-card">Témoignages</h2>
        <button className="cta-btn cta-btn-sm" onClick={() => setForm(emptyTestimonial())}>
          Nouveau témoignage
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {items.length === 0 ? (
          <p className="text-body text-muted-foreground">Aucun témoignage pour le moment.</p>
        ) : null}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
          >
            <div>
              <p className="font-medium text-foreground">
                {item.client_name}
                {item.company ? ` — ${item.company}` : ""}
              </p>
              <p className="line-clamp-1 text-sm text-muted-foreground">{item.quote}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  item.status === "visible"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary-bg text-muted-foreground"
                }`}
              >
                {item.status === "visible" ? "Visible" : "Masqué"}
              </span>
              <button
                className="text-sm text-primary hover:underline"
                onClick={() =>
                  setForm({
                    id: item.id,
                    client_name: item.client_name,
                    company: item.company ?? "",
                    role: item.role ?? "",
                    quote: item.quote,
                    photo_url: item.photo_url ?? "",
                    status: item.status === "visible" ? "visible" : "hidden",
                  })
                }
              >
                Modifier
              </button>
              <button
                className="text-sm text-destructive hover:underline"
                onClick={async () => {
                  if (!confirm(`Supprimer le témoignage de ${item.client_name} ?`)) return;
                  await remove({ data: { id: item.id } });
                  refresh();
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {form ? (
        <form
          className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-6"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            try {
              await save({ data: form });
              setForm(null);
              refresh();
            } catch (err) {
              setError(err instanceof Error ? err.message : "Erreur inconnue");
            }
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Nom du client</label>
              <input
                className={inputClass}
                value={form.client_name}
                onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                required
                maxLength={120}
              />
            </div>
            <div>
              <label className={labelClass}>Entreprise</label>
              <input
                className={inputClass}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                maxLength={120}
              />
            </div>
            <div>
              <label className={labelClass}>Poste</label>
              <input
                className={inputClass}
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                maxLength={120}
              />
            </div>
            <div>
              <label className={labelClass}>Statut</label>
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as "visible" | "hidden" })
                }
              >
                <option value="visible">Visible</option>
                <option value="hidden">Masqué</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Citation</label>
            <textarea
              className={inputClass}
              rows={4}
              maxLength={2000}
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Photo (URL)</label>
            <input
              className={inputClass}
              value={form.photo_url}
              placeholder="https://…"
              onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
              maxLength={1000}
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <div className="flex gap-3">
            <button type="submit" className="cta-btn cta-btn-sm">
              Enregistrer
            </button>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-primary"
              onClick={() => setForm(null)}
            >
              Annuler
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
}
