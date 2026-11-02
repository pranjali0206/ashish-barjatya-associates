import { Reveal } from './Reveal'
import { wa, PHONE, PHONE_RAW } from '../data'
import { PhoneIcon, WaIcon } from './Icons'

export default function CtaBand() {
  return (
    <section className="band" aria-label="Talk to us">
      <div className="wrap band-in">
        <Reveal amount={.5}>
          <h2>Not sure which plot suits you?</h2>
          <p>Send your budget and preferred plot size. Ashish replies personally, usually within the hour, with two or three options worth visiting — no spam, no calls you didn't ask for.</p>
        </Reveal>
        <Reveal className="band-actions" delay={.1} amount={.5}>
          <a className="btn btn-gold" href={wa('Hello Ashish, my budget is ___ and I am looking for a plot of about ___ sq ft. Which options should I visit?')} target="_blank" rel="noopener"><WaIcon />WhatsApp Ashish</a>
          <a className="btn btn-light" href={`tel:+${PHONE_RAW}`}><PhoneIcon />Call {PHONE}</a>
        </Reveal>
      </div>
    </section>
  )
}
