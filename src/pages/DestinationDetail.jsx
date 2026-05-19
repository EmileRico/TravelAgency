import { useRef, useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Star,
  Palette,
  Music,
  Utensils,
  Eye,
  Wind,
  Waves,
  TreePine,
  Bird,
  Paintbrush,
  Landmark,
  Lightbulb,
  BookOpen,
  Check,
} from 'lucide-react'
import { destinations, getDestinationById } from '../data/destinations'
import { fadeInUp, containerVariants } from '../lib/animations'
import DestinationCard from '../components/ui/DestinationCard'

// ── Contenu détaillé par destination ─────────────────────────────────────────

const DETAILS = {
  'paris-1889': {
    paragraphs: [
      "Le Paris de 1889 est une ville en pleine transformation, à l'aube d'un siècle nouveau. L'Exposition Universelle attire des visiteurs du monde entier, et la Tour Eiffel — encore en construction au début de votre séjour — s'élève sous vos yeux pour devenir la silhouette que le monde entier reconnaîtra.",
      "Vous déambulerez sur les Grands Boulevards haussmanniens, fréquenterez les cafés de Montmartre où Toulouse-Lautrec croque ses premiers modèles, et assisterez aux joutes intellectuelles des salons littéraires. La Belle Époque est à son apogée : élégance, art de vivre et optimisme règnent en maîtres.",
      "Notre guide spécialisé vous introduira dans les cercles les plus raffinés de la société parisienne. Vêtus de tenues d'époque soigneusement confectionnées, vous serez indiscernables des habitants — et c'est exactement comme ça que nous l'aimons.",
    ],
    experiences: [
      { icon: MapPin, label: 'Promenade sur les Grands Boulevards de 1889' },
      { icon: Star, label: 'Inauguration de la Tour Eiffel en avant-première' },
      { icon: Palette, label: 'Atelier de peinture impressionniste à Montmartre' },
      { icon: Music, label: 'Spectacle inaugural au Moulin Rouge' },
      { icon: Utensils, label: 'Dîner gastronomique Belle Époque au Grand Restaurant' },
    ],
    practicalInfo: [
      { label: 'Départs disponibles', value: "Toute l'année, sur réservation" },
      { label: 'Taille du groupe', value: '4 voyageurs maximum' },
      { label: 'Langues du guide', value: 'Français, Anglais' },
      { label: 'Niveau requis', value: 'Accessible — aucune condition physique' },
      { label: "Point d'arrivée", value: 'Paris, 14 mai 1889' },
      { label: 'Décalage temporel', value: 'Aucun — retour immédiat' },
    ],
    equipment: [
      'Tenue Belle Époque sur mesure',
      'Escorte temporelle 24h/24',
      'Hébergement au Grand Hôtel',
      'Carnet de voyage cuir',
      'Balise de rapatriement',
      'Assurance temporelle All-Risk',
    ],
  },

  cretace: {
    paragraphs: [
      "Il y a 66 millions d'années, la Terre était un monde radicalement différent. Des forêts de conifères et de fougères arborescentes s'étendaient à perte de vue, peuplées de créatures dont la taille défie l'imagination. C'est dans cet environnement sauvage et primitif que TimeTravel Agency vous invite à faire un pas — depuis la sécurité absolue de notre capsule d'observation.",
      "Notre dirigeable stealth de dernière génération vous permettra de survoler ces paysages à couper le souffle sans perturber l'écosystème fragile du Crétacé. Vous observerez des hardes de hadrosaures, des vols de ptérosaures et, si la chance vous sourit, l'approche silencieuse d'un T-Rex en chasse.",
      "Ce voyage est conçu pour les esprits aventureux qui souhaitent voir le monde tel qu'il était avant l'humanité. Chaque moment est documenté par notre équipe de paléontologues embarqués, qui vous expliquent en temps réel les comportements que vous observez depuis la sécurité de la capsule.",
    ],
    experiences: [
      { icon: Eye, label: 'Observation de T-Rex depuis la capsule blindée' },
      { icon: Wind, label: 'Survol en dirigeable stealth au-dessus des forêts primitives' },
      { icon: Waves, label: 'Plongée sous-marine dans les mers tropicales du Crétacé' },
      { icon: TreePine, label: 'Trek sécurisé en forêt préhistorique de conifères' },
      { icon: Bird, label: 'Observation des ptérosaures en vol au crépuscule' },
    ],
    practicalInfo: [
      { label: 'Départs disponibles', value: 'Saison sèche uniquement' },
      { label: 'Taille du groupe', value: '6 voyageurs maximum' },
      { label: 'Langues du guide', value: 'Français, Anglais, Espagnol' },
      { label: 'Niveau requis', value: 'Aventure — bonne condition physique' },
      { label: "Point d'arrivée", value: 'Pangée Sud, –66 millions années' },
      { label: 'Décalage temporel', value: 'Aucun — retour immédiat' },
    ],
    equipment: [
      "Capsule d'observation blindée",
      'Combinaison thermique stealth',
      "Balise de rapatriement d'urgence",
      'Jumelles vision nocturne',
      'Kit médical complet',
      'Assurance temporelle Extrême',
    ],
  },

  'florence-1504': {
    paragraphs: [
      "Florence en 1504 est peut-être le lieu et le moment les plus extraordinaires de toute l'histoire de l'art occidental. Michel-Ange vient d'achever le David. Léonard de Vinci peaufine des œuvres qui deviendront des icônes éternelles. Au cœur de tout cela, les Médicis règnent sur une ville qui respire le génie à chaque coin de rue.",
      "Votre guide, historien spécialisé dans la Renaissance italienne, vous ouvrira les portes des ateliers privés, des palais et des jardins secrets. Vous assisterez à des débats philosophiques au sein de l'Académie platonicienne et croiserez les plus grands esprits d'une époque qui ne se reproduira jamais.",
      "L'hébergement se fait dans une villa patricienne des collines florentines, transformée en résidence de luxe tout en conservant son authenticité d'époque. Chaque repas est une reconstitution gastronomique fidèle à la Renaissance — servie avec le raffinement que vous méritez.",
    ],
    experiences: [
      { icon: Paintbrush, label: "Visite privée de l'atelier de Michel-Ange" },
      { icon: Landmark, label: 'Soirée au Palais Médicis avec le cercle de Lorenzo' },
      { icon: Lightbulb, label: 'Rencontre avec Léonard de Vinci dans son atelier' },
      { icon: BookOpen, label: "Débat philosophique à l'Académie platonicienne" },
      { icon: Star, label: 'Accès privé aux Offices avant leur ouverture officielle' },
    ],
    practicalInfo: [
      { label: 'Départs disponibles', value: 'Printemps et automne uniquement' },
      { label: 'Taille du groupe', value: '4 voyageurs maximum' },
      { label: 'Langues du guide', value: 'Français, Italien, Anglais' },
      { label: 'Niveau requis', value: 'Culturel — accessible à tous' },
      { label: "Point d'arrivée", value: 'Florence, printemps 1504' },
      { label: 'Décalage temporel', value: 'Aucun — retour immédiat' },
    ],
    equipment: [
      'Tenue Renaissance sur mesure',
      'Guide historien expert',
      'Accès ateliers privés',
      "Carnet d'artiste et pigments d'époque",
      'Villa patricienne incluse',
      'Assurance temporelle Standard',
    ],
  },
}

// ── Composant principal ───────────────────────────────────────────────────────

export default function DestinationDetail() {
  const { id } = useParams()

  // Hooks toujours appelés avant les retours conditionnels
  const heroRef = useRef(null)
  const [stickyVisible, setStickyVisible] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // Parallax : l'image se déplace de 10 % de sa taille pendant que le hero sort de l'écran
  // scale(1.3) → 15 % de marge de chaque côté → suffit pour couvrir 10 % de mouvement
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const destination = getDestinationById(id)
  if (!destination) return <Navigate to="/destinations" replace />

  const details = DETAILS[id]
  const others = destinations.filter((d) => d.id !== id)

  return (
    <div className="min-h-screen bg-deep">
      {/* ── Sticky mini-header ── */}
      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            initial={{ y: -52, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -52, opacity: 0 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
            className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-deep/96 backdrop-blur-md border-b border-subtle"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Link
                  to="/destinations"
                  className="text-muted hover:text-cream transition-colors flex-shrink-0"
                  aria-label="Retour aux destinations"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <span className="font-display text-base text-cream truncate">
                  {destination.name}
                </span>
                <span className="font-mono text-xs text-muted hidden sm:block flex-shrink-0">
                  — {destination.era}
                </span>
              </div>
              <span className="font-display text-gold text-lg flex-shrink-0">
                {destination.price}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero plein écran ── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[600px] flex items-end overflow-hidden"
      >
        {/* Image avec parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY, scale: 1.3 }}
        >
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/55 to-deep/10" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 20% 100%, ${destination.color}50, transparent)`,
          }}
        />

        {/* Badge coordonnées */}
        <div className="absolute top-1/3 right-6 hidden md:block">
          <div className="border border-gold/25 px-4 py-3 bg-deep/55 backdrop-blur-sm text-right">
            <p className="font-mono text-[10px] text-muted mb-1 tracking-wider uppercase">
              Coordonnées
            </p>
            <p className="font-mono text-xs text-gold">{destination.coordinates}</p>
          </div>
        </div>

        {/* Texte hero */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.p
              variants={fadeInUp}
              className="font-mono text-xs text-gold tracking-widest uppercase mb-3"
            >
              {destination.era}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-5xl sm:text-6xl md:text-8xl text-cream leading-none mb-4"
            >
              {destination.name}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-muted italic max-w-xl"
            >
              {destination.tagline}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Contenu ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-2 py-6 font-mono text-xs text-muted"
          aria-label="Fil d'Ariane"
        >
          <Link to="/" className="hover:text-gold transition-colors duration-200">
            Accueil
          </Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <Link to="/destinations" className="hover:text-gold transition-colors duration-200">
            Destinations
          </Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <span className="text-cream truncate">{destination.name}</span>
        </motion.nav>

        {/* Badges — durée / prix / difficulté */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center gap-3 mb-14 pb-14 border-b border-subtle"
        >
          <div className="flex items-center gap-2 border border-subtle px-4 py-2.5">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span className="font-mono text-xs text-cream">{destination.duration}</span>
          </div>
          <div className="flex items-center gap-2.5 border border-gold/35 px-4 py-2.5">
            <span className="font-mono text-xs text-muted">À partir de</span>
            <span className="font-display text-xl text-gold leading-none">
              {destination.price}
            </span>
          </div>
          <span
            className={`border px-4 py-2.5 font-mono text-xs ${destination.difficulty.colorClass}`}
          >
            {destination.difficulty.label}
          </span>
        </motion.div>

        {/* ── Description ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs text-gold tracking-widest uppercase mb-6"
          >
            Le voyage
          </motion.p>
          <div className="space-y-5">
            {details.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeInUp}
                className="font-body text-base text-muted leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </motion.section>

        {/* ── Ce que vous vivrez ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs text-gold tracking-widest uppercase mb-2"
          >
            Expériences incluses
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl text-cream mb-10"
          >
            Ce que vous vivrez
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {details.experiences.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-start gap-4 p-5 border border-subtle bg-card hover:border-gold/30 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-gold/60 transition-colors duration-300">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <p className="font-body text-sm text-cream leading-snug pt-0.5">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Informations pratiques ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs text-gold tracking-widest uppercase mb-2"
          >
            Détails
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl text-cream mb-10"
          >
            Informations pratiques
          </motion.h2>
          <motion.div variants={fadeInUp} className="border border-subtle overflow-hidden">
            {details.practicalInfo.map(({ label, value }, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 py-4 ${
                  i < details.practicalInfo.length - 1 ? 'border-b border-subtle' : ''
                } ${i % 2 === 0 ? 'bg-card' : 'bg-dark'}`}
              >
                <span className="font-mono text-xs text-muted sm:w-48 flex-shrink-0">
                  {label}
                </span>
                <span className="font-body text-sm text-cream">{value}</span>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Équipements inclus ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs text-gold tracking-widest uppercase mb-2"
          >
            Tout compris
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl text-cream mb-8"
          >
            Équipements inclus
          </motion.h2>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
            {details.equipment.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 border border-gold/25 bg-gold/5 px-4 py-2.5"
              >
                <Check className="w-3 h-3 text-gold flex-shrink-0" />
                <span className="font-body text-sm text-cream">{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Autres destinations ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="mb-28"
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="font-mono text-xs text-gold tracking-widest uppercase mb-2">
                Continuer l'exploration
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-cream">
                Autres destinations
              </h2>
            </div>
            <Link
              to="/destinations"
              className="hidden sm:inline-flex items-center gap-2 font-body text-sm text-gold hover:text-gold-light transition-colors border-b border-gold/30 hover:border-gold-light pb-1 mb-1"
            >
              Voir toutes
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {others.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </motion.div>
        </motion.section>
      </div>

      {/* ── CTA sticky mobile ── */}
      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            initial={{ y: 88 }}
            animate={{ y: 0 }}
            exit={{ y: 88 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-deep/96 backdrop-blur-md border-t border-subtle px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <p className="font-mono text-[10px] text-muted">À partir de</p>
                <p className="font-display text-xl text-gold leading-none">
                  {destination.price}
                </p>
              </div>
              <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gold text-deep font-body font-semibold text-sm tracking-wide hover:bg-gold-light transition-colors duration-200">
                Réserver ce voyage
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
