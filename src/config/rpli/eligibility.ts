export interface RpliEligibilityCategory {
  id: string;
  label: string;
  description: string;
}

export const RPLI_ELIGIBILITY_CATEGORIES: RpliEligibilityCategory[] = [
  {
    id: 'RURAL_RESIDENTS',
    label: 'Rural Area Residents & Farmers',
    description: 'Individuals residing in rural areas, villages, and Gram Panchayats.',
  },
  {
    id: 'AGRICULTURAL_WORKERS',
    label: 'Agricultural Workers & Dairy Farmers',
    description: 'Farmers, landholders, dairy cooperative members, and rural cultivators.',
  },
  {
    id: 'RURAL_ARTISANS',
    label: 'Rural Artisans & Handloom Workers',
    description: 'Artisans, weavers, craftsmen, and rural self-employed workers.',
  },
  {
    id: 'RURAL_BUSINESS',
    label: 'Rural Small Business Owners',
    description: 'Traders, shopkeepers, and micro-entrepreneurs in rural markets.',
  },
];
