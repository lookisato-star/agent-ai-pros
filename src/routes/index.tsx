import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import heroHorizon from "@/assets/hero-horizon.jpg.asset.json";
import iconZapier from "@/assets/icon-zapier.png.asset.json";
import iconN8n from "@/assets/icon-n8n.png.asset.json";
import iconMake from "@/assets/icon-make.png.asset.json";

const floatingIcons = [
  {
    src: iconZapier.url,
    alt: "Zapier",
    className: "left-[4%] top-[16%] w-14 sm:w-20 md:w-24",
    delay: "0s",
  },
  {
    src: iconMake.url,
    alt: "Make",
    className: "right-[5%] top-[12%] w-16 sm:w-24 md:w-28",
    delay: "1.2s",
  },
  {
    src: iconN8n.url,
    alt: "n8n",
    className: "right-[8%] bottom-[12%] w-12 sm:w-18 md:w-22",
    delay: "2.1s",
  },
  {
    src: iconZapier.url,
    alt: "",
    className: "left-[8%] bottom-[14%] w-11 sm:w-16 md:w-20 opacity-80",
    delay: "0.6s",
  },
];

const CTA_LABEL = "Réserver un audit gratuit";
const CTA_HREF = "mailto:contact@agents-ia.eu?subject=Audit%20gratuit%20-%20agents%20IA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agents IA sur-mesure pour agences digitales | Audit gratuit" },
      {
        name: "description",
        content:
          "Consultant freelance en agents IA pour agences web, Ads et copywriting en Europe. Qualification de leads, reporting et onboarding automatisés. Audit gratuit.",
      },
      {
        property: "og:title",
        content: "Agents IA sur-mesure pour agences digitales | Audit gratuit",
      },
      {
        property: "og:description",
        content:
          "J'implémente des agents IA sur-mesure qui prennent en charge la qualification de leads, le reporting client et l'onboarding.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Cta({ small = false, className = "" }: { small?: boolean; className?: string }) {
  return (
    <a href={CTA_HREF} className={`cta-btn ${small ? "cta-btn-sm" : ""} ${className}`}>
      {CTA_LABEL}
      <i className="fa-solid fa-arrow-right" aria-hidden="true" />
    </a>
  );
}

const problemes = [
  {
    icon: "fa-regular fa-clock",
    title: "On est débordés, mais on n'ose pas prendre plus de clients",
    text: "Chaque nouveau contrat ajoute des heures non facturables. La croissance devient un risque au lieu d'une opportunité.",
  },
  {
    icon: "fa-regular fa-file-lines",
    title: "Le reporting est fait à l'arrache en fin de mois",
    text: "Des exports copiés-collés à la main, tard le soir. Le client le sent, et la valeur perçue en pâtit.",
  },
  {
    icon: "fa-regular fa-user",
    title: "On recrute, on forme pendant trois mois, et la personne part",
    text: "Le savoir-faire repart avec elle. Vous recommencez à zéro, avec la même charge et un budget en moins.",
  },
];

const solutions = [
  {
    icon: "fa-solid fa-magnifying-glass-chart",
    title: "Prospection & qualification de leads",
    text: "L'agent trie, enrichit et score chaque demande entrante selon vos critères, et transmet uniquement les leads qui méritent votre temps.",
  },
  {
    icon: "fa-solid fa-chart-line",
    title: "Reporting client automatisé",
    text: "Les données Ads, SEO et CRM sont consolidées, commentées dans votre ton et livrées au client sans intervention manuelle.",
  },
  {
    icon: "fa-solid fa-arrow-right-arrow-left",
    title: "Onboarding client fluide",
    text: "Collecte des accès, brief structuré, création des dossiers et relances : le démarrage passe de trois semaines à trois jours.",
  },
];

const transformation = [
  {
    avant: ["Qualification", " des leads à la main, une par une"],
    apres: ["Leads scorés", " automatiquement, seuls les meilleurs arrivent à vous"],
  },
  {
    avant: ["Reporting", " reconstruit chaque fin de mois dans l'urgence"],
    apres: ["Rapports", " générés et commentés en continu, prêts à envoyer"],
  },
  {
    avant: ["Onboarding", " dépendant d'une seule personne clé"],
    apres: ["Process", " documenté et exécuté par l'agent, sans point de rupture"],
  },
  {
    avant: ["Croissance", " bloquée par la capacité de l'équipe"],
    apres: ["Capacité", " élastique : plus de clients, même effectif"],
  },
];

const etapes = [
  {
    n: "01",
    title: "Audit gratuit",
    text: "45 minutes pour cartographier vos tâches répétitives et identifier les deux ou trois plus rentables à automatiser.",
  },
  {
    n: "02",
    title: "Proposition sur-mesure",
    text: "Un périmètre clair, un délai, un prix fixe. Aucun abonnement imposé, aucun outil générique.",
  },
  {
    n: "03",
    title: "Implémentation",
    text: "Je construis l'agent dans votre stack existante et je le teste sur vos vrais dossiers avant mise en production.",
  },
  {
    n: "04",
    title: "Suivi",
    text: "30 jours d'ajustements inclus, avec formation de votre équipe pour que l'agent reste entre vos mains.",
  },
];

const cas = [
  {
    nom: "Big Chick",
    defi: "Plus de 200 demandes entrantes par mois traitées manuellement par deux account managers.",
    solution:
      "Agent de qualification connecté au formulaire et au CRM, avec scoring sur budget, secteur et urgence.",
    impact: "12 heures récupérées par semaine et un taux de rendez-vous qualifiés multiplié par deux.",
  },
  {
    nom: "RMS International Group",
    defi: "Reporting multi-pays reconstruit à la main pour 18 clients, cinq jours par mois.",
    solution:
      "Agent de consolidation Ads et analytics produisant un rapport commenté dans le ton de l'agence.",
    impact: "Reporting livré en 48 h au lieu de 5 jours, sans embauche supplémentaire.",
  },
];

const faq = [
  {
    q: "Vous travaillez avec quelles agences, dans quelle zone ?",
    a: "J'accompagne des agences digitales européennes (web, Ads, copywriting), en français ou en anglais, à distance. La majorité de mes clients sont en France, Belgique, Suisse et Espagne.",
  },
  {
    q: "Quels sont les délais d'implémentation ?",
    a: "Un premier agent utile est généralement en production entre deux et quatre semaines après la proposition, selon la complexité de vos outils et la disponibilité des accès.",
  },
  {
    q: "Faut-il changer nos outils existants ?",
    a: "Non. Les agents se branchent sur ce que vous utilisez déjà : votre CRM, vos régies publicitaires, Slack, Notion, Google Workspace. L'objectif est d'enlever du travail, pas d'ajouter une migration.",
  },
  {
    q: "Comment se passe la facturation ?",
    a: "Prix fixe par projet, défini après l'audit gratuit. Pas d'abonnement obligatoire ni de facturation à l'heure : vous savez exactement ce que vous payez avant de commencer.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <span className="font-display text-2xl sm:text-3xl">KENNETH PADONOU</span>
          <a href={CTA_HREF} className="cta-btn cta-btn-sm">
            <span className="hidden sm:inline">{CTA_LABEL}</span>
            <span className="sm:hidden">Audit gratuit</span>
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-5 py-24 sm:py-32">
          <img
            src={heroHorizon.url}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.35)_0%,_transparent_70%)]"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {floatingIcons.map((icon, i) => (
              <img
                key={i}
                src={icon.src}
                alt=""
                className={`floating-icon absolute ${icon.className}`}
                style={{ animationDelay: icon.delay }}
                loading="lazy"
              />
            ))}
          </div>
          <div className="relative mx-auto max-w-4xl text-center text-primary-foreground">
            <Reveal>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-black/25 px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-primary-foreground shadow-[0_2px_16px_rgba(0,0,0,0.45)] backdrop-blur">
                <i className="fa-solid fa-bolt" aria-hidden="true" />
                Agents IA sur-mesure pour agences digitales
              </p>
              <h1
                className="text-5xl sm:text-6xl md:text-7xl"
                style={{ textShadow: '0 3px 18px rgba(0,0,0,0.65)' }}
              >
                Votre agence est débordée — mais recruter n'est pas la réponse.
              </h1>
              <p
                className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground sm:text-lg"
                style={{ textShadow: '0 2px 14px rgba(0,0,0,0.65)' }}
              >
                Vous perdez des heures sur la qualification de leads, le reporting client et
                l'onboarding — pendant que vos concurrents automatisent déjà. J'implémente des
                agents IA sur-mesure qui prennent en charge ces tâches, pour que votre équipe se
                concentre sur ce qui fait vraiment grandir l'agence.
              </p>
              <div className="mt-9">
                <Cta className="cta-btn-light" />
              </div>
              <p
                className="mt-4 text-sm text-primary-foreground/90"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.55)' }}
              >
                45 minutes, sans engagement — repartez avec un plan d'automatisation concret.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Problème */}
        <section className="bg-secondary-bg px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="max-w-2xl text-4xl sm:text-5xl">
                Ce que j'entends dans presque chaque agence
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {problemes.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={i * 100}
                  as="article"
                  animation={i % 2 === 0 ? "lightSpeedInRight" : "lightSpeedInLeft"}
                >
                  <div className="glass-card h-full rounded-xl p-7">
                    <i
                      className={`${p.icon} mb-5 block text-2xl text-primary`}
                      aria-hidden="true"
                    />
                    <h3 className="text-2xl leading-tight">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Agitation */}
        <section className="bg-primary text-primary-foreground px-5 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-4xl sm:text-5xl">Le coût de l'inaction se paie chaque mois</h2>
              <p className="mt-6 text-base leading-relaxed sm:text-lg">
                Chaque demande traitée trop tard part chez un concurrent plus réactif. Chaque
                rapport bâclé fragilise une relation client que vous avez mis un an à construire.
              </p>
              <p className="mt-4 text-base leading-relaxed sm:text-lg">
                Et tant que vos process vivent dans la tête d'une seule personne, votre agence
                n'est pas une entreprise : c'est une dépendance. Pendant ce temps, les agences qui
                ont automatisé livrent plus vite, avec une équipe plus petite.
              </p>
              <div className="mt-9">
                <Cta />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Solution */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="mx-auto max-w-3xl text-center text-4xl sm:text-5xl">
                Des agents IA conçus pour votre façon de travailler — pas un outil générique de
                plus
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {solutions.map((s, i) => (
                <Reveal key={s.title} delay={i * 100} as="article">
                  <div className="h-full rounded-xl bg-secondary-bg p-7">
                    <i
                      className={`${s.icon} mb-5 block text-2xl text-primary`}
                      aria-hidden="true"
                    />
                    <h3 className="text-2xl leading-tight">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Transformation */}
        <section className="bg-secondary-bg px-5 py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="text-center text-4xl sm:text-5xl">Avant / Après</h2>
            </Reveal>
            <div className="mt-10 overflow-hidden rounded-xl border border-foreground/10">
              <div className="grid grid-cols-2 bg-secondary-bg">
                <div className="px-5 py-3 font-display text-xl">Aujourd'hui</div>
                <div className="border-l border-foreground/10 px-5 py-3 font-display text-xl">
                  Avec un agent IA
                </div>
              </div>
              {transformation.map((row, i) => (
                <Reveal key={row.avant[0]} delay={i * 80}>
                  <div className="grid grid-cols-2 border-t border-foreground/10">
                    <div className="px-5 py-5 text-sm leading-relaxed text-muted-foreground">
                      <i
                        className="fa-solid fa-xmark mr-2 text-muted-foreground/60"
                        aria-hidden="true"
                      />
                      <strong className="font-semibold">{row.avant[0]}</strong>
                      {row.avant[1]}
                    </div>
                    <div className="border-l border-foreground/10 px-5 py-5 text-sm leading-relaxed">
                      <i className="fa-solid fa-check mr-2 text-primary" aria-hidden="true" />
                      <strong className="font-semibold">{row.apres[0]}</strong>
                      {row.apres[1]}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Offre */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-center text-4xl sm:text-5xl">Comment on avance ensemble</h2>
            </Reveal>
            <ol className="mt-12 grid gap-6 md:grid-cols-4">
              {etapes.map((e, i) => (
                <Reveal key={e.n} delay={i * 90} as="li">
                  <div className="h-full rounded-xl border border-foreground/15 p-6">
                    <span className="font-display text-4xl text-primary">{e.n}</span>
                    <h3 className="mt-3 text-2xl leading-tight">{e.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal>
              <h3 className="mt-20 text-center text-3xl sm:text-4xl">Cas concrets</h3>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {cas.map((c, i) => (
                <Reveal key={c.nom} delay={i * 100} as="article">
                  <div className="h-full rounded-xl bg-secondary-bg p-7">
                    <h4 className="font-display text-3xl">{c.nom}</h4>
                    <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                      <div>
                        <dt className="font-semibold">Défi</dt>
                        <dd className="text-muted-foreground">{c.defi}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Solution</dt>
                        <dd className="text-muted-foreground">{c.solution}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-primary">Impact</dt>
                        <dd className="text-muted-foreground">{c.impact}</dd>
                      </div>
                    </dl>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-12 text-center">
                <Cta />
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-secondary-bg px-5 py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-center text-4xl sm:text-5xl">Questions fréquentes</h2>
            </Reveal>
            <Reveal>
              <Accordion type="single" collapsible className="mt-10">
                {faq.map((f) => (
                  <AccordionItem key={f.q} value={f.q} className="border-foreground/10">
                    <AccordionTrigger className="text-left font-sans text-base font-medium normal-case tracking-normal">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
            <Reveal>
              <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed">
                Vous ne signez pas avec une agence de plus : vous travaillez directement avec la
                personne qui construit vos agents. Pas de couche commerciale, pas de junior sur
                votre dossier — un interlocuteur unique, un périmètre clair, et des process qui
                restent chez vous.
              </p>
              <div className="mt-9 text-center">
                <Cta />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-secondary-bg px-5 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-3xl">Julien Marchand</p>
            <a
              href="mailto:contact@agents-ia.eu"
              className="mt-1 inline-flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-4"
            >
              <i className="fa-regular fa-envelope" aria-hidden="true" />
              contact@agents-ia.eu
            </a>
          </div>
          <Cta />
        </div>
      </footer>
    </div>
  );
}
