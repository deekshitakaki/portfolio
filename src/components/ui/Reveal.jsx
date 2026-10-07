import { motion } from 'framer-motion'
import { ease } from '../../lib/utils'

/** fades + slides its children in the first time they scroll into view */
export default function Reveal({ children, delay = 0, y = 24, as = 'div', className = '', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px' }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}
