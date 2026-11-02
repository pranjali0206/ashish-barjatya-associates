import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KEY = 'aba-seen'
export const shouldSkipPreloader = () => {
  try { return !!sessionStorage.getItem(KEY) || window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return true }
}

export default function Preloader({ onDone }) {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => { setShow(false); try { sessionStorage.setItem(KEY, '1') } catch {} }, 550)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div className="preloader" exit={{ opacity: 0 }} transition={{ duration: .45, ease: 'easeOut' }}>
          <motion.div className="pre-name" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
            Ashish Barjatya<small>Associates · Indore</small>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
