import { useLayoutEffect, useRef, useState } from 'react';
import {
  INVESTMENT_CHART_MAX,
  INVESTMENT_CHART_TICKS,
  INVESTMENT_YEARS,
  MONTHLY_REVENUE_PATH,
} from '../data/investments';
import { useBreakpoint } from '../hooks/useBreakpoint';

/* Figma plot box is 420×190 on the 1440 frame; year centres sit at these x offsets */
const PLOT_W = 420;
const PLOT_H = 190;
const X_STOPS = [19, 94, 167, 242, 317, 393].map((x) => x / PLOT_W);
const CURVE_OFFSET = { x: 0.5, y: 24.5 };

function usePlotSize(ref) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setSize((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return size;
}

function scalePath(d, sx, sy) {
  let axis = 0;
  return d.replace(/[A-Z]|-?\d*\.?\d+/g, (token) => {
    if (/[A-Z]/.test(token)) {
      axis = 0;
      return token;
    }
    const v = parseFloat(token);
    const out = axis === 0 ? (v + CURVE_OFFSET.x) * sx : (v + CURVE_OFFSET.y) * sy;
    axis ^= 1;
    return out.toFixed(2);
  });
}

const money = (v) => `$${Math.round(v).toLocaleString('en-US')}`;

export default function InvestmentsLineChart({ title, variant = 'points', values = [] }) {
  const breakpoint = useBreakpoint();
  const plotRef = useRef(null);
  const lineRef = useRef(null);
  const samplesRef = useRef([]);
  const { w, h } = usePlotSize(plotRef);
  const [hover, setHover] = useState(null);
  const ready = w > 0 && h > 0;
  const isCurve = variant === 'curve';

  const snap = (v) => Math.round(v) + 0.5;
  const rows = INVESTMENT_CHART_TICKS.map((_, i) => snap(((h - 1) * i) / 4));
  const points = values.map((v, i) => ({
    x: X_STOPS[i] * w,
    y: h - (v / INVESTMENT_CHART_MAX) * h,
    value: v,
    year: INVESTMENT_YEARS[i],
  }));
  const linePath = ready
    ? isCurve
      ? scalePath(MONTHLY_REVENUE_PATH, w / PLOT_W, h / PLOT_H)
      : points.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ')
    : '';
  const dotR = breakpoint === 'desktop' ? 4.5 : 3.5;

  useLayoutEffect(() => {
    const path = lineRef.current;
    if (!path || !isCurve) return;
    const len = path.getTotalLength();
    const n = 400;
    samplesRef.current = Array.from({ length: n + 1 }, (_, i) => path.getPointAtLength((len * i) / n));
    setHover(null);
  }, [linePath, isCurve]);

  const curveYAt = (x) => {
    const pts = samplesRef.current;
    if (!pts.length) return null;
    let lo = 0;
    let hi = pts.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (pts[mid].x < x) lo = mid;
      else hi = mid;
    }
    const a = pts[lo];
    const b = pts[hi];
    const k = b.x === a.x ? 0 : (x - a.x) / (b.x - a.x);
    return a.y + (b.y - a.y) * Math.min(Math.max(k, 0), 1);
  };

  const nearestYear = (x) =>
    X_STOPS.reduce((best, stop, i) => (Math.abs(stop * w - x) < Math.abs(X_STOPS[best] * w - x) ? i : best), 0);

  const onPointerMove = (e) => {
    const rect = plotRef.current.getBoundingClientRect();
    const px = Math.min(Math.max(e.clientX - rect.left, 0), w);
    if (isCurve) {
      const y = curveYAt(px);
      if (y == null) return;
      setHover({
        x: px,
        y,
        value: INVESTMENT_CHART_MAX * (1 - y / h),
        year: INVESTMENT_YEARS[nearestYear(px)],
      });
    } else {
      setHover({ ...points[nearestYear(px)], index: nearestYear(px) });
    }
  };

  const tipEdge = hover && (hover.x < 44 ? 'start' : hover.x > w - 44 ? 'end' : null);
  const tipBelow = hover && hover.y < 52;

  return (
    <section className="section investments-chart">
      <div className="section-head">
        <h2>{title}</h2>
      </div>
      <div className={`section-card investments-chart__card investments-chart__card--${variant}`}>
        <ul className="investments-chart__y" aria-hidden="true">
          {INVESTMENT_CHART_TICKS.map((tick) => (
            <li key={tick}>{money(tick)}</li>
          ))}
        </ul>

        <div
          className="investments-chart__plot"
          ref={plotRef}
          onPointerMove={onPointerMove}
          onPointerDown={onPointerMove}
          onPointerLeave={() => setHover(null)}
        >
          {ready && (
            <svg
              className="investments-chart__svg"
              width={w}
              height={h}
              viewBox={`0 0 ${w} ${h}`}
              role="img"
              aria-label={`${title} from ${INVESTMENT_YEARS[0]} to ${INVESTMENT_YEARS.at(-1)}`}
            >
              <g className="investments-chart__grid">
                {rows.map((y) => (
                  <line key={y} x1="0" x2={w} y1={y} y2={y} />
                ))}
              </g>

              <path className="investments-chart__line" ref={lineRef} d={linePath} />

              {!isCurve &&
                points.map((p, i) => (
                  <circle
                    key={p.year}
                    className={`investments-chart__point${hover?.index === i ? ' is-active' : ''}`}
                    cx={p.x}
                    cy={p.y}
                    r={dotR}
                  />
                ))}

              {hover && (
                <g className="balance-chart__hover investments-chart__hover">
                  <line className="balance-chart__guide" x1={hover.x} x2={hover.x} y1={hover.y} y2={h} />
                  <circle className="balance-chart__halo" cx={hover.x} cy={hover.y} r="11" />
                  <circle className="investments-chart__hover-dot" cx={hover.x} cy={hover.y} r="5.5" />
                </g>
              )}
            </svg>
          )}

          {hover && (
            <div
              className={[
                'balance-chart__tip',
                tipEdge && `balance-chart__tip--${tipEdge}`,
                tipBelow && 'balance-chart__tip--below',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ left: hover.x, top: hover.y }}
              role="status"
            >
              <span className="balance-chart__tip-value">{money(hover.value)}</span>
              <span className="balance-chart__tip-month">{hover.year}</span>
            </div>
          )}
        </div>

        <ul className="investments-chart__x" aria-hidden="true">
          {INVESTMENT_YEARS.map((year, i) => (
            <li key={year} style={{ left: `${X_STOPS[i] * 100}%` }}>
              {year}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
