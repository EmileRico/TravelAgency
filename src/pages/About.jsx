import { motion } from 'framer-motion'
import { Clock, Globe, Award, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeInUp, containerVariants } from '../lib/animations'

const stats = [
  { icon: Clock, value: '3', label: 'Destinations temporelles' },
  { icon: Globe, value: '∞', label: "Années d'histoire accessibles" },
  { icon: Award, value: '5★', label: 'Service de luxe garanti' },
  { icon: Users, value: '200+', label: 'Voyageurs satisfaits' },
]

const values = [
  {
    title: 'Sécurité',
    desc: 'Protocoles de protection temporelle certifiés ISO-T, testés sur 10 000 voyages.',
  },
  {
    title: 'Authenticité',
    desc: 'Expériences 100% historiquement exactes, validées par un comité de 12 historiens.',
  },
  {
    title: 'Discrétion',
    desc: 'Anonymat total et zéro impact sur la timeline, garanti contractuellement.',
  },
  {
    title: 'Luxe',
    desc: 'Hébergements et services cinq étoiles adaptés à chaque époque visitée.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* ── Hero ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20"
      >
        <div className="max-w-3xl">
          <motion.p variants={fadeInUp} className="font-mono text-xs text-gold tracking-widest uppercase mb-4">
            Notre histoire
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-display text-5xl md:text-7xl text-cream leading-none mb-8"
          >
            Le temps,
            <br />
            <span className="text-gold italic">magnifié</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="font-body text-lg text-muted leading-relaxed">
            TimeTravel Agency est née d'une conviction : les expériences les plus
            extraordinaires ne sont pas dans le futur, elles sont déjà inscrites dans
            l'Histoire. Fondée en 2024, notre agence offre un accès privilégié aux moments
            les plus fascinants de l'humanité.
          </motion.p>
        </div>
      </motion.div>

      {/* ── Stats ── */}
      <section className="py-16 bg-dark border-y border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <motion.div key={label} variants={fadeInUp} className="text-center">
                <Icon className="w-5 h-5 text-gold mx-auto mb-3" />
                <p className="font-display text-4xl text-cream mb-1">{value}</p>
                <p className="font-body text-xs text-muted uppercase tracking-wide">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="font-display text-4xl text-cream">Notre philosophie</h2>
              <p className="font-body text-muted leading-relaxed">
                Chaque voyage est conçu comme une œuvre d'art. Nous ne proposons pas
                simplement un déplacement temporel — nous orchestrons une expérience
                immersive totale, où chaque détail historique, chaque interaction sociale,
                chaque repas est authentique et mémorable.
              </p>
              <p className="font-body text-muted leading-relaxed">
                Notre équipe d'historiens, chrononautes et experts en protocole temporel
                travaille pendant des mois pour garantir la plus haute précision historique,
                tout en assurant votre sécurité absolue à chaque instant.
              </p>
              <div className="pt-4 border-t border-subtle">
                <blockquote className="font-display text-xl text-cream italic">
                  "Le luxe ultime, c'est d'avoir été là."
                </blockquote>
                <p className="font-mono text-xs text-muted mt-2">
                  — Alexandre Dumont, Fondateur
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map(({ title, desc }) => (
                <div
                  key={title}
                  className="p-6 border border-subtle hover:border-gold/30 transition-colors"
                >
                  <h3 className="font-display text-lg text-gold mb-2">{title}</h3>
                  <p className="font-body text-xs text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Chronos CTA ── */}
      <section className="py-16 bg-dark">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto px-4 text-center"
        >
          <p className="font-mono text-xs text-gold tracking-widest uppercase mb-4">
            Chronos vous attend
          </p>
          <h2 className="font-display text-3xl text-cream mb-4">
            Des questions sur votre prochain voyage ?
          </h2>
          <p className="font-body text-muted mb-8">
            Notre assistant IA Chronos est disponible 24h/24 pour vous guider dans le
            choix de votre destination temporelle idéale.
          </p>
          <Link
            to="/destinations"
            className="inline-block px-8 py-4 bg-gold text-deep font-body font-semibold tracking-wide hover:bg-gold-light transition-colors duration-300"
          >
            Découvrir les destinations
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
