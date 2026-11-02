import { useState } from 'react'
import SplitText from './SplitText'
import { Reveal } from './Reveal'
import { CORRIDORS, PROJECTS, YEARS, mapEmbed, mapLink } from '../data'

export default function Corridors() {
  const [active, setActive] = useState(CORRIDORS[0].id)
  const cur = CORRIDORS.find((c) => c.id === active)
  return (
    <section className="location" id="location">
      <div className="wrap loc-grid">
        <div>
          <Reveal as="span" className="eyebrow" amount={.8}>Where these projects sit</Reveal>
          <SplitText as="h2" lines={['Four corridors.', 'Every project on one of them.']} />
          <Reveal className="lede" delay={.1} style={{ marginTop: '1rem' }}>Indore is growing along a handful of roads. Knowing which one suits your commute, your budget and your timeline is half the decision — and the part we've spent {YEARS === 20 ? 'twenty' : YEARS} years learning.</Reveal>
          <div className="corr-list" role="group" aria-label="Growth corridors">
            {CORRIDORS.map((c) => {
              const projs = PROJECTS.filter((p) => p.corridor === c.id)
              return (
                <button key={c.id} className="corr-item" aria-pressed={active === c.id} onClick={() => setActive(c.id)}>
                  <small>{c.n}</small>
                  <b>{c.t}</b>
                  <p>{c.d}</p>
                  <span className="chips">{projs.map((p) => <span className="chip" key={p.id}>{p.name}</span>)}</span>
                </button>
              )
            })}
          </div>
        </div>
        <Reveal delay={.1} amount={.3}>
          <div className="map-wrap">
            <iframe key={cur.id} title={`Map of ${cur.t}, Indore`} src={mapEmbed(cur.q)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
          <div className="map-cap">
            <span>{cur.t} · Indore</span>
            <a className="link" href={mapLink(cur.q)} target="_blank" rel="noopener">Open in Google Maps</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
