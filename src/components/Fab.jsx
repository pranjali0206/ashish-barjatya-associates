import { motion } from 'framer-motion'
import { wa, PHONE_RAW } from '../data'
import { PhoneIcon, WaIcon } from './Icons'

const MSG = 'Hello, I would like to know about plots in the Omaxe and Godrej townships in Indore.'

export default function Fab({ ready }) {
  return (
    <>
      <motion.a className="wa-fab" href={wa(MSG)} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" data-cursor="Chat"
        initial={{ scale: 0, opacity: 0 }} animate={ready ? { scale: 1, opacity: 1 } : {}} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: .9 }}>
        <span className="tip">Chat on WhatsApp</span><WaIcon />
      </motion.a>
      <div className="mbar" aria-label="Quick contact">
        <a className="btn btn-outline" href={`tel:+${PHONE_RAW}`}><PhoneIcon />Call</a>
        <a className="btn btn-wa" href={wa(MSG)} target="_blank" rel="noopener"><WaIcon />WhatsApp</a>
      </div>
    </>
  )
}
