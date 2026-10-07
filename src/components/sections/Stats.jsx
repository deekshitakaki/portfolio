import { useState } from 'react'
import { motion } from 'framer-motion'
import { wrapped } from '../../data/stats'
import { profile } from '../../data/profile'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Counter from '../ui/Counter'
import StatCard from '../cards/StatCard'
import { accents, ease } from '../../lib/utils'

const hourLabel = (h) => `${h % 12 || 12}${h < 12 ? 'am' : 'pm'}`

export default function Stats() {
  const { headline, counters, topLanguages, commitsByHour, personality, year } = wrapped

  return (
    <Section
      id="stats"
      kicker="proof i build things"
      title={profile.nickname}
      accent="wrapped"
      sticker={`📊 ${year} edition`}
      color={accents.pink}
      blurb="personal analytics nobody asked for. the numbers are real-ish."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {/* headline */}
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-lilac p-6 text-ink sm:col-span-2 sm:p-8 lg:col-span-8">
          <span aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-pink" />
          <span aria-hidden className="absolute -bottom-24 right-24 size-48 rounded-full border-[18px] border-ink/10" />
          <span aria-hidden className="absolute right-6 top-6 animate-spin-slow text-4xl">✦</span>
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-wider opacity-70">{profile.nickname} wrapped '{year.slice(-2)}</p>
            <p className="mt-6 font-display text-xl font-semibold sm:text-2xl">this year i spent</p>
            <p className="font-display text-7xl font-extrabold leading-none tracking-tighter sm:text-8xl lg:text-9xl">
              <Counter value={headline.value} duration={2.2} />
            </p>
            <p className="font-display text-xl font-semibold sm:text-2xl">{headline.label}</p>
            <p className="mt-4 max-w-sm font-serif text-xl italic leading-snug opacity-80">{headline.sub}</p>
          </div>
        </Reveal>

        {/* top languages */}
        <Reveal delay={0.05} className="rounded-[2rem] border border-line bg-ink-2 p-6 sm:col-span-2 lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-fog">top languages</p>
          <ol className="mt-5 space-y-4">
            {topLanguages.map((l, i) => (
              <li key={l.name} className="flex items-center gap-4">
                <span className="w-6 font-display text-3xl font-extrabold text-paper/30">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">{l.name}</span>
                    <span className="font-mono text-xs text-fog">{l.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(l.pct / topLanguages[0].pct) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.15 + i * 0.08, ease }}
                      className="h-full rounded-full bg-pink"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* counters */}
        {counters.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="lg:col-span-3">
            <StatCard stat={s} />
          </Reveal>
        ))}

        {/* commits by hour */}
        <Reveal className="rounded-[2rem] border border-line bg-ink-2 p-6 sm:col-span-2 lg:col-span-8">
          <HourChart data={commitsByHour} />
        </Reveal>

        {/* personality */}
        <Reveal delay={0.05} className="relative overflow-hidden rounded-[2rem] border border-line bg-ink-2 p-6 sm:col-span-2 lg:col-span-4">
          <span aria-hidden className="absolute -right-6 -top-6 size-40 rounded-full bg-[radial-gradient(circle,rgb(255_224_138/0.25),transparent_70%)]" />
          <p className="font-mono text-[11px] uppercase tracking-wider text-fog">my coding personality</p>
          <motion.p
            initial={{ rotate: -20, scale: 0.6 }}
            whileInView={{ rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 12 }}
            className="mt-4 text-6xl"
          >
            {personality.emoji}
          </motion.p>
          <p className="mt-3 font-serif text-4xl italic leading-none text-butter">{personality.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-fog">{personality.text}</p>
        </Reveal>
      </div>
    </Section>
  )
}

function HourChart({ data }) {
  const [hover, setHover] = useState(null)
  const max = Math.max(...data)
  const peak = data.indexOf(max)
  const total = data.reduce((a, b) => a + b, 0)

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-fog">commits by hour of day</p>
          <p className="mt-1 font-display text-2xl font-semibold">
            peak hour: <span className="text-lilac">{hourLabel(peak)}</span>
          </p>
        </div>
        <p className="font-mono text-xs text-fog">{total.toLocaleString('en-US')} commits total</p>
      </div>

      <div
        role="img"
        aria-label={`bar chart of commits by hour of day. busiest hour is ${hourLabel(peak)} with ${max} commits.`}
        className="relative mt-8 flex h-40 items-end gap-[2px] sm:gap-1"
        onPointerLeave={() => setHover(null)}
      >
        {data.map((v, h) => (
          <div
            key={h}
            className="relative flex h-full flex-1 cursor-crosshair items-end"
            onPointerEnter={() => setHover(h)}
            onClick={() => setHover(h)}
          >
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${Math.max(2, (v / max) * 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: h * 0.02, ease }}
              className={`w-full rounded-t-[4px] transition-colors ${hover === null || hover === h ? 'bg-lilac' : 'bg-lilac/35'}`}
            />
            {hover === h && (
              <span
                className={`pointer-events-none absolute bottom-full z-10 mb-2 whitespace-nowrap rounded-lg border border-line bg-ink px-2.5 py-1.5 text-xs shadow-xl ${
                  h < 4 ? 'left-0' : h > 19 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                }`}
              >
                <span className="text-fog">{hourLabel(h)} · </span>
                <b className="font-semibold">{v}</b> commits
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between border-t border-line pt-2 font-mono text-[10px] text-mute">
        <span>12am</span>
        <span>6am</span>
        <span>12pm</span>
        <span>6pm</span>
        <span>11pm</span>
      </div>

      <table className="sr-only">
        <caption>commits by hour of day</caption>
        <tbody>
          {data.map((v, h) => (
            <tr key={h}>
              <th scope="row">{hourLabel(h)}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
