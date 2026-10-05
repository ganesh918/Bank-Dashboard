import { useState } from 'react';
import { cardExpenseLegend, cardExpenseSlices } from '../data/creditCards';

const CX = 93;
const CY = 107;
const INNER_R = 51.4;
const HOLE_R = 37;
const POP = 6;

const rad = (deg) => (deg * Math.PI) / 180;

function sector(r, start, end) {
  const x1 = CX + r * Math.cos(rad(start));
  const y1 = CY + r * Math.sin(rad(start));
  const x2 = CX + r * Math.cos(rad(end));
  const y2 = CY + r * Math.sin(rad(end));
  return `M${CX} ${CY} L${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}

export default function CardExpenseStatistics() {
  const [active, setActive] = useState(null);
  const byId = Object.fromEntries(cardExpenseSlices.map((s) => [s.id, s]));

  return (
    <section className="section cc-expense">
      <div className="section-head">
        <h2>Card Expense Statistics</h2>
      </div>
      <div className="section-card cc-expense__card">
        <svg
          className="cc-expense__chart"
          viewBox="-8 -8 216 214"
          role="img"
          aria-label="Card expenses by bank: DBL, ABM, BRC and MCP"
          onPointerLeave={() => setActive(null)}
        >
          {cardExpenseSlices.map((s) => {
            const mid = rad((s.start + s.end) / 2);
            const on = active === s.id;
            return (
              <g
                key={s.id}
                className={`cc-expense__slice${on ? ' is-active' : ''}`}
                style={{ transform: on ? `translate(${Math.cos(mid) * POP}px, ${Math.sin(mid) * POP}px)` : undefined }}
                onPointerEnter={() => setActive(s.id)}
              >
                <title>{s.label}</title>
                <path d={sector(s.r, s.start, s.end)} fill={s.fill} />
                <path d={sector(INNER_R, s.start, s.end)} fill={s.inner} />
              </g>
            );
          })}
          <circle className="cc-expense__hole" cx={CX} cy={CY} r={HOLE_R} />
        </svg>

        <ul className="cc-expense__legend">
          {cardExpenseLegend.map((id) => (
            <li
              key={id}
              className={active === id ? 'is-active' : undefined}
              onPointerEnter={() => setActive(id)}
              onPointerLeave={() => setActive(null)}
            >
              <i style={{ background: byId[id].fill }} aria-hidden="true" />
              {byId[id].label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
