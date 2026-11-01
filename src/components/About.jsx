import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplitText from './SplitText'
import { Reveal, ImageReveal } from './Reveal'
import { img } from '../data'

function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={`scroll-words ${className}`}>
      {words.map((w, i) => {
        const start = i / words.length, end = start + 1 / words.length
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{w}</Word>
      })}
    </p>
  )
}
function Word({ children, progress, range }) {
  const o = useTransform(progress, range, [0.18, 1])
  return <span className="sw"><motion.span style={{ opacity: o }}>{children}</motion.span>{' '}</span>
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const py = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="about" id="about" ref={ref}>
      <div className="wrap about-grid">
        <div className="about-media">
          <motion.div style={{ y: py }}>
            <ImageReveal src={img('ashish-barjatya.jpg')} alt="Ashish Barjatya, Founder & Principal" className="frame" amount={0.25} />
          </motion.div>
          <motion.div className="about-badge" initial={{ opacity: 0, scale: 0.8, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}>
            <b>20<sup>+</sup></b><span>Years of trust</span>
          </motion.div>
        </div>
        <div className="about-copy">
          <Reveal as="span" className="eyebrow" amount={0.8}>About Ashish Barjatya</Reveal>
          <SplitText as="h2" lines={['Built on relationships', 'that outlast', 'the transaction.']} />
          <ScrollWords text="Ashish Barjatya Associates is a founder-led real estate advisory built over two decades in Indore. We have grown alongside the city — from its first organised townships to today's Super Corridor and Indore–Ujjain growth axis — and have represented Omaxe and Godrej Properties through every stage of that journey." />
          <ScrollWords text="Credibility in real estate is not claimed. It accumulates — through transactions that closed cleanly, documentation that was verified before commitment, and clients who came back and brought their families." />
          <Reveal as="blockquote" className="quote" delay={0.1}>
            "There is no shortage of people willing to sell you a plot in Indore. The difference is in what happens before and after."
          </Reveal>
          <Reveal className="founders" delay={0.2}>
            <div className="founder"><img src={img('ashish-barjatya.jpg')} alt="" /><div><b>Ashish Barjatya</b><span>Founder &amp; Principal</span></div></div>
            <div className="founder"><img src={img('rajneesh-jain.jpg')} alt="" /><div><b>Rajneesh Jain</b><span>Founder</span></div></div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
