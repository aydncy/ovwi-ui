let store: Record<string, any> = {};

export function getUser(email: string) {
  return store[email];
}

export function setUser(email: string, data: any) {
  store[email] = data;
}
