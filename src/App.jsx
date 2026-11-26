import { useEffect, useState } from 'react'
import useSmoothScroll, { getLenis } from './hooks/useSmoothScroll'
import { subscribeRoute, takePendingScroll } from './nav'
import { estateBySlug } from './estates'
import Nav from './components/Nav'
import HeroHalo from './components/HeroHalo'
import ProofStrip from './components/ProofStrip'
import LifeRibbon from './components/LifeRibbon'
import Projects from './components/Projects'
import FeaturedProject from './components/FeaturedProject'
import Location from './components/Location'
import Founders from './components/Founders'
import Awards from './components/Awards'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Fab from './components/Fab'
import EstatePage from './components/EstatePage'

const estateForPath = (path) => {
  const m = path.match(/^\/projects\/([^/]+)\/?$/)
  return m ? estateBySlug(m[1]) : null
}

export default function App() {
  useSmoothScroll()
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => subscribeRoute(setPath), [])

  const estate = estateForPath(path)

  // after returning home, honour a pending scroll from a sub-page link
  useEffect(() => {
    if (estate) return
    const p = takePendingScroll()
    if (p) requestAnimationFrame(() => {
      const el = document.querySelector(p.id)
      if (el) { const l = getLenis(); l ? l.scrollTo(el, { offset: p.offset || 0 }) : el.scrollIntoView() }
    })
  }, [path, estate])

  if (estate) return <EstatePage estate={estate} />

  return (
    <>
      <Nav />
      <main>
        <HeroHalo />
        <ProofStrip />
        <Projects />
        <FeaturedProject />
        <LifeRibbon />
        <Location />
        <Founders />
        <Awards />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Fab />
    </>
  )
}
