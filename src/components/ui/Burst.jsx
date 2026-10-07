import { useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * emoji particles that explode out from the center of the parent
 * (parent needs `position: relative`). bump `trigger` to fire again.
 */
export default function Burst({ trigger, emojis = ['✨', '💖', '⭐', '🫶'], count = 10, distance = 48, size = 'text-sm' }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6
        const d = distance * (0.7 + Math.random() * 0.6)
        return {
          x: Math.cos(angle) * d,
          y: Math.sin(angle) * d,
          rotate: Math.random() * 120 - 60,
          emoji: emojis[i % emojis.length],
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trigger, count, distance],
  )

  if (!trigger) return null

  return (
    <span key={trigger} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-10">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${size}`}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 1.15, rotate: p.rotate }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </span>
  )
}
