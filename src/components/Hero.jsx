import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import SplitText from './SplitText'
import Magnetic from './Magnetic'
import useCountUp from '../hooks/useCountUp'
import { img, wa } from '../data'
import { scrollToId } from '../hooks/useSmoothScroll'

const EASE = [0.22, 1, 0.36, 1]
const DUR = 7000

// Swap the filename here to change the hero image (one entry = static image, several = slow crossfade).
const SLIDES = [
  { src: 'hero-skyline.jpg', pos: '62% 40%' },
]

const fade = (ready, delay, y = 22) => ({
  initial: { opacity: 0, y },
  animate: ready ? { opacity: 1, y: 0 } : {},
  transition: { duration: 1.1, ease: EASE, delay },
})

function Stat({ n, suffix, l1, l2, ready, delay }) {
  const v = useCountUp(n, ready, 1500, delay)
  return (
    <div className="hb-stat">
      <b>{v.toLocaleString('en-IN')}{suffix}</b>
      <span>{l1}<br />{l2}</span>
    </div>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (!ready || SLIDES.length < 2) return
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), DUR)
    return () => clearInterval(t)
  }, [ready])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const copyO = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const slide = SLIDES[idx]

  return (
    <div className="hero-wrap" id="top">
      <section className="hero" ref={ref}>
        <motion.div className="hero-stage" style={{ y: bgY }}>
          <AnimatePresence initial={false}>
            <motion.div key={idx} className="hero-slide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease: 'easeInOut' }}>
              <motion.img
                src={img(slide.src)}
                alt=""
                style={{ objectPosition: slide.pos }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: DUR / 1000 + 2, ease: 'linear' }}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="hero-shade" />

        <motion.div className="wrap hero-body" style={{ y: copyY, opacity: copyO }}>
          <motion.span className="hero-kicker" {...fade(ready, 0.45, 0)}>Your property journey, simplified</motion.span>
          <SplitText as="h1" className="hero-h1" go={ready} delay={0.6} stagger={0.08} duration={1.2} lines={['Where dreams', 'find their address.']} />
          <motion.p className="hero-lede" {...fade(ready, 1.15)}>
            An advisor shortlists RERA-verified plots from Omaxe and Godrej Properties, then walks with you from the first site visit to possession.
          </motion.p>
          <motion.div className="hero-actions" {...fade(ready, 1.3)}>
            <Magnetic><a className="btn btn-gold" href="#omaxe" onClick={(e) => { e.preventDefault(); scrollToId('#omaxe') }}>Explore projects</a></Magnetic>
            <Magnetic><a className="btn btn-light" href={wa('Hello, I would like to talk to an advisor about a plot.')} target="_blank" rel="noopener">Talk to an advisor</a></Magnetic>
          </motion.div>
        </motion.div>
      </section>

      {/* Blue stats badge — sits half on the image, half on the white area below */}
      <div className="wrap hero-badge-row">
        <motion.div className="hero-badge" {...fade(ready, 1.5, 30)}>
          <Stat n={10} suffix="+" l1="Years experience in" l2="real estate" ready={ready} delay={1500} />
          <Stat n={100} suffix="+" l1="Happy clients," l2="successfully closed" ready={ready} delay={1650} />
          <Stat n={1000} suffix="+" l1="Dreams waiting to" l2="find their address" ready={ready} delay={1800} />
        </motion.div>
      </div>
    </div>
  )
}
