import { img, wa, PHONE, PHONE_RAW, PROJECTS, CORRIDORS, YEARS, FOUNDED_YEAR, ADDRESS, RERA_AGENT_NO, RERA_URL } from '../data'
import { scrollToId } from '../hooks/useSmoothScroll'

export default function Footer() {
  const go = (e, id) => { e.preventDefault(); scrollToId(id) }
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a href="#top" className="brand" onClick={(e) => go(e, '#top')}>
              <img src={img('aba-logo.jpeg')} alt="" width="42" height="42" />
              <span><span className="brand-name">Ashish Barjatya</span><span className="brand-sub">Associates · Indore</span></span>
            </a>
            <p>Authorised channel partner for Omaxe and Godrej Properties in Indore {FOUNDED_YEAR ? `since ${FOUNDED_YEAR}` : `for over ${YEARS} years`}.</p>
            {RERA_AGENT_NO && <p style={{ marginTop: '.6rem' }}>MP-RERA agent no. {RERA_AGENT_NO} · <a href={RERA_URL} target="_blank" rel="noopener">rera.mp.gov.in</a></p>}
          </div>
          <div>
            <h4>Projects</h4>
            <ul>{PROJECTS.map((p) => <li key={p.id}><a href="#projects" onClick={(e) => go(e, '#projects')}>{p.name}</a></li>)}</ul>
          </div>
          <div>
            <h4>Location</h4>
            <ul>{CORRIDORS.map((c) => <li key={c.id}><a href="#location" onClick={(e) => go(e, '#location')}>{c.t}</a></li>)}</ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={`tel:+${PHONE_RAW}`}>{PHONE}</a></li>
              <li><a href={wa('Hello')} target="_blank" rel="noopener">WhatsApp</a></li>
              <li>{ADDRESS || 'Indore, Madhya Pradesh'}</li>
            </ul>
          </div>
        </div>
        <p className="fine">Ashish Barjatya Associates is an independent channel partner, not the developer. Project names and logos belong to Omaxe Ltd and Godrej Properties Ltd. Prices, plot sizes, availability and approvals are indicative and subject to change. Verify RERA registration at rera.mp.gov.in before booking.</p>
        <div className="copy"><span>© {new Date().getFullYear()} Ashish Barjatya Associates. All rights reserved.</span><span>Indore · Madhya Pradesh</span></div>
      </div>
    </footer>
  )
}
