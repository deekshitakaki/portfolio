import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { nextSeason, timeline } from '../../data/timeline'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import TimelineCard from '../cards/TimelineCard'
import { accents } from '../../lib/utils'

export default function Timeline({ onOpenStory }) {
  const track = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  // track whether there's anything to scroll to on either side
  const measure = () => {
    const el = track.current
    if (!el) return
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
  }

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const nudge = (dir) => {
    const el = track.current
    const card = el?.querySelector('li')
    el?.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 20), behavior: 'smooth' })
  }

  return (
    <Section
      id="timeline"
      kicker="experience, as a tv show"
      title="character"
      accent="development"
      sticker="🎬 now streaming"
      color={accents.sky}
      blurb="every main character needs a backstory. here's mine, newest season first — swipe through, or hit 'watch story' to binge it."
    >
      <Reveal className="mb-6 flex items-center justify-between gap-4">
        <p className="inline-flex min-w-0 items-center gap-2 rounded-full border border-dashed border-line px-3 py-1.5 text-xs text-fog">
          <span className="shrink-0 font-mono text-mute">
            {nextSeason.season} · {nextSeason.title}
          </span>
          <span className="truncate">{nextSeason.note}</span>
        </p>
        {!(edges.start && edges.end) && (
          <div className="hidden shrink-0 gap-2 sm:flex">
            {[
              [-1, edges.start, ChevronLeft, 'previous season'],
              [1, edges.end, ChevronRight, 'next season'],
            ].map(([dir, disabled, Icon, label]) => (
              <motion.button
                key={label}
                whileTap={{ scale: 0.9 }}
                onClick={() => nudge(dir)}
                disabled={disabled}
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-line bg-ink-2 transition-colors hover:bg-ink-3 disabled:opacity-30"
              >
                <Icon size={18} />
              </motion.button>
            ))}
          </div>
        )}
      </Reveal>

      {/* now → then, sideways */}
      <ol
        ref={track}
        onScroll={measure}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-pl-6 sm:px-6"
      >
        {timeline.map((item, i) => (
          <TimelineCard key={item.id} item={item} index={i} onOpen={() => onOpenStory(i)} />
        ))}
      </ol>

      <p className="mt-3 text-center font-mono text-[11px] text-mute sm:hidden">← now · swipe · then →</p>
    </Section>
  )
}
