/** Figma expense chart vectors — desktop (126:96), tablet (147:346), mobile (181:274). */

function frame(w, h, slices, pad = 0) {
  return {
    w,
    h,
    pad,
    viewW: w + pad * 2,
    viewH: h + pad * 2,
    cx: w / 2,
    cy: h / 2,
    slices,
  };
}

const sliceMeta = {
  entertainment: {
    key: 'entertainment',
    fill: '#0f172a',
    pct: '30%',
    name: 'Entertainment',
    hoverBoost: 0,
  },
  investment: {
    key: 'investment',
    fill: '#22d3ee',
    pct: '35%',
    name: 'Investment',
    hoverBoost: 0,
  },
  others: {
    key: 'others',
    fill: '#0891b2',
    pct: '20%',
    name: 'Others',
    hoverBoost: 0,
  },
  bill: {
    key: 'bill',
    fill: '#6ee7b7',
    pct: '15%',
    name: 'Bill Expense',
    hoverBoost: 3,
  },
};

/** Desktop — group 269×260 */
export const expenseChartDesktop = frame(269, 260, [
  {
    ...sliceMeta.entertainment,
    path:
      'M92.8913 129.218 L185.783 36.3271 C161.378 13.7772 128.76 0 92.8913 0 C57.0427 0 24.4241 13.7971 0 36.3271 L92.8913 129.218 Z',
    x: 20,
    y: 0,
    label: { x: 113, y: 53.5 },
    pctSize: 16,
    nameSize: 13,
  },
  {
    ...sliceMeta.investment,
    path:
      'M108.503 78.516 L29.9868 0 C11.3846 20.1374 0 47.0538 0 76.6418 C0 137.533 48.1703 187.158 108.483 189.531 L108.483 78.516 L108.503 78.516 Z',
    x: 0,
    y: 59,
    label: { x: 54.5, y: 153.5 },
    pctSize: 16,
    nameSize: 13,
  },
  {
    ...sliceMeta.others,
    path: 'M0 0 L0 119.668 C64.9382 117.116 117.116 64.9382 119.668 0 L0 0 L0 0 Z',
    x: 117,
    y: 140,
    label: { x: 177, y: 183.5 },
    pctSize: 16,
    nameSize: 13,
  },
  {
    ...sliceMeta.bill,
    path:
      'M145.129 102.621 C143.574 63.064 127.743 27.1955 102.621 0 L0 102.621 L145.129 102.621 Z',
    x: 124,
    y: 28,
    label: { x: 200, y: 103.5 },
    pctSize: 16,
    nameSize: 13,
  },
]);

/** Tablet 1024 — group 181×175 (147:345) */
export const expenseChartTablet = frame(181, 175, [
  {
    ...sliceMeta.entertainment,
    path:
      'M62.6029 87.0851 L125.206 24.4822 C108.759 9.28495 86.776 0 62.6029 0 C38.4432 0 16.4603 9.29839 0 24.4822 L62.6029 87.0851 Z',
    x: 13,
    y: 0,
    label: { x: 76, y: 29.5 },
    pctSize: 12,
    nameSize: 10,
  },
  {
    ...sliceMeta.investment,
    path:
      'M73.1241 52.9148 L20.2092 0 C7.67252 13.5714 0 31.7113 0 51.6518 C0 92.6883 32.4637 126.133 73.1106 127.732 L73.1106 52.9148 L73.1241 52.9148 Z',
    x: 0,
    y: 40,
    label: { x: 37, y: 104 },
    pctSize: 12,
    nameSize: 10,
  },
  {
    ...sliceMeta.others,
    path: 'M0 0 L0 80.6488 C43.7643 78.9288 78.9288 43.7643 80.6488 0 L0 0 L0 0 Z',
    x: 79,
    y: 94,
    label: { x: 115, y: 122 },
    pctSize: 12,
    nameSize: 10,
  },
  {
    ...sliceMeta.bill,
    path:
      'M97.8078 69.1601 C96.7597 42.5012 86.0907 18.328 69.1601 0 L0 69.1601 L97.8078 69.1601 Z',
    x: 84,
    y: 19,
    label: { x: 139, y: 68 },
    pctSize: 12,
    nameSize: 10,
  },
]);

/** Mobile — group 203×196 (181:91) */
export const expenseChartMobile = frame(203, 196, [
  {
    ...sliceMeta.entertainment,
    path:
      'M69.9368 97.287 L139.874 27.3502 C121.5 10.3727 96.9417 0 69.9368 0 C42.9468 0 18.3886 10.3877 0 27.3502 L69.9368 97.287 Z',
    x: 15,
    y: 0,
    label: { x: 85, y: 33 },
    pctSize: 13.41,
    nameSize: 11.17,
  },
  {
    ...sliceMeta.investment,
    path:
      'M81.6904 59.1137 L22.5767 0 C8.57134 15.1612 0 35.4262 0 57.7027 C0 103.547 36.2668 140.909 81.6754 142.696 L81.6754 59.1137 L81.6904 59.1137 Z',
    x: 0,
    y: 45,
    label: { x: 41.5, y: 116.5 },
    pctSize: 13.41,
    nameSize: 11.17,
  },
  {
    ...sliceMeta.others,
    path: 'M0 0 L0 90.0967 C48.8912 88.1752 88.1753 48.8912 90.0967 0 L0 0 L0 0 Z',
    x: 88,
    y: 105,
    label: { x: 129, y: 136.5 },
    pctSize: 13.41,
    nameSize: 11.17,
  },
  {
    ...sliceMeta.bill,
    path:
      'M109.266 77.2622 C108.095 47.4801 96.1762 20.4751 77.2622 0 L0 77.2622 L109.266 77.2622 Z',
    x: 93,
    y: 21,
    label: { x: 155, y: 75.5 },
    pctSize: 13.41,
    nameSize: 11.17,
  },
]);

export function expenseChartForBreakpoint(breakpoint) {
  if (breakpoint === 'mobile') return expenseChartMobile;
  if (breakpoint === 'tablet') return expenseChartTablet;
  return expenseChartDesktop;
}
