import { img, PROJECTS, DEVELOPERS } from '../data'
import { PinIcon, ArrowIcon } from './Icons'
import { navigate } from '../nav'

const DEV_TAG = { omaxe: 'Plotted townships, flats & commercial', godrej: 'Premium plotted estates' }

// MagicBricks-style image card: photo with the name overlaid and a "View details" link.
function Card({ p }) {
  const href = `/projects/${p.slug}`
  const open = (e) => { e.preventDefault(); navigate(href) }
  return (
    <a className="mcard" id={`project-${p.id}`} href={href} onClick={open} aria-label={`View ${p.name}`}>
      <span className={`tag ${p.tone}`}>{p.status}</span>
      {p.image
        ? <img src={img(p.image)} alt={`${p.name}, ${p.area}`} loading="lazy" />
        : <div className="mcard-ph"><span>{DEVELOPERS[p.dev].name}</span></div>}
      <div className="mcard-body">
        <span className="mcard-dev">{DEVELOPERS[p.dev].name}</span>
        <h3>{p.name}</h3>
        <span className="mcard-area"><PinIcon />{p.area}</span>
        <span className="mcard-cta">View details <ArrowIcon /></span>
      </div>
    </a>
  )
}

function DevSection({ dev }) {
  const d = DEVELOPERS[dev]
  const list = PROJECTS.filter((p) => p.dev === dev)
  return (
    <div className="dev-group">
      <div className="dev-head">
        <img className={dev === 'godrej' ? 'dev-logo-g' : 'dev-logo'} src={img(d.logo)} alt={d.name} />
        <div><h3>{d.name}</h3><p>{DEV_TAG[dev]}</p></div>
      </div>
      <div className="mgrid">{list.map((p) => <Card key={p.id} p={p} />)}</div>
    </div>
  )
}

export default function Projects() {
  return (
    <section className="sec" id="projects">
      <div className="wrap">
        <div className="sec-head">
          <span className="label">Projects</span>
          <h2>Townships we trust. Plots we stand behind.</h2>
          <p className="lede">Every project below is RERA-registered and checked by us before we show it to you. Tap any project to see plots, amenities, plans and location.</p>
        </div>
        <DevSection dev="godrej" />
        <DevSection dev="omaxe" />
      </div>
    </section>
  )
}
