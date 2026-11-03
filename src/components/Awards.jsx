import { useEffect, useRef, useState } from 'react'
import { img, AWARD_PHOTOS } from '../data'

const SPEED = 40 // px per second the reel drifts
const COPIES = 3 // repeat the photos so the reel never runs out on wide screens

/* The only navy band on the page: a film-strip reel of every award photo.
   It drifts on its own; drag or swipe to move it by hand, or use the arrow buttons.
   Hovering pauses it, and the pause button stops it for good. */
export default function Awards() {
  const n = AWARD_PHOTOS.length
  const [paused, setPaused] = useState(false)
  const secRef = useRef(null)
  const trackRef = useRef(null)
  const st = useRef({ x: 0, setW: 0, step: 0, hold: false, drag: null, tween: null, inView: false, reduce: false, paused: false })
  st.current.paused = paused

  // measure one copy of the photos, and the width of one frame plus its gap
  useEffect(() => {
    const t = trackRef.current
    const measure = () => {
      const s = st.current
      s.setW = t.scrollWidth / COPIES
      const f = t.children[0], g = t.children[1]
      s.step = f && g ? g.offsetLeft - f.offsetLeft : 0
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(t)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const s = st.current
    s.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = secRef.current
    let io
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => { s.inView = e.isIntersecting }, { threshold: 0.1 })
      io.observe(el)
    } else s.inView = true

    let raf, last = performance.now()
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (s.tween) {
        const k = Math.min(1, (now - s.tween.t0) / s.tween.dur)
        const e = 1 - Math.pow(1 - k, 3)
        s.x = s.tween.from + (s.tween.to - s.tween.from) * e
        if (k >= 1) s.tween = null
      } else if (!s.drag && !s.hold && !s.paused && !s.reduce && s.inView) {
        s.x -= SPEED * dt
      }
      if (s.setW > 0 && !s.tween) {
        while (s.x <= -s.setW) { s.x += s.setW; if (s.drag) s.drag.off += s.setW }
        while (s.x > 0) { s.x -= s.setW; if (s.drag) s.drag.off -= s.setW }
      }
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${s.x}px,0,0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); io?.disconnect() }
  }, [])

  const nudge = (dir) => {
    const s = st.current
    if (!s.step) return
    // start from a position that leaves room to move either way without wrapping mid-tween
    if (s.x - s.step < -s.setW * 2) s.x += s.setW
    if (s.x + s.step > 0) s.x -= s.setW
    s.tween = { from: s.x, to: s.x - dir * s.step, t0: performance.now(), dur: 550 }
  }

  const down = (e) => {
    const s = st.current
    s.tween = null
    s.drag = { start: e.clientX, off: s.x, id: e.pointerId }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const move = (e) => {
    const s = st.current
    if (s.drag && s.drag.id === e.pointerId) s.x = s.drag.off + (e.clientX - s.drag.start)
  }
  const up = () => { st.current.drag = null }

  const photos = Array.from({ length: COPIES }, (_, c) => AWARD_PHOTOS.map((p, i) => ({ p, i, c }))).flat()

  return (
    <section className="sec awards" id="awards" ref={secRef} aria-label="Awards and milestones">
      <div className="wrap">
        <div className="sec-head">
          <span className="label">Recognition</span>
          <h2>Awards and milestones.</h2>
          <p className="lede">Moments from our Annual Award Ceremony 2025–26 and Godrej Partner Connect at Verdania Estate.</p>
        </div>
      </div>

      <div className="reel" onMouseEnter={() => { st.current.hold = true }} onMouseLeave={() => { st.current.hold = false; up() }}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        <div className="reel-track" ref={trackRef}>
          {photos.map(({ p, i, c }) => (
            <figure className="reel-frame" key={`${c}-${i}`} aria-hidden={c > 0 ? true : undefined}>
              <img src={img(`awards/${p.file}.jpg`)} alt={c === 0 ? `${p.title}. ${p.meta}` : ''} draggable={false} loading={i < 4 && c === 0 ? 'eager' : 'lazy'} />
              <figcaption>{p.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="reel-ctrl" aria-label={`Award photos, ${n} in total`}>
        <button type="button" onClick={() => nudge(-1)} aria-label="Previous photo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play the reel' : 'Pause the reel'}>
          {paused
            ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" fill="currentColor" stroke="none" /></svg>
            : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg>}
        </button>
        <button type="button" onClick={() => nudge(1)} aria-label="Next photo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
    </section>
  )
}
