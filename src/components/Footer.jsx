import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { img, wa, PHONE, PHONE_RAW } from '../data'
import { scrollToId } from '../hooks/useSmoothScroll'

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const go = (e, id) => { e.preventDefault(); scrollToId(id) }
  return (
    <footer className="footer" ref={ref}>
      <div className="foot-word" aria-hidden="true"><motion.span style={{ x }}>Ashish Barjatya</motion.span></div>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a href="#top" className="brand" onClick={(e) => go(e, '#top')}>
              <img src={img('aba-logo.jpeg')} alt="" width="44" height="44" />
              <span><span className="brand-name">Ashish Barjatya</span><span className="brand-sub">Associates · Indore</span></span>
            </a>
            <p>A real estate consultancy built on 20 years of experience, relationships and an intimate understanding of Indore's evolving property landscape.</p>
          </div>
          <div><h4>Omaxe</h4><ul><li><a href="#omaxe" onClick={(e) => go(e, '#omaxe')}>Omaxe City 1</a></li><li><a href="#omaxe" onClick={(e) => go(e, '#omaxe')}>Omaxe City 2</a></li><li><a href="#omaxe" onClick={(e) => go(e, '#omaxe')}>Omaxe Hills</a></li><li><a href="#omaxe" onClick={(e) => go(e, '#omaxe')}>Omaxe Corridor</a></li></ul></div>
          <div><h4>Godrej Properties</h4><ul><li><a href="#godrej" onClick={(e) => go(e, '#godrej')}>Godrej Greenview Estate</a></li><li><a href="#godrej" onClick={(e) => go(e, '#godrej')}>Godrej Verdania Estate</a></li></ul></div>
          <div><h4>Contact</h4><ul><li><a href={`tel:+${PHONE_RAW}`}>{PHONE}</a></li><li><a href={wa('Hello')} target="_blank" rel="noopener">WhatsApp</a></li><li>Indore, Madhya Pradesh</li><li><a href="https://ashishbarjatyaassociates.com" target="_blank" rel="noopener">ashishbarjatyaassociates.com</a></li></ul></div>
        </div>
        <p className="fine">Ashish Barjatya Associates is an independent channel partner. Project names, logos and trademarks belong to their respective developers — Omaxe Limited and Godrej Properties Limited. Prices, plot sizes, availability and approvals are indicative and subject to change without notice. Buyers are advised to verify all project details, RERA registration and legal documentation independently before making any commitment.</p>
        <div className="copy"><span>© {new Date().getFullYear()} Ashish Barjatya Associates. All rights reserved.</span><span>Indore · Madhya Pradesh</span></div>
      </div>
    </footer>
  )
}
