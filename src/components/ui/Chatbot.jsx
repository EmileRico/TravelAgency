import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Clock } from 'lucide-react'

const SYSTEM_PROMPT = `Tu es Chronos, l'assistant virtuel de TimeTravel Agency, agence de voyage temporel de luxe fondée en 2024.

Ton rôle : conseiller et guider les clients dans le choix de leur voyage temporel.

Ton ton :
- Professionnel, chaleureux et passionné d'histoire
- Enthousiaste sans être familier
- Toujours précis sur les détails historiques
- Discret sur les paradoxes temporels (sujet sensible pour l'agence)

Tu connais parfaitement nos 3 destinations :
1. Paris 1889 — Belle Époque, Tour Eiffel, Exposition Universelle. Prix : 12 500€. Durée : 7 jours.
2. Crétacé -65M — Dinosaures, nature préhistorique, aventure. Prix : 28 000€. Durée : 5 jours.
3. Florence 1504 — Renaissance, art, Michel-Ange. Prix : 15 000€. Durée : 7 jours.

Règles :
- Réponds toujours en français
- Suggère des destinations selon les intérêts du client
- Si on te demande hors sujet, ramène poliment vers les voyages temporels
- Pour les réservations, invite à remplir le formulaire sur le site
- Garde tes réponses sous 150 mots pour rester conversationnel`

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Bonjour ! Je suis Chronos, votre conseiller en voyages temporels.\n\nQue vous rêviez de la Belle Époque parisienne, des forêts préhistoriques du Crétacé ou de la Renaissance florentine, je suis là pour vous guider. Comment puis-je vous aider ?",
  timestamp: new Date(),
}

const FALLBACK_MESSAGE =
  "Je rencontre une légère turbulence temporelle… Veuillez réessayer dans un instant. Nos chronoingénieurs sont sur le coup !"

const QUICK_SUGGESTIONS = ['Nos destinations', 'Conseille-moi', 'Tarifs & infos']

function formatTime(date) {
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-gold"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
          transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function Message({ message }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full border border-gold/40 bg-card flex items-center justify-center self-end mb-5">
          <Clock className="w-3.5 h-3.5 text-gold" />
        </div>
      )}
      <div className={`flex flex-col gap-1 max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-3.5 py-2.5 font-body text-sm leading-relaxed ${
            isUser
              ? 'bg-gold/15 text-cream border border-gold/25'
              : 'bg-card text-cream border border-subtle'
          }`}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {message.content}
        </div>
        <span className="font-mono text-[10px] text-muted px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  )
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 320)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  const sendMessage = useCallback(
    async (content) => {
      const text = content.trim()
      if (!text || isLoading) return

      const userMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: text,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInput('')
      setIsLoading(true)

      // Historique des 10 derniers messages (hors bienvenue) pour le contexte
      const history = [...messages, userMessage]
        .filter((m) => m.id !== 'welcome')
        .slice(-10)
        .map(({ role, content: c }) => ({ role, content: c }))

      try {
        const apiKey = import.meta.env.VITE_MISTRAL_API_KEY

        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'mistral-small-latest',
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
            max_tokens: 500,
            temperature: 0.7,
            stream: true,
          }),
        })

        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const assistantId = `a-${Date.now()}`
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: 'assistant', content: '', timestamp: new Date() },
        ])
        setIsLoading(false)

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (data === '[DONE]') break
            try {
              const parsed = JSON.parse(data)
              const delta = parsed.choices?.[0]?.delta?.content
              if (delta) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: m.content + delta } : m,
                  ),
                )
              }
            } catch {
              // ligne SSE malformée, on skip
            }
          }
        }
      } catch {
        setIsLoading(false)
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            content: FALLBACK_MESSAGE,
            timestamp: new Date(),
          },
        ])
      }
    },
    [messages, isLoading],
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* ── Fenêtre de chat ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col"
            style={{
              width: '380px',
              maxWidth: 'calc(100vw - 2rem)',
              height: '500px',
              background: '#12121a',
              border: '1px solid rgba(201,168,76,0.22)',
              boxShadow:
                '0 24px 64px -12px rgba(0,0,0,0.75), 0 0 0 1px rgba(201,168,76,0.06)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-subtle flex-shrink-0">
              <div className="relative">
                <div className="w-9 h-9 rounded-full border border-gold/40 bg-card flex items-center justify-center">
                  <Clock className="w-4 h-4 text-gold" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#12121a]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-base text-cream leading-none">Chronos</p>
                <p className="font-mono text-[10px] text-emerald-400 tracking-wider mt-0.5">
                  En ligne
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 flex items-center justify-center text-muted hover:text-cream transition-colors flex-shrink-0"
                aria-label="Fermer le chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Zone de messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 min-h-0">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 items-end"
                >
                  <div className="w-7 h-7 rounded-full border border-gold/40 bg-card flex items-center justify-center flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <div className="px-3.5 py-2.5 bg-card border border-subtle">
                    <ThinkingDots />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions rapides */}
            <div className="flex gap-2 px-4 py-2.5 border-t border-subtle flex-shrink-0 overflow-x-auto">
              {QUICK_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  disabled={isLoading}
                  className="flex-shrink-0 font-mono text-[10px] text-gold border border-gold/30 px-3 py-1.5 hover:bg-gold/10 hover:border-gold/50 transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-subtle flex-shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question…"
                disabled={isLoading}
                className="flex-1 bg-transparent font-body text-sm text-cream placeholder:text-muted outline-none disabled:opacity-50 min-w-0"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 flex items-center justify-center text-gold hover:text-gold-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                aria-label="Envoyer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bouton flottant ── */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50">
        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="relative w-14 h-14 bg-gold text-deep flex items-center justify-center"
          style={{ boxShadow: '0 8px 32px rgba(201,168,76,0.4)' }}
          aria-label={isOpen ? 'Fermer Chronos' : 'Parler à Chronos'}
        >
          {/* Pulse ring (uniquement quand fermé) */}
          {!isOpen && (
            <motion.span
              className="absolute inset-0 bg-gold"
              animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="relative z-10"
              >
                <X className="w-5 h-5" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="relative z-10"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}
