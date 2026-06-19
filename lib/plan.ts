export function getLimit(plan: string) {
  if (plan === "pro") return 2000;
  if (plan === "scale") return 10000;
  return 50;
}
