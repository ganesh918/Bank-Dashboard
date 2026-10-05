export const AUTH_STORAGE_KEY = 'bankdash_session';
export const USERS_REGISTRY_KEY = 'bankdash_users';

export const DEFAULT_AVATAR = '/assets/pexels-christina-morillo-1181690-1.png';

export function readUserRegistry() {
  try {
    const raw = localStorage.getItem(USERS_REGISTRY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function writeUserRegistry(registry) {
  localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(registry));
}
