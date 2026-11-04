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
    status: 'Booking open', tone: 'open', sizes: '1000 & 1250 sq ft', rera: '', image: 'godrej-greenview-aerial.jpg', render: true,
    blurb: 'A Godrej-managed plotted estate with clubhouse and landscaped greens, on the corridor getting metro connectivity.',
  },
  {
    id: 'godrej-verdania', dev: 'godrej', name: 'Godrej Verdania Estate', area: 'Bypass Road, Mangliya, Indore', corridor: 'bypass',
    status: 'Booking open', tone: 'open', sizes: '1250 – 4000 sq ft', rera: '', image: 'godrej-verdania-aerial.jpg', render: true,
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
export const mapLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

export const FOUNDERS = [
  { name: 'Ashish Barjatya', role: 'Founder & Principal', photo: 'ashish-barjatya.jpg' },
  { name: 'Rajneesh Jain', role: 'Founder', photo: 'rajneesh-jain.jpg' },
]
export const FOUNDER_NOTE = {
  text: 'Most of our families came through someone we helped before. That is our only marketing.',
  by: 'Ashish Barjatya',
}

export const BUDGETS = ['Under ₹30 lakh', '₹30 – 50 lakh', '₹50 lakh – 1 crore', 'Above ₹1 crore']
export const PURPOSES = ["My family's home", 'Investment']

/* ── Placeholders for the blueprint sections. Replace the [TO FILL] items; anything left empty shows a placeholder. ── */
// "Your dreams, in reality" ribbon (public/img/life). `alt` describes the photo.
export const LIFE_TILES = [
  { image: 'life/children-playing.jpg', caption: 'Evenings full of laughter', alt: 'A smiling toddler in a sun hat playing with balloons and balls on a green garden lawn' },
  { image: 'life/omaxe-city-villas.jpg', caption: 'Neighbours on the same lane', alt: 'A row of white villas in Omaxe City, Indore' },
  { image: 'life/kid-cricket-park.jpg', caption: 'Room to run and play', alt: 'A child playing cricket on a green lawn' },
  { image: 'life/omaxe-hills-home.jpg', caption: 'A home of your own', alt: 'A two-storey home at Omaxe Hills, Indore' },
  { image: 'life/family-weekend.jpg', caption: 'Weekends together', alt: 'A family splashing in a swimming pool' },
]
// Photos for the awards carousel (public/img/awards).
export const AWARD_PHOTOS = [
  { file: 'award-ceremony-backdrop', title: 'Annual Award Ceremony 2025–26', meta: 'Celebrating excellence, honouring achievement · Nakhrali Dhani, 22 April 2026' },
  { file: 'godrej-partner-connect-award', title: 'Godrej Partner Connect', meta: 'On stage at the Verdania Estate partner meet · Godrej Properties' },
  { file: 'aba-team-awards', title: 'The ABA team', meta: 'Annual Award Ceremony 2025–26' },
  { file: 'award-handover', title: 'Honouring achievement', meta: 'Annual Award Ceremony 2025–26 · Nakhrali Dhani' },
  { file: 'godrej-partner-connect', title: 'Verdania Estate celebration', meta: 'Godrej Partner Connect · Godrej Properties' },
  { file: 'award-winner', title: 'Celebrating excellence', meta: 'Annual Award Ceremony 2025–26' },
  { file: 'award-ceremony-stage', title: 'On stage', meta: 'Annual Award Ceremony 2025–26 · Nakhrali Dhani' },
]
export const FAQS = [
  { q: 'Are these projects RERA-registered?', a: "Yes. Every project we sell is registered with MP-RERA. We share the registration number before you book, and you can check it yourself at rera.mp.gov.in. For a project marked 'Launching soon', we take bookings only once its RERA registration is issued." },
  { q: 'Can I get a home loan for a plot?', a: 'Yes. Most major banks offer plot loans for residential plots in approved, RERA-registered layouts. The loan usually covers a large share of the plot price and you pay the rest as a down payment. If you plan to build soon, ask the bank about a combined plot and construction loan. We help you put together the documents the bank asks for.' },
  { q: 'Which documents will I see before I book?', a: "The project's RERA certificate, the T&CP layout approval, the title documents for the land, and the full payment schedule. We put them on the table and walk you through them before you pay anything. Once you book, you receive the allotment letter and the agreement for sale." },
  { q: 'How does the registry work?', a: "Once the payments due under your schedule are complete, the sale deed is registered in your name at the Sub-Registrar office. You pay the stamp duty and registration fee at the rates set by the Madhya Pradesh government. Your advisor prepares the paperwork with you and sits with you on registry day." },
  { q: 'Can NRIs buy plots here?', a: 'Yes. NRIs and OCI cardholders can buy residential plots in India; the restriction under FEMA is on agricultural land, plantations and farmhouses. Payment must come through normal banking channels, such as your NRE or NRO account. If you cannot be in Indore, a family member can complete the registry for you with a power of attorney.' },
  { q: 'How do site visits work?', a: 'Message or call us with your budget and plot size, and we shortlist two or three plots worth seeing. We arrange pick-up anywhere in Indore and show you the ground with someone who knows it well. Visits run on weekdays and Saturdays, and on Sundays by appointment.' },
]
export const SOCIAL = [
  { name: 'Instagram', url: '' },
  { name: 'Facebook', url: '' },
  { name: 'YouTube', url: '' },
  { name: 'LinkedIn', url: '' },
]

// Ask the Projects section to switch to the right tab and scroll to this project's card.
export const goToProject = (p) => window.dispatchEvent(new CustomEvent('goto-project', { detail: { dev: p.dev, id: p.id } }))
