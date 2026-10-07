import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { footer } from '../../data/site'
import { profile, socials } from '../../data/profile'
import SocialIcon from '../ui/SocialIcon'
import Reveal from '../ui/Reveal'

// a retro "you are visitor #…" number, stable per browser. completely made up.
function useVisitorNumber() {
  const [n] = useState(() => {
    try {
      const saved = localStorage.getItem('visitor-no')
      if (saved) return Number(saved)
      const fresh = 1000 + Math.floor(Math.random() * 9000)
      localStorage.setItem('visitor-no', String(fresh))
      return fresh
    } catch {
      return 4207
    }
  })
  return String(n).padStart(6, '0')
}

export default function Footer() {
  const visitor = useVisitorNumber()

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-20 sm:px-6">
        <Reveal>
          <p className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            thanks for <span className="font-serif font-normal italic tracking-normal text-lime">scrolling</span>{' '}
            <span className="inline-block animate-float">✦</span>
          </p>
          <p className="mt-4 max-w-md text-fog">you made it all the way to the end. that basically makes us mutuals now. 🫶</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Reveal className="rounded-3xl border border-line bg-ink-2 p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-fog">you are visitor no.</p>
            <p className="mt-2 flex gap-1 font-mono text-2xl font-medium">
              {visitor.split('').map((d, i) => (
                <span key={i} className="rounded-md border border-line bg-ink px-1.5 py-0.5 text-lime">
                  {d}
                </span>
              ))}
            </p>
            <p className="mt-2 text-xs text-mute">(this number is made up, like most metrics)</p>
          </Reveal>

          <Reveal delay={0.05}>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="group flex size-full min-h-32 flex-col justify-between rounded-3xl bg-lime p-5 text-left text-ink"
            >
              <span className="font-mono text-[11px] uppercase tracking-wider opacity-70">teleport</span>
              <span className="flex items-end justify-between font-display text-2xl font-semibold">
                back to the top
                <ArrowUp className="transition-transform duration-300 group-hover:-translate-y-1" />
              </span>
            </motion.button>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-6 border-t border-line pt-6 text-xs text-mute sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name} · made with {footer.madeWith}
          </p>
          <div className="flex gap-1">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-full text-fog transition-colors hover:bg-white/5 hover:text-paper"
              >
                <SocialIcon id={s.id} size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
