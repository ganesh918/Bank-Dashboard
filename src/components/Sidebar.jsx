import { NavLink } from 'react-router-dom';
import { navItems } from '../data/dashboard';
import BrandWordmark from './BrandWordmark';

export default function Sidebar({ breakpoint, navMode, mobileOpen, onClose }) {
  const isDrawer = navMode === 'drawer';
  const isCompact = navMode === 'compact';

  return (
    <>
      {isDrawer && (
        <div
          className={`sidebar-backdrop ${mobileOpen ? 'visible' : ''}`}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar sidebar--${breakpoint} ${isCompact ? 'sidebar--compact' : ''} ${isDrawer ? 'sidebar--drawer' : ''} ${isDrawer && mobileOpen ? 'open' : ''}`}
      >
        <div className="sidebar-brand">
          <img src="/assets/iconfinder-vector-65-09-473792-1.png" alt="" width={36} height={36} />
          <span>
            <BrandWordmark />
          </span>
        </div>
        <nav className="sidebar-inner">
          {navItems.map((item) =>
            item.to === '#' ? (
              <a
                key={item.id}
                href="#"
                className="nav-item"
                onClick={(e) => {
                  e.preventDefault();
                  onClose?.();
                }}
              >
                <img src={`/assets/${item.icon}`} alt="" width={25} height={25} />
                <span>{item.label}</span>
              </a>
            ) : (
              <NavLink
                key={item.id}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                onClick={onClose}
              >
                <img src={`/assets/${item.icon}`} alt="" width={25} height={25} />
                <span>{item.label}</span>
              </NavLink>
            ),
          )}
        </nav>
      </aside>
    </>
  );
}
