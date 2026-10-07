import { motion } from 'framer-motion'
import { accent } from '../../lib/utils'

/** a tilted little label you can drag around the page */
export default function Sticker({ children, color = 'lime', rotate = -5, className = '' }) {
  return (
    <motion.span
      drag
      dragMomentum={false}
      dragElastic={0.15}
      initial={{ scale: 0, rotate }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.08, rotate: rotate + 6 }}
      whileDrag={{ scale: 1.15, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 420, damping: 16 }}
      title="psst… you can drag me"
      className={`inline-flex shrink-0 cursor-grab touch-none select-none items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold text-ink shadow-[0_5px_0_rgb(0_0_0/0.4)] active:cursor-grabbing ${className}`}
      style={{ background: accent(color) }}
    >
      {children}
    </motion.span>
  )
}
