import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark border-t border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center">
                <Clock className="w-4 h-4 text-gold" />
              </div>
              <span className="font-display text-xl text-cream">TimeTravel Agency</span>
            </div>
            <p className="font-body text-sm text-muted leading-relaxed max-w-xs">
              Depuis 2024, nous orchestrons des voyages d'exception à travers les
              époques les plus fascinantes de l'Histoire.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-display text-gold text-lg">Navigation</h3>
            <nav className="flex flex-col gap-2">
              {[
                { label: 'Accueil', to: '/' },
                { label: 'Nos Destinations', to: '/destinations' },
                { label: 'À Propos', to: '/about' },
              ].map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="font-body text-sm text-muted hover:text-cream transition-colors w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-gold text-lg">Contact</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span className="font-body text-sm text-muted">
                  contact@timetravel.agency
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span className="font-body text-sm text-muted">
                  12 Rue du Temps, Paris — Continuum Alpha
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-subtle flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-muted">
            © {year} TimeTravel Agency. Tous droits réservés.
          </p>
          <p className="font-mono text-xs text-muted tracking-widest uppercase">
            Voyager dans le temps, responsablement.
          </p>
        </div>
      </div>
    </footer>
  )
}
