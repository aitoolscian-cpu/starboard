import type { ReactNode } from 'react'

/** Shared tooltip chrome for Recharts custom content. */
export function TooltipShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="panel px-3 py-2 text-xs shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
      <div className="mb-1 font-semibold text-starlight">{title}</div>
      <div className="flex flex-col gap-0.5 text-muted">{children}</div>
    </div>
  )
}
