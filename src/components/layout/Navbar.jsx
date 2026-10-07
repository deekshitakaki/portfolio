import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { profile, socials } from '../../data/profile'
import { visibleNav as nav } from '../../lib/sections'
import { useActiveSection } from '../../hooks/useActiveSection'
import SocialIcon from '../ui/SocialIcon'
import { ease } from '../../lib/utils'

const sectionIds = ['top', ...nav.map((n) => n.id)]

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
      >
        <nav
          aria-label="main"
          className={`flex w-full max-w-6xl items-center justify-between gap-2 rounded-full border py-1.5 pl-4 pr-1.5 transition-[background-color,border-color,backdrop-filter] duration-300 ${
            scrolled ? 'border-line bg-ink/75 backdrop-blur-xl' : 'border-transparent'
          }`}
        >
          <a href="#top" className="group flex items-center gap-1.5 font-display text-lg font-bold tracking-tight">
            <span className="inline-block transition-transform duration-300 group-hover:rotate-[20deg]">🌱</span>
            {profile.handle}<span className="text-lime">.</span>
          </a>

          <ul className="hidden items-center lg:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative block rounded-full px-3 py-1.5 text-sm transition-colors ${
                    active === item.id ? 'text-paper' : 'text-fog hover:text-paper'
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="hidden h-10 items-center gap-1.5 rounded-full bg-lime px-4 text-sm font-semibold text-ink sm:inline-flex"
            >
              say hi <span className="inline-block origin-[70%_70%] animate-wave">👋</span>
            </motion.a>
            <button
              onClick={() => setOpen(true)}
              aria-label="open menu"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full border border-line bg-ink-2/80 text-paper transition-colors hover:bg-ink-3 lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && <MobileMenu active={active} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function MobileMenu({ active, onClose }) {
  const go = (id) => (e) => {
    e.preventDefault()
    onClose()
    // wait a tick so the scroll lock is released first
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[75] flex flex-col bg-ink/95 px-5 pb-8 pt-5 backdrop-blur-xl lg:hidden"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">✦ where to?</span>
        <button
          autoFocus
          onClick={onClose}
          aria-label="close menu"
          className="grid size-10 place-items-center rounded-full border border-line bg-ink-2"
        >
          <X size={18} />
        </button>
      </div>

      <motion.ul
        className="mt-8 flex-1 space-y-1 overflow-y-auto"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
      >
        {nav.map((item, i) => (
          <motion.li
            key={item.id}
            variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { ease, duration: 0.4 } } }}
          >
            <a
              href={`#${item.id}`}
              onClick={go(item.id)}
              className="group flex items-baseline gap-4 py-1.5 font-display text-4xl font-bold tracking-tight"
            >
              <span className="w-7 font-mono text-xs font-normal text-mute">{String(i + 1).padStart(2, '0')}</span>
              <span className={active === item.id ? 'text-lime' : 'text-paper transition-colors group-active:text-lime'}>
                {item.label}
              </span>
              <ArrowUpRight size={22} className="text-mute opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-6 flex gap-2">
        {socials.map((s) => (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="grid size-11 place-items-center rounded-full border border-line bg-ink-2 text-fog"
          >
            <SocialIcon id={s.id} />
          </a>
        ))}
      </div>
    </motion.div>
  )
}
