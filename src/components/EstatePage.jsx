import { useEffect } from 'react'
import { img, wa, PHONE, PHONE_RAW, RERA_URL } from '../data'
import { VILLA_FEATURES } from '../estates'
import { navigate } from '../nav'
import { PhoneIcon, WaIcon, PinIcon, ArrowIcon } from './Icons'
import VideoEmbed from './VideoEmbed'
import Footer from './Footer'

const short = (name) => name.replace(/^(Godrej|Omaxe)\s/, '')
const toProjects = (e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.querySelector('#projects')?.scrollIntoView(), 60) }

export default function EstatePage({ estate: s }) {
  useEffect(() => {
    const prev = document.title
    document.title = `${s.name} — Plots, amenities & plans | Ashish Barjatya Associates`
    window.scrollTo(0, 0)
    return () => { document.title = prev }
  }, [s])

  const villaFeatures = s.villa && (s.villa.features || (s.waVilla ? VILLA_FEATURES : null))

  return (
    <div className="estate">
      <header className="est-bar">
        <div className="wrap est-bar-in">
          <a href="/" className="back" onClick={toProjects}><ArrowIcon /><span>All projects</span></a>
          <a href="/" className="brand" onClick={(e) => { e.preventDefault(); navigate('/') }}>
            <img src={img('aba-logo.jpeg')} alt="" width="38" height="38" />
            <span><span className="brand-name">Ashish Barjatya</span><span className="brand-sub">Associates · Indore</span></span>
          </a>
          <a className="est-call" href={`tel:+${PHONE_RAW}`}><PhoneIcon />{PHONE}</a>
        </div>
      </header>

      {/* Hero */}
      <section className="est-hero">
        <div className="wrap est-hero-in">
          <div className="est-hero-copy">
            <span className="est-badge">{s.status}</span>
            <span className="label" style={{ marginTop: 16 }}>{s.dev}</span>
            <h1>{s.name}</h1>
            <p className="est-loc"><PinIcon />{s.location}</p>
            <p className="lede">{s.intro}</p>
            {s.offerings && <div className="est-offer">{s.offerings.map((o) => <span key={o}>{o}</span>)}</div>}
            <div className="est-facts">
              <div><small>{s.sizeLabel || (s.plotTable ? 'Plot range' : 'Plot sizes')}</small><b>{s.sizes}</b></div>
              {s.rera && <div><small>{s.rera[0][0].startsWith('RERA Agent') ? 'RERA Agent' : 'RERA'}</small><b>{s.rera.map(([k, v], i) => (
                <span key={v}>{i > 0 && <br />}<a href={RERA_URL} target="_blank" rel="noopener">{v}</a> <i>{k.startsWith('RERA Agent') ? '' : k}</i></span>
              ))}</b></div>}
            </div>
            <div className="est-cta">
              <a className="btn btn-primary" href={wa(s.waPlot)} target="_blank" rel="noopener">Enquire now <span className="btn-arrow"><ArrowIcon /></span></a>
              <a className="btn btn-wa" href={`tel:+${PHONE_RAW}`}><PhoneIcon />Call {PHONE}</a>
            </div>
          </div>
          <div className="est-hero-img">{s.hero ? <img src={img(s.hero)} alt={s.name} /> : <div className="est-ph"><span>{s.dev}</span><small>Photos coming soon</small></div>}</div>
        </div>
      </section>

      {/* Stats */}
      {s.stats && (
        <section className="sec tint">
          <div className="wrap"><div className="est-stats">{s.stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div></div>
        </section>
      )}

      {/* Gallery */}
      {s.gallery && (
        <section className="sec">
          <div className="wrap">
            <div className="sec-head"><span className="label">Gallery</span><h2>Inside {short(s.name)}</h2></div>
            <div className="est-gallery">
              {s.gallery.map((g) => <figure key={g.src}><img src={img(g.src)} alt={g.cap || s.name} loading="lazy" />{g.cap && <figcaption>{g.cap}</figcaption>}</figure>)}
            </div>
          </div>
        </section>
      )}

      {/* Amenities */}
      {(s.amenityList || s.clubhouse || s.gardens || s.amenities || s.chipGroups) && (
        <section className="sec tint">
          <div className="wrap">
            <div className="sec-head"><span className="label">Amenities</span><h2>What you share as a resident</h2></div>
            {s.amenityList && <div className="est-amenlist">{s.amenityList.map((a) => <span key={a} className="est-pill"><CheckDot />{a}</span>)}</div>}
            {(s.clubhouse || s.amenities || s.gardens || s.chipGroups) && (
              <div className="est-amen">
                {s.clubhouse && (
                  <div className="est-amen-card"><h3>The clubhouse</h3>
                    <p><b>Ground level</b> — {s.clubhouse.ground}</p>
                    <p><b>Upper level</b> — {s.clubhouse.upper}</p>
                  </div>
                )}
                {s.gardens && <div className="est-amen-card"><h3>Five themed gardens</h3><div className="chips">{s.gardens.map((g) => <span className="chip" key={g}>{g}</span>)}</div></div>}
                {s.amenities && s.amenities.map(([h, d]) => <div className="est-amen-card" key={h}><h3>{h}</h3><p>{d}</p></div>)}
                {s.chipGroups && s.chipGroups.map((g) => <div className="est-amen-card" key={g.title}><h3>{g.title}</h3><div className="chips">{g.items.map((i) => <span className="chip" key={i}>{i}</span>)}</div></div>)}
              </div>
            )}
            {s.note && <p className="est-note">{s.note}</p>}
          </div>
        </section>
      )}

      {/* Plot sizes table */}
      {s.plotTable && (
        <section className="sec">
          <div className="wrap">
            <div className="sec-head"><span className="label">Plot sizes</span><h2>Choose your plot</h2>
              <p className="lede">Plot options at {short(s.name)}. Ask for today’s rate list and availability.</p></div>
            <div className="est-table-wrap">
              <table className="est-table">
                <thead><tr>{s.plotTable.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>{s.plotTable.rows.map((r) => <tr key={r[0]}><td><b>{r[0]}</b></td>{r.slice(1).map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Floor plans + specs */}
      {s.floorPlans && (
        <section className="sec tint">
          <div className="wrap">
            <div className="sec-head"><span className="label">{s.floorPlanLabel || 'Floor plans'}</span><h2>{s.floorPlanTitle || 'Floor plans'}</h2></div>
            <div className="est-plans">
              {s.floorPlans.map((fp, i) => (
                <figure key={i}><img src={img(fp.img)} alt={`${fp.label} floor plan, ${fp.area}`} loading="lazy" />
                  <figcaption><b>{fp.label}</b><span>{fp.area}</span></figcaption></figure>
              ))}
            </div>
            {s.specs && <div className="est-specs"><h3>Specifications</h3><ul>{s.specs.map(([k, v]) => <li key={k}><small>{k}</small><span>{v}</span></li>)}</ul></div>}
          </div>
        </section>
      )}

      {/* Home styles (villa types) */}
      {(s.villaTypes || s.villaBoard) && (
        <section className="sec">
          <div className="wrap">
            <div className="sec-head"><span className="label">Homes</span><h2>Villas built here</h2>
              <p className="lede">Actual homes handed over at {short(s.name)}.</p></div>
            {s.villaBoard
              ? <div className="est-board"><img src={img(s.villaBoard)} alt={`Villas at ${s.name}`} loading="lazy" /></div>
              : <div className="est-vtypes">{s.villaTypes.map((v) => <figure key={v.img}><img src={img(v.img)} alt={v.label} loading="lazy" /><figcaption>{v.label}</figcaption></figure>)}</div>}
          </div>
        </section>
      )}

      {/* Proposed villa / homes */}
      {s.villa && (
        <section className="sec tint">
          <div className="wrap">
            <div className="sec-head"><span className="label">{s.waVilla ? 'Plot + construction' : 'Homes'}</span><h2>{s.waVilla ? 'A proposed villa for this estate' : s.villa.title}</h2>
              <p className="lede">{s.waVilla ? 'An illustrative home by Ashish Barjatya Associates, planned for a plot here. Ask for a floor plan and an itemised estimate.' : s.villa.desc}</p></div>
            <div className="est-villa">
              <div className="est-villa-pics" data-one={s.villa.alt ? undefined : true}>
                <img src={img(s.villa.img)} alt={`${s.villa.title}, ${s.name}`} loading="lazy" />
                {s.villa.alt && <img src={img(s.villa.alt)} alt={s.villa.title} loading="lazy" />}
              </div>
              <div className="est-villa-body">
                {s.villa.price && <div className="est-price"><b>{s.villa.price}</b>{s.villa.priceNote && <span>{s.villa.priceNote}</span>}</div>}
                <h3>{s.villa.title}</h3>
                {s.waVilla && <p>{s.villa.desc}</p>}
                <ul className="est-spec">
                  {s.villa.dims && <li><small>Plot</small><b>{s.villa.dims} · {s.villa.plot}</b></li>}
                  {s.villa.builtup && <li><small>Proposed built-up</small><b>{s.villa.builtup}</b></li>}
                  {s.villa.config && <li><small>Configuration</small><b>{s.villa.config}</b></li>}
                  {s.villa.sizes && <li><small>Plot sizes</small><b>{s.villa.sizes}</b></li>}
                </ul>
                <a className="btn btn-primary" href={wa(s.waVilla || s.waPlot)} target="_blank" rel="noopener">{s.waVilla ? 'Plan my villa' : 'Enquire'} <span className="btn-arrow"><ArrowIcon /></span></a>
              </div>
            </div>
            {villaFeatures && (
              <div className="est-features">
                <h3>{s.waVilla ? 'Features you can choose' : 'Township features'}</h3>
                <div className="est-feat-grid">{villaFeatures.map(([h, d]) => <div key={h}><b>{h}</b><p>{d}</p></div>)}</div>
              </div>
            )}
            <p className="est-note">Illustrative designs. Options depend on plot size, setbacks, structural review and approvals. Prices and specifications are indicative and subject to change before booking.</p>
          </div>
        </section>
      )}

      {/* Related project within the township */}
      {s.related && (
        <section className="sec">
          <div className="wrap">
            <div className="sec-head"><span className="label">Within this township</span><h2>{s.related.name}</h2></div>
            <a className="feat" href={`/projects/${s.related.slug}`} onClick={(e) => { e.preventDefault(); navigate(`/projects/${s.related.slug}`) }} aria-label={`View ${s.related.name}`}>
              <div className="feat-img"><img src={img(s.related.img)} alt={s.related.name} loading="lazy" /></div>
              <div className="feat-body">
                <span className="feat-badge">Part of {short(s.name)}</span>
                <h3>{s.related.tagline}</h3>
                <p>{s.related.desc}</p>
                <span className="btn btn-primary">View {s.related.name} <span className="btn-arrow"><ArrowIcon /></span></span>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Videos */}
      {s.videos && s.videos.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <div className="sec-head"><span className="label">Video guide</span><h2>Walk the estate on video</h2></div>
            <div className="est-videos">{s.videos.map((v) => <VideoEmbed key={v.id} id={v.id} title={v.t} />)}</div>
          </div>
        </section>
      )}

      {/* 360 tours */}
      {s.tours360 && (
        <section className="sec">
          <div className="wrap">
            <div className="sec-head"><span className="label">Virtual tours</span><h2>Walk a villa in 360°</h2></div>
            <div className="est-tours">
              {s.tours360.map(([t, url]) => (
                <a className="est-tour" key={url} href={url} target="_blank" rel="noopener">
                  <span className="est-tour-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3c5 0 9 2 9 4.5S17 12 12 12 3 10 3 7.5 7 3 12 3Z"/><path d="M3 7.5v4C3 14 7 16 12 16s9-2 9-4.5v-4"/></svg></span>
                  <span>{t}</span><ArrowIcon />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location */}
      <section className="sec tint">
        <div className="wrap">
          <div className="sec-head"><span className="label">Location & connectivity</span><h2>Where {short(s.name)} sits</h2>
            <p className="lede">{s.location}.{s.drives ? ' Approximate drive times below are from the estate.' : (s.map ? '' : ' Detailed location map coming soon — ask us for the exact site location.')}</p></div>
          {(s.map || s.drives || s.landmarks) && (
          <div className="est-loc-grid">
            {s.map && <div className="est-map"><img src={img(s.map)} alt={`Location of ${s.name}`} loading="lazy" /></div>}
            {s.drives && (
              <div className="est-drives"><h3>Driving from the estate</h3>
                <ul>{s.drives.map(([p, t]) => <li key={p}><span>{p}</span><b>{t}</b></li>)}</ul>
                <p className="est-note" style={{ marginTop: 16 }}>Approximate times based on Google Maps estimates; traffic and route choice affect timing.</p>
              </div>
            )}
            {s.landmarks && (
              <div className="est-drives"><h3>Close by</h3>
                <div className="chips">{s.landmarks.map((l) => <span className="chip" key={l}>{l}</span>)}</div>
                <p className="est-note" style={{ marginTop: 16 }}>Indicative map; distances are approximate.</p>
              </div>
            )}
          </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="est-cta-band">
        <div className="wrap">
          <h2>Ready to see {short(s.name)}?</h2>
          <p>Share your budget and plot size — we’ll shortlist two options worth visiting.{s.siteOffice ? ` Site office: ${s.siteOffice}.` : ''}</p>
          <div className="est-cta">
            <a className="btn btn-primary" href={wa(s.waPlot)} target="_blank" rel="noopener"><WaIcon />WhatsApp us</a>
            <a className="btn btn-wa" href={`tel:+${PHONE_RAW}`}><PhoneIcon />{PHONE}</a>
            <a className="link" href="/" onClick={toProjects}>Back to all projects</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const CheckDot = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)
