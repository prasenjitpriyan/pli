export interface RpliEligibilityCategory {
  id: string;
  label: string;
  description: string;
}

export const RPLI_ELIGIBILITY_CATEGORIES: RpliEligibilityCategory[] = [
  {
    id: 'RURAL_RESIDENTS',
    label: 'Rural Area Residents & Farmers',
    description: 'Individuals permanently residing in rural areas, villages, and Gram Panchayats.',
  },
  {
    id: 'OPERATIVE_SB_ACCOUNT',
    label: 'Operative SB Account Holder (POSB / Scheduled Bank)',
    description: 'Any person maintaining an active, KYC-compliant Operative Savings Bank Account with Post Office Savings Bank (POSB) or any Scheduled Bank in India (OM No. 29-26/2024-LI dated 23.01.2025).',
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
