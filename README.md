# AI Agent Architect

Crée un site one-page en français pour un consultant freelance spécialisé dans l'implémentation d'agents IA sur-mesure pour agences digitales européennes (web, Ads, copywriting). Le site doit convertir un visiteur venu de LinkedIn en réservation d'audit gratuit — chaque section doit pousser vers cet objectif unique, sans autre CTA concurrent.

Direction artistique

Typographie

Titres (H1, H2, éléments d'accroche) : Bebas Neue (Google Fonts) — utilisée en majuscules, letter-spacing légèrement élargi pour renforcer l'impact

Texte courant, sous-titres, paragraphes, boutons : DM Sans (Google Fonts), poids 400 pour le corps, 500-600 pour les éléments interactifs

Charge les deux polices via Google Fonts avec un rendu net (font-display: swap), et utilise Font Awesome pour les icônes (coches, flèches, puces de section) plutôt que des emojis ou icônes génériques

Palette de couleurs

Couleur secondaire / CTA : #462255 (violet profond) — réservée exclusivement aux boutons d'action et aux éléments qui doivent capter l'attention immédiate (le CTA "Réserver un audit gratuit")

Couleur de fond principale : #B2BD7E (vert olive clair) — fond des sections, à décliner en 2-3 nuances (plus clair #C9D19D pour les sections alternées, plus foncé #8F9A5F pour les zones de contraste type footer)

Couleur de texte principal : #231A2B (quasi-noir teinté violet, dérivé de la couleur CTA pour rester cohérent) — jamais de noir pur, pour garder une identité de marque cohérente

Couleur neutre claire : #F5F3EC (blanc cassé chaud) — pour les cartes, encadrés de cas concrets, FAQ, afin de créer du contraste avec le fond olive

Le violet #462255 ne doit apparaître QUE sur les CTA et éventuellement les liens/accents ponctuels — jamais en fond de section large, pour qu'il garde sa force de signal

Layout

One-page, scroll vertical, navigation fixe minimale (logo + un seul bouton "Audit gratuit" toujours visible en haut à droite)

Sections bien délimitées par alternance de nuances de fond (olive clair / blanc cassé) plutôt que par des bordures dures

Boutons CTA : fond #462255, texte en #F5F3EC, coins légèrement arrondis, effet hover qui assombrit légèrement le violet

Responsive mobile-first : sur mobile, les titres Bebas Neue doivent rester lisibles (pas trop larges), et les paragraphes DM Sans se resserrent à 2-3 lignes max par bloc

Structure du site (méthode PASTOR)

1. Hero Titre : "Votre agence est débordée — mais recruter n'est pas la réponse." Sous-titre : "Vous perdez des heures sur la qualification de leads, le reporting client et l'onboarding — pendant que vos concurrents automatisent déjà. J'implémente des agents IA sur-mesure qui prennent en charge ces tâches, pour que votre équipe se concentre sur ce qui fait vraiment grandir l'agence." CTA : "Réserver un audit gratuit"

2. Problème (3 cartes) "On est débordés, mais on n'ose pas prendre plus de clients" / "Le reporting est fait à l'arrache en fin de mois" / "On recrute, on forme pendant trois mois, et la personne part" — chaque carte avec une icône Font Awesome pertinente (horloge, document, personne)

3. Agitation Bloc de texte centré, fond olive plus foncé pour marquer une rupture de ton, mettant en tension le coût de l'inaction (clients perdus, concurrents plus réactifs, dépendance à une seule personne)

4. Solution — Agent IA sur-mesure Titre : "Des agents IA conçus pour votre façon de travailler — pas un outil générique de plus" 3 cas d'usage en cartes : Prospection & qualification de leads / Reporting client automatisé / Onboarding client fluide

5. Transformation Tableau ou bloc comparatif Avant / Après (4 lignes), fond blanc cassé pour se détacher visuellement, typographie DM Sans avec le mot-clé de chaque ligne en gras

6. Offre Process en 4 étapes numérotées (Audit gratuit → Proposition sur-mesure → Implémentation → Suivi), suivi de 2-3 cartes "cas concrets" (Big Chick, RMS International Group) au format Défi / Solution / Impact CTA répété ici : "Réserver un audit gratuit"

7. FAQ + Réponse finale Accordéon FAQ (4 questions : zone géographique, délais, outils existants, facturation), suivi d'un court paragraphe de réassurance sur le positionnement freelance, puis CTA final identique aux précédents

Footer Minimal : nom, un lien de contact, CTA "Réserver un audit gratuit" une dernière fois

Contraintes techniques

Un seul CTA textuel répété partout ("Réserver un audit gratuit"), jamais reformulé différemment d'une section à l'autre, pour renforcer la reconnaissance visuelle

Animations discrètes uniquement (fade-in au scroll léger), rien de trop chargé qui distrairait de la lecture

Accessibilité : contraste suffisant entre le texte #231A2B et les fonds clairs, focus visible au clavier sur les CTA

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://agent-ai-pros.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b324d099-2854-47d4-870c-facecdc58e9e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
