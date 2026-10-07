import { projects } from '../../data/projects'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import ProjectCard from '../cards/ProjectCard'
import { accents } from '../../lib/utils'

export default function Projects() {
  return (
    <Section
      id="projects"
      kicker="selected work"
      title="things i've"
      accent="shipped"
      sticker="🤞 no todo apps"
      color={accents.lime}
      blurb="stuff i built, broke, fixed and was weirdly proud of. double-tap a post to like it, hit 'more' for the behind-the-scenes."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.07} className="grid">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
