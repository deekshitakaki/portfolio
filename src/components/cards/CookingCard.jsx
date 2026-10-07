import { motion } from 'framer-motion'
import { cookingStatuses } from '../../data/cooking'
import TiltCard from '../ui/TiltCard'
import { timeAgo } from '../../lib/utils'

const BLOCKS = 12

const doneness = (p) => (p >= 90 ? "chef's kiss soon" : p >= 60 ? 'medium-well' : p >= 30 ? 'medium-rare' : 'still raw')

/** a work-in-progress card with a pixel-block "doneness" meter */
export default function CookingCard({ item }) {
  const status = cookingStatuses[item.status]
  const filled = Math.round((item.progress / 100) * BLOCKS)

  return (
    <TiltCard max={4} className="flex h-full flex-col rounded-3xl border border-line bg-ink-2 p-5" style={{ '--s': status.color }}>
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-(--s)/15 px-2.5 py-1 text-xs font-medium text-(--s)">
          {status.live && (
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-(--s) opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-(--s)" />
            </span>
          )}
          {status.emoji} {status.label}
        </span>
        <span className="font-mono text-[10px] text-mute">upd. {timeAgo(item.updated)}</span>
      </div>

      <div className="mt-4 flex flex-1 items-start gap-3">
        <span className="text-3xl transition-transform duration-300 group-hover/tilt:-rotate-12 group-hover/tilt:scale-110">{item.emoji}</span>
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight">{item.title}</h3>
          <p className="mt-1 text-sm leading-snug text-fog">{item.note}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex justify-between font-mono text-[11px]">
          <span className="text-fog">doneness</span>
          <span>
            {item.progress}% <span className="text-mute">· {doneness(item.progress)}</span>
          </span>
        </div>
        <div className="mt-2 flex gap-1" role="progressbar" aria-valuenow={item.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${item.title} progress`}>
          {Array.from({ length: BLOCKS }, (_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: i < filled ? 0.15 : 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className={`h-2.5 flex-1 rounded-[3px] ${i < filled ? 'bg-(--s)' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.tags.map((t) => (
          <span key={t} className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-fog">
            {t}
          </span>
        ))}
      </div>
    </TiltCard>
  )
}
