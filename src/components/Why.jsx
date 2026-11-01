import { motion } from 'framer-motion'
import SplitText from './SplitText'
import { Reveal } from './Reveal'
import { WHY } from '../data'

export default function Why() {
  return (
    <section className="why" id="why">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <Reveal as="span" className="eyebrow gold" amount={0.8}>Why Clients Choose Us</Reveal>
            <SplitText as="h2" lines={['The difference is', 'everything before —', 'and after — the booking.']} />
          </div>
          <Reveal className="lede" delay={0.15}>Twenty years in one city, with a limited portfolio, means we know the corridors, the developers and the paperwork — and we stay on the other end of the phone after possession.</Reveal>
        </div>
        <div className="why-grid">
          {WHY.map((w, i) => (
            <motion.div className="why-item" key={w.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.12 }}>
              <span className="n">{w.n}</span>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
              <span className="why-line" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
