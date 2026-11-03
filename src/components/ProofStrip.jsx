import { STATS } from '../data'

// White card overlapping the hero's bottom edge by 48px (the section's top 48px is transparent).
export default function ProofStrip() {
  return (
    <section className="proof-sec" aria-label="Why trust us">
      <div className="wrap">
        <div className="card proof-card">
          <div className="proof-stats">
            {STATS.map((s) => (
              <div key={s.l1}>
                <b>{s.n}</b>
                <span>{s.l1} {s.l2}</span>
              </div>
            ))}
          </div>
          <p className="proof-line">Authorised sales partner of Omaxe and Godrej Properties; you pay the developer's price.</p>
        </div>
      </div>
    </section>
  )
}
