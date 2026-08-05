import { PROGRAMS } from '../data/programs'
import type { Status } from '../data/types'

/** Derived portfolio KPIs — computed from seed data so the strip can never contradict it. */
export interface PortfolioKpis {
  statusCounts: Record<Status, number>
  totalBudget: number
  totalSpend: number
  totalFac: number
  /** (FAC − budget) / budget, percent */
  variancePct: number
  quarterMilestonesDone: number
  quarterMilestonesTotal: number
  openRisks: number
  highRisks: number
  escalations: number
}

const Q_START = '2026-07-01'
const Q_END = '2026-09-30'

export function computeKpis(): PortfolioKpis {
  const statusCounts: Record<Status, number> = { green: 0, amber: 0, red: 0 }
  let totalBudget = 0
  let totalSpend = 0
  let totalFac = 0
  let qDone = 0
  let qTotal = 0
  let openRisks = 0
  let highRisks = 0
  let escalations = 0

  for (const p of PROGRAMS) {
    statusCounts[p.status]++
    totalBudget += p.budget
    totalSpend += p.spendToDate
    totalFac += p.fac
    if (p.escalationTier > 1) escalations++
    for (const m of p.milestones) {
      if (m.date >= Q_START && m.date <= Q_END) {
        qTotal++
        if (m.state === 'done') qDone++
      }
    }
    for (const r of p.raid) {
      if (r.type === 'risk') {
        openRisks++
        if (r.severity === 'high') highRisks++
      }
    }
  }

  return {
    statusCounts,
    totalBudget,
    totalSpend,
    totalFac,
    variancePct: ((totalFac - totalBudget) / totalBudget) * 100,
    quarterMilestonesDone: qDone,
    quarterMilestonesTotal: qTotal,
    openRisks,
    highRisks,
    escalations,
  }
}

export const KPIS = computeKpis()

/** Next upcoming (not done) milestone for a program, by date. */
export function nextMilestone(programId: string) {
  const p = PROGRAMS.find((x) => x.id === programId)
  if (!p) return undefined
  return p.milestones.filter((m) => m.state !== 'done').sort((a, b) => a.date.localeCompare(b.date))[0]
}
