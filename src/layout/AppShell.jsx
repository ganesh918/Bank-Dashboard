import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useBreakpoint, useNavMode } from '../hooks/useBreakpoint';

export default function AppShell({ pageTitle, children, mainClassName = 'dashboard-main' }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const navMode = useNavMode();

  return (
    <div className={`app-shell app-shell--fx app-shell--${breakpoint} app-shell--nav-${navMode}`}>
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
        <main className={`${mainClassName} page-main animate-stagger`}>{children}</main>
      </div>
    </div>
  );
}
