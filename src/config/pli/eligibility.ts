export interface EligibilityCategory {
  id: string;
  label: string;
  description: string;
}

export const ELIGIBILITY_CATEGORIES: EligibilityCategory[] = [
  {
    id: 'GOVT_CENTRAL_STATE',
    label: 'Central & State Government Employees',
    description: 'Employees working under Central/State Ministries, Departments & Secretariats.',
  },
  {
    id: 'DEFENSE_PARAMILITARY',
    label: 'Defense & Paramilitary Personnel',
    description: 'Serving personnel of Army, Navy, Air Force, Coast Guard, BSF, CRPF, CISF, ITBP.',
  },
  {
    id: 'PSU_BANKS',
    label: 'Public Sector Undertakings & Nationalized Banks',
    description: 'Staff of Navratna/Maharatna PSUs, Scheduled Banks, Reserve Bank of India.',
  },
  {
    id: 'EDUCATIONAL_STAFF',
    label: 'Educational Institution Staff',
    description: 'Teachers & non-teaching staff of Govt-aided & recognized private schools/universities.',
  },
  {
    id: 'GRADUATES_DIPLOMA_HOLDERS',
    label: 'Graduates & Diploma Holders (Govt Recognized)',
    description: 'All Graduates & Diploma holders from Universities/Institutions recognized by Central/State Governments (Gazette Notif. F. No. 25-01/2022-LI, Rule 6(14)).',
  },
  {
    id: 'PROFESSIONALS',
    label: 'Qualified Professionals',
    description: 'Doctors (MBBS/BDS), Engineers (B.Tech/BE), Chartered Accountants (CA), Architects, MBAs, Lawyers, Banking & IT Specialists.',
  },
  {
    id: 'LOCAL_BODIES',
    label: 'Local Bodies & Municipal Staff',
    description: 'Employees of Municipal Corporations, Zilla Parishads & Panchayats.',
  },
];
