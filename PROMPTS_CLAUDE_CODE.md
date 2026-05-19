# 🚀 PROMPT DE DÉMARRAGE — TimeTravel Agency

Copie-colle ce prompt dans Claude Code pour lancer le projet.
Remplace les placeholders [entre crochets] si nécessaire.

---

## PROMPT PRINCIPAL (coller en premier)

```
Je développe une webapp interactive pour "TimeTravel Agency", une agence de voyage temporel fictive de luxe. C'est un projet pédagogique (Master Digital & IA).

Lis le fichier CLAUDE.md avant de commencer — il contient tout le design system, les données des destinations, la configuration du chatbot et les règles de développement.

---

STACK TECHNIQUE :
- React 18 + Vite
- Tailwind CSS (thème personnalisé dark/gold)
- Framer Motion (animations)
- React Router DOM v6
- Lucide React (icônes)
- Mistral AI API (chatbot)

DESIGN :
- Dark mode luxe : fond #0a0a0f, accents dorés #c9a84c
- Typo : Cormorant Garamond (titres) + Jost (corps)
- Ambiance : agence de voyage haut de gamme + science-fiction élégante

3 DESTINATIONS :
1. Paris 1889 — Belle Époque (12 500€, 7 jours)
2. Crétacé -65M — Dinosaures (28 000€, 5 jours)
3. Florence 1504 — Renaissance (15 000€, 7 jours)

---

COMMENCE PAR :
1. Initialiser le projet React + Vite
2. Configurer Tailwind avec le thème custom (couleurs + fonts Google)
3. Installer toutes les dépendances
4. Créer la structure de dossiers (voir CLAUDE.md)
5. Créer le fichier de données `src/data/destinations.js`
6. Créer le layout de base (Header + Footer + Router)

Génère du code production-grade, commenté et responsive.
```

---

## PROMPT PHASE 2 — Hero & Page d'accueil

```
Crée la page d'accueil complète avec :

HERO SECTION :
- Fond : gradient animé sombre avec effet de particules ou étoiles subtil (CSS pur ou canvas)
- Titre principal animé : "Voyagez à travers le temps" avec apparition mot par mot
- Sous-titre : "L'agence qui réinvente l'exploration historique"
- 2 boutons CTA : "Découvrir nos destinations" (doré plein) + "Parler à Chronos" (outline)
- Badge animé : "Disponible en 3 époques"

SECTION DESTINATIONS (3 cards) :
- Layout grid 3 colonnes (1 col mobile, 3 col desktop)
- Chaque card : image hero, nom, époque, description courte, prix, bouton "Explorer"
- Hover : scale up, overlay dorée, glow subtil
- Entrée en stagger (Framer Motion)

SECTION "POURQUOI NOUS" :
- 3 icônes + titres + descriptions courtes (Sécurité temporelle, Guides experts, Luxe absolu)

SECTION CTA FINALE :
- Background différencié (légèrement plus clair)
- Titre accrocheur + bouton vers le quiz ou réservation

Utilise le design system défini dans CLAUDE.md.
Toutes les sections ont un fade-in au scroll (Framer Motion + whileInView).
```

---

## PROMPT PHASE 3 — Chatbot IA

```
Crée le composant chatbot complet pour TimeTravel Agency.

INTERFACE :
- Bouton flottant bas-droite : icône bulle de dialogue, couleur dorée, légère animation de pulse
- Fenêtre de chat : 380px largeur, 500px hauteur, fond #12121a, bordure dorée subtile
- Header de la fenêtre : nom "Chronos" + avatar IA + statut "En ligne" + bouton fermer
- Zone de messages scrollable avec auto-scroll vers le bas
- Indicateur "Chronos réfléchit..." avec 3 points animés pendant le chargement
- Input texte + bouton envoyer (icône Send)
- Message de bienvenue automatique à l'ouverture

MESSAGES :
- Messages utilisateur : alignés droite, fond doré foncé
- Messages de Chronos : alignés gauche, fond #1a1a2e, avatar IA
- Timestamps discrets sous chaque message
- Animation d'apparition (slide-up + fade)

API MISTRAL :
- Endpoint : https://api.mistral.ai/v1/chat/completions
- Modèle : mistral-small-latest
- Clé : import.meta.env.VITE_MISTRAL_API_KEY
- Conserver les 10 derniers messages pour le contexte
- Gérer les erreurs avec un message fallback sympathique
- Streaming si possible (sinon réponse complète)

SYSTEM PROMPT À UTILISER :
"Tu es Chronos, l'assistant virtuel de TimeTravel Agency, agence de voyage temporel de luxe.
Tu conseilles les clients sur 3 destinations : Paris 1889 (12 500€), Crétacé -65M (28 000€), Florence 1504 (15 000€).
Ton ton : professionnel, chaleureux, passionné d'histoire. Réponds en français, max 150 mots par réponse.
Pour les réservations, invite à utiliser le formulaire du site."

SUGGESTIONS RAPIDES :
Ajoute 3 boutons de question rapide sous l'input :
- "Nos destinations"
- "Conseille-moi"  
- "Tarifs & infos"
```

---

## PROMPT PHASE 4 — Quiz de recommandation (optionnel)

```
Crée un composant quiz interactif de recommandation de destination.

4 QUESTIONS :
1. "Quelle expérience vous attire ?" → Culturelle / Aventure / Raffinement
2. "Votre rapport au temps ?" → Histoire moderne / Origines / Renaissance
3. "Environnement préféré ?" → Ville animée / Nature sauvage / Architecture
4. "Activité rêvée ?" → Monuments / Faune préhistorique / Ateliers d'artistes

LOGIQUE :
- Paris 1889 : score sur "Raffinement", "Histoire moderne", "Ville", "Monuments"
- Crétacé : score sur "Aventure", "Origines", "Nature", "Faune"
- Florence : score sur "Culturelle", "Renaissance", "Architecture", "Ateliers"
- Afficher la destination avec le score le plus élevé

RÉSULTAT :
- Animation de révélation dramatique (fade + scale)
- Image de la destination recommandée
- Description personnalisée (appel API Mistral avec les réponses du quiz)
- Bouton "Réserver maintenant" + bouton "Recommencer"

DESIGN :
- Progress bar dorée qui avance entre les questions
- Questions avec cards cliquables (pas de radio buttons)
- Transitions fluides entre questions (slide horizontal)
```

---

## PROMPT PHASE 5 — Page détail destination

```
Crée une page de détail pour chaque destination (route dynamique /destination/:id).

STRUCTURE :
- Image hero plein écran avec overlay gradient
- Breadcrumb : Accueil > Destinations > [Nom]
- Titre + époque + badges (durée, prix, difficulté)
- Description longue (2-3 paragraphes)
- Section "Ce que vous vivrez" : liste de 4-5 points avec icônes
- Section "Informations pratiques" : tableau simple
- Section "Équipements inclus" : badges
- CTA sticky en bas sur mobile : "Réserver ce voyage"
- Bouton retour + suggestions des 2 autres destinations

ANIMATIONS :
- Parallax subtil sur l'image hero au scroll
- Fade-in staggered sur chaque section
- Sticky header avec titre qui apparaît au scroll
```

---

## PROMPT DÉPLOIEMENT

```
Prépare le projet pour le déploiement sur Vercel :

1. Vérifie que le fichier .env est dans .gitignore
2. Crée un fichier vercel.json pour le routing SPA :
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
3. Crée un README.md complet avec :
   - Description du projet
   - Stack technique utilisée
   - Instructions d'installation locale
   - Variables d'environnement nécessaires
   - Outils IA utilisés (transparence)
   - Membres du groupe
   - Lien de démo
4. Vérifie que `npm run build` passe sans erreur
5. Donne les instructions de déploiement Vercel CLI

Format du README en français, adapté pour un rendu pédagogique.
```

---

## PROMPTS DE DEBUG FRÉQUENTS

### Si le chatbot ne répond pas
```
Le chatbot TimeTravel Agency ne répond pas. Voici l'erreur : [coller l'erreur].
Vérifie :
- La clé API est bien lue depuis import.meta.env.VITE_MISTRAL_API_KEY
- Les headers de la requête (Authorization: Bearer + Content-Type)
- La structure du body (model, messages, max_tokens)
- La gestion des erreurs CORS si applicable
Corrige le problème et ajoute un message d'erreur user-friendly si l'API est indisponible.
```

### Si les animations saccadent
```
Les animations Framer Motion sont saccadées sur mobile.
Optimise en :
- Utilisant transform et opacity uniquement (éviter width/height)
- Ajoutant will-change: transform sur les éléments animés
- Réduisant la durée des animations à 0.4s sur mobile (useReducedMotion)
- Vérifiant qu'il n'y a pas d'animations simultanées trop nombreuses
```

### Si le build échoue
```
Le build Vite échoue avec cette erreur : [coller l'erreur].
Analyse l'erreur, identifie la cause (import manquant, variable d'env, dépendance) et corrige.
```
