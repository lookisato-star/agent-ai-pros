import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { trackCtaClick } from "@/lib/track";
import heroHorizon from "@/assets/hero-horizon.jpg.asset.json";
import iconZapier from "@/assets/icon-zapier.png.asset.json";
import iconN8n from "@/assets/icon-n8n.png.asset.json";
import iconMake from "@/assets/icon-make.png.asset.json";
import agentDemo from "@/assets/agent-ia-demo.mp4.asset.json";
import kennethPortrait from "@/assets/kenneth-portrait.jpg.asset.json";

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
const CTA_HREF = "/audit-gratuit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Consultant IA & Conseil IA pour Agence Digitale | Audit Gratuit" },
      {
        name: "description",
        content:
          "Consultant IA freelance spécialisé conseil IA pour agences digitales en Europe. J'implémente des agents IA sur-mesure (prospection, reporting, onboarding) pour agences web, Ads et copywriting. Réservez un audit gratuit de 45 min.",
      },
      {
        property: "og:title",
        content: "Consultant IA & Conseil IA pour Agence Digitale | Audit Gratuit",
      },
      {
        property: "og:description",
        content:
          "Consultant IA freelance pour agences digitales européennes. Audit gratuit de 45 min pour identifier vos premiers agents sur-mesure.",
      },
      { property: "og:url", content: "https://agent-ai-pros.lovable.app/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://agent-ai-pros.lovable.app/" }],
  }),
  component: Index,
});

function Cta({
  small = false,
  className = "",
  location = "inconnu",
}: {
  small?: boolean;
  className?: string;
  location?: string;
}) {
  return (
    <Link
      to={CTA_HREF}
      className={`cta-btn heart-beat ${small ? "cta-btn-sm" : ""} ${className}`}
      onClick={() => trackCtaClick(location)}
    >
      {CTA_LABEL}
      <i className="fa-solid fa-arrow-right" aria-hidden="true" />
    </Link>

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

const tools = [
  {
    name: "n8n",
    text: "L'orchestrateur qui connecte vos outils entre eux, sans dépendre d'une API tierce fragile.",
    image: iconN8n.url,
  },
  {
    name: "Make",
    text: "Pour les automatisations rapides à déployer et faciles à faire évoluer avec votre équipe.",
    image: iconMake.url,
  },
  {
    name: "Claude (Anthropic)",
    text: "Le moteur IA derrière la qualification, la rédaction et la prise de décision de vos agents — précis, fiable, peu d'hallucinations.",
    icon: "fa-solid fa-brain",
  },
  {
    name: "Vos outils existants",
    text: "CRM, formulaires, Ads, reporting — je connecte l'agent à ce que vous utilisez déjà, pas l'inverse.",
    icon: "fa-solid fa-plug",
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

const garanties = [
  {
    title: "Pas d'abonnement forcé",
    text: "Vous payez le projet, pas un forfait mensuel obligatoire. Si vous voulez de la maintenance ensuite, c'est vous qui décidez.",
  },
  {
    title: "Vous restez propriétaire du système",
    text: "Le workflow, les prompts, les automatisations : tout reste sur votre compte (Make, n8n, ou autre). Aucune dépendance cachée.",
  },
  {
    title: "Ajustements inclus jusqu'à validation",
    text: "L'agent n'est pas figé à la livraison. On ajuste ensemble jusqu'à ce qu'il tourne exactement comme prévu.",
  },
];

const faq = [
  {
    q: "Qu'est-ce qu'un consultant IA et que fait-il concrètement ?",
    a: "Un consultant IA accompagne une entreprise pour identifier les tâches répétitives qu'une intelligence artificielle peut prendre en charge, puis implémente des agents opérationnels. Dans mon cas, je travaille exclusivement avec des agences digitales : je cartographie vos process (prospection, reporting, onboarding), je choisis la bonne stack (Zapier, Make, n8n, API OpenAI), et je livre un agent testé sur vos vrais dossiers.",
  },
  {
    q: "Quand est-ce qu'une agence a besoin de conseil en IA ?",
    a: "Le conseil en IA devient utile quand votre équipe passe plus de temps à exécuter qu'à créer de la valeur : qualification de leads à la main, reporting refait chaque mois, onboarding dépendant d'une seule personne. Si vous repoussez des clients par manque de capacité, ou si vous hésitez à recruter par peur des charges, un consultant IA peut vous aider à gagner en capacité sans embauche.",
  },
  {
    q: "Comment se déroule une mission de conseil IA avec vous ?",
    a: "Ça commence par un audit gratuit de 45 minutes. On identifie ensemble les deux ou trois process les plus rentables à automatiser. Je vous envoie ensuite une proposition avec un périmètre fixe, un délai et un prix. Après validation, j'implémente l'agent dans votre stack existante, je le teste sur vos données, et je forme votre équipe. Vous avez 30 jours d'ajustements inclus.",
  },
  {
    q: "Conseil IA en agence ou consultant IA freelance : quelle différence ?",
    a: "Une agence de conseil en IA vend souvent un diagnostic stratégique généraliste et délègue ensuite l'exécution. En tant que consultant IA freelance, je suis à la fois le conseiller et le builder : je conçois l'agent et le construis moi-même. Pas de couche commerciale, pas de junior caché derrière le projet, un seul interlocuteur du diagnostic à la mise en production.",
  },
  {
    q: "Faut-il changer nos outils existants ?",
    a: "Non. Les agents se branchent sur ce que vous utilisez déjà : votre CRM, vos régies publicitaires, Slack, Notion, Google Workspace. L'objectif du conseil IA est d'enlever du travail, pas d'ajouter une migration coûteuse.",
  },
  {
    q: "Quels résultats peut-on attendre d'un conseil IA ?",
    a: "Les premiers résultats apparaissent dès le premier agent en production : heures récupérées chaque semaine, délais de reporting divisés, taux de leads qualifiés amélioré. Au-delà, le conseil IA vous donne une méthode pour industrialiser d'autres process sans repartir de zéro à chaque fois.",
  },
  {
    q: "Quels sont les délais d'implémentation ?",
    a: "Un premier agent utile est généralement en production entre deux et quatre semaines après la proposition, selon la complexité de vos outils et la disponibilité des accès.",
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
          <Link
            to={CTA_HREF}
            className="cta-btn cta-btn-sm"
            onClick={() => trackCtaClick("header")}
          >
            <span className="hidden sm:inline">{CTA_LABEL}</span>
            <span className="sm:hidden">Audit gratuit</span>
          </Link>
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
                Consultant IA & conseil IA — agents sur-mesure pour agences digitales
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
                <Cta className="cta-btn-light" location="hero" />
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
                Ce que j'entends dans presque chaque agence digitale
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
            <Reveal>
              <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
                Ces problèmes ralentissent votre productivité et vous détournent du plus important : délivrer de la valeur.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Agitation */}
        <section className="bg-secondary-bg px-5 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-4xl text-primary sm:text-5xl">Le coût de l'inaction se paie chaque mois</h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Chaque demande traitée trop tard part chez un concurrent plus réactif. Chaque
                rapport bâclé fragilise une relation client que vous avez mis un an à construire.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Et tant que vos process vivent dans la tête d'une seule personne, votre agence
                n'est pas une entreprise : c'est une dépendance. Pendant ce temps, les agences qui
                ont automatisé livrent plus vite, avec une équipe plus petite.
              </p>
              <div className="mt-9">
                <Cta location="agitation" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Solution */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="mx-auto max-w-3xl text-center text-4xl sm:text-5xl">
                Des agents IA conçus pour votre agence digitale — pas un outil générique de
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

        {/* Outils éprouvés */}
        <section className="bg-secondary-bg px-5 py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="text-center text-4xl sm:text-5xl">
                Des outils éprouvés pour votre conseil IA
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
                Chaque outil est choisi pour sa fiabilité en production chez les agences digitales, pas pour la tendance.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {tools.map((t, i) => (
                <Reveal key={t.name} delay={i * 100} as="article">
                  <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-md">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      {t.image ? (
                        <img src={t.image} alt="" className="h-8 w-8 object-contain" />
                      ) : (
                        <i className={`${t.icon} text-xl text-primary`} aria-hidden="true" />
                      )}
                    </div>
                    <h3 className="text-2xl leading-tight">{t.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="mx-auto mt-12 max-w-2xl text-center text-base italic text-muted-foreground sm:text-lg">
                Le bon outil n'est jamais choisi pour la tendance. Il est choisi parce qu'il tient en production, chez vous.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Crédibilité — Kenneth */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
              <Reveal animation="fadeInLeft">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-xl md:max-w-none">
                  <img
                    src={kennethPortrait.url}
                    alt="Kenneth Padonou, consultant freelance spécialisé en agents IA pour agences digitales"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
                </div>
              </Reveal>
              <Reveal animation="fadeInRight" delay={120}>
                <div>
                  <h2 className="text-3xl leading-tight sm:text-4xl md:text-5xl">
                    Je ne vends pas des agents IA. Je vends du temps récupéré et du CA débloqué.
                  </h2>
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    <p>
                      Je suis Kenneth, consultant IA freelance spécialisé dans la création d'agents IA pour les agences digitales.
                    </p>
                    <p>
                      Mon approche part d'un constat simple : dans une agence, chaque heure passée sur une tâche répétitive (qualifier un lead, monter un reporting, relancer un onboarding) est une heure qui n'est pas vendue à un client, ou pas investie sur ce qui fait vraiment grandir l'agence.
                    </p>
                    <p>
                      Je ne construis pas des automatisations pour le principe. Je pars de votre goulot d'étranglement — là où vous perdez du temps ou des opportunités — et je construis l'agent IA qui le résout, connecté à vos outils existants.
                    </p>
                    <p className="text-primary-foreground">
                      Résultat concret : des heures libérées pour vos équipes, des leads mieux qualifiés, un onboarding qui ne dépend plus d'une seule personne. Vous ne travaillez pas avec un prestataire technique de plus. Vous travaillez avec quelqu'un qui construit pour un seul objectif : que ça se voie sur votre capacité à facturer plus, sans embaucher plus.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>


        {/* Vidéo démo */}
        <section className="bg-secondary-bg px-5 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="mx-auto w-fit rounded-full border border-foreground/20 px-4 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Voir un agent en action
              </p>
              <h2 className="mt-4 text-4xl sm:text-5xl">
                Un agent IA qui travaille pendant que vous dormez
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Cette démo montre comment un agent IA qualifie automatiquement une demande entrante
                dans une agence digitale, l'enrichit et la crée dans votre CRM — sans intervention manuelle.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-2xl">
                <video
                  src={agentDemo.url}
                  width={1280}
                  height={720}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  className="aspect-video w-full"
                  aria-label="Démonstration d'un agent IA qualifiant un lead et le créant dans un CRM"
                />
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-10">
                <Cta location="video" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                45 minutes, sans engagement — repartez avec un plan d'automatisation concret.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Transformation */}
        <section className="bg-secondary-bg px-5 py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="text-center text-4xl sm:text-5xl">Avant / Après</h2>
            </Reveal>
            <div className="glass-card mt-10 overflow-hidden">
              <div className="grid grid-cols-2 border-b border-foreground/10 bg-white/10">
                <div className="px-5 py-3 font-display text-xl">Aujourd'hui</div>
                <div className="border-l border-foreground/10 px-5 py-3 font-display text-xl">
                  Avec un agent IA
                </div>
              </div>
              {transformation.map((row, i) => (
                <Reveal key={row.avant[0]} delay={i * 80}>
                  <div className="grid grid-cols-2 border-t border-foreground/10 bg-white/5">
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
              <p className="mx-auto w-fit rounded-full border border-foreground/20 px-4 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Ma démarche
              </p>
              <h2 className="mt-4 text-center text-4xl sm:text-5xl">Comment on avance ensemble, consultant IA et agence digitale</h2>
            </Reveal>
            <ol className="steps-board mt-14 grid gap-10 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-14">
              {etapes.map((e, i) => (
                <Reveal key={e.n} delay={i * 90} as="li">
                  <div className={`step-card step-card-${i + 1}`}>
                    <span className="step-card-pin" aria-hidden="true" />
                    <span className="text-sm font-semibold text-muted-foreground">{e.n}</span>
                    <h3 className="mt-2 text-2xl leading-tight">{e.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal>
              <p className="mt-14 text-center text-lg italic text-muted-foreground">
                → Prêt à être livré !
              </p>
            </Reveal>

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

          </div>
        </section>

        {/* Garanties */}
        <section className="bg-reassurance-bg px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-center text-4xl sm:text-5xl">Ce que je vous garantis, concrètement, en tant qu'agence digitale</h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {garanties.map((g, i) => (
                <Reveal key={g.title} delay={i * 100} as="article">
                  <div className="flex h-full flex-col rounded-xl border border-foreground/10 bg-background/70 p-7">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <i className="fa-solid fa-check" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl leading-tight">{g.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{g.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-background px-5 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-lg text-muted-foreground">
                Vous avez un process qui mérite d'être automatisé ?
              </p>
              <div className="mt-6">
                <Cta location="offre" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                45 minutes, sans engagement — repartez avec un plan d'automatisation concret.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-secondary-bg px-5 py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-center text-4xl sm:text-5xl">Conseil IA & consultant IA</h2>
            </Reveal>
            <Reveal>
              <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
                Vous cherchez un conseil IA ou un consultant IA pour accompagner votre agence
                digitale ? Je conçois et j'implémente des agents sur-mesure pour les agences web,
                Ads et copywriting en Europe — directement dans vos outils existants.
              </p>
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
                Vous ne signez pas avec une agence de plus : vous travaillez directement avec le
                consultant IA qui construit vos agents. Pas de couche commerciale, pas de junior
                sur votre dossier — un interlocuteur unique, un périmètre clair, et des process qui
                restent chez vous.
              </p>
              <div className="mt-9 text-center">
                <Cta location="positionnement" />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-secondary-bg px-5 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-3xl">KENNETH PADONOU</p>
            <a
              href="mailto:contact@agents-ia.eu"
              className="mt-1 inline-flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-4"
            >
              <i className="fa-regular fa-envelope" aria-hidden="true" />
              contact@agents-ia.eu
            </a>
          </div>
          <Cta location="footer" />
        </div>
      </footer>
    </div>
  );
}
