import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SplitText from './SplitText'
import { Reveal } from './Reveal'
import { PROCESS } from '../data'

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] })
  const sx = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })
  return (
    <section className="process" id="process">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <Reveal as="span" className="eyebrow" amount={.8}>What happens after you message</Reveal>
            <SplitText as="h2" lines={['From first call to registry,', 'in four clear steps.']} />
          </div>
        </div>
        <div className="steps" ref={ref}>
          <motion.span className="steps-line" style={{ scaleX: sx }} aria-hidden="true" />
          {PROCESS.map((s, i) => (
            <Reveal className="step" key={s.n} delay={i * .08} amount={.5}>
              <small>{s.n} · {s.when}</small>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
