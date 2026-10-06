export const membershipOverview = {
  tier: 'Gold',
  memberId: 'BD-88421-GLD',
  memberSince: 'Mar 2019',
  privilegeScore: 86,
  scoreLabel: 'Excellent standing',
  activeBenefits: 14,
  savingsYtd: 1842,
  partnerOffers: 9,
  conciergeAvailable: true,
};

export const loyaltyWallet = {
  points: 7520,
  cashEquivalent: 75.2,
  pendingPoints: 420,
  expiringPoints: 320,
  expiryDate: '31 Mar 2026',
  pointsToNext: 2480,
  nextTier: 'Platinum',
  tierProgress: 75.2,
};

export const tierComparison = [
  {
    id: 'silver',
    name: 'Silver',
    minPoints: 0,
    highlight: false,
    features: ['Standard support', '1× earn rate', 'Basic fraud alerts', 'Monthly insights'],
  },
  {
    id: 'gold',
    name: 'Gold',
    minPoints: 5000,
    highlight: true,
    features: ['Priority support', '2× travel earn', 'Lounge access (2/qtr)', 'Fee discounts'],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    minPoints: 10000,
    highlight: false,
    features: ['Dedicated RM', '3× partner earn', 'Unlimited lounge', 'Advisory sessions'],
  },
  {
    id: 'elite',
    name: 'Elite',
    minPoints: 20000,
    highlight: false,
    features: ['24/7 concierge', '5× launch promos', 'Global travel cover', 'Private banking lane'],
  },
];

export const monthlyEarnTrend = [
  { month: 'May', points: 520 },
  { month: 'Jun', points: 610 },
  { month: 'Jul', points: 480 },
  { month: 'Aug', points: 720 },
  { month: 'Sep', points: 690 },
  { month: 'Oct', points: 640 },
];

export const benefitPrograms = [
  {
    id: 'global-travel',
    category: 'Travel',
    title: 'Global Travel Shield',
    description: 'Insurance, lounge access, and FX fee waivers for international trips.',
    status: 'Active',
    icon: 'econometrics-1.svg',
    iconBg: '#132238',
    usage: { label: 'Lounge visits', used: 1, total: 2 },
    savings: '$126 saved this quarter',
  },
  {
    id: 'mint-cashback',
    category: 'Cashback',
    title: 'Mint Cashback Engine',
    description: 'Rotating categories with automatic payout to your primary account.',
    status: 'Active',
    icon: 'svc-bag.svg',
    iconBg: '#1a3050',
    usage: { label: 'October cap', used: 68, total: 100, unit: '%' },
    savings: '$412 cashback YTD',
  },
  {
    id: 'wealth-desk',
    category: 'Wealth',
    title: 'Wealth Desk Sessions',
    description: 'Certified advisors for portfolio, tax, and retirement planning.',
    status: 'Scheduled',
    icon: 'economic-investment-1.svg',
    iconBg: '#243d5c',
    usage: { label: 'Sessions left', used: 1, total: 2 },
    savings: 'Next call: 12 Oct, 4:30 PM',
  },
  {
    id: 'priority-care',
    category: 'Support',
    title: 'Priority Care Line',
    description: 'Skip queues with a dedicated resolution team and callback promise.',
    status: 'Active',
    icon: 'service-1.svg',
    iconBg: '#0f2840',
    usage: { label: 'Avg. wait', used: 0, total: 0, display: '1m 42s' },
    savings: '4 issues resolved in <24h',
  },
];

export const smartOffers = [
  {
    id: 'fly',
    badge: 'Ends in 6 days',
    title: 'Aqua Miles double earn',
    detail: 'Earn 4× points on flights booked via BankDash Travel through 15 Oct.',
    reward: '+ up to 2,000 bonus pts',
  },
  {
    id: 'dine',
    badge: 'Weekend only',
    title: 'Dining circuit',
    detail: '25% back at 120+ partner restaurants when you pay with debit.',
    reward: 'Cap $60 / weekend',
  },
  {
    id: 'digital',
    badge: 'New partners',
    title: 'Digital subscriptions',
    detail: 'Bundle Netflix, Spotify, or cloud storage with 20% member pricing.',
    reward: 'From $9.99/mo',
  },
];

export const marketplaceCategories = ['All', 'Travel', 'Shopping', 'Experiences', 'Banking'];

export const marketplaceItems = [
  { id: 'm1', cat: 'Travel', title: 'Regional flight voucher', cost: 6200, value: '$120', hot: true },
  { id: 'm2', cat: 'Travel', title: 'Lounge day pass ×2', cost: 2800, value: '$80', hot: false },
  { id: 'm3', cat: 'Shopping', title: '$100 retail voucher', cost: 8500, value: '$100', hot: true },
  { id: 'm4', cat: 'Shopping', title: 'Premium delivery pass (1 yr)', cost: 3900, value: '$59', hot: false },
  { id: 'm5', cat: 'Experiences', title: 'Spa & wellness day', cost: 5400, value: '$150', hot: false },
  { id: 'm6', cat: 'Experiences', title: 'Stadium VIP upgrade', cost: 7100, value: '$200', hot: true },
  { id: 'm7', cat: 'Banking', title: 'Annual card fee waiver', cost: 9000, value: '$99', hot: false },
  { id: 'm8', cat: 'Banking', title: 'Priority loan rate lock', cost: 4500, value: '0.25% APR', hot: false },
];

export const activityFeed = [
  { id: 1, date: '06 Oct 2026', title: 'Activated Aqua Miles double earn', type: 'offer', delta: null },
  { id: 2, date: '04 Oct 2026', title: 'Grocery earn — FreshMart', type: 'earn', delta: '+120' },
  { id: 3, date: '02 Oct 2026', title: 'Redeemed lounge day pass', type: 'redeem', delta: '-2800' },
  { id: 4, date: '28 Sep 2026', title: 'Travel insurance claim approved', type: 'claim', delta: '+$95 credit' },
  { id: 5, date: '25 Sep 2026', title: 'Referral bonus — Priya S.', type: 'earn', delta: '+500' },
];

export const conciergeActions = [
  { id: 'book', label: 'Book travel', icon: 'econometrics-1.svg' },
  { id: 'dispute', label: 'Fast dispute', icon: '002-notification-1.svg' },
  { id: 'upgrade', label: 'Request upgrade', icon: 'credit-card-1.svg' },
  { id: 'advisor', label: 'Talk to advisor', icon: 'economic-investment-1.svg' },
];
