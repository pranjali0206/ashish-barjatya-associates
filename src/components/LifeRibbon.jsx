import { Fragment } from 'react'
import { img, LIFE_TILES, LIFE_CREDITS } from '../data'

export default function LifeRibbon() {
  return (
    <section className="sec tint" id="life" aria-label="Your dreams, in reality">
      <div className="wrap">
        <div className="sec-head">
          <span className="label">Life around the townships</span>
          <h2>Your dreams, in reality.</h2>
          <p className="lede">Parks where children play till the street lights come on, lanes where neighbours become friends, and a home that is finally yours.</p>
        </div>
        <div className="ribbon" role="list">
          {LIFE_TILES.map((t) => (
            <figure className="tile" role="listitem" key={t.image}>
              <img src={img(t.image)} alt={t.alt} loading="lazy" />
              <figcaption>{t.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className="credits">
          Photos:{' '}
          {LIFE_CREDITS.map((c, i) => (
            <Fragment key={c.text}>
              {i > 0 && ' · '}
              {c.source ? <a href={c.source} target="_blank" rel="noopener">{c.text}</a> : c.text}
              {c.license && <> (<a href={c.licenseUrl} target="_blank" rel="noopener">{c.license}</a>, cropped)</>}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  )
}
