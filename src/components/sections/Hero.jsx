import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, Dices, MapPin, MessageCircle, UserPlus } from 'lucide-react'
import { profile, socials } from '../../data/profile'
import Avatar from '../ui/Avatar'
import SocialIcon from '../ui/SocialIcon'
import Burst from '../ui/Burst'
import { ease } from '../../lib/utils'
import { isVisible } from '../../lib/sections'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }

export default function Hero({ onOpenStory }) {
  return (
    <section id="top" className="relative isolate pb-6 pt-24 sm:pt-32">
      {/* soft background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-10 size-[480px] rounded-full bg-[radial-gradient(circle,rgb(185_166_255/0.18),transparent_65%)]" />
        <div className="absolute -right-32 top-40 size-[420px] rounded-full bg-[radial-gradient(circle,rgb(255_158_199/0.12),transparent_65%)]" />
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.p variants={item} className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
          <span className="text-lime">✦</span> welcome to my little corner of the internet
        </motion.p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.45fr_1fr] lg:gap-5">
          <motion.div variants={item}>
            <ProfileHeader onOpenStory={onOpenStory} />
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[auto_auto_auto_1fr] lg:gap-5">
            <motion.div variants={item} className="sm:col-span-2 lg:col-span-1">
              <NowPlaying />
            </motion.div>
            <motion.div variants={item}>
              <Currently />
            </motion.div>
            <motion.div variants={item}>
              <LocalTime />
            </motion.div>
            <motion.div variants={item} className="sm:col-span-2 lg:col-span-1">
              <FunFact />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ───────────────── profile header (the "instagram" bit) ───────────────── */

function ProfileHeader({ onOpenStory }) {
  const [following, setFollowing] = useState(false)
  const [burst, setBurst] = useState(0)

  const toggleFollow = () => {
    if (!following) setBurst((b) => b + 1)
    setFollowing(!following)
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-line bg-ink-2">
      {/* banner */}
      <div className="relative h-28 overflow-hidden bg-linear-120 from-lilac via-pink to-peach sm:h-36">
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(#0c0b10_1px,transparent_1px)] [background-size:14px_14px]" />
        <span className="absolute left-[12%] top-5 animate-float text-2xl">☁️</span>
        <span className="absolute left-[42%] top-10 animate-float text-xl [animation-delay:-1.5s]">✦</span>
        <span className="absolute left-[62%] top-4 animate-float text-2xl [animation-delay:-3s]">💿</span>
        <span className="absolute bottom-3 left-[80%] animate-float text-xl [animation-delay:-2s]">🌱</span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[11px] text-paper backdrop-blur">
          <MapPin size={12} /> {profile.location}
        </span>
      </div>

      <div className="px-5 pb-6 sm:px-7">
        {/* avatar + actions */}
        <div className="-mt-11 flex items-end justify-between gap-3 sm:-mt-14">
          <Avatar
            story
            badge="story"
            onClick={() => onOpenStory(0)}
            className="size-22 sm:size-28"
            textClassName="text-4xl sm:text-5xl"
          />
          <div className="flex gap-2 pb-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleFollow}
              aria-pressed={following}
              className={`relative inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors ${
                following ? 'border border-line bg-ink-3 text-paper' : 'bg-lime text-ink hover:bg-lime/90'
              }`}
            >
              {following ? <Check size={16} /> : <UserPlus size={16} />}
              {following ? 'following' : 'follow'}
              <Burst trigger={burst} />
            </motion.button>
            <motion.a
              whileTap={{ scale: 0.9 }}
              href="#contact"
              aria-label="message"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line bg-ink-3 px-3.5 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              <MessageCircle size={16} />
              <span className="hidden min-[400px]:inline">message</span>
            </motion.a>
          </div>
        </div>

        {/* name + bio */}
        <div className="mt-4">
          <h1 className="flex items-center gap-2 font-display text-[2.6rem] font-bold leading-none tracking-tight sm:text-6xl">
            {profile.name}
            <BadgeCheck className="size-7 shrink-0 text-sky sm:size-9" aria-label="verified human" />
          </h1>
          <p className="mt-2 font-mono text-[13px] text-fog">
            @{profile.handle} <span className="text-mute">·</span> {profile.role}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-ink-3 px-3 py-1 text-xs">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-lime" />
            </span>
            {profile.status}
          </p>
          <ul className="mt-4 space-y-1 text-[15px] leading-relaxed text-paper/85">
            {profile.bio.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        {/* stats row */}
        <dl
          className="mt-5 grid divide-x divide-line rounded-2xl border border-line"
          style={{ gridTemplateColumns: `repeat(${profile.stats.length}, minmax(0, 1fr))` }}
        >
          {profile.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse items-center px-2 py-3">
              <dt className="text-xs text-fog">{s.label}</dt>
              <dd className="font-display text-2xl font-bold">{s.value}</dd>
            </div>
          ))}
        </dl>

        {/* socials */}
        <div className="mt-5 flex flex-wrap gap-2">
          {socials.map((s) => (
            <motion.a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="grid size-10 place-items-center rounded-full border border-line bg-ink-3 text-fog transition-colors hover:border-white/20 hover:text-paper"
            >
              <SocialIcon id={s.id} />
            </motion.a>
          ))}
        </div>

        {/* story highlights */}
        <div className="no-scrollbar -mx-5 mt-6 flex gap-3 overflow-x-auto px-5 sm:-mx-7 sm:gap-4 sm:px-7">
          {profile.highlights.filter((h) => isVisible(h.story ? 'timeline' : h.href.slice(1))).map((h) => (
            <Highlight key={h.label} h={h} onOpenStory={onOpenStory} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Highlight({ h, onOpenStory }) {
  const Tag = h.story ? 'button' : 'a'
  const props = h.story ? { onClick: () => onOpenStory(0) } : { href: h.href }
  return (
    <Tag {...props} className="group flex w-16 shrink-0 flex-col items-center gap-1.5">
      <span className="grid size-16 place-items-center rounded-full border border-line bg-ink-3 p-1 transition-[transform,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-white/25">
        <span className="grid size-full place-items-center rounded-full bg-ink text-2xl transition-transform duration-300 group-hover:scale-110">
          {h.emoji}
        </span>
      </span>
      <span className="text-[11px] text-fog group-hover:text-paper">{h.label}</span>
    </Tag>
  )
}

/* ───────────────── widgets ───────────────── */

function NowPlaying() {
  const { title, artist, url, bandcampTrack } = profile.nowPlaying
  return (
    <div className="h-full rounded-[1.75rem] border border-line bg-ink-2 p-4 sm:p-5">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-fog">
        <span>🎧 on repeat rn</span>
        <span aria-hidden className="flex h-3.5 items-end gap-[3px]">
          {[0, 0.2, 0.4, 0.1].map((d, i) => (
            <span key={i} className="eq-bar h-full w-[3px] rounded-full bg-lime" style={{ animationDelay: `${d}s` }} />
          ))}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <span
          aria-hidden
          className="size-14 shrink-0 animate-spin-slow rounded-full shadow-[0_6px_20px_rgb(0_0_0/0.5)]"
          style={{
            background:
              'radial-gradient(circle, #0c0b10 0 12%, #d4f57a 13% 30%, transparent 31%), repeating-radial-gradient(circle, #1c1b24 0 2px, #2a2933 2px 4px)',
          }}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{title}</p>
          <p className="truncate text-sm text-fog">{artist}</p>
        </div>
        {url && (
          <motion.a
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.9 }}
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={`open ${title} on bandcamp`}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-ink-3 text-fog transition-colors hover:text-paper"
          >
            <ArrowUpRight size={16} />
          </motion.a>
        )}
      </div>

      {/* the real player — press play here to actually hear it */}
      {bandcampTrack && (
        <iframe
          title={`${title} by ${artist}`}
          src={`https://bandcamp.com/EmbeddedPlayer/track=${bandcampTrack}/size=small/bgcol=1e1d26/linkcol=d4f57a/transparent=true/`}
          loading="lazy"
          seamless
          className="mt-4 block h-[42px] w-full overflow-hidden rounded-xl border-0 bg-ink-3"
        />
      )}
    </div>
  )
}

function Currently() {
  const { emoji, text } = profile.currently
  return (
    <a href="#cooking" className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-lime p-5 text-ink">
      <div className="relative pr-14">
        <p className="font-mono text-[11px] uppercase tracking-wider opacity-70">currently</p>
        <p className="mt-2 font-display text-xl font-semibold leading-snug">{text}</p>
      </div>
      <span className="relative mt-3 inline-flex items-center gap-1 text-sm font-medium">
        see what else is cooking <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </span>
      <span
        aria-hidden
        className="absolute -right-2 top-3 rotate-12 text-6xl transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110"
      >
        {emoji}
      </span>
    </a>
  )
}

function FunFact() {
  const facts = profile.funFacts
  const [i, setI] = useState(0)
  const many = facts.length > 1

  return (
    <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[1.75rem] border border-dashed border-white/15 p-5">
      <span aria-hidden className="pointer-events-none absolute -top-6 right-4 font-serif text-[9rem] leading-none text-white/[0.06]">
        “
      </span>
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-fog">
        <span>{many ? '🎲 random fact about me' : '💭 fun fact about me'}</span>
        {many && (
          <span className="text-mute">
            {i + 1}/{facts.length}
          </span>
        )}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={`font-serif italic leading-snug ${many ? 'text-2xl' : 'text-[1.75rem]'}`}
        >
          {facts[i]}
        </motion.p>
      </AnimatePresence>
      {many && (
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setI((i + 1) % facts.length)}
          className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-ink-2 px-4 py-2 text-sm transition-colors hover:bg-white/10"
        >
          <motion.span key={i} initial={{ rotate: -180 }} animate={{ rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
            <Dices size={16} />
          </motion.span>
          roll again
        </motion.button>
      )}
    </div>
  )
}

// daytime = 6am–6pm in my timezone
const moodFor = (h) => (h >= 6 && h < 18 ? 'probably daydreaming ☁️' : 'probably dreaming 🌙')

function LocalTime() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(id)
  }, [])

  const tz = profile.timezone
  const [time, period] = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit' })
    .format(now)
    .split(/\s/)
  const hour = Number(new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', hourCycle: 'h23' }).format(now)) % 24

  return (
    <div className="h-full rounded-[1.75rem] border border-line bg-ink-2 p-5">
      <p className="font-mono text-[11px] uppercase tracking-wider text-fog">🕰️ my local time</p>
      <p className="mt-2 font-display text-4xl font-bold tabular-nums tracking-tight">
        {time} <span className="text-lg font-medium text-fog">{period?.toLowerCase()}</span>
      </p>
      <p className="mt-1 text-sm text-fog">{moodFor(hour)}</p>
    </div>
  )
}
