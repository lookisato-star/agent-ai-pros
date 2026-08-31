import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/Reveal";

const PHONE_NUMBER = "33147657721";

const auditSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Votre nom est requis" })
    .max(100, { message: "Le nom ne peut dépasser 100 caractères" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "L'email est requis" })
    .email({ message: "Adresse email invalide" })
    .max(255, { message: "L'email ne peut dépasser 255 caractères" }),
  agency: z
    .string()
    .trim()
    .min(2, { message: "Le nom de l'agence est requis" })
    .max(100, { message: "Le nom de l'agence ne peut dépasser 100 caractères" }),
  website: z
    .string()
    .trim()
    .max(255, { message: "L'URL ne peut dépasser 255 caractères" })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(50, { message: "Le téléphone ne peut dépasser 50 caractères" })
    .optional()
    .or(z.literal("")),
  process: z
    .string()
    .min(1, { message: "Veuillez sélectionner un process concerné" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Décrivez brièvement votre besoin (10 caractères minimum)" })
    .max(1000, { message: "Le message ne peut dépasser 1000 caractères" }),
});

type AuditForm = z.infer<typeof auditSchema>;

export const Route = createFileRoute("/audit-gratuit")({
  head: () => ({
    meta: [
      { title: "Réserver un audit gratuit — Kenneth Padonou" },
      {
        name: "description",
        content:
          "Demandez un audit gratuit de 45 minutes pour identifier les process de votre agence digitale à automatiser avec l'IA. Réponse par WhatsApp.",
      },
      {
        property: "og:title",
        content: "Réserver un audit gratuit — Kenneth Padonou",
      },
      {
        property: "og:description",
        content:
          "Audit gratuit de 45 minutes pour agences digitales : qualification de leads, reporting client, onboarding automatisé.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuditGratuit,
});

function AuditGratuit() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuditForm>({
    resolver: zodResolver(auditSchema),
    defaultValues: {
      name: "",
      email: "",
      agency: "",
      website: "",
      phone: "",
      process: "",
      message: "",
    },
  });

  const onSubmit = (data: AuditForm) => {
    setIsSubmitting(true);

    const lines = [
      "Bonjour, je souhaite réserver un audit gratuit pour mon agence.",
      "",
      `Nom : ${data.name}`,
      `Email : ${data.email}`,
      `Agence : ${data.agency}`,
    ];

    if (data.website) lines.push(`Site web : ${data.website}`);
    if (data.phone) lines.push(`Téléphone : ${data.phone}`);

    const processLabels: Record<string, string> = {
      prospection: "Prospection & qualification de leads",
      reporting: "Reporting client automatisé",
      onboarding: "Onboarding client fluide",
      autre: "Autre process",
    };

    lines.push(`Process concerné : ${processLabels[data.process] ?? data.process}`);
    lines.push("");
    lines.push(`Détail du besoin : ${data.message}`);

    const text = lines.join("\n");
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encoded}`;

    window.location.href = whatsappUrl;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/" className="font-display text-2xl sm:text-3xl">
            KENNETH PADONOU
          </Link>
          <a
            href="mailto:contact@agents-ia.eu"
            className="text-sm text-muted-foreground underline underline-offset-4"
          >
            contact@agents-ia.eu
          </a>
        </div>
      </header>

      <main className="px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="mx-auto w-fit rounded-full border border-foreground/20 px-4 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Audit gratuit
            </p>
            <h1 className="mt-4 text-center text-4xl sm:text-5xl md:text-6xl">
              Réserver votre audit de 45 minutes
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
              Remplissez le formulaire ci-dessous. Votre demande sera envoyée directement sur
              WhatsApp. Je vous réponds sous 24 heures ouvrées.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-12 space-y-6 rounded-2xl border border-foreground/10 bg-secondary-bg p-6 sm:p-10"
              noValidate
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Prénom et nom *</Label>
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jean Dupont"
                    {...register("name")}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jean@agence.fr"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="agency">Nom de l'agence *</Label>
                  <Input
                    id="agency"
                    type="text"
                    autoComplete="organization"
                    placeholder="Agence Digitale"
                    {...register("agency")}
                    aria-invalid={errors.agency ? "true" : "false"}
                  />
                  {errors.agency && (
                    <p className="text-sm text-destructive">{errors.agency.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <Input
                    id="website"
                    type="url"
                    autoComplete="url"
                    placeholder="https://www.agence.fr"
                    {...register("website")}
                    aria-invalid={errors.website ? "true" : "false"}
                  />
                  {errors.website && (
                    <p className="text-sm text-destructive">{errors.website.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+33 1 23 45 67 89"
                    {...register("phone")}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="process">Process le plus chronophage *</Label>
                  <Controller
                    name="process"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          id="process"
                          aria-invalid={errors.process ? "true" : "false"}
                        >
                          <SelectValue placeholder="Sélectionnez un process" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prospection">
                            Prospection & qualification de leads
                          </SelectItem>
                          <SelectItem value="reporting">Reporting client automatisé</SelectItem>
                          <SelectItem value="onboarding">Onboarding client fluide</SelectItem>
                          <SelectItem value="autre">Autre process</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.process && (
                    <p className="text-sm text-destructive">{errors.process.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Décrivez votre besoin *</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Quelle tâche répétitive vous prend le plus de temps chaque semaine ?"
                  {...register("message")}
                  aria-invalid={errors.message ? "true" : "false"}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="cta-btn w-full cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? "Ouverture de WhatsApp…" : "Envoyer la demande sur WhatsApp"}
                <i className="fa-brands fa-whatsapp text-lg" aria-hidden="true" />
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                En cliquant, vous serez redirigé vers WhatsApp avec un message pré-rempli. Il vous
                suffira de l'envoyer.
              </p>
            </form>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-4"
              >
                <i className="fa-solid fa-arrow-left" aria-hidden="true" />
                Retour à l'accueil
              </Link>
            </div>
          </Reveal>
        </div>
      </main>

      <footer className="bg-secondary-bg px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-display text-2xl">KENNETH PADONOU</p>
          <p className="text-sm text-muted-foreground">
            Consultant freelance en agents IA pour agences digitales européennes.
          </p>
        </div>
      </footer>
    </div>
  );
}
