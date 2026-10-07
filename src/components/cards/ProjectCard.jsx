import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Heart, MessageCircle, MoreHorizontal, TrendingUp } from 'lucide-react'
import { profile } from '../../data/profile'
import TiltCard from '../ui/TiltCard'
import Avatar from '../ui/Avatar'
import Burst from '../ui/Burst'
import SocialIcon from '../ui/SocialIcon'
import { accent, ease, shortAgo } from '../../lib/utils'

const hashtag = (s) => '#' + s.toLowerCase().replace(/[^a-z0-9]/g, '')

/** a project, dressed up as a social media post */
export default function ProjectCard({ project: p }) {
  const c = accent(p.color)
  const [liked, setLiked] = useState(false)
  const [burst, setBurst] = useState(0)
  const [bigHeart, setBigHeart] = useState(0)
  const [open, setOpen] = useState(false)

  const like = () => {
    if (!liked) setBurst((b) => b + 1)
    setLiked(!liked)
  }
  const doubleTapLike = () => {
    setBigHeart((n) => n + 1)
    if (!liked) {
      setLiked(true)
      setBurst((b) => b + 1)
    }
  }

  return (
    <TiltCard max={4} className="flex flex-col rounded-[1.75rem] border border-line bg-ink-2" style={{ '--c': c }}>
      {/* post header */}
      <header className="flex items-center gap-3 p-4">
        <Avatar className="size-9" textClassName="text-sm" />
        <div className="min-w-0 flex-1 text-sm leading-tight">
          <p className="truncate">
            <span className="font-semibold">{profile.handle}</span>
            {p.date && <span className="text-fog"> · {shortAgo(p.date)}</span>}
          </p>
          <p className="truncate text-xs text-fog">{p.type}</p>
        </div>
        {p.pinned ? (
          <span className="rounded-full bg-(--c)/15 px-2 py-0.5 font-mono text-[10px] text-(--c)">📌 pinned</span>
        ) : (
          <MoreHorizontal size={18} className="text-mute" />
        )}
      </header>

      {/* media */}
      <div
        onDoubleClick={doubleTapLike}
        className="relative mx-4 aspect-[16/10] select-none overflow-hidden rounded-2xl"
        style={{ background: `radial-gradient(130% 110% at 0% 0%, ${c}, ${c}55 45%, #1b1a22 100%)` }}
      >
        {p.image ? (
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover/tilt:scale-105"
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#0c0b10_1px,transparent_1px)] [background-size:12px_12px]" />
            <span className="absolute inset-0 grid place-items-center text-7xl drop-shadow-[0_12px_24px_rgb(0_0_0/0.35)] transition-transform duration-500 group-hover/tilt:-rotate-6 group-hover/tilt:scale-110">
              {p.emoji}
            </span>
          </>
        )}

        {p.metric && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-xs text-paper backdrop-blur">
            <TrendingUp size={13} className="text-(--c)" />
            <b className="font-semibold">{p.metric.value}</b> <span className="text-fog">{p.metric.label}</span>
          </span>
        )}

        {/* double-tap heart */}
        <AnimatePresence>
          {bigHeart > 0 && (
            <motion.span
              key={bigHeart}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.9, times: [0, 0.3, 0.6, 1] }}
              onAnimationComplete={() => setBigHeart(0)}
              className="pointer-events-none absolute inset-0 grid place-items-center"
            >
              <Heart size={88} className="fill-pink text-pink drop-shadow-[0_8px_24px_rgb(0_0_0/0.4)]" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* actions */}
      <div className="flex items-center gap-1 px-3 pt-2">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={like}
          aria-pressed={liked}
          aria-label="like"
          className="relative grid size-10 place-items-center rounded-full transition-colors hover:bg-white/5"
        >
          <motion.span key={String(liked)} initial={{ scale: liked ? 0.5 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 12 }}>
            <Heart size={22} className={liked ? 'fill-pink text-pink' : 'text-paper'} />
          </motion.span>
          <Burst trigger={burst} emojis={['💖', '✨', '💗']} count={8} distance={34} size="text-xs" />
        </motion.button>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="toggle details"
          className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/5"
        >
          <MessageCircle size={22} />
        </button>
        <span className="ml-1 text-sm text-fog">{liked ? 'you liked this ✨' : 'double-tap to like'}</span>
      </div>

      {/* caption */}
      <div className="flex flex-1 flex-col px-4 pb-4">
        <p className="mt-1 text-[15px] leading-snug">
          <span className="font-display text-lg font-semibold">{p.name}</span> <span className="text-paper/80">{p.tagline}</span>
        </p>
        <p className="mt-2 flex flex-wrap gap-x-2 gap-y-0.5 text-sm text-sky">
          {p.stack.map((s) => (
            <span key={s}>{hashtag(s)}</span>
          ))}
        </p>

        <button onClick={() => setOpen(!open)} className="mt-2 w-fit text-sm text-fog transition-colors hover:text-paper">
          {open ? 'show less' : '… more'}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="overflow-hidden"
            >
              <div className="mt-3 rounded-2xl bg-ink p-4 text-sm">
                <p className="font-mono text-[10px] uppercase tracking-wider text-(--c)">behind the scenes</p>
                <ul className="mt-2 space-y-2">
                  {p.details.map((d) => (
                    <li key={d} className="flex gap-2 leading-relaxed text-paper/85">
                      <span className="text-(--c)">→</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!(p.links?.github || p.links?.demo) && (
          <div className="mt-auto pt-4">
            <a
              href="#contact"
              className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-dashed border-line text-sm text-fog transition-colors hover:border-white/20 hover:text-paper"
            >
              code isn't public — ask me about it 💬
            </a>
          </div>
        )}
        {(p.links?.github || p.links?.demo) && (
          <div className="mt-auto flex gap-2 pt-4">
            {p.links.github && (
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={p.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-ink-3 text-sm font-medium transition-colors hover:border-white/20"
              >
                <SocialIcon id="github" size={16} /> code
              </motion.a>
            )}
            {p.links.demo && (
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={p.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-(--c) text-sm font-semibold text-ink"
              >
                live demo <ArrowUpRight size={16} />
              </motion.a>
            )}
          </div>
        )}
      </div>
    </TiltCard>
  )
}
