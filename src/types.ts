export type ADSREvent = [value: number, delay: number]

export type DawAction =
  | AddSynthAction
  | AddSequencerAction
  | DelInstrumentAction
  | SetPlayingAction
  | SetStepAction
  | SetBpmAction
  | SetSynthNoteNodes
  | SetSequencerNoteNodes

export type AddSynthAction = {
  type: 'addSynth'
  synth: SynthState
}

export type AddSequencerAction = {
  type: 'addSequencer'
  sequencer: SequencerState
}

export type DelInstrumentAction = {
  type: 'delInstrument'
  instrumentType: 'synths' | 'sequencers'
  instrumentIndex: number
}

export type SetPlayingAction = {
  type: 'setPlaying'
  playing: boolean
}

export type SetStepAction = {
  type: 'setStep'
  step: number
}

export type SetBpmAction = {
  type: 'setBpm'
  bpm: number
}

export type SetSynthNoteNodes = {
  type: 'setSynthNoteNodes'
  index: number
  note: string
  nodes: SynthNoteNode[]
}

export type SetSequencerNoteNodes = {
  type: 'setSequencerNoteNodes'
  index: number
  nodes: SequencerNoteNode[]
}

export type DawState = {
  synths: SynthState[]
  sequencers: SequencerState[]
  playing: boolean
  step: number
  bpm: number
}

export type DawStateContextType = {
  dawState: DawState
  dawDispatch: React.Dispatch<DawAction>
}

export type SynthNoteNode = {
  start: number
  length: number
}

export type SequencerNoteNode = {
  type: string
  start: number
}

export type SequencerState = {
  nodes: SequencerNoteNode[]
}

export type SynthState = {
  nodes: {
    Csh4: SynthNoteNode[]
    D4: SynthNoteNode[]
    Dsh4: SynthNoteNode[]
    E4: SynthNoteNode[]
    F4: SynthNoteNode[]
    Fsh4: SynthNoteNode[]
    G4: SynthNoteNode[]
    Gsh4: SynthNoteNode[]
    A4: SynthNoteNode[]
    Ash4: SynthNoteNode[]
    B4: SynthNoteNode[]
    C5: SynthNoteNode[]
    Csh5: SynthNoteNode[]
    D5: SynthNoteNode[]
    Dsh5: SynthNoteNode[]
    E5: SynthNoteNode[]
    F5: SynthNoteNode[]
    Fsh5: SynthNoteNode[]
    G5: SynthNoteNode[]
    Gsh5: SynthNoteNode[]
    A5: SynthNoteNode[]
    Ash5: SynthNoteNode[]
    B5: SynthNoteNode[]
    C6: SynthNoteNode[]
    Csh6: SynthNoteNode[]
    D6: SynthNoteNode[]
    Dsh6: SynthNoteNode[]
    E6: SynthNoteNode[]
    F6: SynthNoteNode[]
    Fsh6: SynthNoteNode[]
    G6: SynthNoteNode[]
    Gsh6: SynthNoteNode[]
    A6: SynthNoteNode[]
    Ash6: SynthNoteNode[]
    B6: SynthNoteNode[]
  }
}
