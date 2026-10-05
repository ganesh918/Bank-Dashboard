/** Accounts page — Figma 101:0 / 152:269 / 185:58 */

export const accountsSummary = [
  {
    id: 'balance',
    label: 'My Balance',
    value: '$12,750',
    iconBg: '#132238',
    iconSrc: '/assets/acc-money-tag.svg',
  },
  {
    id: 'income',
    label: 'Income',
    value: '$5,600',
    iconBg: '#1a3050',
    iconSrc: '/assets/acc-income.svg',
  },
  {
    id: 'expense',
    label: 'Expense',
    value: '$3,460',
    iconBg: '#243d5c',
    iconSrc: '/assets/acc-medical.svg',
  },
  {
    id: 'saving',
    label: 'Total Saving',
    value: '$7,920',
    iconBg: '#0f2840',
    iconSrc: '/assets/acc-saving.svg',
  },
];

export const accountsLastTransactions = [
  {
    title: 'Spotify Subscription',
    date: '25 Jan 2021',
    type: 'Shopping',
    card: '1234 ****',
    status: 'Pending',
    amount: '-$150',
    positive: false,
    iconBg: '#0f2840',
    icon: 'acc-renew.svg',
    iconLarge: true,
  },
  {
    title: 'Mobile Service',
    date: '25 Jan 2021',
    type: 'Service',
    card: '1234 ****',
    status: 'Completed',
    amount: '-$340',
    positive: false,
    iconBg: '#1a3050',
    icon: 'acc-settings.svg',
  },
  {
    title: 'Emilly Wilson',
    date: '25 Jan 2021',
    type: 'Transfer',
    card: '1234 ****',
    status: 'Completed',
    amount: '+$780',
    positive: true,
    iconBg: '#243d5c',
    icon: 'acc-user-pink.svg',
  },
];

/** Bar heights in Figma px on the 1440 frame (plot band 234px). */
export const DEBIT_CREDIT_MAX = 234;

export const accountsDebitCreditWeek = [
  { day: 'Sat', debit: 135, credit: 234 },
  { day: 'Sun', debit: 106, credit: 186 },
  { day: 'Mon', debit: 102, credit: 139 },
  { day: 'Tue', debit: 212, credit: 123 },
  { day: 'Wed', debit: 150, credit: 214 },
  { day: 'Thu', debit: 158, credit: 105 },
  { day: 'Fri', debit: 179, credit: 216 },
];

export const accountsInvoicesSent = [
  {
    title: 'Apple Store',
    date: '5h ago',
    amount: '$450',
    iconBg: '#0f2840',
    icon: 'acc-apple.svg',
  },
  {
    title: 'Michael',
    date: '2 days ago',
    amount: '$160',
    iconBg: '#132238',
    icon: 'acc-user-yellow.svg',
  },
  {
    title: 'Playstation',
    date: '5 days ago',
    amount: '$1085',
    iconBg: '#1a3050',
    icon: 'acc-playstation.svg',
  },
  {
    title: 'William',
    date: '10 days ago',
    amount: '$90',
    iconBg: '#243d5c',
    icon: 'acc-user-pink.svg',
  },
];
