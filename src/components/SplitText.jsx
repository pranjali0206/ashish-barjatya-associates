import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Word-by-word masked reveal. `lines` = array of strings (each becomes a block),
 * or pass `text` for a single line. `go` forces play (hero); otherwise plays in view.
 */
export default function SplitText({
  as: Tag = 'h2',
  lines,
  text,
  className = '',
  go,
  delay = 0,
  stagger = 0.045,
  duration = 1.1,
  once = true,
  amount = 0.5,
}) {
  const blocks = lines || [text]
  let i = 0
  const anim = go === undefined ? { whileInView: 'show', viewport: { once, amount } } : { animate: go ? 'show' : 'hide' }
  return (
    <Tag className={`split ${className}`}>
      <motion.span initial="hide" {...anim} style={{ display: 'block' }}>
        {blocks.map((line, li) => {
          const isEm = typeof line === 'object'
          const str = isEm ? line.text : line
          return (
            <span key={li} className={`split-line${isEm ? ' em' : ''}`}>
              {str.split(' ').map((w, wi) => {
                const idx = i++
                return (
                  <span key={wi}>
                    <span className="split-mask">
                      <motion.span
                        className="split-word"
                        variants={{
                          hide: { y: '110%', rotate: 3 },
                          show: { y: '0%', rotate: 0, transition: { duration, ease: EASE, delay: delay + idx * stagger } },
                        }}
                      >
                        {w}
                      </motion.span>
                    </span>
                    {wi < str.split(' ').length - 1 ? ' ' : ''}
                  </span>
                )
              })}
            </span>
          )
        })}
      </motion.span>
    </Tag>
  )
}
