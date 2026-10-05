/** Investments page — Figma 104:60 / 152:1134 / 192:165 */

export const investmentsSummary = [
  {
    id: 'total',
    label: 'Total Invested Amount',
    value: '$150,000',
    iconBg: '#0f2840',
    iconSrc: '/assets/inv-money-bag.svg',
  },
  {
    id: 'count',
    label: 'Number of Investments',
    value: '1,250',
    iconBg: '#243d5c',
    iconSrc: '/assets/inv-pie.svg',
  },
  {
    id: 'return',
    label: 'Rate of Return',
    value: '+5.80%',
    iconBg: '#1a3050',
    iconSrc: '/assets/inv-repeat.svg',
  },
];

export const INVESTMENT_CHART_MAX = 40000;
export const INVESTMENT_CHART_TICKS = [40000, 30000, 20000, 10000, 0];
export const INVESTMENT_YEARS = ['2016', '2017', '2018', '2019', '2020', '2021'];

/* Point values read off the Figma polyline (104:239) against the $0–$40,000 grid */
export const investmentsYearly = [6000, 24000, 16000, 37500, 21000, 29500];

/* Figma curve 104:269 in its 419×190 plot box (offset 0.5, 24.5 from the top grid line) */
export const MONTHLY_REVENUE_PATH =
  'M1.5 112.5C8.06311 106 12.6068 100.5 26.7427 100.5C40.8786 100.5 45.4223 70.0008 65.6165 67.5008C85.8107 65.0009 92.8786 110 113.073 109C133.267 108 130.238 45.0012 150.937 38.5013C171.636 32.0015 179.714 11.0018 199.908 10.0019C220.102 9.00189 224.646 67.5008 244.335 67.5008C264.024 67.5008 269.578 29.5015 287.248 29.5015C304.917 29.5015 314.51 51.0011 335.714 51.5011C356.917 51.5011 357.422 93.5003 376.607 93.5003C395.791 93.5003 403.869 1.00202 417.5 1.50202';

export const investmentsPortfolio = [
  {
    name: 'Apple Store',
    category: 'E-commerce, Marketplace',
    value: '$54,000',
    change: '+16%',
    positive: true,
    iconBg: '#243d5c',
    icon: 'inv-apple.svg',
  },
  {
    name: 'Samsung Mobile',
    category: 'E-commerce, Marketplace',
    value: '$25,300',
    change: '-4%',
    positive: false,
    iconBg: '#1a3050',
    icon: 'inv-google.svg',
  },
  {
    name: 'Tesla Motors',
    category: 'Electric Vehicles',
    value: '$8,200',
    change: '+25%',
    positive: true,
    iconBg: '#132238',
    icon: 'inv-tesla.svg',
  },
];

export const investmentsTrending = [
  { sl: '01.', name: 'Trivago', price: '$520', change: '+5%', positive: true },
  { sl: '02.', name: 'Canon', price: '$480', change: '+10%', positive: true },
  { sl: '03.', name: 'Uber Food', price: '$350', change: '-3%', positive: false },
  { sl: '04.', name: 'Nokia', price: '$940', change: '+2%', positive: true },
  { sl: '05.', name: 'Tiktok', price: '$670', change: '-12%', positive: false },
];
