export const img = (name) => `${import.meta.env.BASE_URL}img/${name}`

export const PHONE = '+91 78287 26107'
export const PHONE_RAW = '917828726107'
export const wa = (text) => `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(text)}`

/* ──────────────────────────────────────────────────────────────
   Facts the founder confirms once. Leave '' / null / [] to HIDE
   the element on the page — nothing here is ever guessed.
────────────────────────────────────────────────────────────── */
export const YEARS = 20
export const FOUNDED_YEAR = null           // e.g. 2005 → footer reads "since 2005"
export const RERA_AGENT_NO = ''            // exactly as printed on rera.mp.gov.in
export const RERA_URL = 'https://rera.mp.gov.in'
export const ADDRESS = ''                  // 'Street, landmark, Indore 452xxx'
export const MAPS_URL = ''                 // Google Maps share link for the office
export const HOURS = ''                    // 'Mon–Sat 10:30 am – 7:30 pm'
export const GOOGLE = { rating: '', count: 0, url: '' }
export const TESTIMONIALS = []             // [{ quote, name, locality, project, year }]
export const HINDI_LINE = 'जहाँ सपनों को उनका पता मिलता है'

export const STATS = [
  { n: `${YEARS}+`, l1: 'Years selling plots', l2: 'in Indore' },
  { n: '6', l1: 'Townships,', l2: 'Omaxe & Godrej' },
  { n: '100+', l1: 'Families handed', l2: 'possession' },
]

export const DEVELOPERS = {
  omaxe: { name: 'Omaxe', logo: 'omaxe-logo.png', count: 4 },
  godrej: { name: 'Godrej Properties', logo: 'godrej-properties-logo.svg', count: 2 },
}

/* status tones: ready | developed | open | soon */
export const PROJECTS = [
  {
    id: 'omaxe-city-1', dev: 'omaxe', name: 'Omaxe City 1', area: 'Mayakhedi, Indore', corridor: 'rau',
    status: 'Ready to possess', tone: 'ready', sizes: '1000 & 1453 sq ft', rera: '', image: 'omaxe-city-1.jpg', render: false,
    blurb: 'A lived-in township with schools, shops and neighbours already there. Register and start building.',
  },
  {
    id: 'omaxe-city-2', dev: 'omaxe', name: 'Omaxe City 2', area: 'Mangliya, Bypass Road, Indore', corridor: 'bypass',
    status: 'Developed township', tone: 'developed', sizes: '1937 – 4359 sq ft', rera: '', image: 'omaxe-city-2.jpg', render: false,
    blurb: 'Larger plots for families who want a garden and room to grow.',
  },
  {
    id: 'omaxe-hills', dev: 'omaxe', name: 'Omaxe Hills', area: 'Rau, Indore', corridor: 'rau',
    status: 'Developed township', tone: 'developed', sizes: '1000 & 1453 sq ft', rera: '', image: 'omaxe-hills.jpg', render: false,
    blurb: 'A 90-acre integrated township with roads, parks and clubhouse already in place.',
  },
  {
    id: 'omaxe-corridor', dev: 'omaxe', name: 'Omaxe Corridor', area: 'Super Corridor, Indore', corridor: 'super',
    status: 'Launching soon', tone: 'soon', sizes: '1000 · 1200 · 1500 sq ft', rera: '', image: 'omaxe-corridor.jpg', render: true,
    blurb: "On the city's fastest-growing axis, near the IT park and the airport road. Register for launch pricing.",
  },
  {
    id: 'godrej-greenview', dev: 'godrej', name: 'Godrej Greenview Estate', area: 'Indore–Ujjain Road, Indore', corridor: 'ujjain',
    status: 'Booking open', tone: 'open', sizes: '1000 & 1250 sq ft', rera: '', image: 'godrej-greenview.jpg', render: true,
    blurb: 'A Godrej-managed plotted estate with clubhouse and landscaped greens, on the corridor getting metro connectivity.',
  },
  {
    id: 'godrej-verdania', dev: 'godrej', name: 'Godrej Verdania Estate', area: 'Bypass Road, Mangliya, Indore', corridor: 'bypass',
    status: 'Booking open', tone: 'open', sizes: '1250 – 4000 sq ft', rera: '', image: 'godrej-verdania.jpg', render: true,
    blurb: 'The widest range of plot sizes we represent — for a family home today, or an investment that holds its value.',
  },
]

export const rateListMsg = (p) => `Please send today's rate list and payment plan for ${p.name}, ${p.area}.`
export const siteVisitMsg = (p) => `I would like to book a site visit for ${p.name}, ${p.area}.`
export const launchMsg = (p) => `Please register my interest for the ${p.name} launch (${p.area}) and share launch pricing.`

export const CORRIDORS = [
  { id: 'super', n: '01', t: 'Super Corridor', d: 'The westward growth axis: IT park, airport road, institutional belt. The place to buy early.', q: 'Super Corridor, Indore, Madhya Pradesh' },
  { id: 'ujjain', n: '02', t: 'Indore–Ujjain Road', d: 'Highway widening and planned metro; the next established address.', q: 'Indore Ujjain Road, Indore, Madhya Pradesh' },
  { id: 'bypass', n: '03', t: 'Bypass Road & Mangliya', d: 'Settled connectivity, larger plots, villas already coming up.', q: 'Mangliya, Indore, Madhya Pradesh' },
  { id: 'rau', n: '04', t: 'Rau & Mayakhedi', d: 'Ready-to-possess townships with neighbours already living there.', q: 'Rau, Indore, Madhya Pradesh' },
]
export const mapEmbed = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=13&output=embed`
export const mapLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

export const WHY = [
  { n: '01', t: "You pay the developer's price.", d: 'Our fee comes from Omaxe or Godrej, never from you.' },
  { n: '02', t: 'Papers before payment.', d: 'RERA registration, T&CP layout approval and title are checked and shown to you — in writing — before you book.' },
  { n: '03', t: 'One person, start to finish.', d: 'The advisor who shows you the plot is the one who sits with you at the registry, and who picks up the phone after possession.' },
]

export const FOUNDERS = [
  { name: 'Ashish Barjatya', role: 'Founder & Principal', photo: 'ashish-barjatya.jpg' },
  { name: 'Rajneesh Jain', role: 'Founder', photo: 'rajneesh-jain.jpg' },
]
export const FOUNDER_NOTE = {
  text: `I started in Indore real estate ${FOUNDED_YEAR ? 'in ' + FOUNDED_YEAR : 'twenty years ago'}, when Omaxe City was still a boundary wall on the Mayakhedi road. Most of the families we work with today came through someone we helped before. That is the only marketing we have ever relied on — and the reason we only take on projects we would buy ourselves.`,
  by: 'Ashish Barjatya',
}

export const PROCESS = [
  { n: '01', when: 'Day 0', t: 'You message or call.', d: "We ask three things: budget, plot size, and whether it's to build on or to invest." },
  { n: '02', when: 'Within a week', t: 'Site visits.', d: 'Two or three plots, with someone who knows the ground. We arrange pick-up anywhere in Indore.' },
  { n: '03', when: 'Before you book', t: 'Papers on the table.', d: 'RERA certificate, T&CP layout approval, title documents, payment schedule. You see everything first.' },
  { n: '04', when: 'Booking to possession', t: 'Same advisor, same number.', d: 'Allotment, payment milestones, registry and handover — one point of contact throughout.' },
]

export const BUDGETS = ['Under ₹30 lakh', '₹30 – 50 lakh', '₹50 lakh – 1 crore', 'Above ₹1 crore']
export const PURPOSES = ["My family's home", 'Investment']
