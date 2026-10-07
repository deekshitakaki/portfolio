import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Pause, X } from 'lucide-react'
import { timeline } from '../../data/timeline'
import { profile } from '../../data/profile'
import Modal from '../ui/Modal'
import Avatar from '../ui/Avatar'
import { accent } from '../../lib/utils'

const DURATION = 6000 // ms per story

/** instagram-style story viewer over the timeline entries. `index` null = closed */
export default function StoryViewer({ index, onClose }) {
  const open = index !== null
  return (
    <Modal open={open} onClose={onClose} label="character development stories">
      {open && <Stories start={index} onClose={onClose} />}
    </Modal>
  )
}

function Stories({ start, onClose }) {
  const [i, setI] = useState(start)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const pressedAt = useRef(0)
  const item = timeline[i]
  const c = accent(item.color)

  const go = (dir) => {
    const next = i + dir
    if (next >= timeline.length) return onClose()
    setI(Math.max(0, next))
    setProgress(0)
  }

  // tick the progress bar
  useEffect(() => {
    if (paused) return
    let raf
    let last = performance.now()
    const tick = (now) => {
      const dt = now - last
      last = now
      setProgress((p) => Math.min(1, p + dt / DURATION))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [paused, i])

  useEffect(() => {
    if (progress >= 1) go(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === ' ') {
        e.preventDefault()
        setPaused((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // a long press pauses; a quick tap navigates
  const tap = (dir) => {
    if (Date.now() - pressedAt.current > 250) return
    go(dir)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      onPointerDown={() => {
        pressedAt.current = Date.now()
        setPaused(true)
      }}
      onPointerUp={() => setPaused(false)}
      onPointerLeave={() => setPaused(false)}
      className="relative z-10 flex h-[min(86dvh,740px)] w-full max-w-[400px] select-none flex-col overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
      style={{ background: `linear-gradient(165deg, ${c}59 0%, #15141b 48%, #0c0b10 100%)` }}
    >
      {/* progress bars */}
      <div className="flex gap-1 px-3 pt-3">
        {timeline.map((t, j) => (
          <div key={t.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
            <div className="h-full bg-paper" style={{ width: `${(j < i ? 1 : j === i ? progress : 0) * 100}%` }} />
          </div>
        ))}
      </div>

      {/* header */}
      <div className="relative z-20 flex items-center gap-2.5 px-4 pt-3">
        <Avatar className="size-8" textClassName="text-sm" />
        <p className="text-sm font-semibold">{profile.handle}</p>
        <p className="text-xs text-paper/60">{item.season}</p>
        {paused && <Pause size={14} className="text-paper/70" aria-label="paused" />}
        <button
          autoFocus
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="close stories"
          className="ml-auto grid size-9 place-items-center rounded-full transition-colors hover:bg-white/10"
        >
          <X size={20} />
        </button>
      </div>

      {/* slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="flex flex-1 flex-col justify-end gap-3 p-6 pb-8"
        >
          <motion.span
            initial={{ scale: 0.4, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.05 }}
            className="mb-auto mt-4 self-center text-[5rem] drop-shadow-[0_16px_30px_rgb(0_0_0/0.4)] sm:mt-8 sm:text-[7rem]"
          >
            {item.emoji}
          </motion.span>
          <span className="w-fit rounded-full bg-black/30 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider">
            {item.season} · {item.period}
          </span>
          <p className="font-serif text-4xl italic leading-none" style={{ color: c }}>
            {item.era}
          </p>
          <div>
            <h3 className="font-display text-2xl font-bold leading-tight">{item.title}</h3>
            <p className="text-sm text-paper/60">{item.org}</p>
          </div>
          <p className="text-[15px] leading-relaxed text-paper/85">{item.description}</p>
          <p className="rounded-xl bg-black/30 px-3 py-2 text-sm">🏆 {item.unlocked}</p>
        </motion.div>
      </AnimatePresence>

      {/* tap zones */}
      <button aria-label="previous story" onClick={() => tap(-1)} className="absolute bottom-0 left-0 top-16 w-1/3 cursor-w-resize" />
      <button aria-label="next story" onClick={() => tap(1)} className="absolute bottom-0 right-0 top-16 w-2/3 cursor-e-resize" />

      <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center font-mono text-[10px] text-paper/40">
        tap to skip · hold to pause
      </p>
    </motion.div>
  )
}
