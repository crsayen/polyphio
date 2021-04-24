export type ADSREvent = [value: number, delay: number]

export type DawAction =
  | AddInstrumentAction
  | DelInstrumentAction
  | SetPlayingAction
  | SetStepAction
  | SetBpmAction
  | SetNoteNodes

export type AddInstrumentAction = {
  type: 'addInstrument'
  data: InstrumentState
}

export type DelInstrumentAction = {
  type: 'delInstrument'
  data: number
}

export type SetPlayingAction = {
  type: 'setPlaying'
  data: boolean
}

export type SetStepAction = {
  type: 'setStep'
  data: number
}

export type SetBpmAction = {
  type: 'setBpm'
  data: number
}

export type SetNoteNodes = {
  type: 'setNoteNodes'
  instrumentIndex: number
  note: string
  nodes: NoteNode[]
}

export type DawState = {
  instruments: InstrumentState[]
  playing: boolean
  step: number
  bpm: number
}

export type DawStateContextType = {
  dawState: DawState
  dawDispatch: React.Dispatch<DawAction>
}

export type InstrumentState = {
  type: string
  nodes: {
    C4: NoteNode[]
    Csh4: NoteNode[]
    D4: NoteNode[]
    Dsh4: NoteNode[]
    E4: NoteNode[]
    F4: NoteNode[]
    Fsh4: NoteNode[]
    G4: NoteNode[]
    Gsh4: NoteNode[]
    A4: NoteNode[]
    Ash4: NoteNode[]
    B4: NoteNode[]
    C5: NoteNode[]
    Csh5: NoteNode[]
    D5: NoteNode[]
    Dsh5: NoteNode[]
    E5: NoteNode[]
    F5: NoteNode[]
    Fsh5: NoteNode[]
    G5: NoteNode[]
    Gsh5: NoteNode[]
    A5: NoteNode[]
    Ash5: NoteNode[]
    B5: NoteNode[]
    C6: NoteNode[]
    Csh6: NoteNode[]
    D6: NoteNode[]
    Dsh6: NoteNode[]
    E6: NoteNode[]
    F6: NoteNode[]
    Fsh6: NoteNode[]
    G6: NoteNode[]
    Gsh6: NoteNode[]
    A6: NoteNode[]
    Ash6: NoteNode[]
    B6: NoteNode[]
  }
}

export type NoteNode = {
  start: number
  length: number
}
