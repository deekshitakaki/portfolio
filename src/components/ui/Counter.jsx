import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { formatNumber } from '../../lib/utils'

/** counts up from 0 the first time it scrolls into view */
export default function Counter({ value, suffix = '', duration = 1.8, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) return setN(value)
    const controls = animate(0, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setN })
    return () => controls.stop()
  }, [inView, value, duration, reduce])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {formatNumber(n)}
      {suffix}
    </span>
  )
}
