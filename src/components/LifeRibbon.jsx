import { img, LIFE_TILES } from '../data'
import useReel from '../hooks/useReel'
import ReelControls from './ReelControls'

const COPIES = 4 // repeat the photos so the ribbon never runs out on wide screens

export default function LifeRibbon() {
  const n = LIFE_TILES.length
  const reel = useReel({ count: n, speed: 45 })
  const tiles = Array.from({ length: COPIES }, (_, c) => LIFE_TILES.map((t) => ({ t, c }))).flat()

  return (
    <section className="sec tint" id="life" aria-label="Your dreams, in reality">
      <div className="wrap">
        <div className="sec-head">
          <span className="label">Life around the townships</span>
          <h2>Your dreams, in reality.</h2>
          <p className="lede">Parks where children play till the street lights come on, lanes where neighbours become friends, and a home that is finally yours.</p>
        </div>
      </div>

      <div className="ribbon" {...reel.viewport}>
        <div className="ribbon-track" ref={reel.trackRef} role="list">
          {tiles.map(({ t, c }) => (
            <figure className="tile" role="listitem" key={`${c}-${t.image}`} aria-hidden={c > 0 ? true : undefined}>
              <img src={img(t.image)} alt={c === 0 ? t.alt : ''} draggable={false} loading="lazy" />
              <figcaption>{t.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <ReelControls reel={reel} label={`Photos of life in the townships, ${n} in total`} light />
    </section>
  )
}
