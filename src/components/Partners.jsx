import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SplitText from './SplitText'
import { Reveal } from './Reveal'
import { img } from '../data'
import { scrollToId } from '../hooks/useSmoothScroll'

function TiltCard({ children, href, delay }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5), my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 120, damping: 18 })
  const gx = useTransform(mx, [0, 1], ['0%', '100%'])
  const gy = useTransform(my, [0, 1], ['0%', '100%'])
  const onMove = (e) => { const r = ref.current.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height) }
  const onLeave = () => { mx.set(0.5); my.set(0.5) }
  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={(e) => { e.preventDefault(); scrollToId(href) }}
      className="partner"
      data-cursor="Explore"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <motion.span className="partner-glow" style={{ '--gx': gx, '--gy': gy }} />
      {children}
    </motion.a>
  )
}

export default function Partners() {
  return (
    <section className="partners" id="partners">
      <div className="wrap">
        <div className="sec-head center">
          <Reveal as="span" className="eyebrow" amount={0.8}>Authorised Channel Partner</Reveal>
          <SplitText as="h2" lines={['Two legacies.', 'One trusted partner.']} />
          <Reveal className="lede" delay={0.2}>We represent a deliberately limited portfolio — so every project we put forward is one we can speak about honestly, and stand behind through possession.</Reveal>
        </div>
        <div className="partner-grid">
          <TiltCard href="#omaxe" delay={0}>
            <span className="partner-tag">6 Projects</span>
            <div className="partner-logo"><img src={img('omaxe-logo.png')} alt="Omaxe — Turning dreams into reality" /></div>
            <h3>Omaxe</h3>
            <p>One of India's largest township developers, present across 31 cities in 8 states. In and around Indore we represent its plotted and residential portfolio — from the Super Corridor to Rau, Mangliya and Mayakhedi.</p>
            <div className="meta"><div><b>4</b><span>Indore projects</span></div><div><b>8</b><span>States</span></div><div><b>25<sup>+</sup></b><span>Years legacy</span></div></div>
            <span className="link">View Omaxe portfolio</span>
          </TiltCard>
          <TiltCard href="#godrej" delay={0.15}>
            <span className="partner-tag">2 Projects</span>
            <div className="partner-logo godrej"><img src={img('godrej-properties-logo.svg')} alt="Godrej Properties" /></div>
            <h3>Godrej Properties</h3>
            <p>Carrying forward the 128-year legacy of the Godrej Group, Godrej Properties brings one of the most trusted names in Indian real estate to Indore — with RERA-registered plotted estates on the city's key growth corridors.</p>
            <div className="meta"><div><b>2</b><span>Indore estates</span></div><div><b>RERA</b><span>Registered</span></div><div><b>128<sup>+</sup></b><span>Years legacy</span></div></div>
            <span className="link">View Godrej portfolio</span>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}
