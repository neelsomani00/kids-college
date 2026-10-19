// Placeholder data shown until a Google Sheet is connected (or if the sheet cannot be reached).
// Every value here is a PLACEHOLDER. Replace through the Google Sheet, not by editing this file.

const classes = [
  ['Nursery', 'Junior'], ['LKG', 'Junior'], ['UKG', 'Junior'],
  ['Class 1', 'Junior'], ['Class 2', 'Junior'], ['Class 3', 'Junior'], ['Class 4', 'Junior'], ['Class 5', 'Junior'],
  ['Class 6', 'Senior'], ['Class 7', 'Senior'], ['Class 8', 'Senior'],
  ['Class 9', 'Senior'], ['Class 10', 'Senior'], ['Class 11', 'Senior'], ['Class 12', 'Senior'],
];

export const FALLBACK_FEES = classes.map(([cls, wing]) => ({
  class: cls,
  wing,
  admission_fee: '₹ XX,XXX',
  tuition_fee: '₹ XX,XXX',
  annual_charges: '₹ X,XXX',
  transport: 'On request',
  notes: 'Placeholder. Update in Google Sheet.',
}));

const roles = ['Principal', 'Vice Principal', 'Head of Junior Wing', 'Sports Coordinator', 'Senior Teacher', 'Senior Teacher'];
export const FALLBACK_FACULTY = roles.map((role, i) => ({
  name: `Faculty Name ${i + 1}`,
  role,
  qualification: 'M.A., B.Ed. (placeholder)',
  photo: '',
}));

export const FALLBACK_ALUMNI = [1, 2, 3, 4].map((i) => ({
  name: `Alumnus Name ${i}`,
  batch: `Batch 20XX`,
  now: 'Doing great things (placeholder)',
  quote: 'A short line about their time at Kids College goes here.',
  photo: '',
}));
