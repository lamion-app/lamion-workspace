export function round(n: number) {
  return Math.round(n * 10) / 10;
}

export function computeChange(c: Comparison) {
  if (c.past == 0) return null;

  const value = round((c.actual / c.past) * 100 - 100);

  if (value == 0) return null;

  return value;
}
