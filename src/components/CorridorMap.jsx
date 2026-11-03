import { CORRIDORS, PROJECTS, goToProject } from '../data'

/* Schematic map (placeholder for a real map): four corridors radiate from the city centre.
   Each corridor is a cubic Bézier; project pins sit along it at fixed positions. Not to scale. */
const K = 1.12 // stretch the layout vertically so the map fills its card
const H = Math.round(700 * K)
const sc = ([x, y]) => [x, y * K]
const C = sc([280, 380])
const GEO = {
  super: { pts: [C, [210, 400], [130, 430], [50, 422]].map((p, i) => (i ? sc(p) : p)), label: [24, 398 * K, 'start'], pins: { 'omaxe-corridor': 0.6 } },
  ujjain: { pts: [C, [270, 290], [240, 190], [210, 92]].map((p, i) => (i ? sc(p) : p)), label: [210, 68 * K, 'middle'], pins: { 'godrej-greenview': 0.62 } },
  bypass: { pts: [C, [350, 400], [440, 450], [510, 560]].map((p, i) => (i ? sc(p) : p)), label: [540, 596 * K, 'end'], pins: { 'omaxe-city-2': 0.45, 'godrej-verdania': 0.8 } },
  rau: { pts: [C, [285, 470], [265, 560], [240, 640]].map((p, i) => (i ? sc(p) : p)), label: [240, 674 * K, 'middle'], pins: { 'omaxe-city-1': 0.42, 'omaxe-hills': 0.8 } },
}

const bez = ([p0, p1, p2, p3], t) => {
  const u = 1 - t
  const f = (i) => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i]
  return [f(0), f(1)]
}
const d = ([p0, p1, p2, p3]) => `M${p0[0]} ${p0[1]} C${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]} ${p3[0]} ${p3[1]}`

export default function CorridorMap({ active, onSelect }) {
  return (
    <svg className="map-svg" viewBox={`0 0 560 ${H}`} role="group" aria-label="Schematic map of the four growth corridors around Indore" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#E6EDFB" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="560" height={H} rx="12" fill="#F8FAFF" />
      <rect width="560" height={H} rx="12" fill="url(#mapgrid)" />

      {CORRIDORS.map((c) => {
        const g = GEO[c.id]
        const on = active === c.id
        return (
          <g key={c.id} role="button" tabIndex={0} aria-pressed={on} aria-label={`${c.t}, ${PROJECTS.filter((p) => p.corridor === c.id).length} projects`}
            onClick={() => onSelect(c.id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(c.id) } }} style={{ cursor: 'pointer' }}>
            <path d={d(g.pts)} fill="none" stroke="transparent" strokeWidth="28" />
            <path d={d(g.pts)} fill="none" stroke={on ? '#1D4ED8' : '#DCE5F7'} strokeWidth="8" strokeLinecap="round" />
            <path d={d(g.pts)} fill="none" stroke="#fff" strokeOpacity={on ? 0.7 : 0.9} strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" />
            <text x={g.label[0]} y={g.label[1]} textAnchor={g.label[2]} fontFamily="Sora, sans-serif" fontWeight="600" fontSize="13" fill={on ? '#0B1F5C' : '#4F5D86'}>{c.n} {c.t}</text>
            {Object.entries(g.pins).map(([id, t]) => {
              const [x, y] = bez(g.pts, t)
              const p = PROJECTS.find((q) => q.id === id)
              if (!p) return null
              const go = (e) => { e.stopPropagation(); goToProject(p) }
              return (
                <g key={id} className="map-pin" role="link" tabIndex={0} aria-label={`Go to ${p.name}`}
                  onClick={go} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(e) } }}>
                  <circle className="pin-hit" cx={x} cy={y} r="18" fill="transparent" />
                  <circle className="pin-dot" cx={x} cy={y} r="8" fill="#fff" stroke={on ? '#1D4ED8' : '#9FB4E6'} strokeWidth="3" />
                  <text x={x} y={y + 28} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={on ? 500 : 400} fontSize="12.5" fill={on ? '#0B1F5C' : '#4F5D86'} stroke="#F8FAFF" strokeWidth="4" paintOrder="stroke">{p.name}</text>
                </g>
              )
            })}
          </g>
        )
      })}

      <circle cx={C[0]} cy={C[1]} r="16" fill="#fff" stroke="#DCE5F7" strokeWidth="2" />
      <circle cx={C[0]} cy={C[1]} r="7" fill="#E0B43C" />
      <text x={C[0] + 24} y={C[1] + 5} fontFamily="Sora, sans-serif" fontWeight="600" fontSize="14" fill="#0B1F5C">Indore</text>
    </svg>
  )
}
