import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { wa, PHONE_RAW } from '../data'
import { PhoneIcon, WaIcon } from './Icons'

const MSG = 'Hello, I would like to know about plots in the Omaxe and Godrej townships in Indore.'

export default function Fab() {
  const [formVisible, setFormVisible] = useState(false)

  // the contact form already offers WhatsApp, so the floating button and mobile bar step aside while it is on screen
  useEffect(() => {
    const el = document.querySelector('[data-contact-form]')
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <motion.a className={`wa-fab${formVisible ? ' hide' : ''}`} href={wa(MSG)} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" tabIndex={formVisible ? -1 : 0}
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: formVisible ? 0 : 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: .9 }}>
        <span className="tip">Chat on WhatsApp</span><WaIcon />
      </motion.a>
      <div className={`mbar${formVisible ? ' away' : ''}`} aria-label="Quick contact">
        <a className="btn btn-wa" href={`tel:+${PHONE_RAW}`}><PhoneIcon />Call</a>
        <a className="btn btn-wa" href={wa(MSG)} target="_blank" rel="noopener"><WaIcon />WhatsApp</a>
      </div>
    </>
  )
}
