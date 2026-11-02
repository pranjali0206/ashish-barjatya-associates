import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from './SplitText'
import { Reveal } from './Reveal'
import { img, wa, PROJECTS, DEVELOPERS, RERA_URL, rateListMsg, siteVisitMsg, launchMsg } from '../data'
import { PinIcon } from './Icons'

const EASE = [0.22, 1, 0.36, 1]
const TABS = ['omaxe', 'godrej']

function Card({ p, i }) {
  const soon = p.tone === 'soon'
  return (
    <motion.article className="pcard" layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .55, ease: EASE, delay: i * .06 }}>
      <div className="pcard-media">
        <span className={`tag ${p.tone}`}>{p.status}</span>
        {p.render && <span className="img-note">Artist's impression</span>}
        <img src={img(p.image)} alt={`${p.name}, ${p.area}`} loading="lazy" />
      </div>
      <div className="pcard-body">
        <span className="pcard-dev">{DEVELOPERS[p.dev].name}</span>
        <h3>{p.name}</h3>
        <div className="pcard-area"><PinIcon />{p.area}</div>
        <p>{p.blurb}</p>
        <div className="spec">
          <div><small>Plot sizes</small><b>{p.sizes}</b></div>
          <div><small>Status</small><b>{p.status}</b></div>
          {p.rera && <div style={{ gridColumn: '1 / -1' }}><small>MP-RERA no.</small><b><a href={RERA_URL} target="_blank" rel="noopener">{p.rera}</a></b></div>}
        </div>
        <div className="pcard-actions">
          <a className="btn btn-navy" href={wa(soon ? launchMsg(p) : rateListMsg(p))} target="_blank" rel="noopener">{soon ? 'Register for launch' : "Get today's rate list"}</a>
          <a className="btn btn-outline" href={wa(siteVisitMsg(p))} target="_blank" rel="noopener">Book a site visit</a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [tab, setTab] = useState('omaxe')
  const list = PROJECTS.filter((p) => p.dev === tab)
  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <Reveal as="span" className="eyebrow" amount={.8}>Projects · Indore</Reveal>
            <SplitText as="h2" lines={['Six townships.', 'One honest shortlist.']} />
          </div>
          <Reveal className="lede" delay={.1}>Every project below is RERA-registered and checked by us before we show it to you. Tell us your budget and plot size — we'll tell you which two to visit first.</Reveal>
        </div>

        <div className="tabs" role="tablist" aria-label="Developer">
          {TABS.map((k) => (
            <button key={k} role="tab" className="tab" aria-selected={tab === k} aria-controls={`panel-${k}`} id={`tab-${k}`} onClick={() => setTab(k)}>
              {DEVELOPERS[k].name}<small>({DEVELOPERS[k].count})</small>
              {tab === k && <motion.span className="ul" layoutId="tab-ul" transition={{ duration: .4, ease: EASE }} />}
            </button>
          ))}
        </div>

        <div className="pgrid" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => <Card key={p.id} p={p} i={i} />)}
          </AnimatePresence>
        </div>

        <p className="pnote">Prices, availability and approvals change — we send today's rate list on WhatsApp. Images of clubhouses and villas are artist's impressions.</p>
      </div>
    </section>
  )
}
