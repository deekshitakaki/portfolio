import { motion } from 'framer-motion'
import Sticker from './Sticker'
import { ease } from '../../lib/utils'
import { sectionNumber } from '../../lib/sections'

/**
 * shared section shell: auto-numbered kicker, big title with an italic serif
 * accent word, optional blurb + draggable sticker. sets --accent for children.
 */
export default function Section({
  id,
  kicker,
  title,
  accent,
  blurb,
  sticker,
  color = '#d4f57a',
  className = '',
  children,
}) {
  return (
    <section id={id} className={`relative py-16 md:py-24 ${className}`} style={{ '--accent': color }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 md:mb-14"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="flex min-w-0 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-fog sm:tracking-[0.18em]">
              <span className="text-(--accent)">{sectionNumber(id)}</span>
              <span className="h-px w-6 shrink-0 bg-line sm:w-10" />
              <span className="truncate">{kicker}</span>
            </p>
            {sticker && <Sticker color={color}>{sticker}</Sticker>}
          </div>
          <h2 className="font-display text-[2.6rem] font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            {title}{' '}
            {accent && <span className="font-serif font-normal italic tracking-normal text-(--accent)">{accent}</span>}
          </h2>
          {blurb && <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fog sm:text-base">{blurb}</p>}
        </motion.header>
        {children}
      </div>
    </section>
  )
}
