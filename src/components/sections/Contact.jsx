import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, RotateCcw, Send } from 'lucide-react'
import { contact } from '../../data/site'
import { profile, socials } from '../../data/profile'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Avatar from '../ui/Avatar'
import Burst from '../ui/Burst'
import SocialIcon from '../ui/SocialIcon'
import { accents } from '../../lib/utils'

export default function Contact() {
  return (
    <Section
      id="contact"
      kicker="say hi"
      title="slide into my"
      accent="dms"
      sticker="💌 no spam"
      color={accents.lilac}
      blurb="collab idea, job thing or just a 'hey' — my inbox is open and my reply game is (usually) strong."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
        <div className="flex flex-col gap-4">
          <Reveal className="rounded-3xl border border-line bg-ink-2 p-5">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-fog">
              <span className="size-2 rounded-full bg-lime" /> currently open to
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {contact.openTo.map((o) => (
                <span key={o} className="rounded-full bg-lilac/12 px-3 py-1 text-sm text-lilac">
                  {o}
                </span>
              ))}
            </div>
          </Reveal>

          <ul className="grid flex-1 auto-rows-fr gap-2">
            {socials.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 0.05} className="grid">
                <motion.a
                  href={s.url}
                  target={s.id === 'email' ? undefined : '_blank'}
                  rel="noreferrer"
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-ink-2 px-4 py-3.5 transition-colors hover:border-lilac/50 hover:bg-lilac/5"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-ink-3 text-fog transition-colors group-hover:bg-lilac group-hover:text-ink">
                    <SocialIcon id={s.id} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold">{s.label}</span>
                    <span className="block text-sm text-fog">{s.handle}</span>
                  </span>
                  <ArrowUpRight size={18} className="text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
                </motion.a>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1} className="grid">
          <ChatWindow />
        </Reveal>
      </div>
    </Section>
  )
}

const pause = (ms) => new Promise((r) => setTimeout(r, ms))

function ChatWindow() {
  const [intent, setIntent] = useState(contact.intents[0].id)
  const [status, setStatus] = useState('idle') // idle | sending | typing | done | error
  const [sent, setSent] = useState(null)
  const [confetti, setConfetti] = useState(0)

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    data.append('intent', intent)
    data.append('_subject', `💌 new dm from your site${data.get('name') ? ` — ${data.get('name')}` : ''}`)
    const name = String(data.get('name') || '').trim()
    setSent({ name, message: String(data.get('message') || '').trim() })
    setStatus('sending')

    try {
      if (contact.formEndpoint) {
        const res = await fetch(contact.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        if (!res.ok) throw new Error('send failed')
      } else {
        await pause(700) // no endpoint configured — pretend
      }
      setStatus('typing')
      await pause(1400)
      setStatus('done')
      setConfetti((c) => c + 1)
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setSent(null)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-ink-2">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <Avatar className="size-10" textClassName="text-base" />
        <div className="leading-tight">
          <p className="font-semibold">{profile.handle}</p>
          <p className="flex items-center gap-1.5 text-xs text-lime">
            <span className="size-1.5 rounded-full bg-lime" /> active now
          </p>
        </div>
        <span className="ml-auto font-mono text-[11px] text-mute">{contact.replyTime}</span>
      </div>

      {/* thread */}
      <div className="flex-1 space-y-2 p-5" aria-live="polite">
        {contact.openers.map((msg, i) => (
          <Bubble key={i} delay={0.2 + i * 0.35}>
            {msg}
          </Bubble>
        ))}
        <AnimatePresence>
          {sent && (
            <Bubble key="me" me>
              {sent.message}
            </Bubble>
          )}
          {status === 'typing' && <TypingBubble key="typing" />}
          {status === 'done' && <Bubble key="reply">{contact.reply(sent?.name)}</Bubble>}
          {status === 'error' && (
            <Bubble key="err">uh oh, that message got lost in the void 🕳️ try again, or just email me directly?</Bubble>
          )}
        </AnimatePresence>
      </div>

      {/* composer */}
      <div className="relative border-t border-line p-4 sm:p-5">
        <Burst trigger={confetti} emojis={['🎉', '💌', '✨', '🫶', '🍪']} count={18} distance={140} size="text-xl" />
        <AnimatePresence mode="wait" initial={false}>
          {status === 'done' || status === 'error' ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap items-center justify-between gap-3"
            >
              <p className="text-sm text-fog">
                {status === 'done' ? (
                  <>
                    <span className="text-lime">✓✓ delivered</span> · you're officially in the dms
                  </>
                ) : (
                  'message not sent'
                )}
              </p>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ink-3 px-4 py-2 text-sm hover:bg-white/10"
              >
                <RotateCcw size={14} /> {status === 'done' ? 'send another' : 'try again'}
              </motion.button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              <fieldset>
                <legend className="sr-only">what's this about?</legend>
                <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
                  {contact.intents.map((it) => (
                    <button
                      type="button"
                      key={it.id}
                      onClick={() => setIntent(it.id)}
                      aria-pressed={intent === it.id}
                      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                        intent === it.id ? 'border-lilac bg-lilac text-ink' : 'border-line text-fog hover:text-paper'
                      }`}
                    >
                      {it.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field name="name" placeholder="your name" autoComplete="name" />
                <Field name="email" type="email" placeholder="your email" autoComplete="email" />
              </div>
              <div className="flex items-end gap-2">
                <label className="flex-1">
                  <span className="sr-only">message</span>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    placeholder="type something nice…"
                    className="block w-full resize-none rounded-2xl border border-line bg-ink px-4 py-3 text-sm placeholder:text-mute focus:border-lilac focus:outline-none"
                  />
                </label>
                <motion.button
                  type="submit"
                  disabled={status !== 'idle'}
                  whileHover={{ scale: 1.06, rotate: -8 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="send message"
                  className="grid size-12 shrink-0 place-items-center rounded-full bg-lilac text-ink disabled:opacity-60"
                >
                  {status === 'idle' ? <Send size={18} /> : <span className="size-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Field({ name, type = 'text', placeholder, autoComplete }) {
  return (
    <label>
      <span className="sr-only">{placeholder}</span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="block w-full rounded-2xl border border-line bg-ink px-4 py-3 text-sm placeholder:text-mute focus:border-lilac focus:outline-none"
      />
    </label>
  )
}

function Bubble({ children, me = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      exit={{ opacity: 0 }}
      transition={{ delay, type: 'spring', stiffness: 400, damping: 30 }}
      className={`flex ${me ? 'justify-end' : 'justify-start'}`}
    >
      <p
        className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-[15px] leading-snug ${
          me ? 'origin-bottom-right rounded-br-md bg-lilac text-ink' : 'origin-bottom-left rounded-bl-md bg-ink-3'
        }`}
      >
        {children}
      </p>
    </motion.div>
  )
}

function TypingBubble() {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex">
      <span className="flex gap-1 rounded-2xl rounded-bl-md bg-ink-3 px-4 py-3.5" aria-label="typing">
        {[0, 0.15, 0.3].map((d) => (
          <motion.span
            key={d}
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: d }}
            className="size-1.5 rounded-full bg-fog"
          />
        ))}
      </span>
    </motion.div>
  )
}
