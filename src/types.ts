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

export type InstrumentState = SynthState | SequencerState

export type NoteNode = SynthNoteNode | SequencerNoteNode

export type SynthNoteNode = {
  type: 'synth'
  start: number
  length: number
}

export type SequencerNoteNode = {
  type: 'seq'
  start: number
}

export type SequencerState = {
  type: 'seq'
  nodes: {
    [note: string]: SequencerNoteNode[]
  }
}

export type SynthState = {
  type: 'synth'
  nodes: {
    [note: string]: NoteNode[]
  }
}
