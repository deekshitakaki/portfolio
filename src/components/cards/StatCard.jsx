import { motion } from 'framer-motion'
import Counter from '../ui/Counter'
import { accent } from '../../lib/utils'

/** a wrapped-style pastel tile with a big animated number */
export default function StatCard({ stat }) {
  return (
    <motion.div
      whileHover={{ rotate: -1.5, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="flex h-full min-h-48 flex-col justify-between rounded-[2rem] p-6 text-ink"
      style={{ background: accent(stat.color) }}
    >
      <p className="font-mono text-[11px] uppercase tracking-wider opacity-70">{stat.label}</p>
      <div>
        <p className="font-display text-6xl font-extrabold leading-none tracking-tighter">
          <Counter value={stat.value} suffix={stat.suffix} />
        </p>
        <p className="mt-3 text-sm leading-snug opacity-75">{stat.sub}</p>
      </div>
    </motion.div>
  )
}
