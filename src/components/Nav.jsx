import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic'
import { img, PHONE, PHONE_RAW, wa } from '../data'
import { scrollToId } from '../hooks/useSmoothScroll'

const LINKS = [
  ['Partners', '#partners'],
  ['About', '#about'],
  ['Omaxe', '#omaxe'],
  ['Godrej', '#godrej'],
  ['Why Us', '#why'],
  ['Contact', '#contact'],
]
const EASE = [0.76, 0, 0.24, 1]

export default function Nav({ ready }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', f, { passive: true }); f()
    return () => window.removeEventListener('scroll', f)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
  }, [open])

  const go = (e, id) => { e.preventDefault(); setOpen(false); setTimeout(() => scrollToId(id), open ? 500 : 0) }

  return (
    <>
      <motion.header className={`nav${solid ? ' solid' : ''}${open ? ' open' : ''}`} initial={{ y: -30, opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
        <div className="wrap nav-in">
          <a href="#top" className="brand" onClick={(e) => go(e, '#top')} aria-label="Ashish Barjatya Associates">
            <img src={img('aba-logo.jpeg')} alt="" width="44" height="44" />
            <span><span className="brand-name">Ashish Barjatya</span><span className="brand-sub">Associates · Indore</span></span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map(([t, h]) => <a key={h} href={h} onClick={(e) => go(e, h)}><span data-text={t}>{t}</span></a>)}
          </nav>
          <div className="nav-right">
            <Magnetic><a className="btn btn-ghost nav-cta" href="#contact" onClick={(e) => go(e, '#contact')}>Schedule a Visit</a></Magnetic>
            <button className={`burger${open ? ' x' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}><span /><span /></button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="menu" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.9, ease: EASE }}>
            <div className="wrap menu-in">
              <ul>
                {LINKS.map(([t, h], i) => (
                  <li key={h}>
                    <motion.a href={h} onClick={(e) => go(e, h)} initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-40%', opacity: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.07 }}>
                      <small>0{i + 1}</small>{t}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div className="menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <a href={`tel:+${PHONE_RAW}`}>{PHONE}</a>
                <a href={wa('Hello, I would like to discuss a plot requirement in Indore.')} target="_blank" rel="noopener">WhatsApp →</a>
                <span>Indore, Madhya Pradesh</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
