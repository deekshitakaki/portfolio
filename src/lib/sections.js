import { nav, hiddenSections } from '../data/site'
import { timeline } from '../data/timeline'
import { skills } from '../data/skills'
import { projects } from '../data/projects'
import { cooking } from '../data/cooking'

// a section also hides itself when its data is empty
const hasContent = {
  timeline: timeline.length > 0,
  skills: skills.length > 0,
  projects: projects.length > 0,
  cooking: cooking.length > 0,
}

export const isVisible = (id) => !hiddenSections.includes(id) && hasContent[id] !== false

export const visibleNav = nav.filter((n) => isVisible(n.id))

/** '01', '02', … based on the section's position among the visible ones */
export const sectionNumber = (id) => String(visibleNav.findIndex((n) => n.id === id) + 1).padStart(2, '0')
