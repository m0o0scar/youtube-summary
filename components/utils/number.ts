export function formatNumberShort(n: number, base = 1000) {
  if (n > base * base) return `${(n / base / base).toFixed(1)}M`;
  if (n > base) return `${(n / base).toFixed(1)}K`;
  return n.toString();
}

export function percentage(n: number, total: number) {
  return Math.round((n / total) * 100) + '%';
}
