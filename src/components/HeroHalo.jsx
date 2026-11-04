import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { img, wa, PHONE, PHONE_RAW, DEVELOPERS, PROJECTS, YEARS } from '../data'
import { scrollToId } from '../hooks/useSmoothScroll'
import s from './HeroHalo.module.css'

const LINKS = [
  ['Projects', '#projects'],
  ['Location', '#location'],
  ['About us', '#founders'],
  ['Contact', '#contact'],
]

// Design-space size of the desktop stage (seal + connectors + partner cards + caption), shown on the right of the hero. It is scaled to fit its column.
const DESKTOP = { w: 600, h: 490 }

// Skyline line-art backdrop: deterministic towers so it never reshuffles between renders.
const SKY = (() => {
  let seed = 7
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
  let x = -10, d = ''
  while (x < 1450) {
    const w = 38 + Math.round(rnd() * 56)
    const h = 70 + Math.round(rnd() * 190)
    const y = 320 - h
    d += `M${x} 320V${y}H${x + w}V320`
    for (let fy = y + 18; fy < 316; fy += 18) d += `M${x} ${fy}H${x + w}`
    if (rnd() > 0.6) d += `M${x + w / 2} ${y}V${y - 18}`
    x += w + 6 + Math.round(rnd() * 14)
  }
  return d
})()

function Skyline() {
  return (
    <svg className={s.skyline} viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="skyfade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1D4ED8" stopOpacity="0" />
          <stop offset="1" stopColor="#1D4ED8" stopOpacity=".05" />
        </linearGradient>
      </defs>
      <path d={SKY} fill="url(#skyfade)" stroke="#1D4ED8" strokeOpacity=".09" strokeWidth="1" />
      <path d="M0 319.5H1440" stroke="#E0B43C" strokeOpacity=".7" strokeWidth="1.5" />
    </svg>
  )
}

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

const TRUST = [
  'RERA-registered projects',
  'Papers checked before you pay',
  "Developer's price, no broker fee",
]

const SPRING = { stiffness: 60, damping: 18, mass: 1 }
const SPRING_SLOW = { stiffness: 45, damping: 16, mass: 1 }

const ArrowSmall = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
const ChevronIcon = ({ open }) => (
  <svg className={s.chev} data-open={open} viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
)

// One column of the partner bar. Godrej and Omaxe share this component, so neither is ranked above the other.
function Column({ dev, open, onToggle, delayed }) {
  const d = DEVELOPERS[dev]
  return (
    <button type="button" className={`${s.col}${delayed ? ' ' + s.colB : ''}`} onClick={onToggle} aria-expanded={open} aria-haspopup="true" aria-controls={`hh-list-${dev}`} aria-label={`${d.name}: show ${d.count} projects`}>
      <img className={dev === 'godrej' ? s.logoG : s.logoO} src={img(d.logo)} alt="" />
      <span className={s.count}><b>{d.count}</b> townships<ChevronIcon open={open} /></span>
      <i className={s.sheen} aria-hidden="true" />
    </button>
  )
}

function Popover({ dev, side, onPick }) {
  const d = DEVELOPERS[dev]
  const list = PROJECTS.filter((p) => p.dev === dev)
  return (
    <ul className={`${s.pop} ${side === 'l' ? s.popL : s.popR}`} id={`hh-list-${dev}`} aria-label={`${d.name} projects`}>
      {list.map((p) => (
        <li key={p.id}>
          <a href={`#project-${p.id}`} onClick={(e) => onPick(e, p)}>
            <span><b>{p.name}</b><small>{p.area}</small></span>
            <ArrowSmall />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function HeroHalo() {
  const sectionRef = useRef(null)
  const fitRef = useRef(null)
  const stageRef = useRef(null)
  const sealRef = useRef(null)
  const [mw, setMw] = useState(null)
  const [scale, setScale] = useState(1)
  const [mobile, setMobile] = useState(() => window.innerWidth <= 768)
  const [menu, setMenu] = useState(false)
  const [openDev, setOpenDev] = useState(null)
  const [parallaxOn, setParallaxOn] = useState(false)

  const sealX = useSpring(useMotionValue(0), SPRING), sealY = useSpring(useMotionValue(0), SPRING)
  const barX = useSpring(useMotionValue(0), SPRING_SLOW), barY = useSpring(useMotionValue(0), SPRING_SLOW)
  const bgX = useSpring(useMotionValue(0), { stiffness: 35, damping: 15 }), bgY = useSpring(useMotionValue(0), { stiffness: 35, damping: 15 })

  // fit the desktop stage to its container
  useEffect(() => {
    const el = fitRef.current
    if (!el) return
    const measure = () => {
      const isMobile = window.innerWidth <= 768
      setMobile(isMobile)
      if (!isMobile) setScale(Math.min(1.15, el.clientWidth / DESKTOP.w, el.clientHeight / DESKTOP.h))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  // mobile: draw the connectors from the seal's bottom-centre to each socket on the bar (measured, not scaled)
  useEffect(() => {
    if (!mobile) { setMw(null); return }
    const stage = stageRef.current
    if (!stage) return
    const calc = () => {
      const sr = stage.getBoundingClientRect()
      const seal = sealRef.current?.getBoundingClientRect()
      const socks = stage.querySelectorAll('[data-socket]')
      if (!seal || socks.length < 2) return
      const sx = seal.left + seal.width / 2 - sr.left
      const sy = seal.bottom - sr.top
      const paths = [...socks].map((el) => {
        const r = el.getBoundingClientRect()
        const ex = r.left + r.width / 2 - sr.left
        const ey = r.top + r.height / 2 - sr.top
        const d = (ey - sy) * 0.5
        return `M${sx} ${sy} C${sx} ${sy + d} ${ex} ${ey - d} ${ex} ${ey}`
      })
      setMw({ w: sr.width, h: sr.height, sx, sy, paths })
    }
    calc()
    const ro = new ResizeObserver(calc)
    ro.observe(stage)
    const t = setTimeout(calc, 400)
    return () => { ro.disconnect(); clearTimeout(t) }
  }, [mobile])

  // cursor parallax: fine pointer, no reduced motion, desktop width only
  useEffect(() => {
    const q = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 769px) and (prefers-reduced-motion: no-preference)')
    const upd = () => setParallaxOn(q.matches)
    upd()
    q.addEventListener('change', upd)
    return () => q.removeEventListener('change', upd)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    const all = [sealX, sealY, barX, barY, bgX, bgY]
    if (!el || !parallaxOn) { all.forEach((m) => m.set(0)); return }
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      sealX.set(nx * 14); sealY.set(ny * 10)
      barX.set(nx * -18); barY.set(ny * -10)
      bgX.set(nx * 36); bgY.set(ny * 24)
    }
    const leave = () => all.forEach((m) => m.set(0))
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [parallaxOn, sealX, sealY, barX, barY, bgX, bgY])

  // close the project list on Escape or any outside click
  useEffect(() => {
    if (!openDev) return
    const onKey = (e) => { if (e.key === 'Escape') setOpenDev(null) }
    const onDown = (e) => { if (!e.target.closest?.('[data-pickable]')) setOpenDev(null) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown) }
  }, [openDev])

  const pick = (e, p) => {
    e.preventDefault()
    setOpenDev(null)
    window.dispatchEvent(new CustomEvent('goto-project', { detail: { dev: p.dev, id: p.id } }))
  }

  const go = (e, id) => { e.preventDefault(); setMenu(false); scrollToId(id) }
  const toggle = (dev) => setOpenDev(openDev === dev ? null : dev)

  return (
    <div className={s.wrap} id="top">
      <section className={s.hero} ref={sectionRef} aria-label="Introduction">
        <motion.div className={s.ambient} style={{ x: bgX, y: bgY }} aria-hidden="true">
          <span className={s.blob1} /><span className={s.blob2} /><span className={s.blob3} />
          <span className={s.grid} />
          <Skyline />
          <i className={`${s.dot} ${s.d1}`} /><i className={`${s.dot} ${s.d2}`} /><i className={`${s.dot} ${s.d3}`} />
          <i className={`${s.dot} ${s.d4}`} /><i className={`${s.dot} ${s.d5}`} /><i className={`${s.dot} ${s.d6}`} />
        </motion.div>

        <header className={s.header}>
          <a href="#top" className={s.brand} onClick={(e) => go(e, '#top')} aria-label="Ashish Barjatya Associates, top of page">
            <img src={img('aba-logo.jpeg')} alt="Ashish Barjatya Associates" width="44" height="44" />
            <span><b>Ashish Barjatya</b><small>Associates · Indore</small></span>
          </a>
          <nav className={s.nav} aria-label="Primary">
            {LINKS.map(([t, h]) => <a key={h} href={h} onClick={(e) => go(e, h)}>{t}</a>)}
          </nav>
          <div className={s.headRight}>
            <a className={s.visit} href={wa('Hello, I would like to book a site visit in Indore.')} target="_blank" rel="noopener">Book a site visit</a>
            <button className={s.menuBtn} onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="hh-menu" aria-label={menu ? 'Close menu' : 'Open menu'}>
              <span /><span />
            </button>
          </div>
          {menu && (
            <div className={s.menu} id="hh-menu">
              {LINKS.map(([t, h]) => <a key={h} href={h} onClick={(e) => go(e, h)}>{t}</a>)}
              <a href={`tel:+${PHONE_RAW}`}>{PHONE}</a>
            </div>
          )}
        </header>

        <div className={s.content}>
          <div className={s.copy}>
            <span className={s.pill}><i aria-hidden="true" />Authorised channel partner · Indore</span>
            <h1 className={s.h1}>
              <span className={s.l1}>Leading <span className={s.brk}>channel partner</span></span>{' '}
              <span className={s.l2}>for {YEARS} years</span>
            </h1>
            <p className={s.tagline} lang="hi">जहाँ सपनों को उनका पता मिलता है</p>
            <p className={s.desc}>Residential plots in Omaxe and Godrej townships across Indore, with one advisor beside you from the first site visit to the registry.</p>
            <div className={s.cta}>
              <a className={s.primary} href="#projects" onClick={(e) => go(e, '#projects')}>Explore projects <i aria-hidden="true"><ArrowIcon /></i></a>
              <a className={s.secondary} href={wa('Hello, I would like to talk to an advisor about a plot in Indore.')} target="_blank" rel="noopener">Talk to an advisor</a>
            </div>
            <ul className={s.trust}>
              {TRUST.map((t) => <li key={t}><span aria-hidden="true"><CheckIcon /></span>{t}</li>)}
            </ul>
          </div>

          <div className={s.fit} ref={fitRef}>
            <div ref={stageRef} className={`${s.stage} ${mobile ? s.stageM : s.stageD}`} style={mobile ? undefined : { width: DESKTOP.w, height: DESKTOP.h, transform: `translate(-50%,-50%) scale(${scale})` }}>
              {mobile ? (
                mw && (
                  <svg className={s.wires} viewBox={`0 0 ${mw.w} ${mw.h}`} aria-hidden="true">
                    {mw.paths.map((d) => (
                      <g key={d}>
                        <path d={d} fill="none" stroke="rgba(29,78,216,.2)" strokeWidth="1" />
                        <path d={d} fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 30" className={s.flow} />
                      </g>
                    ))}
                    <circle cx={mw.sx} cy={mw.sy} r="3.5" fill="#E0B43C" />
                  </svg>
                )
              ) : (
                <svg className={s.wires} viewBox={`0 0 ${DESKTOP.w} ${DESKTOP.h}`} aria-hidden="true">
                  {['M300 258 C300 300 150 292 150 336', 'M300 258 C300 300 450 292 450 336'].map((d) => (
                    <g key={d}>
                      <path d={d} fill="none" stroke="rgba(29,78,216,.2)" strokeWidth="1" />
                      <path d={d} fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 30" className={s.flow} />
                    </g>
                  ))}
                  <circle cx="300" cy="258" r="3.5" fill="#E0B43C" />
                </svg>
              )}

              <motion.div ref={sealRef} className={s.seal} style={{ x: sealX, y: sealY }}>
                <span className={s.glow} aria-hidden="true" />
                <span className={s.dashed} aria-hidden="true" />
                <span className={s.lightRing} aria-hidden="true" />
                <span className={s.orbit} aria-hidden="true"><span className={s.orbitSpin}><i className={s.goldPt} /><i className={s.bluePt} /></span></span>
                <img className={s.logo} src={img('aba-logo.jpeg')} alt="Ashish Barjatya Associates" />
              </motion.div>

              <motion.div className={s.cards} style={{ x: barX, y: barY }} data-pickable>
                {['godrej', 'omaxe'].map((dev, i) => (
                  <div key={dev} className={`${s.cardPos} ${i ? s.posR : s.posL}`}>
                    <div className={`${s.float}${i ? ' ' + s.floatB : ''}`}>
                      <i className={s.socket} data-socket aria-hidden="true" />
                      <Column dev={dev} delayed={i === 1} open={openDev === dev} onToggle={() => toggle(dev)} />
                      {openDev === dev && <Popover dev={dev} side={i ? 'r' : 'l'} onPick={pick} />}
                    </div>
                  </div>
                ))}
                <p className={s.caption}>Authorised channel partner · Indore</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
