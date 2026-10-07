// ─────────────────────────────────────────────────────────────
//  about.js — "the lore". wrap words in **double stars** to
//  give them a highlighter-pen effect.
//  empty lists hide their card, so fill them in whenever you're ready.
// ─────────────────────────────────────────────────────────────

export const about = {
  intro: [
    "hi, i'm **DK** 👋 i build things, cause mostly harmless chaos, and get curious about **way too many things**.",
    "currently deep in backend work and, naturally, another AI rabbit hole. when i'm not working, i'm probably watching series, or overthinking something that absolutely did not need this much thought.",
  ],
  facts: [
    { emoji: '📍', label: 'based in', value: 'India 🇮🇳' },
    { emoji: '💼', label: 'work', value: 'iTechVision' },
    { emoji: '🎓', label: 'studied', value: 'CSE @ VIT-AP' },
    { emoji: '📺', label: 'unwinds with', value: 'series' },
  ],
  // e.g. ['writes docs (eventually)', 'will hype your side project']
  greenFlags: [],
  // e.g. ['47 tabs open. all of them important.']
  redFlags: [],
  // e.g. [{ text: 'dark mode is a personality trait.', spice: 1 }]  — spice: 1–3
  hotTakes: [],
  // the silent, looping "live footage" video — set to null to hide it
  // crop: share of the 16:9 frame the footage actually fills (trims black side bars; 1 = none)
  video: {
    youtubeId: 'IXh0sD2qWAU',
    label: '📹 live cam',
    caption: 'live footage of me at work',
    note: 'sound off — the clacking is implied.',
    alt: 'a cat typing on a computer keyboard',
    crop: 0.512,
  },
  // shown at the bottom of the quick facts card — set to null to hide it
  socialBattery: { level: 96, note: 'charged up on series & silence' },
}
