import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.76, 0, 0.24, 1]

export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    let raf, t0
    const dur = 1700
    const step = (t) => {
      if (!t0) t0 = t
      const p = Math.min(1, (t - t0) / dur)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(step)
      else setTimeout(() => setShow(false), 350)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const word = 'Ashish Barjatya'
  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div className="preloader" exit={{ y: '-100%' }} transition={{ duration: 1.05, ease: EASE }}>
          <div className="pre-inner">
            <div className="pre-name">
              {word.split('').map((c, i) => (
                <motion.span key={i} initial={{ y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.035 }}>
                  {c === ' ' ? ' ' : c}
                </motion.span>
              ))}
            </div>
            <motion.div className="pre-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
              Associates · Indore · Est. two decades
            </motion.div>
          </div>
          <div className="pre-count">{String(n).padStart(3, '0')}</div>
          <motion.div className="pre-bar" style={{ scaleX: n / 100 }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
