// ─────────────────────────────────────────────────────────────
//  site.js — navigation, which sections show, contact + footer copy.
// ─────────────────────────────────────────────────────────────

// `id` must match a section id. `label` is what shows in the navbar.
export const nav = [
  { id: 'about', label: 'lore' },
  { id: 'timeline', label: 'arc' },
  { id: 'skills', label: 'inventory' },
  { id: 'projects', label: 'work' },
  { id: 'stats', label: 'wrapped' },
  { id: 'cooking', label: 'cooking' },
  { id: 'contact', label: 'dms' },
]

// sections parked until they have real content. remove an id to bring it back —
// its nav link, hero highlight and section number all reappear automatically.
export const hiddenSections = ['stats']

export const contact = {
  // paste a Formspree (or similar) endpoint here to actually receive messages,
  // e.g. 'https://formspree.io/f/abcdwxyz'. empty = the form fakes a successful send.
  formEndpoint: 'https://formspree.io/f/mwlvllad',
  replyTime: 'replies in ~24h',
  openTo: ['cool collabs', 'tech chats', 'AI rabbit holes'],
  openers: [
    'heyy 👋 you made it all the way down here. respect.',
    'collabs, job stuff, AI rabbit holes or just a hello — all welcome.',
  ],
  intents: [
    { id: 'collab', label: 'collab 🤝' },
    { id: 'hiring', label: 'hiring 💼' },
    { id: 'hi', label: 'just saying hi 👋' },
  ],
  reply: (name) =>
    `omg hiii ${name || 'stranger'} 🫶 message received! i'll get back to you soon. in the meantime, here's a virtual ice cream 🍦`,
}

export const footer = {
  madeWith: 'react, framer motion & a lot of overthinking',
}
