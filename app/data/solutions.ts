export interface Solution {
  id: number
  slug: string
  title: string
  shortDesc: string
  description: string
  icon: string
  color: string
  features: string[]
  image?: string
  content?: string
}

export const solutions: Solution[] = [
  {
    id: 1,
    slug: 'studio-broadcasting',
    title: 'Studio Broadcasting',
    shortDesc: 'Complete 4K TV and Radio studio infrastructure solutions.',
    description: `We design and deliver turnkey studio broadcasting solutions. From multi-camera setups and sophisticated lighting grids to advanced teleprompters and seamless 4K video switchers, we ensure your studio is ready for modern, high-definition broadcast standards.`,
    icon: 'lucide:monitor-play',
    color: 'from-slate-800 to-slate-900',
    image: '/images/solutions/studio.png',
    features: [
      '4K Multi-camera arrays',
      'Professional Studio Lighting grids',
      'Teleprompter integration',
      'Advanced Video Switchers',
      'Acoustic Treatment & Soundproofing',
      'Playout automation'
    ],
  },
  {
    id: 2,
    slug: 'live-event',
    title: 'Live Event Coverage',
    shortDesc: 'Outside Broadcast (OB) vans, portable production units, and live streaming setups.',
    description: `Take your production anywhere with our comprehensive live event coverage solutions. We equip Outside Broadcast (OB) vans with state-of-the-art portable switchers, robust wireless audio, and real-time graphic overlay systems perfect for sports, concerts, and major corporate events.`,
    icon: 'lucide:radio',
    color: 'from-[#e32727] to-[#991b1b]',
    image: '/images/solutions/live.png',
    features: [
      'OB Van system integration',
      'Portable production units (PPUs)',
      'High-bandwidth live streaming encoders',
      'Wireless microphone systems',
      'Real-time graphics & titling',
      'Multi-channel replay systems'
    ],
  },
  {
    id: 3,
    slug: 'post-production',
    title: 'Post-Production & Editing',
    shortDesc: 'Non-linear editing workstations, color grading suites, and shared storage.',
    description: `Enhance your final cut with our high-end post-production solutions. We provide powerful non-linear editing (NLE) workstations, reference broadcast monitors, professional color grading panels, and high-speed SAN/NAS shared storage networks for seamless collaborative workflows.`,
    icon: 'lucide:film',
    color: 'from-slate-800 to-slate-900',
    image: '/images/solutions/post.png',
    features: [
      'Non-linear editing workstations',
      'Color grading panels & reference monitors',
      'High-speed SAN/NAS shared storage',
      'Audio sweetening & mixing consoles',
      'Media Asset Management (MAM) systems',
      'Automated archiving solutions'
    ],
  }
]
