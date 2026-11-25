import { useEffect, useRef, useState } from 'react'

/* Endless photo reel. The track holds several repeats of `count` photos and drifts left on its own.
   Drag or swipe moves it by hand, hovering pauses it, and `paused` stops it for good.
   Spread `viewport` on the clipping element and put `trackRef` on the moving one. */
export default function useReel({ count, speed = 40 }) {
  const [paused, setPaused] = useState(false)
  const viewRef = useRef(null)
  const trackRef = useRef(null)
  const st = useRef({ x: 0, setW: 0, step: 0, hold: false, drag: null, tween: null, inView: false, reduce: false, paused: false })
  st.current.paused = paused

  // measure one copy of the photos, and the width of one frame plus its gap
  useEffect(() => {
    const t = trackRef.current
    const measure = () => {
      const s = st.current
      const first = t.children[0], second = t.children[1], nextSet = t.children[count]
      s.step = first && second ? second.offsetLeft - first.offsetLeft : 0
      s.setW = first && nextSet ? nextSet.offsetLeft - first.offsetLeft : 0
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(t)
    return () => ro.disconnect()
  }, [count])

  useEffect(() => {
    const s = st.current
    s.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let io
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => { s.inView = e.isIntersecting }, { threshold: 0.1 })
      io.observe(viewRef.current)
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
        s.x -= speed * dt
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
  }, [speed])

  const nudge = (dir) => {
    const s = st.current
    if (!s.step) return
    // start from a position that leaves room to move either way without wrapping mid-tween
    if (s.x - s.step < -s.setW * 2) s.x += s.setW
    if (s.x + s.step > 0) s.x -= s.setW
    s.tween = { from: s.x, to: s.x - dir * s.step, t0: performance.now(), dur: 550 }
  }

  const up = () => { st.current.drag = null }
  const viewport = {
    ref: viewRef,
    // mouse only: a tap emulates mouseenter without a matching leave, which would leave the reel stuck
    onPointerEnter: (e) => { if (e.pointerType === 'mouse') st.current.hold = true },
    onPointerLeave: () => { st.current.hold = false; up() },
    onPointerDown: (e) => {
      const s = st.current
      s.tween = null
      s.drag = { start: e.clientX, off: s.x, id: e.pointerId }
      e.currentTarget.setPointerCapture?.(e.pointerId)
    },
    onPointerMove: (e) => {
      const s = st.current
      if (s.drag && s.drag.id === e.pointerId) s.x = s.drag.off + (e.clientX - s.drag.start)
    },
    onPointerUp: up,
    onPointerCancel: up,
  }

  return { viewport, trackRef, paused, setPaused, nudge }
}
