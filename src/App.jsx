import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollProgress from './components/layout/ScrollProgress'
import StoryViewer from './components/cards/StoryViewer'
import Hero from './components/sections/Hero'
import DinoGame from './components/sections/DinoGame'
import About from './components/sections/About'
import Timeline from './components/sections/Timeline'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Stats from './components/sections/Stats'
import Cooking from './components/sections/Cooking'
import Contact from './components/sections/Contact'
import { isVisible } from './lib/sections'

export default function App() {
  // index of the timeline story being viewed, or null when closed
  const [story, setStory] = useState(null)
  const closeStory = useCallback(() => setStory(null), [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain" aria-hidden />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero onOpenStory={setStory} />
        <DinoGame />
        <About />
        {isVisible('timeline') && <Timeline onOpenStory={setStory} />}
        {isVisible('skills') && <Skills />}
        {isVisible('projects') && <Projects />}
        {isVisible('stats') && <Stats />}
        {isVisible('cooking') && <Cooking />}
        <Contact />
      </main>

      <Footer />
      <StoryViewer index={story} onClose={closeStory} />
    </MotionConfig>
  )
}
