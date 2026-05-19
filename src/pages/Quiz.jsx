import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  RotateCcw,
  BookOpen,
  Compass,
  Gem,
  Clock,
  Globe,
  Palette,
  Building2,
  TreePine,
  Landmark,
  MapPin,
  Eye,
  PenLine,
} from 'lucide-react'
import { destinations } from '../data/destinations'
import { fadeInUp, containerVariants } from '../lib/animations'

// ── Data ─────────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    text: 'Quelle expérience vous attire ?',
    options: [
      { label: 'Culturelle', icon: BookOpen, dest: 'florence-1504' },
      { label: 'Aventure', icon: Compass, dest: 'cretace' },
      { label: 'Raffinement', icon: Gem, dest: 'paris-1889' },
    ],
  },
  {
    text: 'Votre rapport au temps ?',
    options: [
      { label: 'Histoire moderne', icon: Clock, dest: 'paris-1889' },
      { label: 'Origines', icon: Globe, dest: 'cretace' },
      { label: 'Renaissance', icon: Palette, dest: 'florence-1504' },
    ],
  },
  {
    text: 'Environnement préféré ?',
    options: [
      { label: 'Ville animée', icon: Building2, dest: 'paris-1889' },
      { label: 'Nature sauvage', icon: TreePine, dest: 'cretace' },
      { label: 'Architecture', icon: Landmark, dest: 'florence-1504' },
    ],
  },
  {
    text: 'Activité rêvée ?',
    options: [
      { label: 'Monuments', icon: MapPin, dest: 'paris-1889' },
      { label: 'Faune préhistorique', icon: Eye, dest: 'cretace' },
      { label: "Ateliers d'artistes", icon: PenLine, dest: 'florence-1504' },
    ],
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function computeResult(answers) {
  const scores = { 'paris-1889': 0, cretace: 0, 'florence-1504': 0 }
  answers.forEach((dest) => {
    if (dest in scores) scores[dest]++
  })
  const winnerId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  return destinations.find((d) => d.id === winnerId)
}

async function fetchPersonalizedText(answers, destination) {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY
  if (!apiKey) return null

  const questionLabels = ['Expérience', 'Rapport au temps', 'Environnement', 'Activité rêvée']
  const answersText = answers
    .map((dest, i) => {
      const label = QUESTIONS[i].options.find((o) => o.dest === dest)?.label ?? dest
      return `- ${questionLabels[i]} : ${label}`
    })
    .join('\n')

  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'mistral-small-latest',
      messages: [
        {
          role: 'system',
          content:
            "Tu es Chronos, l'assistant de TimeTravel Agency. Réponds en français, de façon élégante et enthousiaste.",
        },
        {
          role: 'user',
          content: `Un client a répondu à notre quiz de recommandation :\n${answersText}\n\nNous lui recommandons "${destination.name}" (${destination.era}). Écris un message personnalisé de 2-3 phrases pour expliquer pourquoi cette destination lui correspond parfaitement. Parle-lui directement, tu peux le tutoyer légèrement. Sois enthousiaste et précis.`,
        },
      ],
      max_tokens: 220,
      temperature: 0.8,
    }),
  })

  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const data = await response.json()
  return data.choices?.[0]?.message?.content ?? null
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ step, total }) {
  return (
    <div className="relative w-full h-px bg-subtle mb-12">
      <motion.div
        className="absolute inset-y-0 left-0 bg-gold"
        initial={{ width: 0 }}
        animate={{ width: `${(step / total) * 100}%` }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
      {/* Marqueurs */}
      <div className="absolute inset-y-0 left-0 right-0 flex justify-between">
        {Array.from({ length: total + 1 }, (_, i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full -translate-y-[1.5px]"
            animate={{ backgroundColor: i <= step ? '#c9a84c' : '#2a2a3e' }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}

const slideVariants = {
  enter: { x: 56, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.38, ease: 'easeOut' } },
  exit: { x: -56, opacity: 0, transition: { duration: 0.26, ease: 'easeIn' } },
}

function ThinkingDots() {
  return (
    <div className="flex justify-center gap-1.5 py-6">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-gold"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -4, 0] }}
          transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function QuestionStep({ question, stepIndex, total, onAnswer }) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (dest) => {
    if (selected) return
    setSelected(dest)
    setTimeout(() => onAnswer(dest), 380)
  }

  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full"
    >
      <p className="font-mono text-xs text-gold tracking-widest uppercase text-center mb-4">
        Question {stepIndex + 1} sur {total}
      </p>
      <h2 className="font-display text-3xl md:text-4xl text-cream text-center mb-10 leading-snug">
        {question.text}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {question.options.map(({ label, icon: Icon, dest }) => {
          const isSelected = selected === dest
          const isDimmed = selected !== null && !isSelected

          return (
            <motion.button
              key={label}
              onClick={() => handleSelect(dest)}
              whileHover={!selected ? { y: -5 } : {}}
              animate={{
                scale: isSelected ? 1.04 : isDimmed ? 0.96 : 1,
                opacity: isDimmed ? 0.35 : 1,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className={`flex flex-col items-center gap-5 p-8 border text-center cursor-pointer transition-colors duration-300 focus:outline-none ${
                isSelected
                  ? 'border-gold bg-gold/10'
                  : 'border-subtle bg-card hover:border-gold/40'
              }`}
            >
              <div
                className={`w-12 h-12 border flex items-center justify-center transition-colors duration-300 ${
                  isSelected ? 'border-gold bg-gold/10' : 'border-gold/25'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isSelected ? 'text-gold' : 'text-muted'
                  }`}
                />
              </div>
              <span
                className={`font-body text-sm tracking-wide transition-colors duration-300 ${
                  isSelected ? 'text-gold' : 'text-cream'
                }`}
              >
                {label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

function QuizResult({ destination, aiText, isAiLoading, onRestart }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="w-full"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col items-center"
      >
        <motion.p
          variants={fadeInUp}
          className="font-mono text-xs text-gold tracking-widest uppercase mb-6"
        >
          Votre destination idéale
        </motion.p>

        {/* Image dramatique */}
        <motion.div
          variants={fadeInUp}
          className="relative w-full overflow-hidden mb-8"
          style={{ height: '300px' }}
        >
          <motion.img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-transparent" />
          {/* Badge époque */}
          <div className="absolute top-4 left-4">
            <span className="font-mono text-xs px-3 py-1 border border-gold/50 text-gold bg-deep/60">
              {destination.era}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="font-display text-4xl md:text-5xl text-cream">{destination.name}</h2>
          </div>
        </motion.div>

        {/* Description personnalisée Mistral */}
        <motion.div variants={fadeInUp} className="max-w-xl w-full text-center mb-6 min-h-[60px]">
          {isAiLoading ? (
            <ThinkingDots />
          ) : (
            <p className="font-body text-base text-muted leading-relaxed italic">
              {aiText ?? destination.tagline}
            </p>
          )}
        </motion.div>

        {/* Détails */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center gap-6 mb-10 font-mono text-xs"
        >
          <span className="text-muted">
            À partir de <span className="text-gold font-medium">{destination.price}</span>
          </span>
          <span className="w-px h-3 bg-subtle" />
          <span className="text-muted">
            Durée <span className="text-cream">{destination.duration}</span>
          </span>
          <span className="w-px h-3 bg-subtle" />
          <span className={destination.difficulty.colorClass}>{destination.difficulty.label}</span>
        </motion.div>

        {/* Boutons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md"
        >
          <Link
            to="/destinations"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-deep font-body font-semibold tracking-wide hover:bg-gold-light transition-colors duration-300"
          >
            Réserver maintenant
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-subtle text-cream font-body font-medium tracking-wide hover:border-gold/50 hover:text-gold transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" />
            Recommencer
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ── Page principale ───────────────────────────────────────────────────────────

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [aiText, setAiText] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)

  const isResult = step === QUESTIONS.length

  const handleAnswer = (dest) => {
    const newAnswers = [...answers, dest]
    setAnswers(newAnswers)

    if (newAnswers.length < QUESTIONS.length) {
      setStep(newAnswers.length)
    } else {
      const winner = computeResult(newAnswers)
      setResult(winner)
      setStep(QUESTIONS.length)

      setAiLoading(true)
      fetchPersonalizedText(newAnswers, winner)
        .then((text) => setAiText(text))
        .catch(() => setAiText(null))
        .finally(() => setAiLoading(false))
    }
  }

  const handleRestart = () => {
    setStep(0)
    setAnswers([])
    setResult(null)
    setAiText(null)
    setAiLoading(false)
  }

  return (
    <section className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* En-tête (masqué sur l'écran résultat) */}
        <AnimatePresence>
          {!isResult && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-10"
            >
              <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3">
                Quiz de recommandation
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-cream">
                Trouvez votre époque
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Barre de progression */}
        <AnimatePresence>
          {!isResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProgressBar step={step} total={QUESTIONS.length} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Questions / Résultat */}
        <AnimatePresence mode="wait">
          {!isResult ? (
            <QuestionStep
              key={step}
              question={QUESTIONS[step]}
              stepIndex={step}
              total={QUESTIONS.length}
              onAnswer={handleAnswer}
            />
          ) : (
            <QuizResult
              key="result"
              destination={result}
              aiText={aiText}
              isAiLoading={aiLoading}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
