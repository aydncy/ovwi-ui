import { getSession } from './session';

export function requireUser() {
  const user = getSession();
  if (!user) {
    window.location.href = '/auth/login';
    return null;
  }
  return user;
}
