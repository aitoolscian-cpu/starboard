import type { ProgramId } from '../data/types'

export type View = 'sky' | 'programs' | 'program' | 'composer' | 'steering'

export interface Nav {
  view: View
  programId?: ProgramId
}
