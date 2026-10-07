// ─────────────────────────────────────────────────────────────
//  projects.js — the feed. newest first.
//  image:   optional screenshot in /public/projects (otherwise an emoji poster)
//  date:    'YYYY-MM-DD' — shown as "6mo" in the post header (optional)
//  metric:  the one number worth bragging about (optional)
//  details: bullet points shown when someone taps "more"
//  links:   github / demo — buttons hide if missing
//  color:   lime | pink | lilac | butter | sky | peach
// ─────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 'twinmind',
    name: 'TwinMind',
    emoji: '🎙️',
    color: 'lilac',
    type: 'real-time AI meeting copilot',
    date: '2026-04-18',
    pinned: true,
    tagline: 'listens to your meeting live and whispers useful suggestions while it happens.',
    stack: ['React', 'Node.js', 'Express', 'SSE', 'Whisper'],
    metric: { value: 'live', label: 'on vercel + render' },
    links: { github: 'https://github.com/deekshitakaki/twinmind', demo: 'https://twinmind-xi.vercel.app' },
    details: [
      'transcribes live audio and streams suggestions over server-sent events',
      'sliding-window context buffer (300–400 words) keeps it fast, with full-transcript retrieval for deeper questions',
      'strict structured-output contract between backend and client, validated on every response',
    ],
  },
  {
    id: 'dearly',
    name: 'Dearly',
    emoji: '💌',
    color: 'pink',
    type: 'replit buildathon',
    date: '2026-04-15',
    image: '/projects/dearly.jpg',
    tagline: 'write digital letters that actually feel like you — soft type, moods and stickers.',
    stack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Drizzle'],
    links: { github: 'https://github.com/deekshitakaki/replit-buildathon', demo: 'https://dearly-psi.vercel.app' },
    details: [
      'pick a mood (love, birthday, apology, gratitude) or just start writing',
      'custom typography, soft aesthetics and delicate stickers, shareable instantly',
      'typed end to end: OpenAPI spec → generated client hooks + Zod schemas, PostgreSQL via Drizzle',
    ],
  },
  {
    id: 'network-traffic-classifier',
    name: 'Network Traffic Classifier',
    emoji: '🛰️',
    color: 'sky',
    type: 'ml service',
    tagline: 'sorts network traffic into classes with an XGBoost model behind a REST API.',
    stack: ['Python', 'Flask', 'React', 'XGBoost'],
    metric: { value: '96%', label: 'accuracy on 125k+ records' },
    links: {},
    details: [
      'classification service over 125,000+ records',
      'reached 96% accuracy with XGBoost through feature engineering and tuning',
      'model inference exposed via Flask REST APIs with request batching and streaming CSV parsing',
    ],
  },
  {
    id: 'auctionease',
    name: 'AuctionEase',
    emoji: '🔨',
    color: 'peach',
    type: 'real-time auction platform',
    date: '2023-11-20',
    tagline: 'live auctions where every bid shows up for everyone instantly, no refresh needed.',
    stack: ['Node.js', 'Express', 'MongoDB', 'AWS S3'],
    metric: { value: '100+', label: 'concurrent bidders' },
    links: { github: 'https://github.com/deekshitakaki/auctionmern' },
    details: [
      'real-time bidding for 100+ concurrent users, with auth and consistent bid handling',
      'cut API latency by 30% through query and endpoint optimization',
      'AWS S3 for secure product-image storage',
    ],
  },
]
