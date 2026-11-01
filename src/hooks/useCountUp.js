import { useEffect, useState } from 'react'

export default function useCountUp(target, start, duration = 1600, delay = 0) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf, t0
    const ease = (x) => 1 - Math.pow(1 - x, 4)
    const step = (t) => {
      if (!t0) t0 = t + delay
      const p = Math.min(1, Math.max(0, (t - t0) / duration))
      setV(Math.round(ease(p) * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration, delay])
  return v
}
