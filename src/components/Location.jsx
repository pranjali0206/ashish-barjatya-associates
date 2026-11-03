import { useState } from 'react'
import CorridorMap from './CorridorMap'
import { CORRIDORS, PROJECTS, mapLink, goToProject } from '../data'
import { PinIcon } from './Icons'

export default function Location() {
  const [active, setActive] = useState(CORRIDORS[0].id)
  const cur = CORRIDORS.find((c) => c.id === active)
  return (
    <section className="sec tint" id="location">
      <div className="wrap">
        <div className="sec-head">
          <span className="label">Where these projects sit</span>
          <h2>Four corridors. Every project on one of them.</h2>
          <p className="lede">Indore grows along a handful of roads. Knowing which one suits your commute, your budget and your timeline is half the decision.</p>
        </div>
        <div className="loc-grid">
          <div className="corr-list" role="group" aria-label="Growth corridors">
            {CORRIDORS.map((c) => {
              const projs = PROJECTS.filter((p) => p.corridor === c.id)
              return (
                <div key={c.id} className="corr-item" data-active={active === c.id}>
                  <button className="corr-head" aria-pressed={active === c.id} onClick={() => setActive(c.id)}>
                    <small>{c.n}</small>
                    <b>{c.t}</b>
                  </button>
                  <p>{c.d}</p>
                  <span className="chips">{projs.map((p) => <button type="button" className="chip" key={p.id} onClick={() => goToProject(p)} aria-label={`Go to ${p.name}`}>{p.name} →</button>)}</span>
                  <a className="link" href={mapLink(c.q)} target="_blank" rel="noopener">Open in Google Maps</a>
                </div>
              )
            })}
          </div>

          <div className="map-col">
          <div className="card map-card">
            <p className="map-hint"><PinIcon />Click a pin on the map to jump to that project.</p>
            <CorridorMap active={active} onSelect={setActive} />
            <div className="map-cap">
              <span>{cur.t} · Indore</span>
              <a className="link" href={mapLink(cur.q)} target="_blank" rel="noopener">Open in Google Maps</a>
            </div>
            <p className="map-note">Schematic, not to scale. <span className="todo">[TO FILL] real map</span></p>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
