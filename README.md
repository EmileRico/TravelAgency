# TimeTravel Agency — Webapp Interactive

Webapp pour une agence de voyage temporel fictive de luxe, développée dans le cadre du projet supervisé IA M1/M2 (Session 2).

---

## Stack technique

| Outil | Usage |
|---|---|
| React 18 + Vite | Framework et bundler |
| Tailwind CSS | Styling utility-first |
| Framer Motion | Animations et transitions |
| React Router DOM v6 | Navigation SPA |
| Lucide React | Icônes |
| Mistral AI API (`mistral-small-latest`) | Chatbot + recommandations IA |
| Vercel | Déploiement |

---

## Features implémentées

### Pages
- **Accueil** — Hero animé avec champ d'étoiles, présentation des 3 destinations, section "pourquoi nous", CTA
- **Destinations** — Catalogue des 3 voyages avec détails, prix, highlights
- **Détail destination** — Page complète par destination : parallax hero, expériences incluses, infos pratiques, équipements
- **Quiz** — 4 questions pour recommander la destination idéale, résultat avec description personnalisée par IA
- **À propos** — Histoire de l'agence, valeurs, statistiques

### Fonctionnalités IA
- **Chatbot Chronos** — Widget flottant en bas à droite, réponses en streaming via Mistral AI, historique des 10 derniers messages, suggestions rapides, mode fallback si API indisponible
- **Recommandation personnalisée** — Quiz 4 questions → scoring → appel Mistral AI pour générer un texte d'explication sur mesure selon les réponses du visiteur

### UX/UI
- Design dark mode avec accents dorés, typographie Cormorant Garamond + Jost
- Animations au scroll (fade-in, stagger), micro-interactions sur les cards et boutons
- Responsive mobile-first
- Boutons "Parler à Chronos" ouvrant le chatbot depuis n'importe quelle section

---

## IA utilisées

| Usage | Outil / Modèle |
|---|---|
| Génération du code | Claude Code (Claude Sonnet) |
| Chatbot conversationnel | Mistral AI — `mistral-small-latest` |
| Recommandations quiz | Mistral AI — `mistral-small-latest` |

---

## Prompts documentés

### System prompt du chatbot (Chronos)
```
Tu es Chronos, l'assistant virtuel de TimeTravel Agency, agence de voyage temporel de luxe.
Ton rôle : conseiller et guider les clients dans le choix de leur voyage temporel.
Ton ton : professionnel, chaleureux, passionné d'histoire, enthousiaste sans être familier.
Tu connais nos 3 destinations : Paris 1889 (12 500€, 7j), Crétacé -65M (28 000€, 5j), Florence 1504 (15 000€, 7j).
Règles : réponds en français, sous 150 mots, suggère des destinations selon les intérêts.
```

### Prompt de recommandation personnalisée (quiz)
```
Un client a répondu à notre quiz. Nous lui recommandons [destination].
Écris un message personnalisé de 2-3 phrases pour expliquer pourquoi cette destination
lui correspond parfaitement. Sois enthousiaste et précis.
```

---

## Installation

```bash
git clone <repo>
cd TravelAgency
npm install
```

Créer un fichier `.env` à la racine :
```
VITE_MISTRAL_API_KEY=your_key_here
```

```bash
npm run dev      # Développement
npm run build    # Build production
npm run preview  # Prévisualiser le build
```

---

## Crédits

- Images : [Unsplash](https://unsplash.com) (licence libre)
- Icônes : [Lucide React](https://lucide.dev)
- Typographies : Google Fonts — Cormorant Garamond, Jost, DM Mono
- API IA : [Mistral AI](https://mistral.ai)

---

## Licence

Projet pédagogique — M1/M2 Digital & IA, 2024–2025.
