import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { rarities, skillCategories, skills } from '../../data/skills'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import SkillCard from '../cards/SkillCard'
import { accents } from '../../lib/utils'

export default function Skills() {
  const [category, setCategory] = useState('all')
  const [selected, setSelected] = useState(skills[0])
  const items = category === 'all' ? skills : skills.filter((s) => s.category === category)

  return (
    <Section
      id="skills"
      kicker="skills, rpg edition"
      title="the"
      accent="inventory"
      sticker={`🎒 ${skills.length} items`}
      color={accents.butter}
      blurb="every skill i've picked up on my side quests. hover or tap an item to inspect it. rarity is entirely self-assessed and therefore extremely accurate."
    >
      <Reveal className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* category tabs */}
        <div role="tablist" aria-label="skill categories" className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={category === cat.id}
              onClick={() => setCategory(cat.id)}
              className={`relative shrink-0 rounded-full px-3.5 py-2 text-sm transition-colors ${
                category === cat.id ? 'text-ink' : 'text-fog hover:text-paper'
              }`}
            >
              {category === cat.id && (
                <motion.span
                  layoutId="skill-tab"
                  className="absolute inset-0 rounded-full bg-butter"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative">
                {cat.emoji} {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* rarity legend */}
        <div className="flex flex-wrap gap-3 font-mono text-[11px] text-fog">
          {Object.values(rarities).map((r) => (
            <span key={r.label} className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ background: r.color }} />
              {r.label}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
        <InspectPanel skill={selected} />

        <motion.ul layout className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5 lg:order-first">
          <AnimatePresence mode="popLayout">
            {items.map((skill) => (
              <SkillCard key={skill.name} skill={skill} selected={selected?.name === skill.name} onSelect={setSelected} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </Section>
  )
}

function InspectPanel({ skill }) {
  const rarity = rarities[skill.rarity]
  const category = skillCategories.find((c) => c.id === skill.category)

  return (
    <div className="sticky top-20 z-10 self-start rounded-3xl border border-line bg-ink-2/95 p-4 backdrop-blur-xl sm:p-5" style={{ '--r': rarity.color }}>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-fog">🔍 inspecting</p>
      <AnimatePresence mode="wait">
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
        >
          <div className="flex items-center gap-4 lg:flex-col lg:items-start">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-(--r)/40 bg-(--r)/10 text-3xl lg:size-20 lg:text-5xl">
              {skill.icon}
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-bold leading-tight lg:text-2xl">{skill.name}</h3>
              <p className="mt-0.5 text-sm">
                <span className="font-semibold text-(--r)">{rarity.label}</span>
                <span className="text-fog"> · {category?.label}</span>
              </p>
            </div>
          </div>

          <p className="mt-4 font-serif text-lg italic leading-snug">"{skill.note}"</p>

          {skill.seenIn?.length > 0 && (
            <div className="mt-4 border-t border-line pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-mute">seen in</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {skill.seenIn.map((s) => (
                  <span key={s} className="rounded-full border border-(--r)/30 bg-(--r)/10 px-2.5 py-0.5 text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
