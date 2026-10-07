import { BrandItem, CreatorItem } from '../types';

export const INITIAL_BRANDS: BrandItem[] = [
  {
    id: 'brand-1',
    name: 'Flipkart',
    niche: 'E-Commerce & Retail',
    logoType: 'svg',
    svgKey: 'flipkart',
    notes: 'National shopping festivals & creator product showcases'
  },
  {
    id: 'brand-2',
    name: 'Amazon',
    niche: 'Global Marketplace',
    logoType: 'svg',
    svgKey: 'amazon',
    notes: 'Category-specific creator integrations & seasonal campaigns'
  },
  {
    id: 'brand-3',
    name: 'Godrej',
    niche: 'Consumer Goods & Lifestyle',
    logoType: 'svg',
    svgKey: 'godrej',
    notes: 'Home & consumer goods digital outreach'
  },
  {
    id: 'brand-4',
    name: 'Purplle.com',
    niche: "India's #1 Beauty Destination",
    logoType: 'svg',
    svgKey: 'purplle',
    notes: 'Beauty & cosmetic influencer showcases'
  },
  {
    id: 'brand-5',
    name: 'Mamaearth',
    niche: 'Toxin-Free Personal Care',
    logoType: 'svg',
    svgKey: 'mamaearth',
    notes: 'Brand awareness & authentic lifestyle reviews'
  },
  {
    id: 'brand-6',
    name: 'Be10x',
    niche: 'AI Tools & Productivity EdTech',
    logoType: 'svg',
    svgKey: 'be10x',
    notes: 'Creator-led workshop promotions & tool reviews'
  },
  {
    id: 'brand-7',
    name: 'Hostinger',
    niche: 'Web Hosting & Developer Cloud',
    logoType: 'svg',
    svgKey: 'hostinger',
    notes: 'Tech creator sponsorships & website launch campaigns'
  },
  {
    id: 'brand-8',
    name: 'Emergent',
    niche: 'AI & Next-Gen Software',
    logoType: 'svg',
    svgKey: 'emergent',
    notes: 'Software and productivity campaign integrations'
  },
  {
    id: 'brand-9',
    name: 'Aisle',
    niche: 'Dating & High-Intent Social',
    logoType: 'svg',
    svgKey: 'aisle',
    notes: 'Storytelling & relationship creator collaborations'
  },
  {
    id: 'brand-10',
    name: 'Available Partner Slot',
    niche: 'Your Brand Campaign Here',
    logoType: 'svg',
    svgKey: 'custom',
    notes: 'Reserved editable slot for your upcoming brand partnership'
  }
];

export const INITIAL_CREATORS: CreatorItem[] = [
  {
    id: 'creator-khushal-sky',
    name: 'Khushal Sky',
    niche: 'Entertainment & Storytelling',
    primaryPlatform: 'YouTube',
    bio: 'Digital content creator producing engaging entertainment, relatable stories, and video showcases on YouTube.',
    socialLinks: {
      youtube: 'https://www.youtube.com/@khushalsky',
      instagram: 'https://instagram.com'
    },
    isPlaceholder: false
  },
  {
    id: 'creator-manish-creates',
    name: 'Manish Createss',
    niche: 'Creative Video & Storytelling',
    primaryPlatform: 'YouTube',
    bio: 'Visual content creator and video editor showcasing creative visual techniques, filmmaking, and engaging productions.',
    socialLinks: {
      youtube: 'https://www.youtube.com/@ManishCreates17',
      instagram: 'https://instagram.com'
    },
    isPlaceholder: false
  },
  {
    id: 'creator-sameer-world',
    name: 'Sameer World',
    niche: 'Filmmaking & Entertainment',
    primaryPlatform: 'YouTube',
    bio: 'Cinematic creator and filmmaker delivering entertainment, creative concepts, and high-energy video content.',
    socialLinks: {
      youtube: 'https://www.youtube.com/@Sameerfilmz',
      instagram: 'https://instagram.com'
    },
    isPlaceholder: false
  },
  {
    id: 'creator-dipti-mai',
    name: 'Dipti mai',
    niche: 'Lifestyle & Community Vlogs',
    primaryPlatform: 'YouTube',
    bio: 'Engaging lifestyle creator sharing daily experiences, family vlogs, cultural celebrations, and relatable community storytelling.',
    socialLinks: {
      youtube: 'https://www.youtube.com/@Diptimai-s4l',
      instagram: 'https://instagram.com'
    },
    isPlaceholder: false
  },
  {
    id: 'creator-wholesale-ted',
    name: 'Wholesale Ted',
    niche: 'E-Commerce & Online Business',
    primaryPlatform: 'YouTube',
    bio: 'Global e-commerce and business education channel teaching print on demand, online retail, and entrepreneurship strategies.',
    socialLinks: {
      youtube: 'https://www.youtube.com/@WholesaleTed',
      twitter: 'https://x.com'
    },
    isPlaceholder: false
  }
];

export const AGENCY_DETAILS = {
  name: 'CreatorPoint',
  legalName: 'CreatorPoint Influencer Marketing & Creator Management',
  tagline: 'Connecting Brands with the Right Creators',
  headline: 'Connecting Brands with the Right Creators.',
  supportingText: 'CreatorPoint helps brands build impactful influencer campaigns and supports creators with meaningful partnership opportunities.',
  email: 'business@creatorpoint.online',
  phone: '+91 7074809016',
  whatsappUrl: 'https://wa.me/917074809016',
  address: 'Ruinan, Sabang, West Medinipur, 721144, India',
  founder: {
    name: 'Bishnu Bhunia',
    title: 'Founder, CreatorPoint',
    bio: 'Bishnu Bhunia is the founder of CreatorPoint. He completed studies in influencer marketing through Rutgers University, United States, and brings this knowledge to creator management and brand collaborations.'
  }
};
