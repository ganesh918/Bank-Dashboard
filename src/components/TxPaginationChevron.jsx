/** Figma pagination chevrons: desktop 105:418 / 105:415 (6×12); tablet-mobile 152:263 / 150:606 (5×10). */

const STROKE = 'currentColor';

const DESKTOP = {
  prev: 'M7.41418 12.7072L1.41418 6.70715L7.41418 0.707153',
  next: 'M0.707031 12.7072L6.70703 6.70715L0.707031 0.707153',
};

/* Crop to the path geometry (6×12 / 5×10) so the layout box equals the Figma vector box; stroke overflows */
const DESKTOP_VIEWBOX = {
  prev: '1.41418 0.707153 6 12',
  next: '0.707031 0.707153 6 12',
};

const COMPACT = {
  prev: 'M6.06067 0.530273L1.06067 5.53027L6.06067 10.5303',
  next: 'M0.530273 10.5303L5.53027 5.53027L0.530273 0.530273',
};

const COMPACT_VIEWBOX = {
  prev: '1.06067 0.530273 5 10',
  next: '0.530273 0.530273 5 10',
};

export default function TxPaginationChevron({ direction }) {
  const key = direction === 'next' ? 'next' : 'prev';

  return (
    <>
      <svg
        viewBox={DESKTOP_VIEWBOX[key]}
        className="tx-pagination__chev tx-pagination__chev--lg"
        fill="none"
        aria-hidden
      >
        <path d={DESKTOP[key]} stroke={STROKE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg
        viewBox={COMPACT_VIEWBOX[key]}
        className="tx-pagination__chev tx-pagination__chev--sm"
        fill="none"
        aria-hidden
      >
        <path d={COMPACT[key]} stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}
