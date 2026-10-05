export const serviceHighlights = [
  { id: 'life', title: 'Life Insurance', subtitle: 'Unlimited protection', iconBg: '#1a3050', iconSrc: '/assets/svc-life-insurance.svg' },
  { id: 'shopping', title: 'Shopping', subtitle: 'Buy. Think. Grow.', iconBg: '#132238', iconSrc: '/assets/svc-bag.svg' },
  { id: 'safety', title: 'Safety', subtitle: 'We are your allies', iconBg: '#0f2840', iconSrc: '/assets/svc-shield.svg' },
];

const DETAIL = { title: 'Lorem Ipsum', subtitle: 'Many publishing' };
const DETAILS = [DETAIL, DETAIL, DETAIL];
const SUBTITLE = 'It is a long established';

export const bankServices = [
  { id: 'business-1', title: 'Business loans', iconBg: '#243d5c', iconSrc: '/assets/svc-loan.svg' },
  { id: 'checking', title: 'Checking accounts', iconBg: '#132238', iconSrc: '/assets/loan-briefcase.svg' },
  { id: 'savings', title: 'Savings accounts', iconBg: '#243d5c', iconSrc: '/assets/loan-graph.svg', active: true },
  { id: 'cards', title: 'Debit and credit cards', iconBg: '#1a3050', iconSrc: '/assets/loan-user.svg' },
  { id: 'life', title: 'Life Insurance', iconBg: '#0f2840', iconSrc: '/assets/svc-shield.svg' },
  { id: 'business-2', title: 'Business loans', iconBg: '#243d5c', iconSrc: '/assets/svc-loan.svg' },
].map((service) => ({ ...service, subtitle: SUBTITLE, details: DETAILS }));
