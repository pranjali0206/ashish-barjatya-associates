import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { img, PHONE, PHONE_RAW, wa } from '../data'
import { scrollToId } from '../hooks/useSmoothScroll'
import { PhoneIcon } from './Icons'

const LINKS = [
  ['Projects', '#projects'],
  ['Location', '#location'],
  ['About us', '#founders'],
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
  useEffect(() => { document.body.classList.toggle('menu-open', open) }, [open])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, id) => { e.preventDefault(); setOpen(false); setTimeout(() => scrollToId(id), open ? 450 : 0) }

  return (
    <>
      <motion.header className={`nav${solid ? ' solid' : ''}${open ? ' open' : ''}`} initial={{ y: -20, opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : {}} transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="wrap nav-in">
          <a href="#top" className="brand" onClick={(e) => go(e, '#top')} aria-label="Ashish Barjatya Associates — top of page">
            <img src={img('aba-logo.jpeg')} alt="" width="42" height="42" />
            <span><span className="brand-name">Ashish Barjatya</span><span className="brand-sub">Associates · Indore</span></span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map(([t, h]) => <a key={h} href={h} onClick={(e) => go(e, h)}>{t}</a>)}
          </nav>
          <div className="nav-right">
            <a className="nav-phone" href={`tel:+${PHONE_RAW}`}><PhoneIcon />{PHONE}</a>
            <button className={`burger${open ? ' x' : ''}`} onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="site-menu"><span /><span /></button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div id="site-menu" className="menu" role="dialog" aria-modal="true" aria-label="Menu" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: .7, ease: EASE }}>
            <nav className="wrap menu-in" aria-label="Menu">
              <ul>
                {LINKS.map(([t, h], i) => (
                  <li key={h}>
                    <motion.a href={h} onClick={(e) => go(e, h)} initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-40%', opacity: 0 }} transition={{ duration: .7, ease: [0.22, 1, 0.36, 1], delay: .15 + i * .06 }}>
                      <small>0{i + 1}</small>{t}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div className="menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }}>
                <a href={`tel:+${PHONE_RAW}`}>{PHONE}</a>
                <a href={wa('Hello, I would like to know about plots in the Omaxe and Godrej townships.')} target="_blank" rel="noopener">WhatsApp →</a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
