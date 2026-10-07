import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Play } from 'lucide-react'
import { about } from '../../data/about'
import Section from '../ui/Section'
import ProfileCard from '../cards/ProfileCard'
import { accents, ease, withFlags, withMarker } from '../../lib/utils'

const hasFlags = about.greenFlags.length > 0 || about.redFlags.length > 0
const hasTakes = about.hotTakes.length > 0

export default function About() {
  return (
    <Section
      id="about"
      kicker="about me, but lore"
      title="the"
      accent="lore"
      sticker="✏️ unfiltered"
      color={accents.pink}
      blurb="the abridged version. the director's cut is available on request (over ice cream 🍦)."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProfileCard label="👋 hi, hello" className="md:col-span-2">
          <div className="space-y-4">
            {about.intro.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? 'font-display text-2xl leading-snug sm:text-[1.9rem]' : 'leading-relaxed text-fog sm:text-lg'}
              >
                {withMarker(p)}
              </p>
            ))}
          </div>
        </ProfileCard>

        <ProfileCard label="📇 quick facts" delay={0.05} className="flex flex-col md:col-span-2 lg:col-span-1">
          <ul className="space-y-3">
            {about.facts.map((f) => (
              <li key={f.label} className="flex items-start gap-3 text-sm">
                <span className="w-5 text-center text-base leading-5">{f.emoji}</span>
                <span className="w-24 shrink-0 leading-5 text-fog">{f.label}</span>
                <span className="leading-5">{withFlags(f.value)}</span>
              </li>
            ))}
          </ul>
          {about.socialBattery && <SocialBattery />}
        </ProfileCard>

        {about.video && <VideoCard />}

        {/* optional cards — they appear once their lists in about.js have entries */}
        {hasFlags && <FlagsCard />}
        {hasTakes && <HotTakesCard />}
      </div>
    </Section>
  )
}

// silent, looping "live footage" — loads once it's near the screen, like a gif.
// with reduced motion it waits for a tap instead of autoplaying.
// `crop` = how much of the 16:9 frame the actual footage fills, so the black bars get trimmed.
function VideoCard() {
  const { youtubeId, label, caption, note, alt, crop = 1 } = about.video
  const ref = useRef(null)
  const near = useInView(ref, { once: true, margin: '200px 0px' })
  const reduce = useReducedMotion()
  const [tapped, setTapped] = useState(false)
  const playing = reduce ? tapped : near
  const params = `autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&disablekb=1&playsinline=1&rel=0`
  const frame = { width: `${100 / crop}%` }

  return (
    <ProfileCard delay={0.1} className="md:col-span-2 lg:col-span-3">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div className="sm:pl-2">
          <p className="font-mono text-[11px] uppercase tracking-wider text-fog">{label}</p>
          <p className="mt-3 font-serif text-4xl italic leading-[1.05] sm:text-5xl lg:text-6xl">{caption}</p>
          {note && <p className="mt-3 text-sm text-fog">{note}</p>}
        </div>

        <div
          ref={ref}
          className="relative w-full shrink-0 overflow-hidden rounded-2xl bg-black sm:w-64 lg:w-72"
          style={{ aspectRatio: `${crop * 16} / 9` }}
        >
          <img
            src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
            alt={alt}
            loading="lazy"
            className="absolute left-1/2 top-0 h-full max-w-none -translate-x-1/2 object-cover"
            style={frame}
          />
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?${params}`}
              title={alt}
              allow="autoplay; encrypted-media"
              tabIndex={-1}
              className="pointer-events-none absolute left-1/2 top-0 h-full -translate-x-1/2 border-0"
              style={frame}
            />
          ) : (
            reduce && (
              <button onClick={() => setTapped(true)} aria-label={`play video: ${alt}`} className="absolute inset-0 grid place-items-center">
                <span className="grid size-12 place-items-center rounded-full bg-black/60 text-white backdrop-blur">
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </span>
              </button>
            )
          )}
          <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-[#ff4d4d]" /> live
          </span>
        </div>
      </div>
    </ProfileCard>
  )
}

function FlagsCard() {
  const [mode, setMode] = useState('green')
  const list = mode === 'green' ? about.greenFlags : about.redFlags

  return (
    <ProfileCard label="🚦 flag check" delay={0.05}>
      <div role="tablist" className="mb-5 inline-flex rounded-full border border-line bg-ink p-1 text-sm">
        {[
          ['green', '🟢 green', 'bg-lime'],
          ['red', '🚩 red', 'bg-pink'],
        ].map(([key, label, bg]) => (
          <button
            key={key}
            role="tab"
            aria-selected={mode === key}
            onClick={() => setMode(key)}
            className={`relative rounded-full px-3.5 py-1.5 transition-colors ${mode === key ? 'text-ink' : 'text-fog hover:text-paper'}`}
          >
            {mode === key && (
              <motion.span
                layoutId="flag-pill"
                className={`absolute inset-0 rounded-full ${bg}`}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative">{label} flags</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.ul
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-2.5"
        >
          {list.map((f) => (
            <li key={f} className="flex gap-2.5 text-[15px] leading-snug">
              <span className={mode === 'green' ? 'text-lime' : 'text-pink'}>{mode === 'green' ? '✓' : '✕'}</span>
              {f}
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </ProfileCard>
  )
}

function HotTakesCard() {
  const [i, setI] = useState(0)
  const takes = about.hotTakes
  const take = takes[i]

  return (
    <ProfileCard label={`🌶️ hot take ${i + 1}/${takes.length}`} delay={0.1} className="flex flex-col">
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 12, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease }}
            className="font-serif text-[1.9rem] italic leading-tight"
          >
            "{take.text}"
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm" aria-label={`spice level ${take.spice} of 3`}>
          {'🌶️'.repeat(take.spice)}
          <span className="opacity-20">{'🌶️'.repeat(3 - take.spice)}</span>
        </span>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setI((i + 1) % takes.length)}
          className="rounded-full border border-line bg-ink-3 px-4 py-2 text-sm transition-colors hover:bg-white/10"
        >
          next take →
        </motion.button>
      </div>
    </ProfileCard>
  )
}

// sits at the bottom of the quick facts card
function SocialBattery() {
  const { level, note } = about.socialBattery
  return (
    <div className="mt-auto pt-6">
      <div className="border-t border-line pt-5">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-fog">🔋 social battery</p>
        <div className="flex items-center gap-4">
          <div className="relative h-8 flex-1 rounded-lg border-2 border-paper/60 p-1">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease, delay: 0.3 }}
              className={`h-full rounded-[4px] ${level >= 50 ? 'bg-lime' : 'bg-pink'}`}
            />
            <span className="absolute -right-[7px] top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-r bg-paper/60" />
          </div>
          <span className="font-display text-2xl font-bold tabular-nums">{level}%</span>
        </div>
        <p className="mt-2 text-sm text-fog">{note}</p>
      </div>
    </div>
  )
}
