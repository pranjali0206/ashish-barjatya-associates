import { Reveal } from './Reveal'
import { img, DEVELOPERS, RERA_AGENT_NO, RERA_URL } from '../data'

export default function PartnerStrip() {
  return (
    <section className="pstrip" id="partners" aria-label="Authorised partner">
      <div className="wrap pstrip-in">
        <Reveal amount={.5}>
          <p>We are the authorised sales partner of <b>Omaxe</b> and <b>Godrej Properties</b> in Indore. You book directly with the developer, at the developer's price — our job is to shortlist the right plot, check every paper, and stay with you until possession.</p>
          {RERA_AGENT_NO && (
            <div className="rera-line">MP-RERA registered agent · No. {RERA_AGENT_NO} · <a href={RERA_URL} target="_blank" rel="noopener">verify at rera.mp.gov.in</a></div>
          )}
        </Reveal>
        <Reveal className="pstrip-logos" delay={.1} amount={.5}>
          <img src={img(DEVELOPERS.omaxe.logo)} alt="Omaxe" />
          <i aria-hidden="true" />
          <img className="godrej" src={img(DEVELOPERS.godrej.logo)} alt="Godrej Properties" />
        </Reveal>
      </div>
    </section>
  )
}
