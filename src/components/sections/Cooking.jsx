import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cooking, learningQueue, recentlyServed } from '../../data/cooking'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import CookingCard from '../cards/CookingCard'
import { accents, timeAgo } from '../../lib/utils'

const hasSidebar = learningQueue.length > 0 || recentlyServed.length > 0

export default function Cooking() {
  return (
    <Section
      id="cooking"
      kicker="work in progress"
      title="currently"
      accent="cooking"
      sticker="🔥 live"
      color={accents.lime}
      blurb="what's on the stove right now. spoiler: it's mostly AI."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className={`grid gap-4 sm:grid-cols-2 ${hasSidebar ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          {cooking.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.06}>
              <CookingCard item={item} />
            </Reveal>
          ))}
        </div>

        {hasSidebar && (
          <div className="grid content-start gap-4">
            {learningQueue.length > 0 && <LearningQueue />}
            {recentlyServed.length > 0 && (
              <Reveal delay={0.1} className="rounded-3xl border border-line bg-ink-2 p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-fog">🍽️ recently served</p>
                <ul className="mt-4 space-y-3">
                  {recentlyServed.map((r) => (
                    <li key={r.title} className="flex gap-3 text-sm">
                      <span>{r.emoji}</span>
                      <span className="flex-1 leading-snug">
                        {r.title}
                        <span className="block font-mono text-[11px] text-mute">{timeAgo(r.date)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        )}
      </div>
    </Section>
  )
}

function LearningQueue() {
  const [items, setItems] = useState(learningQueue)
  const done = items.filter((i) => i.done).length
  const toggle = (idx) => setItems((list) => list.map((it, i) => (i === idx ? { ...it, done: !it.done } : it)))

  return (
    <Reveal className="rounded-3xl border border-line bg-ink-2 p-5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-wider text-fog">📚 learning queue</p>
        <span className="rounded-full bg-lime/15 px-2 py-0.5 font-mono text-[11px] text-lime">
          {done}/{items.length} done
        </span>
      </div>
      <ul className="mt-4 space-y-1">
        {items.map((it, i) => (
          <li key={it.item}>
            <button
              onClick={() => toggle(i)}
              aria-pressed={it.done}
              className="group flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left text-sm transition-colors hover:bg-white/5"
            >
              <motion.span
                animate={it.done ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`grid size-5 shrink-0 place-items-center rounded-md border transition-colors ${
                  it.done ? 'border-lime bg-lime text-ink' : 'border-line group-hover:border-white/30'
                }`}
              >
                {it.done && <Check size={13} strokeWidth={3} />}
              </motion.span>
              <span className={`transition-colors ${it.done ? 'text-mute line-through' : ''}`}>{it.item}</span>
            </button>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
