import Reveal from '../ui/Reveal'

/** the basic rounded card used for "profile-style" info blocks */
export default function ProfileCard({ label, children, className = '', delay = 0, ...rest }) {
  return (
    <Reveal
      delay={delay}
      className={`rounded-[1.75rem] border border-line bg-ink-2 p-5 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-white/15 sm:p-6 ${className}`}
      {...rest}
    >
      {label && <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-fog">{label}</p>}
      {children}
    </Reveal>
  )
}
