import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from './SplitText'
import { Reveal } from './Reveal'
import { CORRIDORS, img } from '../data'

export default function Corridors() {
  const [active, setActive] = useState(0)
  return (
    <section className="corridors">
      <div className="wrap corr-grid">
        <div>
          <Reveal as="span" className="eyebrow" amount={0.8}>Local Expertise</Reveal>
          <SplitText as="h2" lines={['Rooted in Indore.', 'Focused on', 'what comes next.']} />
          <Reveal className="lede" delay={0.1}>Indore is the largest city in Madhya Pradesh and its commercial capital — home to IIT and IIM, and consistently ranked India's cleanest city. Its growth moves along a handful of corridors, and every project we represent sits on one of them.</Reveal>
          <ul className="corr-list">
            {CORRIDORS.map((c, i) => (
              <motion.li key={c.t} className={i === active ? 'on' : ''} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} tabIndex={0} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}>
                <b><small>0{i + 1}</small>{c.t}</b>
                <p>{c.d}</p>
              </motion.li>
            ))}
          </ul>
        </div>
        <Reveal className="corr-media" delay={0.1} amount={0.3}>
          <AnimatePresence mode="sync">
            <motion.img key={active} src={img(CORRIDORS[active].image)} alt={CORRIDORS[active].t} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
          </AnimatePresence>
          <div className="corr-cap"><span>{CORRIDORS[active].t}</span></div>
        </Reveal>
      </div>
    </section>
  )
}
