import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

type AdminSession = { unlocked?: boolean };

function sessionConfig() {
  return {
    password: process.env["ADMIN_SESSION_SECRET"]!,
    name: "kenneth-admin",
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function publicClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

async function requireAdmin() {
  const session = await useSession<AdminSession>(sessionConfig());
  if (!session.data.unlocked) throw new Error("Unauthorized");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

function matches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/* ---------------- Public reads ---------------- */

export const getPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("blog_posts")
    .select("id,slug,title,excerpt,cover_image_url,published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => z.object({ slug: z.string().min(1).max(120) }).parse(data))
  .handler(async ({ data }) => {
    const { data: post, error } = await publicClient()
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return post ?? null;
  });

export const getVisibleTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("testimonials")
    .select("id,client_name,company,role,quote,photo_url")
    .eq("status", "visible")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

/* ---------------- Admin session ---------------- */

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) =>
    z.object({ password: z.string().min(1).max(200) }).parse(data),
  )
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected) throw new Error("ADMIN_PASSWORD non configuré");
    if (!matches(data.password, expected)) return { ok: false as const };
    const session = await useSession<AdminSession>(sessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  return { unlocked: Boolean(session.data.unlocked) };
});

/* ---------------- Admin data ---------------- */

export const adminListPosts = createServerFn({ method: "GET" }).handler(async () => {
  const db = await requireAdmin();
  const { data, error } = await db
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

const postSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().max(120).optional().nullable(),
  excerpt: z.string().trim().max(500).optional().nullable(),
  content: z.string().max(50000).default(""),
  cover_image_url: z.string().trim().max(1000).optional().nullable(),
  status: z.enum(["draft", "published"]),
  published_at: z.string().min(1),
  meta_title: z.string().trim().max(200).optional().nullable(),
  meta_description: z.string().trim().max(300).optional().nullable(),
  linkedin_url: z.string().trim().max(1000).optional().nullable(),
});

export type PostInput = z.input<typeof postSchema>;

export const adminSavePost = createServerFn({ method: "POST" })
  .inputValidator((data: PostInput) => postSchema.parse(data))
  .handler(async ({ data }) => {
    const db = await requireAdmin();
    const payload = {
      title: data.title,
      slug: data.slug && data.slug.length > 0 ? slugify(data.slug) : slugify(data.title),
      excerpt: data.excerpt || null,
      content: data.content,
      cover_image_url: data.cover_image_url || null,
      status: data.status,
      published_at: new Date(data.published_at).toISOString(),
      meta_title: data.meta_title || data.title,
      meta_description: data.meta_description || null,
      linkedin_url: data.linkedin_url || null,
    };
    if (data.id) {
      const { error } = await db.from("blog_posts").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true as const };
    }
    const { error } = await db.from("blog_posts").insert(payload);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const adminDeletePost = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const db = await requireAdmin();
    const { error } = await db.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const adminListTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const db = await requireAdmin();
  const { data, error } = await db
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

const testimonialSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  client_name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(120).optional().nullable(),
  role: z.string().trim().max(120).optional().nullable(),
  quote: z.string().trim().min(1).max(2000),
  photo_url: z.string().trim().max(1000).optional().nullable(),
  status: z.enum(["visible", "hidden"]),
});

export type TestimonialInput = z.input<typeof testimonialSchema>;

export const adminSaveTestimonial = createServerFn({ method: "POST" })
  .inputValidator((data: TestimonialInput) => testimonialSchema.parse(data))
  .handler(async ({ data }) => {
    const db = await requireAdmin();
    const payload = {
      client_name: data.client_name,
      company: data.company || null,
      role: data.role || null,
      quote: data.quote,
      photo_url: data.photo_url || null,
      status: data.status,
    };
    if (data.id) {
      const { error } = await db.from("testimonials").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true as const };
    }
    const { error } = await db.from("testimonials").insert(payload);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const adminDeleteTestimonial = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const db = await requireAdmin();
    const { error } = await db.from("testimonials").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
