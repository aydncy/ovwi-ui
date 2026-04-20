export function saveSession(user) {
  localStorage.setItem('ovwi_user', JSON.stringify(user));
}

export function getSession() {
  const raw = localStorage.getItem('ovwi_user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function clearSession() {
  localStorage.removeItem('ovwi_user');
}
