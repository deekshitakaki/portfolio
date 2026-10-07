import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { rarities } from '../../data/skills'

/** a single inventory slot. forwardRef so AnimatePresence popLayout can measure it */
const SkillCard = forwardRef(function SkillCard({ skill, selected, onSelect }, ref) {
  const rarity = rarities[skill.rarity]

  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
    >
      <button
        onPointerEnter={(e) => e.pointerType === 'mouse' && onSelect(skill)}
        onFocus={() => onSelect(skill)}
        onClick={() => onSelect(skill)}
        aria-pressed={selected}
        style={{ '--r': rarity.color }}
        className={`group relative flex aspect-square w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl border bg-ink-2 p-2 transition-[translate,background-color,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-(--r)/70 hover:bg-(--r)/10 ${
          selected ? 'border-(--r) bg-(--r)/10 ring-3 ring-(--r)/25' : 'border-(--r)/20'
        }`}
      >
        <span className="text-3xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:text-4xl">
          {skill.icon}
        </span>
        <span className="line-clamp-2 text-center text-[11px] leading-tight text-paper/85 sm:text-xs">{skill.name}</span>
        <span className="absolute inset-x-4 bottom-0 h-[3px] rounded-t-full bg-(--r)" />
      </button>
    </motion.li>
  )
})

export default SkillCard
