import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * a card that leans toward the cursor and carries a soft spotlight.
 * mouse only — touch devices just get the plain card.
 */
export default function TiltCard({ children, max = 6, className = '', style, ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const rotateX = useSpring(rx, { stiffness: 260, damping: 24 })
  const rotateY = useSpring(ry, { stiffness: 260, damping: 24 })
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgb(255 255 255 / 0.07), transparent 45%)`

  function onPointerMove(e) {
    if (e.pointerType !== 'mouse' || reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * max * 2)
    rx.set(-(py - 0.5) * max * 2)
    mx.set(px * 100)
    my.set(py * 100)
  }

  function onPointerLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, ...style }}
      className={`group/tilt relative ${className}`}
      {...rest}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{ background: spotlight }}
      />
    </motion.div>
  )
}
