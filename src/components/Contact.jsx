import { useState } from 'react'
import SplitText from './SplitText'
import { Reveal } from './Reveal'
import { wa, PHONE, PHONE_RAW, PROJECTS, BUDGETS, PURPOSES, ADDRESS, MAPS_URL, HOURS } from '../data'
import { PhoneIcon, WaIcon, PinIcon, ClockIcon } from './Icons'

export default function Contact() {
  const [sent, setSent] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    const f = e.currentTarget
    const lines = [
      'Hello Ashish Barjatya Associates,',
      '',
      `Name: ${f.name.value.trim()}`,
      `Phone: ${f.phone.value.trim()}`,
      `Interested in: ${f.interest.value}`,
      `Budget: ${f.budget.value}`,
      `This is for: ${f.purpose.value}`,
      f.message.value.trim() ? '' : null,
      f.message.value.trim() || null,
      '',
      'Please suggest options worth visiting.',
    ].filter((l) => l !== null)
    const url = wa(lines.join('\n'))
    const coarse = window.matchMedia('(pointer: coarse)').matches
    setSent(url)
    if (coarse) window.location.assign(url)
    else window.open(url, '_blank', 'noopener')
  }

  return (
    <section className="cta" id="contact">
      <div className="wrap cta-grid">
        <div>
          <Reveal as="span" className="eyebrow" amount={.8}>Talk to us</Reveal>
          <SplitText as="h2" lines={['Tell us what', "you're looking for."]} />
          <Reveal className="lede" delay={.1}>A plot for your family, an investment on a growth corridor, or an early allocation in an upcoming launch — share a few details and we'll come back with options worth visiting.</Reveal>
          <Reveal className="contact-lines" delay={.2}>
            <a className="big" href={`tel:+${PHONE_RAW}`}><PhoneIcon />{PHONE}</a>
            <a href={wa('Hello, I would like to discuss a plot requirement in Indore.')} target="_blank" rel="noopener"><WaIcon />WhatsApp — replies within the hour</a>
            {ADDRESS && (
              <address><PinIcon /><span>{ADDRESS}{MAPS_URL && <> · <a className="link light" href={MAPS_URL} target="_blank" rel="noopener">Open in Maps</a></>}</span></address>
            )}
            {HOURS && <span><ClockIcon />{HOURS} · Sunday site visits by appointment</span>}
            {!ADDRESS && <span><PinIcon />Indore, Madhya Pradesh · Site visits across the city by appointment</span>}
          </Reveal>
        </div>

        <Reveal delay={.15} y={30}>
          <form className="form" onSubmit={submit} noValidate={false}>
            <h3>Tell us what you're looking for</h3>
            <p>Share a few details and we'll reach out on WhatsApp or call.</p>
            <div className="form-row">
              <label className="field"><span>Name</span><input name="name" required autoComplete="name" placeholder="Your name" /></label>
              <label className="field"><span>Phone</span><input name="phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="+91" /></label>
            </div>
            <label className="field"><span>I'm interested in</span>
              <select name="interest" required defaultValue="">
                <option value="" disabled>Select a project</option>
                {PROJECTS.map((p) => <option key={p.id}>{p.name} — {p.area}</option>)}
                <option>Not sure yet</option>
              </select>
            </label>
            <div className="form-row">
              <label className="field"><span>Budget</span>
                <select name="budget" required defaultValue="">
                  <option value="" disabled>Select</option>
                  {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </label>
              <label className="field"><span>This is for</span>
                <select name="purpose" required defaultValue="">
                  <option value="" disabled>Select</option>
                  {PURPOSES.map((b) => <option key={b}>{b}</option>)}
                </select>
              </label>
            </div>
            <label className="field"><span>Message (optional)</span><textarea name="message" placeholder="Plot size, timeline — anything that helps us shortlist." /></label>
            <button className="btn btn-gold btn-block" type="submit"><WaIcon />Send on WhatsApp</button>
            {sent && (
              <p className="sent" role="status">Opening WhatsApp… If it didn't open, <a href={sent} target="_blank" rel="noopener">tap here</a> or call <a href={`tel:+${PHONE_RAW}`}>{PHONE}</a>.</p>
            )}
            <p className="fine">Your details are used only to discuss your requirement — never shared or sold.</p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
