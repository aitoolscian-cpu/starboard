import type { Bi } from '../i18n'

/** Fixed demo date: 5 August 2026. All data is authored around it. */
export const TODAY = '2026-08-05'
export const TODAY_MONTH_INDEX = 7 // Aug (0-based)
/** Fraction through the year at the demo date, for "today" lines on Jan–Dec scales. */
export const TODAY_YEAR_FRACTION = (7 + 5 / 31) / 12

export type ProgramId = 'canopus' | 'acrux' | 'antares' | 'mimosa' | 'hadar' | 'atria'
export type Status = 'green' | 'amber' | 'red'
export type Methodology = 'agile' | 'waterfall' | 'hybrid'
export type MilestoneState = 'done' | 'onTrack' | 'atRisk'
export type RaidType = 'risk' | 'assumption' | 'issue' | 'dependency'
export type Severity = 'high' | 'medium' | 'low'
export type CityId = 'buenosAires' | 'saoPaulo' | 'mexicoCity' | 'bogota' | 'santiago'

export interface City {
  id: CityId
  name: Bi
  country: string
  /** [longitude, latitude] */
  coordinates: [number, number]
}

export interface Milestone {
  id: string
  label: Bi
  /** ISO date, 2026 */
  date: string
  state: MilestoneState
}

export interface Phase {
  label: Bi
  /** 0-based month range, inclusive */
  start: number
  end: number
}

export interface RaidEntry {
  id: string
  type: RaidType
  severity: Severity
  title: Bi
  owner: string
  due: string
  mitigation: Bi
}

export interface Vendor {
  name: string
  service: Bi
  slaBreached: boolean
  slaNote?: Bi
}

export interface DependencyEdge {
  from: ProgramId
  to: ProgramId
  label: Bi
  critical?: boolean
}

export interface AdoptionData {
  /** weekly adoption %, 12 weeks */
  curve: number[]
  trainingPct: number
  champions: number
  countries: number
  pulse: number
}

export interface ImprovementData {
  /** weekly MTTR (days) */
  series: number[]
  /** index of the first post-improvement week */
  interventionWeek: number
  beforeDays: number
  afterDays: number
  reductionPct: number
}

export interface Program {
  id: ProgramId
  codename: string
  domain: Bi
  description: Bi
  narrative: Bi
  city: CityId
  status: Status
  methodology: Methodology
  /** USD */
  budget: number
  spendToDate: number
  fac: number
  /** monthly burn, Jan–Dec 2026 (USD). Months < actualsThrough are actuals. */
  burn: number[]
  /** number of months that are actuals (7 = Jan–Jul) */
  actualsThrough: number
  milestones: Milestone[]
  phases?: Phase[]
  /** agile programs: sprint length in weeks, for tick marks */
  sprintWeeks?: number
  raid: RaidEntry[]
  stakeholders: { sponsor: string; owner: string; pm: string }
  vendors: Vendor[]
  /** escalation tier currently active (1 = team-level normal) */
  escalationTier: 1 | 2 | 3
  adoption?: AdoptionData
  improvement?: ImprovementData
}
