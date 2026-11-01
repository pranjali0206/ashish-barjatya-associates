import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplitText from './SplitText'
import { Reveal } from './Reveal'
import Magnetic from './Magnetic'
import { img, wa, PHONE, PHONE_RAW, OMAXE, GODREJ } from '../data'

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
)
const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2m0 1.67c4.56 0 8.24 3.68 8.24 8.24s-3.68 8.24-8.24 8.24c-1.5 0-2.97-.4-4.25-1.17l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.56 3.68-8.24 8.24-8.24m-3.4 4.4c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.3 3.78 2.1.84 2.52.67 2.98.63.46-.04 1.48-.6 1.69-1.19.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.12-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.12-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.38-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.5z" /></svg>
)
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
)

export default function Contact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  const submit = (e) => {
    e.preventDefault()
    const f = e.currentTarget
    const txt = `Hello Ashish Barjatya Associates,\n\nName: ${f.name.value.trim()}\nPhone: ${f.phone.value.trim()}\nInterested in: ${f.interest.value}${f.message.value.trim() ? '\n\n' + f.message.value.trim() : ''}\n\nPlease get in touch to arrange a consultation.`
    window.open(wa(txt), '_blank', 'noopener')
  }

  return (
    <section className="cta" id="contact" ref={ref}>
      <motion.div className="cta-bg" style={{ y }}><img src={img('omaxe-township.jpg')} alt="" loading="lazy" /></motion.div>
      <div className="cta-shade" />
      <div className="wrap cta-grid">
        <div>
          <Reveal as="span" className="eyebrow gold" amount={0.8}>Private Consultation</Reveal>
          <SplitText as="h2" lines={["Let's find", 'your address.']} />
          <Reveal className="lede light" delay={0.15}>Tell us what you're looking for — a plot for your family, an investment on a growth corridor, or an early allocation in an upcoming launch. We'll come back with a short, honest set of options and arrange a site visit.</Reveal>
          <Reveal className="contact-lines" delay={0.25}>
            <a href={`tel:+${PHONE_RAW}`}><PhoneIcon />{PHONE}</a>
            <a href={wa('Hello, I would like to discuss a plot requirement in Indore.')} target="_blank" rel="noopener"><WaIcon />WhatsApp — usually replies within the hour</a>
            <span><PinIcon />Indore, Madhya Pradesh · Site visits by appointment</span>
          </Reveal>
        </div>
        <Reveal className="form-wrap" delay={0.2} y={40}>
          <form className="form" onSubmit={submit}>
            <h3>Request a Consultation</h3>
            <p>Share a few details and we'll reach out on WhatsApp or call.</p>
            <div className="form-row">
              <label className="field"><span>Name</span><input name="name" required autoComplete="name" placeholder="Your name" /></label>
              <label className="field"><span>Phone</span><input name="phone" type="tel" required autoComplete="tel" placeholder="+91" /></label>
            </div>
            <label className="field"><span>I am interested in</span>
              <select name="interest" required defaultValue="">
                <option value="" disabled>Select an option</option>
                {OMAXE.map((p) => <option key={p.id}>{p.name} — {p.location}{p.tone === 'ready' ? ' (Ready)' : p.tone === 'soon' ? ' (Coming soon)' : ''}</option>)}
                {GODREJ.map((p) => <option key={p.id}>{p.name} — {p.location}</option>)}
                <option>Investment advice</option>
                <option>Something else</option>
              </select>
            </label>
            <label className="field"><span>What are you looking for?</span><textarea name="message" placeholder="Budget, plot size, timeline — anything that helps us shortlist." /></label>
            <Magnetic className="full"><button className="btn btn-gold full" type="submit">Send on WhatsApp</button></Magnetic>
            <p className="fine">Your details are used only to discuss your requirement — never shared or sold.</p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
