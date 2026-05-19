import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeInUp } from '../../lib/animations'

export default function DestinationCard({ destination }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{
        scale: 1.03,
        y: -4,
        boxShadow: `0 24px 60px -12px ${destination.color}35`,
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group relative bg-card border border-subtle overflow-hidden"
    >
      <Link to={`/destination/${destination.id}`}>
        <div className="relative h-56 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient de base */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          {/* Overlay doré au hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500"
            style={{ background: `linear-gradient(to top, ${destination.color}80, transparent)` }}
          />
          <div className="absolute top-4 right-4">
            <span
              className="font-mono text-xs px-3 py-1 border"
              style={{ borderColor: destination.color, color: destination.color }}
            >
              {destination.difficulty.label}
            </span>
          </div>
        </div>

        <div className="p-6">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">
            {destination.era}
          </p>
          <h3 className="font-display text-2xl text-cream mb-2 group-hover:text-gold transition-colors duration-300">
            {destination.name}
          </h3>
          <p className="font-body text-sm text-muted leading-relaxed mb-4 line-clamp-2">
            {destination.tagline}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-subtle">
            <div>
              <p className="font-mono text-xs text-muted">À partir de</p>
              <p className="font-display text-xl text-gold">{destination.price}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 font-body text-xs text-gold border border-gold/40 px-3 py-1.5 group-hover:bg-gold group-hover:text-deep transition-all duration-300">
              Explorer
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
