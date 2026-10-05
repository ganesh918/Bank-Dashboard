export const settingsTabs = [
  { id: 'profile', label: 'Edit Profile', shortLabel: 'Edit Profile' },
  { id: 'preferences', label: 'Preferences', shortLabel: 'Preference' },
  { id: 'security', label: 'Security', shortLabel: 'Security' },
];

/* Row-major: desktop/tab pair them two per row, mobile stacks them in this order */
export const profileFields = [
  { id: 'name', label: 'Your Name', value: 'Charlene Reed' },
  { id: 'username', label: 'User Name', value: 'Charlene Reed' },
  { id: 'email', label: 'Email', value: 'charlenereed@gmail.com', type: 'email' },
  { id: 'password', label: 'Password', value: '**********', type: 'password' },
  { id: 'dob', label: 'Date of Birth', value: '25 January 1990', select: true },
  { id: 'present', label: 'Present Address', value: 'San Jose, California, USA' },
  { id: 'permanent', label: 'Permanent Address', value: 'San Jose, California, USA' },
  { id: 'city', label: 'City', value: 'San Jose' },
  { id: 'postal', label: 'Postal Code', value: '45962' },
  { id: 'country', label: 'Country', value: 'USA' },
];

export const preferenceFields = [
  { id: 'currency', label: 'Currency', value: 'USD' },
  { id: 'timezone', label: 'Time Zone', value: '(GMT-12:00) International Date Line West' },
];

export const notificationToggles = [
  { id: 'currency', label: 'I send or receive digita currency', on: true },
  { id: 'merchant', label: 'I receive merchant order', on: false },
  { id: 'recommendation', label: 'There are recommendation for my account', on: true },
];

export const securityToggles = [
  { id: 'two-factor', label: 'Enable or disable two factor authentication', on: true },
];

export const passwordFields = [
  { id: 'current', label: 'Current Password', value: '**********', type: 'password' },
  { id: 'new', label: 'New Password', value: '**********', type: 'password' },
];
