import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useBreakpoint, useNavMode } from '../hooks/useBreakpoint';

export default function AppShell({ pageTitle, children, mainClassName = 'dashboard-main' }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const navMode = useNavMode();
  const isMobile = breakpoint === 'mobile';

  const shellClass = [
    'app-shell',
    isMobile ? '' : 'app-shell--fx',
    `app-shell--${breakpoint}`,
    `app-shell--nav-${navMode}`,
  ]
    .filter(Boolean)
    .join(' ');

  const mainClass = isMobile ? mainClassName : `${mainClassName} page-main animate-stagger`;

  return (
    <div className={shellClass}>
      <Sidebar
        breakpoint={breakpoint}
        navMode={navMode}
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <div className="app-content">
        <Header
          breakpoint={breakpoint}
          navMode={navMode}
          pageTitle={pageTitle}
          onMenuClick={() => setMobileNavOpen(true)}
        />
        <main className={mainClass}>{children}</main>
      </div>
    </div>
  );
}
