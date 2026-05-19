# CLAUDE.md — TimeTravel Agency Webapp

Ce fichier guide Claude Code tout au long du développement.
Lis-le entièrement avant de générer du code.

---

## 🎯 Contexte du projet

**Nom :** TimeTravel Agency — Webapp Interactive  
**Type :** Landing page + chatbot IA, projet pédagogique (Master Digital & IA)  
**Stack :** React 18 + Vite + Tailwind CSS + Framer Motion + Mistral AI API

---

## 🏗️ Stack technique

```
Framework     : React 18 + Vite
Styling       : Tailwind CSS (config custom)
Animations    : Framer Motion
Routing       : React Router DOM v6
Icônes        : Lucide React
IA Chatbot    : Mistral AI API (mistral-small-latest)
Déploiement   : Vercel
```

---

## 🎨 Design System

### Palette de couleurs
```css
--color-bg-primary    : #0a0a0f       /* Noir profond */
--color-bg-secondary  : #12121a       /* Noir légèrement bleuté */
--color-bg-card       : #1a1a2e       /* Bleu nuit pour les cards */
--color-accent-gold   : #c9a84c       /* Or pour accents et CTA */
--color-accent-light  : #e8c97a       /* Or clair pour hover */
--color-text-primary  : #f0ece0       /* Crème chaud */
--color-text-secondary: #8a8270       /* Gris doré */
--color-border        : #2a2a3e       /* Bordure subtile */
```

### Typographie
```
Display / Titres : 'Cormorant Garamond' (Google Fonts) — élégant, historique
Corps / UI       : 'Jost' (Google Fonts) — moderne, lisible
Monospace/details: 'DM Mono' pour dates et coordonnées temporelles
```

### Philosophie du design
- **Thème** : Luxe temporel, dark mode, accents dorés
- **Ambiance** : Agence de voyage haut de gamme qui voyage dans le temps
- **Inspiration** : Montre de luxe + musée + science-fiction élégante
- **Éviter** : Animations trop rapides, couleurs criardes, design générique

---

## 🗂️ Les 3 destinations

### 1. Paris 1889 — La Belle Époque
```js
{
  id: "paris-1889",
  name: "Paris, 1889",
  era: "Belle Époque",
  tagline: "L'Exposition Universelle & la naissance de la Tour Eiffel",
  description: "Plongez dans le Paris de la fin du XIXe siècle...",
  highlights: ["Tour Eiffel en construction", "Exposition Universelle", "Cafés et cabarets", "Impressionnisme naissant"],
  duration: "7 jours",
  price: "€12 500",
  difficulty: "Accessible",
  color: "#c9a84c",
  image: "/images/paris-1889.jpg"
}
```

### 2. Crétacé — 65 millions d'années
```js
{
  id: "cretace",
  name: "Crétacé Supérieur",
  era: "-65 000 000 ans",
  tagline: "Le dernier âge des dinosaures",
  description: "Une expérience unique dans la nature préhistorique...",
  highlights: ["T-Rex en liberté", "Ptérosaures", "Forêts primitives", "Mers tropicales"],
  duration: "5 jours",
  price: "€28 000",
  difficulty: "Aventure",
  color: "#4a7c59",
  image: "/images/cretace.jpg"
}
```

### 3. Florence 1504 — La Renaissance
```js
{
  id: "florence-1504",
  name: "Florence, 1504",
  era: "Haute Renaissance",
  tagline: "Michel-Ange, Léonard de Vinci et la perfection artistique",
  description: "Vivez au cœur de la Renaissance italienne...",
  highlights: ["Ateliers de Michel-Ange", "Galerie des Offices naissante", "Palais Médicis", "Rencontres avec les maîtres"],
  duration: "7 jours",
  price: "€15 000",
  difficulty: "Culturel",
  color: "#8b5e3c",
  image: "/images/florence-1504.jpg"
}
```

---

## 🤖 Chatbot IA — Configuration

### Modèle
```
Provider : Mistral AI
Modèle   : mistral-small-latest
Max tokens : 500 (réponses concises)
Temperature : 0.7
```

### Variable d'environnement
```
VITE_MISTRAL_API_KEY=ta_clé_ici
```

### System prompt de l'agent
```
Tu es Chronos, l'assistant virtuel de TimeTravel Agency, agence de voyage temporel de luxe fondée en 2024.

Ton rôle : conseiller et guider les clients dans le choix de leur voyage temporel.

Ton ton :
- Professionnel, chaleureux et passionné d'histoire
- Enthousiaste sans être familier
- Toujours précis sur les détails historiques
- Discret sur les paradoxes temporels (sujet sensible pour l'agence)

Tu connais parfaitement nos 3 destinations :
1. Paris 1889 — Belle Époque, Tour Eiffel, Exposition Universelle. Prix : 12 500€. Durée : 7 jours.
2. Crétacé -65M — Dinosaures, nature préhistorique, aventure. Prix : 28 000€. Durée : 5 jours.
3. Florence 1504 — Renaissance, art, Michel-Ange. Prix : 15 000€. Durée : 7 jours.

Règles :
- Réponds toujours en français
- Suggère des destinations selon les intérêts du client
- Si on te demande hors sujet, ramène poliment vers les voyages temporels
- Pour les réservations, invite à remplir le formulaire sur le site
- Garde tes réponses sous 150 mots pour rester conversationnel
```

### Gestion de l'historique
Conserver les 10 derniers messages dans le state pour le contexte.

---

## 📐 Composants — Règles de développement

### Règles générales
1. **Toujours** utiliser des composants fonctionnels + hooks
2. **Toujours** ajouter les animations Framer Motion sur les éléments visibles
3. **Toujours** rendre les composants responsive (mobile-first)
4. **Jamais** de styles inline sauf exception justifiée
5. **Jamais** de `console.log` oublié en production

### Pattern d'animation standard
```jsx
// Utiliser ce pattern pour toutes les sections
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

// Pour les listes (stagger)
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
}
```

### Pattern de card de destination
```jsx
// Hover effect standard pour les cards
whileHover={{ scale: 1.03, y: -4 }}
transition={{ type: "spring", stiffness: 300 }}
```

---

## 🔑 Variables d'environnement

Créer un fichier `.env` à la racine :
```
VITE_MISTRAL_API_KEY=your_key_here
VITE_APP_NAME=TimeTravel Agency
```

⚠️ Ajouter `.env` au `.gitignore` immédiatement.

---

## 📦 Installation

```bash
npm create vite@latest timetravel-agency -- --template react
cd timetravel-agency
npm install tailwindcss @tailwindcss/vite
npm install framer-motion react-router-dom lucide-react
npx tailwindcss init -p
```

---

## 🚀 Commandes utiles

```bash
npm run dev      # Démarrer le serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualiser le build
vercel           # Déployer sur Vercel
```

---

## ✅ Checklist de qualité

Avant de livrer, vérifier :
- [ ] Responsive sur mobile (375px) et desktop (1280px)
- [ ] Chatbot répond correctement à 5 questions
- [ ] Toutes les images chargent (lazy loading actif)
- [ ] Pas d'erreurs dans la console
- [ ] Animations fluides (pas de lag)
- [ ] Build sans erreur (`npm run build`)
- [ ] `.env` absent du repo GitHub

---

## 🗒️ Notes importantes

- Les images des destinations peuvent être des placeholders au départ (Unsplash URLs) si les visuels du projet 1 ne sont pas disponibles
- Le formulaire de réservation est optionnel, prioriser le chatbot
- Si l'API Mistral est indisponible, prévoir un mode fallback avec réponses prédéfinies
