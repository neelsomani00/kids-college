// One place for all school details. Edit here and the whole site updates.

export const SITE = {
  name: 'Kids College',
  fullName: 'Kids College Indore',
  url: (import.meta.env.VITE_SITE_URL || 'https://www.kidscollegeindore.in').replace(/\/$/, ''),
  tagline: 'Igniting the spark of genius in every child.',
  board: 'CBSE',
  classes: 'Nursery to Class 12',
  established: '2010', // official site says 2010; some portals say 2014. Confirm with the school.
  admissionSession: '2027–28',
  trust: 'Rewa Educational Society, Indore',

  phones: [
    { label: '+91 98263 11599', href: 'tel:+919826311599' },
    { label: '+91 98263 74446', href: 'tel:+919826374446' },
  ],
  whatsapp: 'https://wa.me/919826311599',
  email: 'kidscollege.school@gmail.com',
  social: {
    facebook: 'https://www.facebook.com/KidsCollegeIndore',
    instagram: 'https://www.instagram.com/kidscollege_indore/',
  },

  // Logo: put your file at public/logo.webp (or .png and change the line below).
  // If it is missing, the site falls back to the logo hosted on the school's current website.
  logoLocal: '/logo.webp',
  logoRemote: 'https://kidscolleggeindore.in/wp-content/uploads/2026/06/Logo-64.webp',

  // Google Sheets CMS (see README). Leave empty to use the placeholder data in src/data/fallback.js
  sheetId: import.meta.env.VITE_SHEET_ID || '',
  sheetTabs: { fees: 'Fees', faculty: 'Faculty', alumni: 'Alumni' },

  campuses: [
    {
      id: 'senior',
      name: 'Senior Wing',
      level: 'Dhar Road / Kalaria Campus',
      address: '218/2, Gram Dharnawad, Dhar Road, Kalaria, Indore, Madhya Pradesh 452002',
      mapQuery: '22.7199015,75.8363682',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=22.7199015,75.8363682',
    },
    {
      id: 'junior',
      name: 'Junior Wing',
      level: 'Airport Road Campus',
      address: '117, Vindhyanchal Nagar, Airport Road, Indore, Madhya Pradesh 452006',
      mapQuery: 'Kids College Junior Wing, 117 Vindhyanchal Nagar, Airport Road, Indore',
      mapLink:
        'https://www.google.com/maps/search/?api=1&query=Kids+College+117+Vindhyanchal+Nagar+Airport+Road+Indore',
    },
  ],

  credit: {
    name: 'NEEL SOMANI',
    phone: '7247507151',
    email: 'neelsomani00@gmail.com',
  },
};

export const NAV = [
  { label: 'Home', to: '/' },
  {
    label: 'About',
    to: '/#about',
    children: [
      { label: 'Why Kids College', to: '/#about' },
      { label: 'Facilities', to: '/#facilities' },
      { label: 'Our Faculty', to: '/#faculty' },
      { label: 'Alumni', to: '/#alumni' },
      { label: 'Campuses', to: '/#campuses' },
    ],
  },
  {
    label: 'Admissions',
    to: '/admissions',
    children: [
      { label: 'How to apply', to: '/admissions' },
      { label: 'Documents needed', to: '/admissions#documents' },
      { label: 'FAQs', to: '/admissions#faq' },
    ],
  },
  { label: 'Fee Structure', to: '/fees' },
  { label: 'Contact', to: '/contact' },
];

export const mapEmbed = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
