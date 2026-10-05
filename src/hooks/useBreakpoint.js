import { useEffect, useState } from 'react';

/**
 * Chrome (sidebar, header, type scale) by viewport:
 *
 * | Viewport      | Mode    |
 * |---------------|---------|
 * | < 640px       | mobile  |
 * | 640 – 1024px  | tablet  |
 * | > 1024px      | desktop |
 *
 * Nav: full labeled sidebar (1000–1024 tablet, all desktop) | icon rail (640–999)
 * | drawer (mobile).
 * Dashboard grid: @container on .dashboard-main; viewport 640–749 / 750–899 splits
 * narrow tablet rows (see dashboard.css).
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint);

  useEffect(() => {
    const onResize = () => setBreakpoint(getBreakpoint());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return breakpoint;
}

/** Sidebar chrome within tablet/desktop widths (layout breakpoint stays separate). */
export function useNavMode() {
  const [navMode, setNavMode] = useState(getNavMode);

  useEffect(() => {
    const onResize = () => setNavMode(getNavMode());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return navMode;
}

/** Tablet widths up to compactMax use the icon rail; mobile uses the hamburger drawer. */
export const NAV_BREAKPOINTS = {
  compactMin: 640,
  compactMax: 999,
};

export const BREAKPOINTS = {
  mobileMax: 639,
  tabletMin: 640,
  tabletMax: 1024,
  desktopMin: 1025,
  desktopFrame: 1440,
};

function getBreakpoint() {
  if (typeof window === 'undefined') return 'tablet';
  const w = window.innerWidth;
  if (w < BREAKPOINTS.tabletMin) return 'mobile';
  /* 1024 and below = tablet (Figma tab); desktop only above 1024 */
  if (w <= BREAKPOINTS.tabletMax) return 'tablet';
  return 'desktop';
}

/** full = labeled sidebar | compact = icon rail | drawer = off-canvas + menu */
function getNavMode() {
  if (typeof window === 'undefined') return 'full';
  const w = window.innerWidth;
  if (w > BREAKPOINTS.tabletMax) return 'full';
  if (w < NAV_BREAKPOINTS.compactMin) return 'drawer';
  if (w <= NAV_BREAKPOINTS.compactMax) return 'compact';
  return 'full';
}
