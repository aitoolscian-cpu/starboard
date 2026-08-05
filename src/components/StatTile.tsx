export function StatTile({
  label,
  value,
  sub,
  tone = 'default',
}: {
  label: string
  value: string
  sub?: string
  tone?: 'default' | 'good' | 'bad'
}) {
  const valueColor = tone === 'good' ? 'text-aurora' : tone === 'bad' ? 'text-ember' : 'text-starlight'
  return (
    <div className="panel flex min-w-[9.5rem] flex-1 flex-col gap-1 p-4">
      <span className="eyebrow">{label}</span>
      <span className={`tnum text-2xl font-semibold leading-none ${valueColor}`}>{value}</span>
      {sub && <span className="text-xs text-muted">{sub}</span>}
    </div>
  )
}
