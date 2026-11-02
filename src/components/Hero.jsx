import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplitText from './SplitText'
import { img, wa, STATS, HINDI_LINE } from '../data'
import { scrollToId } from '../hooks/useSmoothScroll'

const EASE = [0.22, 1, 0.36, 1]
// Swap the filename to change the hero image (public/img). Ideal: ≥1920px wide, landscape.
const HERO_IMAGE = 'hero-skyline.jpg'

const fade = (ready, delay, y = 18) => ({
  initial: { opacity: 0, y },
  animate: ready ? { opacity: 1, y: 0 } : {},
  transition: { duration: .8, ease: EASE, delay },
})

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const copyO = useTransform(scrollYProgress, [0, .7], [1, 0])

  return (
    <div className="hero-wrap" id="top">
      <section className="hero" ref={ref} aria-label="Introduction">
        <motion.div className="hero-stage" style={{ y: bgY }}>
          <motion.img src={img(HERO_IMAGE)} alt="" style={{ objectPosition: '62% 40%' }} initial={{ scale: 1.06 }} animate={ready ? { scale: 1 } : {}} transition={{ duration: 9, ease: 'linear' }} fetchpriority="high" />
        </motion.div>
        <div className="hero-shade" />

        <motion.div className="wrap hero-body" style={{ y: copyY, opacity: copyO }}>
          <motion.span className="hero-kicker" {...fade(ready, .1, 0)}>Authorised channel partner · Omaxe &amp; Godrej Properties</motion.span>
          <SplitText as="h1" className="hero-h1" go={ready} delay={.15} stagger={.06} duration={.9} lines={['Where dreams', 'find their address.']} />
          <motion.p className="hero-lede" {...fade(ready, .4)}>
            Residential plots in Omaxe and Godrej townships across Indore — papers checked before you pay a rupee, and one advisor beside you from the first site visit to the registry.
          </motion.p>
          {HINDI_LINE && <motion.p className="hero-hindi" lang="hi" {...fade(ready, .5)}>{HINDI_LINE}</motion.p>}
          <motion.div className="hero-actions" {...fade(ready, .55)}>
            <a className="btn btn-gold" href="#projects" onClick={(e) => { e.preventDefault(); scrollToId('#projects') }}>Explore projects</a>
            <a className="btn btn-light" href={wa('Hello, I would like to talk to an advisor about a plot in Indore.')} target="_blank" rel="noopener">Talk to an advisor</a>
          </motion.div>
        </motion.div>
      </section>

      <div className="wrap hero-badge-row">
        <motion.div className="hero-badge" {...fade(ready, .65, 26)}>
          {STATS.map((s) => (
            <div className="hb-stat" key={s.l1}>
              <b>{s.n}</b>
              <span>{s.l1}<br />{s.l2}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
