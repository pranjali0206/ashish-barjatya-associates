import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplitText from './SplitText'
import Magnetic from './Magnetic'
import useCountUp from '../hooks/useCountUp'
import { img, wa } from '../data'
import { scrollToId } from '../hooks/useSmoothScroll'

const EASE = [0.22, 1, 0.36, 1]
const fade = (ready, delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: ready ? { opacity: 1, y: 0 } : {},
  transition: { duration: 1.1, ease: EASE, delay },
})

function Stat({ n, suffix, label, ready, delay }) {
  const v = useCountUp(n, ready, 1600, delay)
  return (
    <div className="hstat">
      <b>{v}{suffix && <sup>{suffix}</sup>}</b>
      <span>{label}</span>
    </div>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const copyO = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="wrap hero-grid">
        {/* ── Copy ─────────────────────────────────────── */}
        <motion.div className="hero-copy" style={{ y: copyY, opacity: copyO }}>
          <motion.span className="hero-kicker" {...fade(ready, 0.45)}>
            Authorised Partner &nbsp;·&nbsp; Omaxe &amp; Godrej Properties
          </motion.span>

          <SplitText as="h1" className="hero-h1" go={ready} delay={0.6} stagger={0.09} duration={1.3} lines={['Twenty years.', 'Every address,', 'built on trust.']} />

          <motion.p className="hero-lede" {...fade(ready, 1.15)}>
            Two decades beside the developers who shaped Indore's townships — and one call that takes you from first conversation to possession.
          </motion.p>

          <motion.div className="hero-actions" {...fade(ready, 1.3)}>
            <Magnetic><a className="btn btn-navy" href="#omaxe" onClick={(e) => { e.preventDefault(); scrollToId('#omaxe') }}>Explore projects</a></Magnetic>
            <a className="textlink" href={wa('Hello, I would like to discuss a plot requirement in Indore.')} target="_blank" rel="noopener">WhatsApp us</a>
          </motion.div>

          <motion.div className="hero-stats" {...fade(ready, 1.5)}>
            <Stat n={20} suffix="+" label="Years in Indore" ready={ready} delay={1500} />
            <Stat n={8} label="Projects represented" ready={ready} delay={1620} />
            <Stat n={100} suffix="+" label="Families settled" ready={ready} delay={1740} />
          </motion.div>
        </motion.div>

        {/* ── Image ────────────────────────────────────── */}
        <div className="hero-media">
          <motion.div className="hero-frame" initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={ready ? { clipPath: 'inset(0% 0 0 0)' } : {}} transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}>
            <motion.div className="hero-img" style={{ y: imgY }}>
              <motion.img src={img('godrej-greenview.jpg')} alt="Godrej Greenview Estate clubhouse at dusk, Indore–Ujjain Road" initial={{ scale: 1.18 }} animate={ready ? { scale: 1 } : {}} transition={{ duration: 2.6, ease: EASE, delay: 0.35 }} fetchPriority="high" />
            </motion.div>
          </motion.div>
          <motion.span className="hero-frame-line" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 1.2, delay: 1.4 }} />
          <motion.div className="hero-caption" {...fade(ready, 1.6)}>
            <span>Godrej Greenview Estate</span>
            <small>Indore–Ujjain Road</small>
          </motion.div>
          <motion.div className="hero-twenty" initial={{ opacity: 0, y: 30 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.4, ease: EASE, delay: 1.0 }} aria-hidden="true">
            <b>20</b>
            <i>years<br />of trust</i>
          </motion.div>
        </div>
      </div>

      <motion.div className="scroll-cue" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 2.2 }}>
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}
