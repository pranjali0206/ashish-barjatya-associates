import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { wa, PHONE_RAW } from '../data'
import { scrollToId } from '../hooks/useSmoothScroll'

const WA = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2m0 1.67c4.56 0 8.24 3.68 8.24 8.24s-3.68 8.24-8.24 8.24c-1.5 0-2.97-.4-4.25-1.17l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.56 3.68-8.24 8.24-8.24m-3.4 4.4c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.3 3.78 2.1.84 2.52.67 2.98.63.46-.04 1.48-.6 1.69-1.19.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.12-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.12-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.38-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.5z" /></svg>
)

export default function Fab({ ready }) {
  const [bar, setBar] = useState(false)
  useEffect(() => {
    const f = () => setBar(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', f, { passive: true }); f()
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <>
      <motion.a className="wa-fab" href={wa('Hello, I would like to discuss a plot requirement in Indore with Ashish Barjatya Associates.')} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" data-cursor="Chat"
        initial={{ scale: 0, opacity: 0 }} animate={ready ? { scale: 1, opacity: 1 } : {}} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 2.2 }}>
        <span className="tip">Chat on WhatsApp</span><WA />
      </motion.a>
      <div className={`mbar${bar ? ' show' : ''}`}>
        <a className="btn btn-ghost-dark" href={`tel:+${PHONE_RAW}`}>Call Now</a>
        <a className="btn btn-gold" href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('#contact') }}>Book a Visit</a>
      </div>
    </>
  )
}
