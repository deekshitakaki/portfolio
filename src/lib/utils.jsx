export const accents = {
  lime: '#d4f57a',
  pink: '#ff9ec7',
  lilac: '#b9a6ff',
  butter: '#ffe08a',
  sky: '#8fd3ff',
  peach: '#ffb38a',
}

/** resolve a named accent ('lime') or pass through a raw color ('#fff') */
export const accent = (name) => accents[name] ?? name ?? accents.lime

export const ease = [0.16, 1, 0.3, 1]

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
const units = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
]

/** '2026-10-04' → '2 days ago' */
export function timeAgo(date) {
  const diff = (new Date(date).getTime() - Date.now()) / 1000
  for (const [unit, secs] of units) {
    if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit)
  }
  return 'just now'
}

/** '2026-04-18' → '6mo' — instagram-style post age */
export function shortAgo(date) {
  const days = (Date.now() - new Date(date).getTime()) / 86400000
  if (days < 1) return 'today'
  if (days < 7) return `${Math.floor(days)}d`
  if (days < 30) return `${Math.floor(days / 7)}w`
  if (days < 365) return `${Math.floor(days / 30)}mo`
  return `${Math.floor(days / 365)}y`
}

/** 1247 → '1,247' */
export const formatNumber = (n) => Math.round(n).toLocaleString('en-US')

/** turns 'build **cool** stuff' into ['build ', <mark>cool</mark>, ' stuff'] */
export function withMarker(text) {
  return text.split('**').map((part, i) =>
    i % 2 ? (
      <mark key={i} className="marker">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}
