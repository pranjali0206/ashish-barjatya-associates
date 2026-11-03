import { img, LIFE_TILES } from '../data'

export default function LifeRibbon() {
  return (
    <section className="sec tint" id="life" aria-label="Life around the townships">
      <div className="wrap">
        <div className="sec-head">
          <span className="label">Life around the townships</span>
          <h2>Where your family would actually live.</h2>
        </div>
        <div className="ribbon" role="list">
          {LIFE_TILES.map((t, i) => (
            <figure className="tile" role="listitem" key={i}>
              <img src={img(t.image)} alt="" loading="lazy" />
              <figcaption><span className="todo">{t.caption}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
