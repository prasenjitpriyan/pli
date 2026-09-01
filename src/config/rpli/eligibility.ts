export interface RpliEligibilityCategory {
  id: string;
  label: string;
  description: string;
}

export const RPLI_ELIGIBILITY_CATEGORIES: RpliEligibilityCategory[] = [
  {
    id: 'RURAL_RESIDENTS',
    label: 'Rural Area Residents & Village Community (Gram Panchayat Residents)',
    description: 'Individuals permanently residing in rural areas, villages, and Gram Panchayats across India.',
  },
  {
    id: 'OPERATIVE_SB_ACCOUNT',
    label: 'Operative SB Account Holder (POSB / IPPB / Scheduled Bank - 2025 Directive)',
    description: 'Any person maintaining an active, KYC-compliant Operative Savings Bank Account with Post Office Savings Bank (POSB), India Post Payments Bank (IPPB), or any Scheduled Bank in India (OM No. 29-26/2024-LI dated 23.01.2025).',
  },
  {
    id: 'FARMERS_AGRICULTURE',
    label: 'Farmers, Cultivators & Agricultural Landholders (Kisan)',
    description: 'Agricultural landholders, crop cultivators, farm workers, and plantation workers.',
  },
  {
    id: 'DAIRY_ALLIED_WORKERS',
    label: 'Dairy, Poultry, Fishery & Allied Agricultural Cooperative Members',
    description: 'Members of milk unions, dairy federations, fishery cooperatives, and rural livestock farmers.',
  },
  {
    id: 'RURAL_ARTISANS_HANDLOOM',
    label: 'Rural Artisans, Handloom Weavers & Craftsmen (Vishwakarma)',
    description: 'Handicraft artisans, weavers, blacksmiths, carpenters, potters, and traditional rural craftsmen.',
  },
  {
    id: 'RURAL_TRADERS_BUSINESS',
    label: 'Rural Small Business Owners, Shopkeepers & Micro-Entrepreneurs',
    description: 'Retailers, grocery shop owners, rural traders, service providers, and village enterprise owners.',
  },
  {
    id: 'SHG_WOMEN_ENTREPRENEURS',
    label: 'Self-Help Group (SHG) Members & Rural Women Entrepreneurs',
    description: 'Members of Deendayal Antyodaya Yojana - NRLM, NABARD SHGs, and rural women cooperative groups.',
  },
  {
    id: 'SELF_EMPLOYED_RURAL',
    label: 'Self-Employed Rural Workers & Daily Wage Earners',
    description: 'Rural vehicle drivers, mechanics, construction workers, and self-employed service personnel.',
  },
  {
    id: 'RURAL_YOUTH_STUDENTS',
    label: 'Rural Youth & Students (Aged 19 to 55 Years)',
    description: 'Young adults, college students, and aspiring professionals residing in rural and semi-urban areas.',
  },
  {
    id: 'SEMI_URBAN_WORKERS',
    label: 'Semi-Urban & Rural Workers in Non-Metro Belts',
    description: 'Workers and residents in tier-3/tier-4 towns, rural suburbs, and peri-urban clusters.',
  },
  {
    id: 'GENERAL_RURAL_CITIZEN',
    label: 'All Other Rural Citizens & General Public',
    description: 'All other Indian citizens residing in rural areas seeking high-bonus sovereign life protection.',
  },
];
