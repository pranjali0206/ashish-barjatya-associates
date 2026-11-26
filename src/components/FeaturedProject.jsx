import { img } from '../data'
import { estateById } from '../estates'
import { navigate } from '../nav'
import { ArrowIcon } from './Icons'

// Highlights Omaxe City Centre, which is part of Omaxe City 1 (not a standalone project card).
export default function FeaturedProject() {
  const e = estateById('omaxe-city-center')
  if (!e) return null
  const href = `/projects/${e.slug}`
  const open = (ev) => { ev.preventDefault(); navigate(href) }
  return (
    <section className="sec tint" id="featured">
      <div className="wrap">
        <div className="sec-head"><span className="label">Featured project</span><h2>{e.name}</h2></div>
        <a className="feat" href={href} onClick={open} aria-label={`View ${e.name}`}>
          <div className="feat-img"><img src={img('omaxe/cc-hero.jpg')} alt={e.name} loading="lazy" /></div>
          <div className="feat-body">
            <span className="feat-badge">Inside Omaxe City 1</span>
            <h3>Shops, showrooms &amp; 2 / 2.5 / 3 BHK flats</h3>
            <p>A mixed-use Omaxe landmark on AB Bypass Road — ground-floor commercial with residential flats above, in the heart of Omaxe City 1.</p>
            <span className="btn btn-primary">Explore City Centre <span className="btn-arrow"><ArrowIcon /></span></span>
          </div>
        </a>
      </div>
    </section>
  )
}
