import parisImg from '../assets/PARIS IMAGE/exactly.ai_FluxDev_Paris1889CinematicTravelPhotographyLuxuryCampaign_2025-12-09_10-42.jpeg'
import cretaceImg from '../assets/CRETACE IMAGE/exactly.ai_FluxDev_CretaceousPeriodCinematicTravelPhotographyLuxury_2025-12-09_10-42 (1).jpeg'
import florenceImg from '../assets/FLORENCE IMAGE/exactly.ai_FluxDev_RenaissanceFlorenceCinematicTravelPhotography_2025-12-09_10-38.jpeg'

export const DIFFICULTY = {
  ACCESSIBLE: { label: 'Accessible', colorClass: 'text-emerald-400 border-emerald-400/50' },
  CULTURAL:   { label: 'Culturel',   colorClass: 'text-amber-400 border-amber-400/50' },
  ADVENTURE:  { label: 'Aventure',   colorClass: 'text-red-400 border-red-400/50' },
}

export const destinations = [
  {
    id: 'paris-1889',
    name: 'Paris, 1889',
    era: 'Belle Époque',
    tagline: "L'Exposition Universelle & la naissance de la Tour Eiffel",
    description:
      "Plongez dans le Paris de la fin du XIXe siècle, au moment précis où la Tour Eiffel s'élève vers le ciel pour l'Exposition Universelle. Promenez-vous sur les grands boulevards haussmanniens, fréquentez les cafés et cabarets de Montmartre, et assistez à l'effervescence créative qui donnera naissance à l'impressionnisme.",
    highlights: [
      'Tour Eiffel en construction',
      'Exposition Universelle',
      'Cafés et cabarets de Montmartre',
      "L'impressionnisme naissant",
    ],
    duration: '7 jours',
    price: '€12 500',
    priceValue: 12500,
    difficulty: DIFFICULTY.ACCESSIBLE,
    color: '#c9a84c',
    image: parisImg,
    coordinates: "48°51'N, 2°21'E — 1889",
  },
  {
    id: 'cretace',
    name: 'Crétacé Supérieur',
    era: '-65 000 000 ans',
    tagline: 'Le dernier âge des dinosaures',
    description:
      "Une expérience unique dans la nature préhistorique, à l'apogée du règne des dinosaures. Observez depuis une capsule sécurisée des T-Rex en liberté, survolez des forêts de conifères primitifs à bord de notre dirigeable stealth et contemplez des mers tropicales peuplées de créatures marines gigantesques.",
    highlights: [
      'T-Rex en liberté',
      'Ptérosaures en vol',
      'Forêts primitives',
      'Mers tropicales',
    ],
    duration: '5 jours',
    price: '€28 000',
    priceValue: 28000,
    difficulty: DIFFICULTY.ADVENTURE,
    color: '#4a7c59',
    image: cretaceImg,
    coordinates: 'Pangée — 65 000 000 BP',
  },
  {
    id: 'florence-1504',
    name: 'Florence, 1504',
    era: 'Haute Renaissance',
    tagline: 'Michel-Ange, Léonard de Vinci et la perfection artistique',
    description:
      "Vivez au cœur de la Renaissance italienne dans une Florence en pleine effervescence artistique. Assistez à la finalisation du David de Michel-Ange, visitez les ateliers de Léonard de Vinci et côtoyez les Médicis au sommet de leur pouvoir, dans une ville où chaque palais, chaque fresque, chaque conversation respire le génie.",
    highlights: [
      'Ateliers de Michel-Ange',
      'Galerie des Offices naissante',
      'Palais Médicis',
      'Rencontres avec les maîtres',
    ],
    duration: '7 jours',
    price: '€15 000',
    priceValue: 15000,
    difficulty: DIFFICULTY.CULTURAL,
    color: '#8b5e3c',
    image: florenceImg,
    coordinates: "43°46'N, 11°15'E — 1504",
  },
]

export const getDestinationById = (id) =>
  destinations.find((d) => d.id === id) ?? null
