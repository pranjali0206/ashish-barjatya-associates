import { useState } from 'react'
import useSmoothScroll from './hooks/useSmoothScroll'
import Preloader, { shouldSkipPreloader } from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import PartnerStrip from './components/PartnerStrip'
import Projects from './components/Projects'
import CtaBand from './components/CtaBand'
import Corridors from './components/Corridors'
import WhyAbout from './components/WhyAbout'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Fab from './components/Fab'

export default function App() {
  const [skip] = useState(() => shouldSkipPreloader())
  const [ready, setReady] = useState(skip)
  useSmoothScroll(ready)

  return (
    <>
      {!skip && <Preloader onDone={() => setReady(true)} />}
      <Cursor />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <PartnerStrip />
        <Projects />
        <CtaBand />
        <Corridors />
        <WhyAbout />
        <Process />
        <Contact />
      </main>
      <Footer />
      <Fab ready={ready} />
    </>
  )
}
