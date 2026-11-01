import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from './SplitText'
import { Reveal } from './Reveal'
import { OMAXE, img, wa } from '../data'

gsap.registerPlugin(ScrollTrigger)

const Pin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
)

export default function Omaxe() {
  const section = useRef(null)
  const track = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
      const t = track.current
      const getX = () => -(t.scrollWidth - window.innerWidth)
      const tween = gsap.to(t, {
        x: getX,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${t.scrollWidth - window.innerWidth + 200}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      // subtle per-card parallax on the image while the track moves
      const imgs = t.querySelectorAll('.hcard-media img')
      gsap.to(imgs, { xPercent: -8, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top top', end: () => `+=${t.scrollWidth - window.innerWidth + 200}`, scrub: 1 } })
      return () => { tween.scrollTrigger && tween.scrollTrigger.kill(); tween.kill() }
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="omaxe" id="omaxe" ref={section}>
      <div className="omaxe-head wrap">
        <Reveal className="dev-mark" amount={0.8}><img src={img('omaxe-logo.png')} alt="Omaxe" /><span>Portfolio · Indore</span></Reveal>
        <SplitText as="h2" lines={['The Omaxe portfolio.']} />
        <Reveal className="lede" delay={0.15}>Four townships, one growth story — from ready-to-possess inventory at Mayakhedi to the next chapter on the Super Corridor.</Reveal>
      </div>
      <div className="htrack" ref={track}>
        <div className="hspacer" aria-hidden="true">
          <span className="big-index">01<i>—</i>04</span>
        </div>
        {OMAXE.map((p, i) => (
          <article className="hcard" key={p.id} data-cursor="View">
            <div className="hcard-media">
              <span className={`tag ${p.tone}`}>{p.status}</span>
              <img src={img(p.image)} alt={p.name} loading="lazy" />
            </div>
            <div className="hcard-body">
              <span className="hcard-num">0{i + 1}</span>
              <h3>{p.name}</h3>
              <div className="card-loc"><Pin />{p.location}</div>
              <p>{p.blurb}</p>
              <div className="spec">
                <div><small>Type</small><b>{p.type}</b></div>
                <div><small>Plot sizes</small><b>{p.sizes}</b></div>
              </div>
              <a className="link" href={wa(`I'm interested in ${p.name}, ${p.location}. I would like to schedule a site visit.`)} target="_blank" rel="noopener">{p.tone === 'soon' ? 'Register interest' : 'Schedule a site visit'}</a>
            </div>
          </article>
        ))}
        <div className="hend" aria-hidden="true">
          <span>Omaxe</span>
          <em>Turning dreams into reality</em>
        </div>
      </div>
    </section>
  )
}
