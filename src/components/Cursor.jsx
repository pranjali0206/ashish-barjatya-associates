import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [label, setLabel] = useState('')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my, raf
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      dot.current.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`
    }
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    const onOver = (e) => {
      const t = e.target.closest('[data-cursor], a, button')
      if (!t) { document.documentElement.classList.remove('cursor-hover'); setLabel(''); return }
      document.documentElement.classList.add('cursor-hover')
      setLabel(t.dataset.cursor || '')
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  if (!enabled) return null
  return (
    <>
      <div ref={dot} className="cur-dot" />
      <div ref={ring} className={`cur-ring${label ? ' has-label' : ''}`}><span>{label}</span></div>
    </>
  )
}
