import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Clock } from 'lucide-react'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'À Propos', to: '/about' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-deep/95 backdrop-blur-md border-b border-subtle'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
              <Clock className="w-4 h-4 text-gold" />
            </div>
            <div>
              <span className="font-display text-lg font-semibold text-cream tracking-wide">
                TimeTravel
              </span>
              <span className="font-mono text-xs text-muted block leading-none tracking-widest uppercase">
                Agency
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `font-body text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                    isActive ? 'text-gold' : 'text-muted hover:text-cream'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/destinations"
              className="hidden md:inline-flex items-center px-5 py-2 border border-gold text-gold font-body text-sm font-medium tracking-wide hover:bg-gold hover:text-deep transition-all duration-300"
            >
              Réserver
            </Link>
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden text-cream hover:text-gold transition-colors p-1"
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-dark border-t border-subtle overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `py-3 px-4 font-body text-sm font-medium tracking-wide border-l-2 transition-all duration-200 ${
                      isActive
                        ? 'text-gold border-gold bg-gold/5'
                        : 'text-muted border-transparent hover:text-cream hover:border-muted'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/destinations"
                className="mt-3 py-3 text-center border border-gold text-gold font-body text-sm font-medium tracking-wide hover:bg-gold hover:text-deep transition-all duration-300"
              >
                Réserver un voyage
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
