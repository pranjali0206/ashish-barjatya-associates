import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplitText from './SplitText'
import { Reveal } from './Reveal'
import Magnetic from './Magnetic'
import { img, wa, PHONE, PHONE_RAW, OMAXE, GODREJ } from '../data'

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
            <a href={`tel:+${PHONE_RAW}`}><i>☏</i>{PHONE}</a>
            <a href={wa('Hello, I would like to discuss a plot requirement in Indore.')} target="_blank" rel="noopener"><i>✆</i>WhatsApp — usually replies within the hour</a>
            <span><i>⌖</i>Indore, Madhya Pradesh · Site visits by appointment</span>
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
