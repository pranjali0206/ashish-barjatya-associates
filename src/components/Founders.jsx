import { img, FOUNDERS, FOUNDER_NOTE } from '../data'

export default function Founders() {
  return (
    <section className="sec tint" id="founders">
      <div className="wrap">
        <div className="sec-head">
          <span className="label">Founders</span>
          <h2>The people you'll deal with.</h2>
        </div>
        <div className="founders">
          <div className="founder-pics">
            {FOUNDERS.map((f) => (
              <div className="founder" key={f.name}>
                <div className="founder-circle"><img src={img(f.photo)} alt={f.name} loading="lazy" /></div>
                <b>{f.name}</b>
                <span>{f.role}</span>
              </div>
            ))}
          </div>
          <div>
            <blockquote className="note">{FOUNDER_NOTE.text}</blockquote>
            <p className="note-by">{FOUNDER_NOTE.by}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
