// ─────────────────────────────────────────────────────────────
//  timeline.js — "character development". newest first
//  (it scrolls sideways: now → then).
//  each entry also becomes a slide in the story viewer.
//  color: lime | pink | lilac | butter | sky | peach
// ─────────────────────────────────────────────────────────────

export const timeline = [
  {
    id: 'itechvision',
    season: 'S03',
    era: 'main character era',
    period: 'May 2026 – now',
    emoji: '🚀',
    color: 'lime',
    title: 'Software Engineer',
    org: 'iTechVision',
    meta: 'client: Commerce Robotics, Japan · WMS / OMS',
    description:
      'building the backend of a warehouse management system — production APIs from design and testing all the way to deployment and debugging.',
    points: [
      'production REST APIs in Python/FastAPI for inventory, orders & warehouse ops',
      'design and optimize PostgreSQL schemas and queries',
      'trace and fix critical production issues across WMS/OMS services',
      'built LLM-based automation on top of the WMS/OMS APIs',
    ],
    tags: ['python', 'fastapi', 'postgresql', 'llms'],
    unlocked: 'trusted with prod 😌',
    current: true,
  },
  {
    id: 'gap',
    season: 'S02',
    era: 'the intern era',
    period: 'Jan – Jul 2025',
    emoji: '🛡️',
    color: 'sky',
    title: 'Security Engineering Intern',
    org: 'Gap Inc.',
    description: 'built a real-time security dashboard and the data pipelines that keep it fed.',
    points: [
      'React + Tailwind dashboard visualizing 35,000+ records across 1,700+ cloud assets',
      'CrowdStrike, Rapid7 & ServiceNow APIs piped into scheduled MongoDB pipelines',
      'cut frontend load time by 30% with reusable components',
      'unit + integration tests for stable releases',
    ],
    tags: ['react', 'tailwind', 'mongodb', 'rest apis'],
    unlocked: 'first big-company badge 🪪',
  },
  {
    id: 'vit',
    season: 'S01',
    era: 'the college arc',
    period: '2021 – 2025',
    emoji: '🎓',
    color: 'lilac',
    title: 'B.Tech, Computer Science & Engineering',
    org: 'Vellore Institute of Technology',
    meta: 'Andhra Pradesh, India',
    description: 'four years of the fundamentals, plus a growing pile of side projects.',
    points: ['CGPA 8.79 / 10'],
    tags: ['dsa', 'operating systems', 'dbms', 'computer networks', 'distributed systems'],
    unlocked: 'degree acquired 🎓',
  },
]

export const nextSeason = {
  season: 'S04',
  title: 'coming soon',
  note: 'currently in pre-production. open to plot twists 👀',
}
