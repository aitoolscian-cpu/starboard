/** $8.4M / $8.05M / $180K style compact money. Input in USD. */
export function fmtMoney(usd: number): string {
  const abs = Math.abs(usd)
  const sign = usd < 0 ? '−' : ''
  if (abs >= 1_000_000) {
    return `${sign}$${(abs / 1_000_000).toFixed(2).replace(/\.?0+$/, '')}M`
  }
  if (abs >= 1_000) return `${sign}$${Math.round(abs / 1_000)}K`
  return `${sign}$${abs}`
}

export function fmtPct(p: number, digits = 1): string {
  const sign = p < 0 ? '−' : p > 0 ? '+' : ''
  return `${sign}${Math.abs(p).toFixed(digits)}%`
}
