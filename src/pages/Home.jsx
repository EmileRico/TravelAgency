import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Users, Gem, MessageCircle } from 'lucide-react'
import { useMemo } from 'react'
import { destinations } from '../data/destinations'
import { fadeInUp, containerVariants } from '../lib/animations'
import DestinationCard from '../components/ui/DestinationCard'

const TITLE_WORDS = ['Voyagez', 'à', 'travers', 'le', 'temps']

const features = [
  {
    icon: Shield,
    title: 'Sécurité Temporelle',
    description:
      "Protocoles de protection avancés certifiés ISO-T. Chaque voyageur est équipé d'une balise de rapatriement d'urgence.",
  },
  {
    icon: Users,
    title: 'Guides Experts',
    description:
      'Historiens et archéologues de renom vous accompagnent à chaque époque pour une immersion rigoureusement authentique.',
  },
  {
    icon: Gem,
    title: 'Luxe Absolu',
    description:
      "Hébergements d'exception, gastronomie d'époque et service personnalisé cinq étoiles tout au long de votre voyage.",
  },
]

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const wordContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
}

function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 130 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 0.4,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-cream"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.08, 0.7, 0.08] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deep via-dark to-card" />
        <StarField />

        {/* Grille décorative */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.6) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            {/* Badge animé */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2.5 px-4 py-2 border border-gold/30 bg-gold/5 mb-10"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-gold"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="font-mono text-xs text-gold tracking-widest uppercase">
                Disponible en 3 époques
              </span>
            </motion.div>

            {/* Titre mot par mot */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={wordContainerVariants}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream leading-tight mb-6 flex flex-wrap justify-center gap-x-4 sm:gap-x-6"
            >
              {TITLE_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className={word === 'temps' ? 'text-gold italic' : ''}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-body text-lg md:text-xl text-muted max-w-xl mx-auto leading-relaxed mb-10"
            >
              L'agence qui réinvente l'exploration historique
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/destinations"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-deep font-body font-semibold tracking-wide hover:bg-gold-light transition-colors duration-300"
              >
                Découvrir nos destinations
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold/50 text-gold font-body font-medium tracking-wide hover:border-gold hover:bg-gold/5 transition-all duration-300">
                <MessageCircle className="w-4 h-4" />
                Parler à Chronos
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs text-muted tracking-widest uppercase">Défiler</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Destinations Preview ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="font-mono text-xs text-gold tracking-widest uppercase mb-3"
            >
              Nos Voyages
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl text-cream"
            >
              Trois époques d'exception
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 font-body text-sm text-gold hover:text-gold-light transition-colors border-b border-gold/30 hover:border-gold-light pb-1"
            >
              Voir toutes les destinations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Pourquoi nous ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="font-mono text-xs text-gold tracking-widest uppercase mb-3"
            >
              Pourquoi nous choisir
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl text-cream"
            >
              L'excellence temporelle
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className="p-8 border border-subtle hover:border-gold/30 transition-colors duration-300 group"
              >
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-6 group-hover:border-gold transition-colors duration-300">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display text-xl text-cream mb-3">{title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Finale ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/40">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center p-12 md:p-16 border border-gold/20 bg-card relative overflow-hidden"
          >
            {/* Coin décoratif */}
            <div className="absolute top-0 left-0 w-24 h-px bg-gradient-to-r from-gold to-transparent" />
            <div className="absolute top-0 left-0 h-24 w-px bg-gradient-to-b from-gold to-transparent" />
            <div className="absolute bottom-0 right-0 w-24 h-px bg-gradient-to-l from-gold to-transparent" />
            <div className="absolute bottom-0 right-0 h-24 w-px bg-gradient-to-t from-gold to-transparent" />

            <p className="font-mono text-xs text-gold tracking-widest uppercase mb-4">
              Prêt à voyager ?
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-cream mb-5">
              Votre épopée temporelle
              <br />
              <span className="text-gold italic">commence ici</span>
            </h2>
            <p className="font-body text-muted mb-10 max-w-md mx-auto leading-relaxed">
              Laissez Chronos vous guider vers la destination qui correspond à votre rêve. Consultation gratuite, réservation en quelques clics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/destinations"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-deep font-body font-semibold tracking-wide hover:bg-gold-light transition-colors duration-300"
              >
                Commencer l'aventure
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold/50 text-gold font-body font-medium tracking-wide hover:border-gold hover:bg-gold/5 transition-all duration-300">
                <MessageCircle className="w-4 h-4" />
                Parler à Chronos
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
