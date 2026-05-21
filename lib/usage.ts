export function canUseApi(remaining: number) {
  return remaining > 0;
}

export function calculateNewUsage(current: number) {
  return Math.max(current - 1, 0);
}
