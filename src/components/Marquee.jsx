const ITEMS = ['Omaxe', 'Godrej Properties', 'Twenty Years', 'Indore', 'Super Corridor', 'RERA Verified', 'Plotted Estates']

export default function Marquee({ dark }) {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className={`marquee${dark ? ' dark' : ''}`} aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => <span key={i}><em>{t}</em><i>✦</i></span>)}
      </div>
    </div>
  )
}
