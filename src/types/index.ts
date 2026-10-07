export interface BrandItem {
  id: string;
  name: string;
  niche: string;
  logoType: 'svg' | 'image';
  svgKey?: 'flipkart' | 'amazon' | 'godrej' | 'purplle' | 'mamaearth' | 'be10x' | 'hostinger' | 'emergent' | 'aisle' | 'custom';
  customImageUrl?: string;
  notes?: string;
}

export interface CreatorItem {
  id: string;
  name: string;
  niche: string;
  photoUrl?: string;
  bio?: string;
  primaryPlatform: 'YouTube' | 'Instagram' | 'LinkedIn' | 'Multi-Platform';
  socialLinks: {
    youtube?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  isPlaceholder: boolean;
}

export interface BrandEnquiryPayload {
  brandName: string;
  contactPerson: string;
  businessEmail: string;
  phone: string;
  website?: string;
  campaignObjective: string;
  preferredPlatforms: string[];
  estimatedBudget: string;
  campaignTimeline: string;
  campaignBrief: string;
}

export interface CreatorApplicationPayload {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  primaryPlatform: string;
  profileUrl: string;
  contentNiche: string;
  followerCount: string;
  averageViews: string;
  introduction: string;
  consent: boolean;
}

export interface StoredSubmission {
  id: string;
  type: 'brand_campaign' | 'creator_application';
  targetRecipient: string;
  createdAt: string;
  status: string;
  [key: string]: any;
}
