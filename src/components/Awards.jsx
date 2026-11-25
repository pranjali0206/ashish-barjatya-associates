import { img, AWARD_PHOTOS } from '../data'
import useReel from '../hooks/useReel'
import ReelControls from './ReelControls'

const COPIES = 3 // repeat the photos so the reel never runs out on wide screens

/* The only navy band on the page: a film-strip reel of every award photo. */
export default function Awards() {
  const n = AWARD_PHOTOS.length
  const reel = useReel({ count: n, speed: 40 })
  const photos = Array.from({ length: COPIES }, (_, c) => AWARD_PHOTOS.map((p, i) => ({ p, i, c }))).flat()

  return (
    <section className="sec awards" id="awards" aria-label="Awards and milestones">
      <div className="wrap">
        <div className="sec-head">
          <span className="label">Recognition</span>
          <h2>Awards and milestones.</h2>
          <p className="lede">Moments from our Annual Award Ceremony 2025–26 and Godrej Partner Connect at Verdania Estate.</p>
        </div>
      </div>

      <div className="reel" {...reel.viewport}>
        <div className="reel-track" ref={reel.trackRef}>
          {photos.map(({ p, i, c }) => (
            <figure className="reel-frame" key={`${c}-${i}`} aria-hidden={c > 0 ? true : undefined}>
              <img src={img(`awards/${p.file}.jpg`)} alt={c === 0 ? `${p.title}. ${p.meta}` : ''} draggable={false} loading={i < 4 && c === 0 ? 'eager' : 'lazy'} />
              <figcaption>{p.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <ReelControls reel={reel} label={`Award photos, ${n} in total`} />
    </section>
  )
}
