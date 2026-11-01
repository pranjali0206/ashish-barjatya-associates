export const img = (name) => `${import.meta.env.BASE_URL}img/${name}`

export const PHONE = '+91 93000 24141'
export const PHONE_RAW = '919300024141'
export const wa = (text) => `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(text)}`

export const OMAXE = [
  {
    id: 'city-1',
    name: 'Omaxe City 1',
    location: 'Mayakhedi, Indore',
    type: 'Residential Plots',
    sizes: '1000 & 1453 sq ft',
    status: 'Ready to Possess',
    tone: 'ready',
    image: 'omaxe-city-1.jpg',
    blurb: 'An established, lived-in township with ready-to-possess inventory — the most immediate address in the portfolio.',
  },
  {
    id: 'city-2',
    name: 'Omaxe City 2',
    location: 'Mangliya, Indore',
    type: 'Residential Plots',
    sizes: '1937 – 4359 sq ft',
    status: 'Established Township',
    tone: 'default',
    image: 'omaxe-city-2.jpg',
    blurb: 'Larger plots off the Bypass at Mangliya, for families who want room to build generously.',
  },
  {
    id: 'hills',
    name: 'Omaxe Hills',
    location: 'Rau, Indore',
    type: 'Premium Residential Plots',
    sizes: '1000 & 1453 sq ft',
    status: 'Premium Plots',
    tone: 'default',
    image: 'omaxe-hills.jpg',
    blurb: 'A 90-acre integrated township at Rau — a consolidated residential belt with mature infrastructure.',
  },
  {
    id: 'corridor',
    name: 'Omaxe Corridor',
    location: 'Super Corridor, Indore',
    type: 'Premium Residential Plots',
    sizes: '1000 · 1200 · 1500 sq ft',
    status: 'Coming Soon',
    tone: 'soon',
    image: 'omaxe-corridor.jpg',
    blurb: "The next chapter — on the city's principal westward growth axis, anchored by IT and institutional development.",
  },
]

export const GODREJ = [
  {
    id: 'greenview',
    name: 'Godrej Greenview Estate',
    location: 'Indore–Ujjain Road, Indore',
    type: 'Premium Residential Plots',
    sizes: '1000 & 1250 sq ft',
    image: 'godrej-greenview.jpg',
    blurb: 'A fast-developing corridor with highway upgrades and planned metro connectivity — premium plots with a clubhouse, landscaped greens and a Godrej-managed estate.',
  },
  {
    id: 'verdania',
    name: 'Godrej Verdania Estate',
    location: 'Bypass Road, Mangliya, Indore',
    type: 'Premium Residential Plots',
    sizes: '1250 – 4000 sq ft',
    image: 'godrej-verdania.jpg',
    blurb: 'Established connectivity off the Bypass — a wide range of plot sizes for families planning a home today and investors planning for what comes next.',
  },
]

export const WHY = [
  { n: '01', t: 'Local expertise', d: "A working knowledge of Indore's corridors — Super Corridor, Ujjain Road, Bypass Road, Rau, Mangliya — rather than a national database." },
  { n: '02', t: 'Curated opportunities', d: 'A deliberately limited portfolio, so every project we put forward is one we can speak about honestly.' },
  { n: '03', t: 'Transparent advisory', d: 'Transparent pricing with no hidden commitments. You hear the trade-offs, not just the pitch.' },
  { n: '04', t: 'Developer relationships', d: 'Two decades alongside Omaxe and Godrej Properties — direct access to inventory, launches and priority allocations.' },
  { n: '05', t: 'Documentation first', d: 'RERA registration, title and approval documents reviewed before any commitment is made.' },
  { n: '06', t: 'End-to-end assistance', d: 'Site visits, booking, payment milestones and possession — handled as one continuous process, with the same point of contact.' },
]

export const CORRIDORS = [
  { t: 'Super Corridor', d: "The city's principal westward growth axis, anchored by institutional and IT development.", image: 'omaxe-corridor.jpg' },
  { t: 'Indore–Ujjain Road', d: 'A fast-developing corridor with highway upgrades and planned metro connectivity.', image: 'godrej-greenview.jpg' },
  { t: 'Bypass Road & Mangliya', d: 'Established connectivity supporting premium plotted and villa development.', image: 'godrej-verdania.jpg' },
  { t: 'Rau & Mayakhedi', d: 'Consolidated residential belts with ready-to-possess inventory.', image: 'omaxe-hills.jpg' },
]

export const PROCESS = [
  { t: 'Understanding', d: 'Your requirement, budget and timeline — before any project is named.' },
  { t: 'Shortlisting', d: 'A short, honest set of options from the Omaxe and Godrej portfolios.' },
  { t: 'Site visits', d: 'Across Indore, by appointment, with someone who knows the ground.' },
  { t: 'Verification', d: 'RERA registration, title and approval documents reviewed before commitment.' },
  { t: 'Through possession', d: 'Booking, payment milestones and handover, with the same point of contact.' },
]
