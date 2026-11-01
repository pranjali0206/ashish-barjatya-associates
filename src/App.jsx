import { useState } from 'react'
import useSmoothScroll from './hooks/useSmoothScroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Partners from './components/Partners'
import About from './components/About'
import Omaxe from './components/Omaxe'
import Godrej from './components/Godrej'
import Why from './components/Why'
import Corridors from './components/Corridors'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Fab from './components/Fab'

export default function App() {
  const [ready, setReady] = useState(false)
  useSmoothScroll(ready)

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Partners />
        <About />
        <Omaxe />
        <Godrej />
        <Why />
        <Corridors />
        <Process />
        <Contact />
      </main>
      <Footer />
      <Fab ready={ready} />
    </>
  )
}
