import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 28, className = '', amount = 0.3, once = true, as = 'div', ...rest }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}

/**
 * Image wrapper with a clip-path curtain reveal + inner scale settle.
 * The in-view observer sits on an unclipped wrapper: a fully clipped element
 * never reports as intersecting, so the variants are driven from the parent.
 */
export function ImageReveal({ src, alt = '', className = '', delay = 0, amount = 0.3, children, style }) {
  return (
    <motion.div className={`img-reveal-wrap ${className}`} style={style} initial="hide" whileInView="show" viewport={{ once: true, amount }}>
      <motion.div
        className="img-reveal"
        variants={{
          hide: { clipPath: 'inset(0% 0% 100% 0%)' },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.3, ease: EASE, delay } },
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          variants={{ hide: { scale: 1.25 }, show: { scale: 1, transition: { duration: 1.6, ease: EASE, delay } } }}
        />
        {children}
      </motion.div>
    </motion.div>
  )
}

export function Line({ delay = 0, className = '' }) {
  return (
    <motion.span
      className={`hline ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.2, ease: EASE, delay }}
    />
  )
}
