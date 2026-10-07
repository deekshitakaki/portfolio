// ─────────────────────────────────────────────────────────────
//  profile.js — the "bio" at the top of the site.
//  avatar: drop a photo into /public (e.g. /public/avatar.jpg)
//  and set `avatar: '/avatar.jpg'`. leave it null for the initials.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Deekshita Kaki',
  nickname: 'DK',
  handle: 'deekshitakaki',
  avatar: null,
  avatarFallback: 'DK',
  role: 'certified overthinker',
  bio: ['building things, causing chaos, staying curious.'],
  location: 'India 🇮🇳',
  timezone: 'Asia/Kolkata',
  status: 'online · probably in my delulu era',
  currently: { emoji: '🤖', text: 'what else other than AI 👀' },
  // bandcampTrack: the number after 'track=' in a bandcamp embed code — makes the song actually playable
  nowPlaying: {
    title: 'Mirror Mirror',
    artist: 'Angelo De Augustine',
    url: 'https://angelodeaugustine.bandcamp.com/track/mirror-mirror',
    bandcampTrack: '311168227',
  },
  // the "🎲 fun fact" card in the hero — add more and a "roll again" button appears
  funFacts: ['i argue that french fries and ice cream are a great combo 🍟🍦'],
  stats: [
    { value: '100%', label: 'curious' },
    { value: '∞', label: 'overthoughts' },
  ],
  // instagram-style highlight circles. `story: true` opens the timeline story viewer.
  // highlights pointing at a hidden section are skipped automatically.
  highlights: [
    { label: 'lore', emoji: '📖', href: '#about' },
    { label: 'my arc', emoji: '🎬', story: true },
    { label: 'work', emoji: '💼', href: '#projects' },
    { label: 'wrapped', emoji: '📊', href: '#stats' },
    { label: 'cooking', emoji: '🔥', href: '#cooking' },
    { label: 'dms', emoji: '💌', href: '#contact' },
  ],
}

// id must be one of: github, linkedin, instagram, x, email
export const socials = [
  { id: 'github', label: 'GitHub', handle: '@deekshitakaki', url: 'https://github.com/deekshitakaki' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'in/deekshita-kaki', url: 'https://www.linkedin.com/in/deekshita-kaki-81b8831ba/' },
  { id: 'email', label: 'Email', handle: 'deekshita125@gmail.com', url: 'mailto:deekshita125@gmail.com' },
]
