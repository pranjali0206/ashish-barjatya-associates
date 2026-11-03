import { useEffect, useState } from 'react'
import { img, PROJECTS, DEVELOPERS, RERA_URL } from '../data'
import { PinIcon, ArrowIcon } from './Icons'
import { scrollToId } from '../hooks/useSmoothScroll'

const TABS = ['omaxe', 'godrej']

// Ask the contact form to preselect this project, then scroll to it.
const enquire = (p) => {
  window.dispatchEvent(new CustomEvent('enquire-project', { detail: { id: p.id } }))
  scrollToId('[data-contact-form]', -96)
}

function Card({ p, flash }) {
  return (
    <article id={`project-${p.id}`} className={`card pcard${flash ? ' flash' : ''}`}>
      <div className="pcard-media">
        <span className={`tag ${p.tone}`}>{p.status}</span>
        {p.render && <span className="img-note">Artist's impression</span>}
        <img src={img(p.image)} alt={`${p.name}, ${p.area}`} loading="lazy" />
      </div>
      <div className="pcard-body">
        <span className="label pcard-dev">{DEVELOPERS[p.dev].name}</span>
        <h3>{p.name}</h3>
        <div className="pcard-area"><PinIcon />{p.area}</div>
        <p>{p.blurb}</p>
        <div className="spec">
          <div><small>Plot sizes</small><b>{p.sizes}</b></div>
          <div><small>Price</small><b>From {p.price ? `₹${p.price}` : <span className="todo">₹[PRICE]</span>}</b></div>
        </div>
        <div className="pcard-rera">
          RERA: {p.rera ? <a href={RERA_URL} target="_blank" rel="noopener">{p.rera}</a> : <span className="todo">[NUMBER]</span>}
        </div>
        <div className="pcard-actions">
          <a className="btn btn-primary" href="#contact" onClick={(e) => { e.preventDefault(); enquire(p) }}>Enquire <span className="btn-arrow"><ArrowIcon /></span></a>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [tab, setTab] = useState('omaxe')
  const [flashId, setFlashId] = useState(null)
  const list = PROJECTS.filter((p) => p.dev === tab)

  // the hero partner cards ask us to jump to one project
  useEffect(() => {
    let timer, clearFlash
    const onGo = (e) => {
      const { dev, id } = e.detail || {}
      if (!dev || !id) return
      setTab(dev)
      clearTimeout(timer); clearTimeout(clearFlash)
      // wait until the grid has settled on the new tab, then scroll to the card's final position
      let last = null, stable = 0, tries = 0
      const poll = () => {
        const el = document.getElementById(`project-${id}`)
        const abs = el ? el.getBoundingClientRect().top + window.scrollY : null
        stable = abs !== null && last !== null && Math.abs(abs - last) < 1 ? stable + 1 : 0
        last = abs
        if (stable >= 2 || ++tries > 30) {
          if (!el) return
          scrollToId(`#project-${id}`, -96)
          setFlashId(id)
          clearFlash = setTimeout(() => setFlashId(null), 2600)
          return
        }
        timer = setTimeout(poll, 60)
      }
      timer = setTimeout(poll, 60)
    }
    window.addEventListener('goto-project', onGo)
    return () => { window.removeEventListener('goto-project', onGo); clearTimeout(timer); clearTimeout(clearFlash) }
  }, [])

  return (
    <section className="sec" id="projects">
      <div className="wrap">
        <div className="sec-head">
          <span className="label">Projects · Indore</span>
          <h2>Townships we trust. Plots we stand behind.</h2>
          <p className="lede">Every project below is RERA-registered and checked by us before we show it to you. Tell us your budget and plot size, and we'll tell you which two to visit first.</p>
        </div>

        <div className="tabs" role="tablist" aria-label="Developer">
          {TABS.map((k) => (
            <button key={k} role="tab" className="tab" aria-selected={tab === k} aria-controls={`panel-${k}`} id={`tab-${k}`} onClick={() => setTab(k)}>
              {DEVELOPERS[k].name}<small>({DEVELOPERS[k].count})</small>
            </button>
          ))}
        </div>

        <div className="pgrid" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          {list.map((p) => <Card key={p.id} p={p} flash={flashId === p.id} />)}
        </div>

        <p className="pnote">Prices, availability and approvals change; we send today's rate list on WhatsApp. Images of clubhouses and villas are artist's impressions.</p>
      </div>
    </section>
  )
}
