/** Tiny inline burn sparkline (SVG polyline). */
export function Sparkline({
  data,
  width = 84,
  height = 24,
  stroke = 'var(--gold)',
}: {
  data: number[]
  width?: number
  height?: number
  stroke?: string
}) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const span = max - min || 1
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * (width - 4) + 2
      const y = height - 3 - ((v - min) / span) * (height - 6)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  return (
    <svg width={width} height={height} aria-hidden="true" focusable="false">
      <polyline
        points={pts}
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  )
}
