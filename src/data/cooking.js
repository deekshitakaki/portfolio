// ─────────────────────────────────────────────────────────────
//  cooking.js — "currently cooking": what i'm building / learning.
//  status:   prepping | simmering | cooking | plating | frozen
//  progress: 0–100 · updated: 'YYYY-MM-DD' (shown as "x days ago")
//  empty learningQueue / recentlyServed lists hide their cards.
// ─────────────────────────────────────────────────────────────

export const cookingStatuses = {
  prepping: { label: 'prepping', emoji: '🔪', color: '#8fd3ff' },
  simmering: { label: 'simmering', emoji: '🫕', color: '#b9a6ff' },
  cooking: { label: 'cooking', emoji: '🔥', color: '#ffb38a', live: true },
  plating: { label: 'almost served', emoji: '🍽️', color: '#d4f57a', live: true },
  frozen: { label: 'in the freezer', emoji: '🧊', color: '#75727f' },
}

export const cooking = [
  {
    title: 'an MCP server for claude',
    emoji: '🤖',
    status: 'cooking',
    progress: 50,
    updated: '2026-10-07',
    note: "plugging my company's task manager into claude. what else other than AI 👀",
    tags: ['mcp', 'claude', 'ai'],
  },
  {
    title: 'this website',
    emoji: '🌐',
    status: 'plating',
    progress: 85,
    updated: '2026-10-06',
    note: "you're looking at it. filling in the details, one section at a time.",
    tags: ['react', 'framer motion'],
  },
]

// e.g. [{ item: 'prompt engineering', done: true }]
export const learningQueue = []

// e.g. [{ emoji: '✅', title: 'shipped my portfolio', date: '2026-10-06' }]
export const recentlyServed = []
