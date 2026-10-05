import { useLayoutEffect, useRef, useState } from 'react';
import { accountsDebitCreditWeek, DEBIT_CREDIT_MAX } from '../data/accounts';
import { useBreakpoint } from '../hooks/useBreakpoint';

/** Figma bar geometry per frame: plot width, bar width, gap inside a day pair, corner radius. */
const BAR_LAYOUT = {
  desktop: { plotW: 670, barW: 30, gap: 10, radius: 10 },
  tablet: { plotW: 451, barW: 20, gap: 8, radius: 7 },
  mobile: { plotW: 283, barW: 10, gap: 5, radius: 4 },
};

const MAX_SCALE = 1.2;

function useStageSize(ref) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => {
      setSize((prev) => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        return prev.w === w && prev.h === h ? prev : { w, h };
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return size;
}

export default function AccountsDebitCreditChart() {
  const breakpoint = useBreakpoint();
  const stageRef = useRef(null);
  const { w, h } = useStageSize(stageRef);
  const ready = w > 0 && h > 0;

  const layout = BAR_LAYOUT[breakpoint] ?? BAR_LAYOUT.desktop;
  const scale = Math.min(MAX_SCALE, w / layout.plotW);
  const barW = layout.barW * scale;
  const gap = layout.gap * scale;
  const groupW = barW * 2 + gap;
  const step = (w - groupW) / (accountsDebitCreditWeek.length - 1);

  const groups = accountsDebitCreditWeek.map((d, i) => {
    const x = i * step;
    return { ...d, x, center: x + groupW / 2 };
  });

  const bar = (value) => {
    const height = (value / DEBIT_CREDIT_MAX) * h;
    return { y: h - height, height, r: Math.min(layout.radius * scale, barW / 2, height / 2) };
  };

  return (
    <section className="section accounts-debit">
      <div className="section-head">
        <h2>Debit &amp; Credit Overview</h2>
      </div>
      <div className="section-card accounts-debit__card">
        <div className="accounts-debit__top">
          <p className="accounts-debit__summary">
            <span>$7,560</span> Debited &amp; <span>$5,420</span> Credited in this Week
          </p>
          <div className="accounts-debit__legend">
            <span className="accounts-debit__legend-item">
              <i className="accounts-debit__swatch accounts-debit__swatch--debit" /> Debit
              <span className="accounts-debit__legend-value">$7,560</span>
            </span>
            <span className="accounts-debit__legend-item">
              <i className="accounts-debit__swatch accounts-debit__swatch--credit" /> Credit
              <span className="accounts-debit__legend-value">$5,420</span>
            </span>
          </div>
        </div>

        <div className="accounts-debit__plot">
          <div className="accounts-debit__stage" ref={stageRef}>
            {ready && (
              <svg
                className="accounts-debit__svg"
                width={w}
                height={h}
                viewBox={`0 0 ${w} ${h}`}
                role="img"
                aria-label="Weekly debit and credit overview"
              >
                {groups.map(({ day, debit, credit, x }) => {
                  const d = bar(debit);
                  const c = bar(credit);
                  return (
                    <g key={day} className="accounts-debit__day">
                      <rect
                        className="accounts-debit__bar accounts-debit__bar--debit"
                        x={x}
                        y={d.y}
                        width={barW}
                        height={d.height}
                        rx={d.r}
                        ry={d.r}
                        tabIndex={0}
                        role="img"
                        aria-label={`${day} debit`}
                      />
                      <rect
                        className="accounts-debit__bar accounts-debit__bar--credit"
                        x={x + barW + gap}
                        y={c.y}
                        width={barW}
                        height={c.height}
                        rx={c.r}
                        ry={c.r}
                        tabIndex={0}
                        role="img"
                        aria-label={`${day} credit`}
                      />
                    </g>
                  );
                })}
              </svg>
            )}
          </div>

          <ul className="accounts-debit__x" aria-hidden="true">
            {groups.map(({ day, center }) => (
              <li key={day} style={{ left: w ? `${((center / w) * 100).toFixed(4)}%` : undefined }}>
                {day}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
