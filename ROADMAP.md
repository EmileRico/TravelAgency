# 🗺️ ROADMAP — TimeTravel Agency Webapp

## Vue d'ensemble

```
PHASE 1 — Setup & Structure        [~20 min]
PHASE 2 — UI / Pages               [~50 min]
PHASE 3 — Chatbot IA               [~40 min]
PHASE 4 — Polish & Déploiement     [~10 min]
```

---

## ✅ PHASE 1 — Setup & Structure

### 1.1 Initialisation du projet
- [ ] Créer le projet React + Vite
- [ ] Installer Tailwind CSS
- [ ] Installer les dépendances clés :
  - `framer-motion` (animations)
  - `react-router-dom` (navigation)
  - `lucide-react` (icônes)
  - `@anthropic-ai/sdk` ou fetch natif (chatbot)
- [ ] Configurer le thème Tailwind (couleurs, fonts)
- [ ] Créer la structure de dossiers

### 1.2 Structure de dossiers cible
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── AboutAgency.jsx
│   │   ├── DestinationsGrid.jsx
│   │   ├── DestinationCard.jsx
│   │   └── CallToAction.jsx
│   ├── chatbot/
│   │   ├── ChatWidget.jsx
│   │   ├── ChatWindow.jsx
│   │   └── ChatMessage.jsx
│   └── quiz/          ← optionnel
│       └── RecommendationQuiz.jsx
├── pages/
│   ├── Home.jsx
│   ├── DestinationDetail.jsx
│   └── Reservation.jsx     ← optionnel
├── data/
│   └── destinations.js     ← données des 3 destinations
├── hooks/
│   └── useChat.js
└── styles/
    └── globals.css
```

---

## ✅ PHASE 2 — UI / Pages

### 2.1 Page d'accueil
- [ ] **Hero section** : titre animé, sous-titre, bouton CTA, fond vidéo/gradient
- [ ] **Section "À propos"** : présentation de l'agence en 2-3 lignes
- [ ] **Section Destinations** : 3 cards cliquables
- [ ] **Section CTA finale** : bouton vers réservation ou quiz
- [ ] **Footer** : logo, liens, credits

### 2.2 Destination Cards (× 3)
Chaque card affiche :
- [ ] Image hero (visuel généré projet 1)
- [ ] Nom de la destination + époque
- [ ] Description courte (2 lignes)
- [ ] Tag de difficulté / ambiance
- [ ] Bouton "Explorer"
- [ ] Hover effect (zoom, overlay, glow)

### 2.3 Page détail destination
- [ ] Image grande format
- [ ] Description longue + points d'intérêt
- [ ] "Ce que vous verrez" (liste)
- [ ] Prix fictif + bouton réservation
- [ ] Lien retour

### 2.4 Animations (Framer Motion)
- [ ] Fade-in au scroll sur chaque section
- [ ] Stagger animation sur les cards
- [ ] Transition entre pages (fade)
- [ ] Hover effects sur les boutons

---

## ✅ PHASE 3 — Chatbot IA

### 3.1 Interface du chatbot
- [ ] Bouton flottant bas-droite (icône bulle)
- [ ] Fenêtre de chat (open/close animé)
- [ ] Zone de messages (scrollable)
- [ ] Input + bouton envoyer
- [ ] Indicateur "en train d'écrire..."

### 3.2 Intégration API (Mistral ou Groq)
- [ ] Créer compte Mistral AI (gratuit) → https://console.mistral.ai
- [ ] Récupérer la clé API
- [ ] Créer fichier `.env` avec `VITE_MISTRAL_API_KEY=...`
- [ ] Implémenter la fonction `sendMessage()`
- [ ] Configurer le system prompt (personnalité de l'agent)
- [ ] Gérer l'historique de conversation (contexte)
- [ ] Gérer les erreurs API

### 3.3 Personnalité de l'agent
Configurée dans le system prompt (voir CLAUDE.md)

### 3.4 Tests du chatbot
- [ ] "Quelles destinations proposez-vous ?"
- [ ] "Combien coûte un voyage à Florence ?"
- [ ] "Je suis passionné d'art, que me conseillez-vous ?"
- [ ] "Y a-t-il des dinosaures au Crétacé ?"
- [ ] "Comment se déroule une réservation ?"

---

## ✅ PHASE 4 (OPTIONNELLE) — Quiz de recommandation

- [ ] 4 questions (préférences, ambiance, activité…)
- [ ] Logique de scoring pour recommander 1 destination
- [ ] Résultat animé avec description personnalisée (appel IA)
- [ ] Bouton "Réserver cette destination"

---

## ✅ PHASE 5 — Déploiement

### 5.1 Préparation
- [ ] Vérifier que `.env` est dans `.gitignore`
- [ ] Configurer les variables d'env sur Vercel
- [ ] Tester le build : `npm run build`

### 5.2 Déploiement Vercel
```bash
npm install -g vercel
vercel
# Suivre les instructions dans le terminal
```
- [ ] Tester l'URL publique sur mobile
- [ ] Tester l'URL publique sur desktop
- [ ] Vérifier que le chatbot fonctionne en prod

### 5.3 Livrables finaux
- [ ] URL de la webapp (Vercel)
- [ ] Lien GitHub du repo
- [ ] README.md complété
- [ ] Dépôt individuel sur Moodle (chaque membre)

---

## 📊 Ordre de priorité recommandé

| Priorité | Feature | Temps estimé |
|----------|---------|-------------|
| 🔴 Must | Hero + Cards destinations | 20 min |
| 🔴 Must | Chatbot fonctionnel | 30 min |
| 🟠 Should | Page détail destination | 15 min |
| 🟠 Should | Animations Framer Motion | 15 min |
| 🟡 Nice | Quiz de recommandation | 20 min |
| 🟡 Nice | Formulaire réservation | 15 min |
