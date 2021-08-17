import React from 'react'
import PianoRoll from './PianoRoll/PianoRoll'
import StepSequencer from './StepSequencer/StepSequencer'

const InstrumentRack: React.FC<{ instrumentType: string; index: number }> = ({
  instrumentType,
  index,
}) => {
  switch (instrumentType) {
    case 'synth':
      return <PianoRoll instrumentIndex={index} />
    case 'sequencer':
      return <StepSequencer instrumentIndex={index} />
    default:
      return <></>
  }
}

export default InstrumentRack
