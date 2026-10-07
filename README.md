# DK's corner of the internet 🌱

A single-page personal site that feels like a social profile, not a resume.
Built with React, Vite, Tailwind CSS v4, Framer Motion and Lucide.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Editing content

All personal content lives in `src/data/`. You should rarely need to touch a component.

| File | What it controls |
| --- | --- |
| `profile.js` | name, handle, avatar, bio, status, now playing (a real bandcamp player), fun facts, highlights, social links |
| `about.js` | "the lore": intro, quick facts + social battery, the "live footage" video, optional green/red flags and hot takes |
| `timeline.js` | "character development" seasons, newest first; each one is also a slide in the story viewer |
| `skills.js` | the inventory: categories, rarities, skills |
| `projects.js` | the project feed |
| `stats.js` | "DK wrapped" numbers, top languages, commits-by-hour chart |
| `cooking.js` | work-in-progress cards, learning queue, recently shipped |
| `site.js` | nav labels, which sections are hidden, contact form settings, footer |

### Common tasks

- **Profile photo:** put `avatar.jpg` in `/public` and set `avatar: '/avatar.jpg'` in `profile.js`.
- **Hide / show a section:** add or remove its id in `hiddenSections` in `site.js`. Nav links, hero highlights and section numbers update automatically.
- **Project screenshots:** put them in `/public/projects/` and set `image: '/projects/name.png'` on the project.
- **Make the contact form actually send:** sign up free at [formspree.io](https://formspree.io) with the email you want messages delivered to, create a form, and paste its endpoint (`https://formspree.io/f/…`) into `contact.formEndpoint` in `site.js`. While it's empty, the form only simulates a send.
- **Colors:** cards take a `color` of `lime | pink | lilac | butter | sky | peach`. The palette tokens are defined in `src/index.css`.

## Structure

```
src/
  data/                  ← your content
  components/
    layout/              Navbar, Footer, ScrollProgress
    sections/            one file per page section
    cards/               ProfileCard, ProjectCard, SkillCard, TimelineCard, StoryViewer, …
    ui/                  Section shell, TiltCard, Sticker, Counter, Modal, Reveal, …
  lib/utils.jsx          accent colors, date helpers
  hooks/                 useActiveSection (navbar highlight)
```

Animations respect the OS "reduce motion" setting.
