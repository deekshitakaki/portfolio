import { profile } from '../../data/profile'

/**
 * profile picture (or a gradient initial when no photo is set).
 * `story` adds the spinning instagram-style ring.
 */
export default function Avatar({ className = 'size-10', textClassName = 'text-base', story = false, onClick, badge }) {
  const inner = profile.avatar ? (
    <img src={profile.avatar} alt={profile.name} className="size-full rounded-full object-cover" />
  ) : (
    <span
      className={`grid size-full place-items-center rounded-full bg-linear-to-br from-lilac via-pink to-peach font-display font-bold text-ink ${textClassName}`}
    >
      {profile.avatarFallback}
    </span>
  )

  const Tag = onClick ? 'button' : 'span'

  return (
    <Tag
      onClick={onClick}
      aria-label={onClick ? 'open story' : undefined}
      className={`relative grid shrink-0 place-items-center rounded-full ${onClick ? 'cursor-pointer transition-transform hover:scale-[1.03] active:scale-95' : ''} ${className}`}
    >
      {story && (
        <span
          aria-hidden
          className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#d4f57a,#8fd3ff,#b9a6ff,#ff9ec7,#ffb38a,#d4f57a)]"
        />
      )}
      <span className={`relative rounded-full ${story ? 'size-[calc(100%-6px)] bg-ink-2 p-[3px]' : 'size-full'}`}>{inner}</span>
      {badge && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border-2 border-ink-2 bg-lime px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-ink">
          {badge}
        </span>
      )}
    </Tag>
  )
}
