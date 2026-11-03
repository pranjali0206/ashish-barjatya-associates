import { useEffect, useRef, useState } from 'react'
import { wa, PHONE, PHONE_RAW, PROJECTS, BUDGETS, PURPOSES, ADDRESS, MAPS_URL, HOURS } from '../data'
import { PhoneIcon, WaIcon, PinIcon, ClockIcon, ArrowIcon } from './Icons'

const optionFor = (p) => `${p.name} · ${p.area}`

export default function Contact() {
  const [sent, setSent] = useState(null)
  const [picked, setPicked] = useState(null)
  const interestRef = useRef(null)
  const nameRef = useRef(null)

  // a project card's "Enquire" button preselects that project here
  useEffect(() => {
    let t
    const onEnquire = (e) => {
      const p = PROJECTS.find((q) => q.id === e.detail?.id)
      if (!p || !interestRef.current) return
      interestRef.current.value = optionFor(p)
      setPicked(p.name)
      clearTimeout(t)
      t = setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 900)
    }
    window.addEventListener('enquire-project', onEnquire)
    return () => { window.removeEventListener('enquire-project', onEnquire); clearTimeout(t) }
  }, [])

  const submit = (e) => {
    e.preventDefault()
    const f = e.currentTarget
    const lines = [
      'Hello Ashish Barjatya Associates,',
      '',
      `Name: ${f.name.value.trim()}`,
      `Phone: ${f.phone.value.trim()}`,
      `Interested in: ${f.interest.value}`,
      f.budget.value ? `Budget: ${f.budget.value}` : null,
      f.purpose.value ? `This is for: ${f.purpose.value}` : null,
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
    <section className="sec tint" id="contact">
      <div className="wrap cta-grid">
        <div>
          <span className="label">Talk to us</span>
          <h2>Tell us what you're looking for.</h2>
          <p className="lede" style={{ marginTop: 16 }}>A plot for your family, an investment on a growth corridor, or an early allocation in an upcoming launch. Share a few details and we'll come back with options worth visiting.</p>
          <div className="contact-lines">
            <a className="big" href={`tel:+${PHONE_RAW}`}><PhoneIcon />{PHONE}</a>
            {ADDRESS && (
              <address><PinIcon /><span>{ADDRESS}{MAPS_URL && <> · <a className="link" href={MAPS_URL} target="_blank" rel="noopener">Open in Maps</a></>}</span></address>
            )}
            {HOURS && <span><ClockIcon />{HOURS} · Sunday site visits by appointment</span>}
            {!ADDRESS && <span><PinIcon />Indore, Madhya Pradesh · Site visits across the city by appointment</span>}
          </div>
          <div className="contact-wa">
            <a className="btn btn-wa" href={wa('Hello, I would like to discuss a plot requirement in Indore.')} target="_blank" rel="noopener"><WaIcon />WhatsApp, replies within the hour</a>
          </div>
        </div>

        <div className="card form" data-contact-form>
          <form onSubmit={submit}>
            <h3>Request a call back</h3>
            <p>{picked ? <>Enquiring about <b>{picked}</b>. Add your name and number and we will call you back.</> : 'Three details are enough to start.'}</p>
            <div className="form-row">
              <label className="field"><span>Name</span><input ref={nameRef} name="name" required autoComplete="name" placeholder="Your name" /></label>
              <label className="field"><span>Phone</span><input name="phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="+91" /></label>
            </div>
            <label className="field"><span>Interested in</span>
              <select ref={interestRef} name="interest" required defaultValue="" onChange={() => setPicked(null)}>
                <option value="" disabled>Select a project</option>
                {PROJECTS.map((p) => <option key={p.id}>{optionFor(p)}</option>)}
                <option>Not sure yet</option>
              </select>
            </label>

            <details className="more">
              <summary>Add details (optional)</summary>
              <div className="form-row">
                <label className="field"><span>Budget</span>
                  <select name="budget" defaultValue="">
                    <option value="">Select</option>
                    {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
                <label className="field"><span>Purpose</span>
                  <select name="purpose" defaultValue="">
                    <option value="">Select</option>
                    {PURPOSES.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
              </div>
              <label className="field"><span>Message</span><textarea name="message" placeholder="Plot size, timeline, anything that helps us shortlist." /></label>
            </details>

            <button className="btn btn-primary btn-block" type="submit">Send enquiry <span className="btn-arrow"><ArrowIcon /></span></button>
            {sent && (
              <p className="sent" role="status">Opening WhatsApp… If it didn't open, <a href={sent} target="_blank" rel="noopener">tap here</a> or call <a href={`tel:+${PHONE_RAW}`}>{PHONE}</a>.</p>
            )}
            <p className="consent">By sending, you agree that we may contact you about your enquiry. See our <a href="/privacy">Privacy policy</a>.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
