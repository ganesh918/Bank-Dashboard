import { useMemo, useState } from 'react';
import { expenseChartForBreakpoint } from '../data/expenseChartFigma';
import { useBreakpoint } from '../hooks/useBreakpoint';

const HOVER_BASE = 6;

function sliceHoverTranslate(chart, slice, active) {
  if (!active) return undefined;
  const { x: lx, y: ly } = slice.label;
  const dx = lx - chart.cx;
  const dy = ly - chart.cy;
  const len = Math.hypot(dx, dy) || 1;
  const scale = chart.w / 269;
  const dist = (HOVER_BASE + slice.hoverBoost) * scale;
  return `translate(${(dx / len) * dist}, ${(dy / len) * dist})`;
}

export default function ExpenseStatistics() {
  const breakpoint = useBreakpoint();
  const chart = useMemo(() => expenseChartForBreakpoint(breakpoint), [breakpoint]);
  const [hovered, setHovered] = useState(null);

  const viewBox =
    chart.pad > 0
      ? `${-chart.pad} ${-chart.pad} ${chart.viewW} ${chart.viewH}`
      : `0 0 ${chart.w} ${chart.h}`;

  return (
    <section className="section expense-stats">
      <div className="section-head">
        <h2>Expense Statistics</h2>
      </div>
      <div className="section-card section-card--expense">
        <div className="chart-wrap expense-chart">
          <svg
            className="expense-chart__svg"
            viewBox={viewBox}
            role="img"
            aria-label="Expense statistics chart"
          >
            {chart.slices.map((slice, i) => {
              const active = hovered === i;
              const { x, y, label } = slice;

              const slideTransform = sliceHoverTranslate(chart, slice, active);

              return (
                <g
                  key={slice.key}
                  className={`expense-chart__slice${active ? ' expense-chart__slice--active' : ''}`}
                  style={{
                    transform: slideTransform ?? undefined,
                    transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                >
                  <path
                    className="expense-chart__wedge"
                    d={slice.path}
                    transform={`translate(${x} ${y})`}
                    fill={slice.fill}
                  />
                  <text
                    x={label.x}
                    y={label.y}
                    fill="var(--color-heading)"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="var(--font-sans)"
                    pointerEvents="none"
                  >
                    <tspan x={label.x} dy="-0.35em" fontWeight={700} fontSize={slice.pctSize}>
                      {slice.pct}
                    </tspan>
                    <tspan x={label.x} dy="1.15em" fontWeight={700} fontSize={slice.nameSize}>
                      {slice.name}
                    </tspan>
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
