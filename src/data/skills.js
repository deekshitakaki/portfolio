// ─────────────────────────────────────────────────────────────
//  skills.js — "the inventory".
//  category: languages | frameworks | data | ai | badges
//  rarity:   common | rare | epic | legendary  (legendary = daily drivers)
//  seenIn:   where it's actually been used (optional)
// ─────────────────────────────────────────────────────────────

export const skillCategories = [
  { id: 'all', label: 'all items', emoji: '🎒' },
  { id: 'languages', label: 'languages', emoji: '🗣️' },
  { id: 'frameworks', label: 'frameworks', emoji: '⚙️' },
  { id: 'data', label: 'data & cloud', emoji: '☁️' },
  { id: 'ai', label: 'ai & practices', emoji: '🤖' },
  { id: 'badges', label: 'badges', emoji: '🏅' },
]

export const rarities = {
  legendary: { label: 'legendary', color: '#ffb38a' },
  epic: { label: 'epic', color: '#b9a6ff' },
  rare: { label: 'rare', color: '#8fd3ff' },
  common: { label: 'common', color: '#a9a6b5' },
}

export const skills = [
  // languages
  { name: 'Python', icon: '🐍', category: 'languages', rarity: 'legendary', note: 'daily driver. production APIs run on it.', seenIn: ['iTechVision', 'Network Traffic Classifier'] },
  { name: 'SQL', icon: '🗃️', category: 'languages', rarity: 'epic', note: 'where the query-latency hunting happens.', seenIn: ['iTechVision'] },
  { name: 'JavaScript', icon: '🟨', category: 'languages', rarity: 'epic', note: 'the language of every side quest.', seenIn: ['TwinMind', 'AuctionEase', 'Gap Inc.'] },
  { name: 'Java', icon: '☕', category: 'languages', rarity: 'rare', note: 'strongly typed, strongly opinionated.' },
  { name: 'Bash', icon: '🐚', category: 'languages', rarity: 'common', note: 'for when clicking around takes too long.' },

  // frameworks
  { name: 'FastAPI', icon: '⚡', category: 'frameworks', rarity: 'legendary', note: 'fast to write, fast to run.', seenIn: ['iTechVision'] },
  { name: 'REST APIs', icon: '🔌', category: 'frameworks', rarity: 'legendary', note: 'designed, tested, shipped, debugged.', seenIn: ['iTechVision', 'Gap Inc.', 'Network Traffic Classifier'] },
  { name: 'React', icon: '⚛️', category: 'frameworks', rarity: 'epic', note: 'dashboards, copilots and this very site.', seenIn: ['Gap Inc.', 'TwinMind', 'Dearly'] },
  { name: 'Node.js', icon: '🟩', category: 'frameworks', rarity: 'epic', note: 'javascript, but make it server.', seenIn: ['TwinMind', 'AuctionEase'] },
  { name: 'Express.js', icon: '🚂', category: 'frameworks', rarity: 'epic', note: 'small, fast, gets the job done.', seenIn: ['TwinMind', 'Dearly', 'AuctionEase'] },
  { name: 'Flask', icon: '🧪', category: 'frameworks', rarity: 'rare', note: 'serving ML predictions over http.', seenIn: ['Network Traffic Classifier'] },
  { name: 'Spring Boot', icon: '🌱', category: 'frameworks', rarity: 'common', note: 'java, with batteries included.' },

  // data & cloud
  { name: 'PostgreSQL', icon: '🐘', category: 'data', rarity: 'legendary', note: 'schemas designed, queries optimized.', seenIn: ['iTechVision', 'Dearly'] },
  { name: 'MongoDB', icon: '🍃', category: 'data', rarity: 'epic', note: 'pipelines and live bids.', seenIn: ['Gap Inc.', 'AuctionEase'] },
  { name: 'AWS S3', icon: '🪣', category: 'data', rarity: 'rare', note: 'secure file storage, sorted.', seenIn: ['AuctionEase'] },
  { name: 'Docker', icon: '🐳', category: 'data', rarity: 'rare', note: 'it works on my machine — and yours.' },
  { name: 'Git', icon: '🌿', category: 'data', rarity: 'rare', note: 'commit early, commit often.' },
  { name: 'Linux', icon: '🐧', category: 'data', rarity: 'common', note: 'home of the terminal.' },
  { name: 'Microsoft Azure', icon: '☁️', category: 'data', rarity: 'common', note: 'the other cloud.' },

  // ai & practices
  { name: 'LLM integration', icon: '🤖', category: 'ai', rarity: 'epic', note: 'automation on top of real APIs.', seenIn: ['iTechVision', 'TwinMind'] },
  { name: 'MCP', icon: '🧩', category: 'ai', rarity: 'rare', note: 'currently wiring a task manager up to claude.', seenIn: ['currently cooking'] },
  { name: 'XGBoost', icon: '🌲', category: 'ai', rarity: 'rare', note: '96% accuracy, thanks to feature engineering.', seenIn: ['Network Traffic Classifier'] },
  { name: 'API design', icon: '📐', category: 'ai', rarity: 'epic', note: 'contracts first, surprises never.', seenIn: ['iTechVision', 'TwinMind'] },
  { name: 'debugging', icon: '🔦', category: 'ai', rarity: 'legendary', note: 'root causes, traced across services and the db.', seenIn: ['iTechVision'] },
  { name: 'testing', icon: '✅', category: 'ai', rarity: 'rare', note: 'unit + integration, for calm releases.', seenIn: ['Gap Inc.', 'iTechVision'] },

  // badges
  { name: 'AWS Cloud Practitioner', icon: '🏅', category: 'badges', rarity: 'epic', note: 'certified ☁️' },
  { name: 'Google Cybersecurity', icon: '🛡️', category: 'badges', rarity: 'rare', note: 'foundations of cybersecurity, certified.' },
]
