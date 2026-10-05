import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  AUTH_STORAGE_KEY,
  DEFAULT_AVATAR,
  readUserRegistry,
  writeUserRegistry,
} from '../data/auth';

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistSession(user) {
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const login = useCallback(({ email, password }) => {
    const normalized = email.trim().toLowerCase();
    const registry = readUserRegistry();
    const record = registry[normalized];

    if (!record || record.password !== password) {
      return { ok: false, message: 'Invalid email or password. Please try again.' };
    }

    const session = {
      email: normalized,
      name: record.name,
      avatar: record.avatar ?? DEFAULT_AVATAR,
    };
    persistSession(session);
    setUser(session);
    return { ok: true, message: `Welcome back, ${session.name}!` };
  }, []);

  const signup = useCallback(({ name, email, password }) => {
    const trimmedName = name.trim();
    const normalized = email.trim().toLowerCase();

    if (trimmedName.length < 2) {
      return { ok: false, message: 'Please enter your full name.' };
    }
    if (password.length < 8) {
      return { ok: false, message: 'Password must be at least 8 characters.' };
    }

    const registry = readUserRegistry();
    if (registry[normalized]) {
      return { ok: false, message: 'An account with this email already exists.' };
    }

    registry[normalized] = {
      name: trimmedName,
      password,
      avatar: DEFAULT_AVATAR,
    };
    writeUserRegistry(registry);

    const session = {
      email: normalized,
      name: trimmedName,
      avatar: DEFAULT_AVATAR,
    };
    persistSession(session);
    setUser(session);
    return { ok: true, message: `Account created. Welcome, ${trimmedName}!` };
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    return { ok: true, message: 'You have been logged out successfully.' };
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
    }),
    [user, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
