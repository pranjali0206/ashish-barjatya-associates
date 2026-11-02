import SplitText from './SplitText'
import { Reveal } from './Reveal'
import { img, WHY, FOUNDERS, FOUNDER_NOTE, GOOGLE, TESTIMONIALS } from '../data'

export default function WhyAbout() {
  const hasProof = (GOOGLE.rating && GOOGLE.count) || TESTIMONIALS.length > 0
  return (
    <section className="why" id="why">
      <div className="wrap">
        <div className="sec-head">
          <Reveal as="span" className="eyebrow" amount={.8}>Why families come back</Reveal>
          <SplitText as="h2" lines={['Every plot is a promise.', "We've kept ours for twenty years."]} />
        </div>

        <div className="why-grid">
          {WHY.map((w, i) => (
            <Reveal className="why-item" key={w.n} delay={i * .08} amount={.4}>
              <span className="n">{w.n}</span>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="founders" amount={.3}>
          <div className="founder-pics">
            {FOUNDERS.map((f) => (
              <div className="founder" key={f.name}>
                <img src={img(f.photo)} alt={f.name} loading="lazy" />
                <b>{f.name}</b>
                <span>{f.role}</span>
              </div>
            ))}
          </div>
          <blockquote className="note">
            {FOUNDER_NOTE.text}
            <cite>— {FOUNDER_NOTE.by}</cite>
          </blockquote>
        </Reveal>

        {hasProof && (
          <Reveal className="proof" amount={.3}>
            {GOOGLE.rating && GOOGLE.count ? (
              <a className="g-rating" href={GOOGLE.url || '#'} target="_blank" rel="noopener">
                <b>{GOOGLE.rating}</b><span className="stars" aria-hidden="true">★★★★★</span><span>{GOOGLE.count} Google reviews</span>
              </a>
            ) : <span />}
            {TESTIMONIALS.length > 0 && (
              <div className="quotes">
                {TESTIMONIALS.slice(0, 3).map((t) => (
                  <figure className="quote" key={t.name + t.year}>
                    <blockquote>"{t.quote}"</blockquote>
                    <footer>— {t.name}, {t.locality} · {t.project}, {t.year}</footer>
                  </figure>
                ))}
              </div>
            )}
          </Reveal>
        )}
      </div>
    </section>
  )
}
