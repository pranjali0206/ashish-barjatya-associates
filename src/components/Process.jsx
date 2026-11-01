import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SplitText from './SplitText'
import { Reveal } from './Reveal'
import { PROCESS } from '../data'

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] })
  const sx = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })
  return (
    <section className="process">
      <div className="wrap">
        <div className="sec-head center">
          <Reveal as="span" className="eyebrow" amount={0.8}>How We Work</Reveal>
          <SplitText as="h2" lines={['A considered process.']} />
          <Reveal className="lede" delay={0.15}>No two requirements are identical, but the sequence rarely changes.</Reveal>
        </div>
        <div className="process-grid" ref={ref}>
          <motion.span className="process-line" style={{ scaleX: sx }} />
          {PROCESS.map((s, i) => (
            <Reveal className="step" key={s.t} delay={i * 0.1} amount={0.5}>
              <span className="step-n">0{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
