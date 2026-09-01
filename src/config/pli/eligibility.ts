export interface EligibilityCategory {
  id: string;
  label: string;
  description: string;
}

export const ELIGIBILITY_CATEGORIES: EligibilityCategory[] = [
  {
    id: 'GOVT_CENTRAL',
    label: 'Central Government Employees',
    description: 'Employees of Central Ministries, Departments, Attached & Subordinate Offices, Secretariats.',
  },
  {
    id: 'GOVT_STATE',
    label: 'State Government Employees',
    description: 'Employees working under State Government Departments, Directorates, Secretariats & District Collectorates.',
  },
  {
    id: 'DEFENSE_PARAMILITARY',
    label: 'Defense & Paramilitary Forces (Army, Navy, Air Force, Coast Guard, BSF, CRPF, CISF, ITBP, SSB, Assam Rifles)',
    description: 'Serving military, coast guard, and paramilitary personnel across all ranks and battalions.',
  },
  {
    id: 'POSTS_TELECOM',
    label: 'Department of Posts & Telecommunications (DoP & BSNL / MTNL)',
    description: 'Staff of India Post, BSNL, MTNL, TCIL, and Telecommunications departments.',
  },
  {
    id: 'PSU_CENTRAL_STATE',
    label: 'Public Sector Undertakings (Central & State PSUs - Maharatna, Navratna, Miniratna)',
    description: 'Employees of ONGC, IOCL, NTPC, SAIL, BHEL, GAIL, Coal India, BEL, HAL, State PSUs, etc.',
  },
  {
    id: 'BANKS_FINANCIAL',
    label: 'Nationalized & Scheduled Commercial Banks / RBI / NABARD / SEBI / IRDAI',
    description: 'Officers & staff of RBI, SBI, PNB, Bank of Baroda, Canara Bank, NABARD, SIDBI, EXIM Bank, and Scheduled Banks.',
  },
  {
    id: 'EDUCATIONAL_GOVT_AIDED',
    label: 'Government & Govt-Aided Educational Institutions (Universities, Colleges, Schools)',
    description: 'Teaching & non-teaching staff of Central/State Universities, Govt-aided colleges and schools.',
  },
  {
    id: 'PREMIER_INSTITUTES',
    label: 'Premier Autonomous Institutes (IITs, IIMs, NITs, AIIMS, IISc, IISERs, Central Institutions)',
    description: 'Faculty, researchers, and administrative personnel of premier national institutes.',
  },
  {
    id: 'AUTONOMOUS_STATUTORY',
    label: 'Autonomous Bodies & Statutory Authorities',
    description: 'Personnel of ISRO, DRDO, CSIR, ICAR, ICMR, EPFO, ESIC, NHAI, FSSAI, UIDAI, Port Trusts, etc.',
  },
  {
    id: 'LOCAL_BODIES_PANCHAYATS',
    label: 'Local Bodies, Municipal Corporations, Zilla Parishads & Panchayats',
    description: 'Employees of Municipal Corporations (BMC, MCD, KMC, etc.), Municipalities, ZP, and Panchayat bodies.',
  },
  {
    id: 'GOVT_JOINT_VENTURES',
    label: 'Joint Ventures with Govt / PSU Stake (≥ 10% Stake)',
    description: 'Employees of Public-Private Partnerships and Joint Ventures where Govt/PSU holds 10% or more stake.',
  },
  {
    id: 'RECOGNIZED_PRIVATE_SCHOOLS',
    label: 'Recognized Private Educational Institutions (AICTE, NAAC, CBSE, ICSE, State Boards)',
    description: 'Staff of recognized private schools, engineering/management colleges, polytechnics, and deemed universities.',
  },
  {
    id: 'GRADUATES_DIPLOMA_HOLDERS',
    label: 'Graduates & Diploma Holders (From Any Govt-Recognized University / Board)',
    description: 'All Graduates (BA, B.Sc, B.Com, B.Tech, BE, BBA, BCA, MBBS, etc.) & 3-Year Diploma holders (Gazette Notif. F. No. 25-01/2022-LI, Rule 6(14)).',
  },
  {
    id: 'DOCTORS_MEDICAL',
    label: 'Qualified Doctors & Medical Professionals (MBBS, BDS, MD, MS, AYUSH - NMC / State Medical Council)',
    description: 'Registered medical practitioners, dentists, surgeons, and healthcare specialists.',
  },
  {
    id: 'ENGINEERS',
    label: 'Engineers & Architects (BE, B.Tech, ME, M.Tech, COA / Institution of Engineers)',
    description: 'Civil, mechanical, electrical, computer, electronics engineers, and architects.',
  },
  {
    id: 'CHARTERED_ACCOUNTANTS',
    label: 'Chartered Accountants (CA - ICAI), Cost Accountants (CMA - ICMAI) & Company Secretaries (CS - ICSI)',
    description: 'Qualified accounting, auditing, taxation, cost management, and corporate governance professionals.',
  },
  {
    id: 'ADVOCATES_LEGAL',
    label: 'Advocates & Legal Professionals (Bar Council of India / State Bar Councils)',
    description: 'Enrolled advocates, legal advisors, solicitors, and law practitioners.',
  },
  {
    id: 'MANAGEMENT_CORPORATE',
    label: 'Management Consultants, MBAs & Corporate Executives',
    description: 'Postgraduates in Business Administration, Finance, Marketing, HR, and corporate leadership personnel.',
  },
  {
    id: 'LISTED_COMPANIES_EMPLOYEES',
    label: 'Employees of Listed Companies (NSE / BSE Listed Companies)',
    description: 'Permanent employees working in companies listed on National Stock Exchange (NSE) or Bombay Stock Exchange (BSE).',
  },
  {
    id: 'IT_SOFTWARE_PROFESSIONALS',
    label: 'IT, Software & Telecom Industry Professionals',
    description: 'Software engineers, system architects, data scientists, cybersecurity specialists, and IT executives.',
  },
  {
    id: 'ALL_OTHER_PROFESSIONALS',
    label: 'All Other Certified Professionals & Institutional Staff',
    description: 'Other certified professionals, registered practitioners, and institutional employees meeting eligibility guidelines.',
  },
];
