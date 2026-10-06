export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home-2.svg', to: '/' },
  { id: 'transactions', label: 'Transactions', icon: 'transfer-1.svg', to: '/transactions' },
  { id: 'accounts', label: 'Accounts', icon: 'user-3-1.svg', to: '/accounts' },
  { id: 'investments', label: 'Investments', icon: 'economic-investment-1.svg', to: '/investments' },
  { id: 'cards', label: 'Credit Cards', icon: 'credit-card-1.svg', to: '/credit-cards' },
  { id: 'loans', label: 'Loans', icon: 'loan-1.svg', to: '/loans' },
  { id: 'services', label: 'Services', icon: 'service-1.svg', to: '/services' },
  { id: 'privileges', label: 'My Privileges', icon: 'econometrics-1.svg', to: '/privileges' },
  { id: 'settings', label: 'Setting', icon: 'settings-solid-1.svg', to: '/settings' },
];

/** Order and icon wells match Figma Group 398 */
export const recentTransactions = [
  {
    title: 'Deposit from my Card',
    date: '28 January 2021',
    amount: '-$850',
    positive: false,
    icon: 'iconfinder-business-finance-money-13-2784281-1.svg',
    iconBg: '#132238',
  },
  {
    title: 'Deposit Paypal',
    date: '25 January 2021',
    amount: '+$2,500',
    positive: true,
    icon: 'iconfinder-paypal-payment-pay-5340264-1.svg',
    iconBg: '#1a3050',
  },
  {
    title: 'Jemi Wilson',
    date: '21 January 2021',
    amount: '+$5,400',
    positive: true,
    icon: 'iconfinder-6-4753731-1.svg',
    iconBg: '#0f2840',
  },
];

/** Bar heights from Figma weekly activity (126:97 / 147:347 / 181:101), 0–500 scale */
export const weeklyActivity = [
  { day: 'Sat', withdraw: 500, deposit: 256 },
  { day: 'Sun', withdraw: 365, deposit: 138 },
  { day: 'Mon', withdraw: 343, deposit: 276 },
  { day: 'Tue', withdraw: 500, deposit: 388 },
  { day: 'Wed', withdraw: 160, deposit: 256 },
  { day: 'Thu', withdraw: 407, deposit: 256 },
  { day: 'Fri', withdraw: 413, deposit: 354 },
];

export const balanceHistory = [
  { month: 'Jul', balance: 420 },
  { month: 'Aug', balance: 380 },
  { month: 'Sep', balance: 520 },
  { month: 'Oct', balance: 480 },
  { month: 'Nov', balance: 620 },
  { month: 'Dec', balance: 580 },
  { month: 'Jan', balance: 720 },
];

export const quickTransferContacts = [
  { name: 'Livia Bator', role: 'CEO', photo: 'pexels-julia-volk-5273755-1.png' },
  { name: 'Randy Press', role: 'Director', photo: 'marcel-strauss-uc-toqa-jdy-unsplash-1.png' },
  {
    name: 'Workman',
    role: 'Designer',
    photo: 'emanuel-minca-jyv069cqub8-unsplash-1.png',
    photoPosition: '42% 28%',
  },
];
