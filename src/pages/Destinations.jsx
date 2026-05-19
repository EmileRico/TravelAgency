import { motion } from 'framer-motion'
import { Calendar, Clock, ChevronRight, TrendingUp } from 'lucide-react'
import { destinations } from '../data/destinations'
import { fadeInUp, containerVariants } from '../lib/animations'

function DifficultyBadge({ difficulty }) {
  return (
    <span className={`font-mono text-xs px-3 py-1 border ${difficulty.colorClass}`}>
      {difficulty.label}
    </span>
  )
}

export default function Destinations() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Page Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center"
      >
        <motion.p variants={fadeInUp} className="font-mono text-xs text-gold tracking-widest uppercase mb-4">
          Catalogue de voyages
        </motion.p>
        <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl text-cream mb-4">
          Nos Destinations
        </motion.h1>
        <motion.p variants={fadeInUp} className="font-body text-lg text-muted max-w-xl mx-auto">
          Trois voyages soigneusement sélectionnés pour vous offrir les expériences
          temporelles les plus extraordinaires.
        </motion.p>
      </motion.div>

      {/* Destination Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          {destinations.map((destination, index) => (
            <motion.article
              key={destination.id}
              variants={fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 border border-subtle overflow-hidden group"
            >
              {/* Image */}
              <div
                className={`relative h-72 lg:h-auto overflow-hidden ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to ${index % 2 === 1 ? 'left' : 'right'}, ${destination.color}22, transparent)`,
                  }}
                />
              </div>

              {/* Content */}
              <div
                className={`bg-card p-8 md:p-12 flex flex-col justify-between ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-mono text-xs tracking-widest uppercase"
                      style={{ color: destination.color }}
                    >
                      {destination.era}
                    </span>
                    <DifficultyBadge difficulty={destination.difficulty} />
                  </div>

                  <h2 className="font-display text-4xl md:text-5xl text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                    {destination.name}
                  </h2>
                  <p className="font-body text-base text-muted italic mb-6">
                    {destination.tagline}
                  </p>
                  <p className="font-body text-sm text-muted leading-relaxed mb-8">
                    {destination.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-8">
                    <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3">
                      Points forts
                    </p>
                    <ul className="grid grid-cols-2 gap-2">
                      {destination.highlights.map((item) => (
                        <li key={item} className="flex items-center gap-2 font-body text-sm text-cream">
                          <ChevronRight className="w-3 h-3 text-gold shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Metadata + CTA */}
                <div>
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-subtle">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold" />
                      <div>
                        <p className="font-mono text-xs text-muted">Durée</p>
                        <p className="font-body text-sm text-cream">{destination.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold" />
                      <div>
                        <p className="font-mono text-xs text-muted">Coordonnées</p>
                        <p className="font-mono text-xs text-cream">{destination.coordinates}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-xs text-muted">Prix par personne</p>
                      <p className="font-display text-3xl text-gold">{destination.price}</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gold text-deep font-body font-semibold text-sm tracking-wide hover:bg-gold-light transition-colors duration-300">
                      Réserver
                      <TrendingUp className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
