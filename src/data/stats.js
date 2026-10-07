// ─────────────────────────────────────────────────────────────
//  stats.js — "DK wrapped". spotify-wrapped style analytics.
//  color: lime | pink | lilac | butter | sky | peach
// ─────────────────────────────────────────────────────────────

export const wrapped = {
  year: '2026',
  headline: {
    value: 2184,
    label: 'hours writing code',
    sub: "that's 91 full days. my screen-time report has concerns.",
  },
  counters: [
    { value: 1247, label: 'commits pushed', sub: 'and 86 of them say "fix typo"', color: 'lime' },
    { value: 38, label: 'repos created', sub: '11 are named "test". no regrets.', color: 'pink' },
    { value: 12, label: 'projects shipped', sub: 'plus 23 in the side-project graveyard 🪦', color: 'butter' },
    { value: 4200, suffix: '+', label: 'cups of chai', sub: 'the real tech stack', color: 'sky' },
  ],
  // share of code written this year, %
  topLanguages: [
    { name: 'TypeScript', pct: 46 },
    { name: 'JavaScript', pct: 22 },
    { name: 'Python', pct: 14 },
    { name: 'CSS', pct: 11 },
    { name: 'SQL', pct: 7 },
  ],
  // commits per hour of the day, index 0 = midnight … 23 = 11pm
  commitsByHour: [96, 71, 38, 12, 4, 2, 3, 8, 15, 28, 44, 52, 40, 36, 48, 55, 58, 50, 42, 39, 61, 88, 118, 142],
  personality: {
    emoji: '🦉',
    title: 'the night owl',
    text: 'most of my commits land between 10pm and 2am. sleep is more of a suggestion.',
  },
}
