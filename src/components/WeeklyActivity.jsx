import { useLayoutEffect, useRef, useState } from 'react';
import { weeklyActivity } from '../data/dashboard';
import { useBreakpoint } from '../hooks/useBreakpoint';

const Y_MAX = 500;
const Y_TICKS = [500, 400, 300, 200, 100, 0];

/** Figma weekly plot band + grid (group-41 / group-442 / group-706). */
const WEEKLY_LAYOUT = {
  desktop: {
    gridW: 631,
    gridStart: 36,
    gridGap: 10,
    plotBand: 194,
    gridTop: 8,
    gridH: 186,
    barTop: 15,
    barH: 178,
    dayCompress: 0.96,
  },
  tablet: {
    gridW: 410,
    gridStart: 32,
    gridGap: 8,
    plotBand: 177,
    gridTop: 11,
    gridH: 166,
    barTop: 15,
    barH: 161,
    dayCompress: 0.96,
  },
  mobile: {
    gridW: 259,
    gridStart: 30,
    gridGap: 6,
    plotBand: 177,
    gridTop: 11,
    gridH: 166,
    barTop: 15,
    barH: 161,
    dayCompress: 0.96,
  },
};

/** Bar-group center X in the same coordinate system as gridStart / gridW. */
const BAR_CENTERS = {
  desktop: [82, 172, 262, 352, 442, 532, 622],
  tablet: [56, 115, 174, 233, 292, 351, 410],
  mobile: [43.5, 80, 118, 159, 196, 238, 274.5],
};

function barCenterX(index, stageW, gridX1, gridSpan, layout) {
  const center = BAR_CENTERS[layout.key]?.[index] ?? BAR_CENTERS.desktop[index];
  const norm = (center - layout.gridStart) / layout.gridW;
  const compressed = 0.5 + (norm - 0.5) * layout.dayCompress;
  return gridX1 + compressed * gridSpan;
}

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

export default function WeeklyActivity() {
  const breakpoint = useBreakpoint();
  const legendRef = useRef(null);
  const stageRef = useRef(null);
  const { w, h } = useStageSize(stageRef);
  const [bars, setBars] = useState({ w: 15, g: 12 });
  const [gridEnd, setGridEnd] = useState(null);
  const ready = w > 0 && h > 0;

  const layoutKey = breakpoint in WEEKLY_LAYOUT ? breakpoint : 'desktop';
  const layout = { ...WEEKLY_LAYOUT[layoutKey], key: layoutKey };

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const style = getComputedStyle(el);
    setBars({
      w: parseFloat(style.getPropertyValue('--bar-w')) || 15,
      g: parseFloat(style.getPropertyValue('--bar-gap')) || 12,
    });
  }, [w, h]);

  useLayoutEffect(() => {
    const legend = legendRef.current;
    const stage = stageRef.current;
    if (!legend || !stage) return undefined;

    const update = () => {
      const end = legend.getBoundingClientRect().right - stage.getBoundingClientRect().left;
      setGridEnd(end);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(legend);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [w, h]);

  const scale = h / layout.plotBand;
  const gridTop = layout.gridTop * scale;
  const gridH = layout.gridH * scale;
  const barTop = layout.barTop * scale;
  const barH = layout.barH * scale;
  const barBase = barTop + barH;

  const snap = (v) => Math.round(v) + 0.5;
  const rows = [0, 1, 2, 3, 4, 5].map((i) => snap(gridTop + (gridH * i) / 5));

  const gridGap = layout.gridGap * scale;
  const gridX1 = snap(gridGap);
  const gridX2 = snap(Math.min(w, Math.max(gridEnd ?? w, gridX1 + 1)));
  const gridSpan = gridX2 - gridX1;

  const { w: barW, g: barGap } = bars;
  const barHeight = (value) => (value / Y_MAX) * barH;

  return (
    <section className="section weekly-activity">
      <div className="section-head">
        <h2>Weekly Activity</h2>
      </div>
      <div className="section-card section-card--weekly">
        <div className="chart-legend chart-legend--in-card" ref={legendRef}>
          <span>
            <i className="dot dot--deposit" /> Diposit
          </span>
          <span>
            <i className="dot dot--withdraw" /> Withdraw
          </span>
        </div>
        <div className="weekly-chart">
          <div className="weekly-chart__plot">
            <div className="weekly-chart__body">
              <ul className="weekly-chart__y" aria-hidden="true">
                {Y_TICKS.map((value, i) => (
                  <li key={value} style={{ top: rows[i] - 0.5 }}>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
              <div className="weekly-chart__stage" ref={stageRef}>
                {ready && (
                  <svg
                    className="weekly-chart__svg"
                    width={w}
                    height={h}
                    viewBox={`0 0 ${w} ${h}`}
                    role="img"
                    aria-label="Weekly deposit and withdraw activity"
                  >
                    <g className="weekly-chart__grid">
                      {rows.map((y) => (
                        <line key={`r${y}`} x1={gridX1} x2={gridX2} y1={y} y2={y} />
                      ))}
                    </g>

                    {weeklyActivity.map(({ day, withdraw, deposit }, i) => {
                      const cx = barCenterX(i, w, gridX1, gridSpan, layout);
                      const wX = cx - barGap / 2 - barW;
                      const dX = cx + barGap / 2;
                      const wH = barHeight(withdraw);
                      const dH = barHeight(deposit);
                      const r = barW / 2;

                      return (
                        <g key={day} className="weekly-chart__day" aria-hidden="true">
                          <rect
                            className="weekly-chart__bar weekly-chart__bar--withdraw"
                            x={wX}
                            y={barBase - wH}
                            width={barW}
                            height={wH}
                            rx={r}
                            ry={r}
                            tabIndex={0}
                            role="img"
                            aria-label={`${day} withdraw ${withdraw}`}
                          />
                          <rect
                            className="weekly-chart__bar weekly-chart__bar--deposit"
                            x={dX}
                            y={barBase - dH}
                            width={barW}
                            height={dH}
                            rx={r}
                            ry={r}
                            tabIndex={0}
                            role="img"
                            aria-label={`${day} deposit ${deposit}`}
                          />
                        </g>
                      );
                    })}
                  </svg>
                )}
              </div>
            </div>

            <ul className="weekly-chart__x" aria-hidden="true">
              {weeklyActivity.map(({ day }, i) => (
                <li
                  key={day}
                  style={{
                    left: `${((barCenterX(i, w, gridX1, gridSpan, layout) / w) * 100).toFixed(4)}%`,
                  }}
                >
                  <span>{day}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
