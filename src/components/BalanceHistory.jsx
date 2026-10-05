import { useLayoutEffect, useRef, useState } from 'react';
import { balanceHistory } from '../data/dashboard';
import { useBreakpoint } from '../hooks/useBreakpoint';

/* Figma desktop curve (105:385) in its own 547×155 box; the area closes at y 177.
   Tab and mobile frames use this same shape, only scaled. */
const CURVE_W = 547;
const CURVE_AREA_H = 177;
const CURVE_LINE =
  'M0 155 C11.4555 138.631 19.0925 112.908 37.7077 104.89 C56.3229 96.8723 82.0977 126.437 99.281 124.433 C116.464 122.428 123.147 72.8194 139.853 68.3095 C156.558 63.7996 171.355 86.8502 187.584 77.3293 C203.812 67.8084 204.767 5.67172 233.406 0.159658 C262.045 -5.3524 289.251 133.71 321.709 130.947 C354.166 128.184 345.574 50.7709 380.418 47.7643 C415.262 44.7577 428.627 128.442 457.265 125.435 C485.904 122.428 490.677 40.2477 507.383 33.2323 C524.089 26.217 542.227 41.7511 547 41.7511';
const CURVE_AREA = `${CURVE_LINE} L547 177 L0 177 Z`;

const Y_TICKS = [800, 600, 400, 200, 0];
const COLUMNS = 7;

function scalePath(d, sx, sy, dy) {
  let axis = 0;
  return d.replace(/[A-Z]|-?\d*\.?\d+/g, (token) => {
    if (/[A-Z]/.test(token)) {
      axis = 0;
      return token;
    }
    const v = parseFloat(token);
    const out = axis === 0 ? v * sx : v * sy + dy;
    axis ^= 1;
    return out.toFixed(2);
  });
}

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

export default function BalanceHistory() {
  const breakpoint = useBreakpoint();
  const plotRef = useRef(null);
  const { w, h } = usePlotSize(plotRef);

  /* Plot is 160px tall on tab/mobile and 185px on the 1440 frame: the curve sits
     13px (tab) / 14px (mobile) below the top grid line vs 5px on desktop, and the fill
     ends 0 / -1 / 3px above the baseline. */
  const t = Math.min(Math.max((h - 160) / 25, 0), 1);
  const isMobile = breakpoint === 'mobile';
  const top = isMobile ? 14 : 13 - 8 * t;
  const areaH = h - top - (isMobile ? -1 : 3 * t);
  const sx = w / CURVE_W;
  const sy = areaH / CURVE_AREA_H;
  const ready = w > 0 && h > 0;

  const snap = (v) => Math.round(v) + 0.5;
  const rows = [0, 1, 2, 3, 4].map((i) => snap(((h - 1) * i) / 4));
  const cols = Array.from({ length: COLUMNS }, (_, i) => snap((w * i) / COLUMNS));

  const linePath = ready ? scalePath(CURVE_LINE, sx, sy, top) : '';
  const lineRef = useRef(null);
  const samplesRef = useRef([]);
  const [hover, setHover] = useState(null);

  useLayoutEffect(() => {
    const path = lineRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const n = 400;
    samplesRef.current = Array.from({ length: n + 1 }, (_, i) => path.getPointAtLength((len * i) / n));
    setHover(null);
  }, [linePath]);

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

  const onPointerMove = (e) => {
    const rect = plotRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), w);
    const y = curveYAt(x);
    if (y == null) return;
    setHover({ x, y });
  };

  const hoverMonth = hover
    ? balanceHistory[Math.min(Math.floor(hover.x / (w / COLUMNS)), balanceHistory.length - 1)].month
    : null;
  const hoverValue = hover ? Math.round(Math.max(0, 800 * (1 - hover.y / (h - 1)))) : null;
  const tipEdge = hover && (hover.x < 44 ? 'start' : hover.x > w - 44 ? 'end' : null);
  const tipBelow = hover && hover.y < 52;

  return (
    <section className="section balance-history">
      <div className="section-head">
        <h2>Balance History</h2>
      </div>
      <div className="section-card section-card--balance">
        <div className="balance-chart">
          <div
            className="balance-chart__plot"
            ref={plotRef}
            onPointerMove={onPointerMove}
            onPointerDown={onPointerMove}
            onPointerLeave={() => setHover(null)}
          >
            {ready && (
              <svg
                className="balance-chart__svg"
                width={w}
                height={h}
                viewBox={`0 0 ${w} ${h}`}
                role="img"
                aria-label="Balance history from July to January"
              >
                <defs>
                  <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <g className="balance-chart__grid">
                  {rows.map((y) => (
                    <line key={`r${y}`} x1="0" x2={w} y1={y} y2={y} />
                  ))}
                  {cols.map((x) => (
                    <line key={`c${x}`} x1={x} x2={x} y1="0" y2={h} />
                  ))}
                </g>
                <line
                  className="balance-chart__edge"
                  x1={snap(w - 1)}
                  x2={snap(w - 1)}
                  y1="0"
                  y2={h}
                />

                <path d={scalePath(CURVE_AREA, sx, sy, top)} fill="url(#balanceFill)" />
                <path className="balance-chart__line" ref={lineRef} d={linePath} />

                {hover && (
                  <g className="balance-chart__hover">
                    <line
                      className="balance-chart__guide"
                      x1={hover.x}
                      x2={hover.x}
                      y1={hover.y}
                      y2={h}
                    />
                    <circle className="balance-chart__halo" cx={hover.x} cy={hover.y} r="11" />
                    <circle className="balance-chart__dot" cx={hover.x} cy={hover.y} r="5.5" />
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
                <span className="balance-chart__tip-value">${hoverValue}</span>
                <span className="balance-chart__tip-month">{hoverMonth}</span>
              </div>
            )}

            <ul className="balance-chart__y" aria-hidden="true">
              {Y_TICKS.map((value, i) => (
                <li key={value} style={{ top: rows[i] - 0.5 }}>
                  <span>{value}</span>
                </li>
              ))}
            </ul>

            <ul className="balance-chart__x" aria-hidden="true">
              {balanceHistory.map(({ month }, i) => (
                <li key={month} style={{ left: `${(i / COLUMNS) * 100}%` }}>
                  <span>{month}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
