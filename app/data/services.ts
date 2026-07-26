export interface Service {
  id: number
  slug: string
  title: string
  shortDesc: string
  description: string
  icon: string
  color: string
  highlights: string[]
  image?: string
  content?: string
}

export const services: Service[] = [
  {
    id: 1,
    slug: 'studio-design-build',
    title: 'Studio Design & Build',
    shortDesc: 'Complete TV and radio studio construction from concept to execution.',
    description: `We specialize in end-to-end studio design and build-out. From acoustic treatment and lighting to equipment rack design and system integration, we ensure a world-class production environment tailored to your specific requirements.`,
    icon: 'lucide:layout-template',
    color: 'from-slate-800 to-slate-900',
    image: '/images/services/studio_design.png',
    content: `
      <h3>End-to-End Studio Solutions</h3>
      <p>Building a modern broadcast studio requires a perfect blend of acoustic engineering, ergonomic design, and cutting-edge technology. Our team handles every aspect of the project.</p>
      <ul>
        <li><strong>Acoustic Treatment:</strong> Soundproofing and acoustic balancing.</li>
        <li><strong>Ergonomic Layouts:</strong> Optimal furniture and equipment placement.</li>
        <li><strong>Lighting Design:</strong> Professional broadcast lighting grids.</li>
      </ul>
    `,
    highlights: ['Acoustic engineering', 'Custom studio furniture', 'Broadcast lighting', 'HVAC coordination', 'Turnkey execution', 'Project management'],
  },
  {
    id: 2,
    slug: 'installation-commissioning',
    title: 'Installation & Commissioning',
    shortDesc: 'Expert setup, wiring, and configuration of broadcast systems.',
    description: `Our certified field engineers provide seamless installation of complex audio-visual and broadcast systems. We manage cable routing, rack building, equipment configuration, and final commissioning with detailed test reports.`,
    icon: 'lucide:wrench',
    color: 'from-[#e32727] to-[#c41e1e]',
    image: '/images/services/installation.png',
    highlights: ['Rack integration', 'Cable management', 'System configuration', 'Signal routing', 'Performance testing', 'As-built documentation'],
  },
  {
    id: 3,
    slug: 'preventive-maintenance',
    title: 'Preventive Maintenance & Support',
    shortDesc: 'Scheduled maintenance and 24/7 technical support for uninterrupted operations.',
    description: `We offer comprehensive Annual Maintenance Contracts (AMC) to keep your broadcast infrastructure running at peak performance. Our services include scheduled checkups, firmware updates, and 24/7 emergency response.`,
    icon: 'lucide:shield-check',
    color: 'from-slate-700 to-slate-800',
    image: '/images/services/maintenance.png',
    highlights: ['Annual Maintenance Contracts', 'Scheduled checkups', 'Firmware updates', '24/7 emergency response', 'Equipment repair', 'Spare parts management'],
  },
  {
    id: 4,
    slug: 'live-production-setup',
    title: 'Live Event Production Setup',
    shortDesc: 'State-of-the-art audio and video solutions for concerts and corporate events.',
    description: `Digiview provides robust PA systems, digital mixing consoles, wireless microphones, and video walls for live events. Whether it's a concert, conference, or corporate gathering, we deliver uncompromised audio-visual quality.`,
    icon: 'lucide:mic',
    color: 'from-[#e32727] to-[#c41e1e]',
    image: '/images/services/live_event.png',
    highlights: ['PA systems', 'Digital mixing', 'Wireless microphones', 'Video walls', 'On-site technical support', 'Live streaming setups'],
  },
  {
    id: 5,
    slug: 'consultancy-architecture',
    title: 'Consultancy & System Architecture',
    shortDesc: 'Expert guidance for transitioning to IP-based and 4K workflows.',
    description: `Navigating the transition from SDI to IP or upgrading to 4K/8K can be complex. Our engineering consultants provide expert advice, workflow analysis, and system architecture design to future-proof your broadcast facility.`,
    icon: 'lucide:cpu',
    color: 'from-slate-800 to-slate-900',
    image: '/images/services/consultancy.png',
    highlights: ['Workflow analysis', 'IP transition planning', '4K/8K readiness', 'Budget estimation', 'Technology evaluation', 'Proof of concept'],
  }
]
