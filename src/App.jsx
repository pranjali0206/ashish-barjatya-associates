import { useState } from 'react'
import useSmoothScroll from './hooks/useSmoothScroll'
import Preloader, { shouldSkipPreloader } from './components/Preloader'
import Nav from './components/Nav'
import HeroHalo from './components/HeroHalo'
import ProofStrip from './components/ProofStrip'
import LifeRibbon from './components/LifeRibbon'
import Projects from './components/Projects'
import Location from './components/Location'
import Founders from './components/Founders'
import Awards from './components/Awards'
import Faq from './components/Faq'
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
      <Nav ready={ready} />
      <main>
        <HeroHalo />
        <ProofStrip />
        <LifeRibbon />
        <Projects />
        <Location />
        <Founders />
        <Awards />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Fab ready={ready} />
    </>
  )
}
