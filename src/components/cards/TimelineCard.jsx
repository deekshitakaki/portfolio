import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { accent, ease } from '../../lib/utils'

/** one "season" on the horizontal timeline: a dot on the line, then the card */
export default function TimelineCard({ item, index, onOpen }) {
  const c = accent(item.color)

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      className="group/season flex w-[86%] shrink-0 snap-start flex-col sm:w-[58%] md:w-[44%] lg:w-[calc((100%-2.5rem)/3)]"
      style={{ '--c': c }}
    >
      {/* dot + the line running on to the next season */}
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-ink-2 text-lg">{item.emoji}</span>
        <span className="shrink-0 font-display text-sm font-semibold text-paper/50">{item.period}</span>
        {item.current && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-(--c)/15 px-2 py-0.5 font-mono text-[10px] text-(--c)">
            <span className="size-1.5 animate-pulse rounded-full bg-(--c)" /> airing
          </span>
        )}
        <span aria-hidden className="-mr-5 h-px flex-1 bg-linear-to-r from-(--c)/60 to-line group-last/season:mr-0 group-last/season:to-transparent" />
      </div>

      <article className="flex flex-1 flex-col rounded-3xl border border-line bg-ink-2 p-5 transition-colors hover:border-(--c)/40 sm:p-6">
        <span className="w-fit rounded-full bg-(--c)/15 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-(--c)">
          {item.season}
        </span>

        <p className="mt-3 font-serif text-3xl italic leading-none text-(--c)">{item.era}</p>
        <h3 className="mt-3 font-display text-xl font-semibold leading-tight">{item.title}</h3>
        <p className="text-sm text-paper/80">{item.org}</p>
        {item.meta && <p className="text-xs text-fog">{item.meta}</p>}

        <p className="mt-3 text-[15px] leading-relaxed text-paper/80">{item.description}</p>

        {item.points?.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-sm text-paper/80">
            {item.points.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-(--c)">→</span>
                {p}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-fog">
              {t}
            </span>
          ))}
        </div>

        {/* pinned to the bottom so every card's footer lines up */}
        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <p className="text-sm">
              🏆 <span className="text-fog">unlocked:</span> {item.unlocked}
            </p>
            <button
              onClick={onOpen}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-(--c) hover:text-ink"
            >
              <Play size={12} fill="currentColor" /> watch story
            </button>
          </div>
        </div>
      </article>
    </motion.li>
  )
}
