import SplitText from './SplitText'
import { Reveal, ImageReveal } from './Reveal'
import { GODREJ, img, wa } from '../data'

const Pin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
)

export default function Godrej() {
  return (
    <section className="godrej" id="godrej">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <Reveal className="dev-mark godrej" amount={0.8}><img src={img('godrej-properties-logo.svg')} alt="Godrej Properties" /><span>Portfolio · Indore</span></Reveal>
            <SplitText as="h2" lines={['Godrej Properties,', 'Indore.']} />
          </div>
          <Reveal className="lede" delay={0.15}>RERA-registered premium plotted estates on the Indore–Ujjain corridor and off Bypass Road at Mangliya. We handle enquiries, site visits and booking for both.</Reveal>
        </div>
        <div className="gcards">
          {GODREJ.map((p, i) => (
            <article className="gcard" key={p.id} data-cursor="View">
              <ImageReveal src={img(p.image)} alt={p.name} className="gcard-media" delay={i * 0.12} amount={0.25}>
                <span className="tag rera">RERA Registered</span>
                <div className="gcard-overlay"><span>{p.sizes}</span></div>
              </ImageReveal>
              <Reveal className="gcard-body" delay={0.2 + i * 0.1}>
                <h3>{p.name}</h3>
                <div className="card-loc"><Pin />{p.location}</div>
                <p>{p.blurb}</p>
                <div className="spec three">
                  <div><small>Type</small><b>{p.type}</b></div>
                  <div><small>Plot sizes</small><b>{p.sizes}</b></div>
                  <div><small>Developer</small><b>Godrej Properties</b></div>
                </div>
                <a className="link" href={wa(`I'm interested in ${p.name}, ${p.location}. I would like to schedule a site visit.`)} target="_blank" rel="noopener">Schedule a site visit</a>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
