import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function ProfileMenu({ size = 'default' }) {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const handleLogout = () => {
    const result = logout();
    showToast('info', result.message);
    setOpen(false);
    navigate('/login', { replace: true });
  };

  const avatarClass =
    size === 'sm' ? 'avatar avatar--sm' : size === 'tablet' ? 'avatar avatar--tablet' : 'avatar';

  return (
    <div className={`profile-menu ${open ? 'profile-menu--open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className={`profile-menu__trigger ${avatarClass}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Profile menu"
        onClick={() => setOpen((v) => !v)}
      >
        <img src={user?.avatar ?? '/assets/pexels-christina-morillo-1181690-1.png'} alt="Profile" />
      </button>
      {open && (
        <div className="profile-menu__dropdown" role="menu">
          <div className="profile-menu__user">
            <p className="profile-menu__name">{user?.name ?? 'User'}</p>
            <p className="profile-menu__email">{user?.email ?? ''}</p>
          </div>
          <button type="button" className="profile-menu__logout" role="menuitem" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
