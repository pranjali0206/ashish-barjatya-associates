import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import SplitText from './SplitText'
import Magnetic from './Magnetic'
import useCountUp from '../hooks/useCountUp'
import { img, wa } from '../data'
import { scrollToId } from '../hooks/useSmoothScroll'

const EASE = [0.22, 1, 0.36, 1]
const DUR = 6500

const SLIDES = [
  { src: 'godrej-verdania.jpg', title: 'Godrej Verdania Estate', place: 'Bypass Road, Mangliya', pos: 'center 68%' },
  { src: 'godrej-township.jpg', title: 'Godrej Greenview Estate', place: 'Indore–Ujjain Road', pos: 'center 58%' },
  { src: 'omaxe-township.jpg', title: 'Omaxe Townships', place: 'Super Corridor · Rau · Mangliya', pos: 'center 62%' },
]

const fade = (ready, delay, y = 22) => ({
  initial: { opacity: 0, y },
  animate: ready ? { opacity: 1, y: 0 } : {},
  transition: { duration: 1.2, ease: EASE, delay },
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
  const [idx, setIdx] = useState(0)

  // slideshow
  useEffect(() => {
    if (!ready) return
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), DUR)
    return () => clearInterval(t)
  }, [ready, idx])

  // mouse parallax (image drifts with the cursor, copy drifts against it)
  const mx = useMotionValue(0), my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 40, damping: 20, mass: 1.2 })
  const smy = useSpring(my, { stiffness: 40, damping: 20, mass: 1.2 })
  const imgX = useTransform(smx, [-1, 1], [-18, 18]), imgY = useTransform(smy, [-1, 1], [-12, 12])
  const txtX = useTransform(smx, [-1, 1], [10, -10]), txtY = useTransform(smy, [-1, 1], [6, -6])
  const onMove = (e) => { mx.set((e.clientX / window.innerWidth - 0.5) * 2); my.set((e.clientY / window.innerHeight - 0.5) * 2) }
  const onLeave = () => { mx.set(0); my.set(0) }

  // scroll: copy lifts and fades, image sinks
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bodyY = useTransform(scrollYProgress, [0, 1], ['0%', '-28%'])
  const bodyO = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const stageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  const slide = SLIDES[idx]

  return (
    <section className="hero" id="top" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      {/* ── Cinematic stage ───────────────────────────── */}
      <motion.div className="hero-stage" style={{ x: imgX, y: imgY }}>
        <motion.div style={{ y: stageY, position: 'absolute', inset: 0 }}>
          <AnimatePresence initial={false}>
            <motion.div key={idx} className="hero-slide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.8, ease: 'easeInOut' }}>
              <motion.img
                src={img(slide.src)}
                alt=""
                style={{ objectPosition: slide.pos }}
                initial={{ scale: 1.14 }}
                animate={{ scale: 1 }}
                transition={{ duration: DUR / 1000 + 2, ease: 'linear' }}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-grain" aria-hidden="true" />

      {/* ── Copy ──────────────────────────────────────── */}
      <motion.div className="wrap hero-body" style={{ y: bodyY, opacity: bodyO }}>
        <motion.div className="hero-copy" style={{ x: txtX, y: txtY }}>
          <motion.span className="hero-kicker" {...fade(ready, 0.5, 0)}>
            <i /> Omaxe &amp; Godrej Properties &nbsp;·&nbsp; Authorised Partner &nbsp;·&nbsp; Twenty Years
          </motion.span>

          <SplitText as="h1" className="hero-h1" go={ready} delay={0.7} stagger={0.11} duration={1.4} lines={['Where *dreams*', 'find their address.']} />

          <motion.p className="hero-lede" {...fade(ready, 1.35)}>
            A plot on a map becomes a family's forever. For twenty years we have walked that journey beside you — from the first site visit to the day you hold the keys.
          </motion.p>

          <motion.div className="hero-actions" {...fade(ready, 1.5)}>
            <Magnetic><a className="btn btn-light" href="#omaxe" onClick={(e) => { e.preventDefault(); scrollToId('#omaxe') }}>Begin your journey</a></Magnetic>
            <a className="textlink light" href={wa('Hello, I would like to discuss a plot requirement.')} target="_blank" rel="noopener">Talk on WhatsApp</a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Editorial bar ─────────────────────────────── */}
      <motion.div className="hero-bar" {...fade(ready, 1.7, 0)}>
        <div className="wrap hero-bar-in">
          <div className="hero-stats">
            <Stat n={20} suffix="+" label="Years of trust" ready={ready} delay={1700} />
            <Stat n={8} label="Signature projects" ready={ready} delay={1820} />
            <Stat n={100} suffix="+" label="Families home" ready={ready} delay={1940} />
          </div>
          <div className="hero-meta">
            <AnimatePresence mode="wait">
              <motion.div key={idx} className="hero-cap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.7, ease: EASE }}>
                <span>{slide.title}</span>
                <small>{slide.place}</small>
              </motion.div>
            </AnimatePresence>
            <div className="hero-count" aria-label={`Slide ${idx + 1} of ${SLIDES.length}`}>
              <span>0{idx + 1}</span>
              <i className="bar"><motion.b key={idx} initial={{ scaleX: 0 }} animate={ready ? { scaleX: 1 } : {}} transition={{ duration: DUR / 1000, ease: 'linear' }} /></i>
              <span>0{SLIDES.length}</span>
            </div>
            <div className="hero-dots">
              {SLIDES.map((s, i) => <button key={s.src} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)} aria-label={`Show ${s.title}`} />)}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="scroll-cue" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 2.4 }}>
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}
