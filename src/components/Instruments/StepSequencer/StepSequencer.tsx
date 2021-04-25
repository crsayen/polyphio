import './PianoRoll.css'
import * as types from '../../../types'
import { DawStateContext } from '../../../App'
import React, { useContext } from 'react'

const StepSequencer: React.FC<{
  instrumentIndex: number
  setNoteNodes: (note: string, nodes: types.NoteNode[]) => void
}> = ({ setNoteNodes, instrumentIndex }) => {
  const { dawState, dawDispatch } = useContext(DawStateContext)

  const nodes = dawState.instruments[instrumentIndex].nodes
  return <></>
}

export default StepSequencer
