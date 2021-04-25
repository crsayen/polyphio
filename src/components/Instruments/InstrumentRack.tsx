import './InstrumentRack.css'
import * as types from '../../types'
import { DawStateContext } from '../../App'
import React, { useContext, useRef, useState, useEffect } from 'react'

import { NOTESIZE } from '../../constants'
import Select from 'react-select'
import PianoRoll from './PianoRoll/PianoRoll'

const InstrumentRack: React.FC<{ instrumentType: string; index: number }> = ({
  instrumentType,
  index,
}) => {
  const { dawState, dawDispatch } = useContext(DawStateContext)
  const [noteSize, setNoteSize] = useState<string>('quarter')

  // TODO: instrument panel
  // TODO: 'delete' button
  return (
    <div>
      <Select
        defaultValue={{ value: 'quarter', label: 'quarter note' }}
        options={noteOptions}
        onChange={(n) => setNoteSize(n?.value ?? '')}
      ></Select>
      <PianoRoll instrumentIndex={index} defaultNodeSize={NOTESIZE[noteSize]} />
    </div>
  )
}

const noteOptions = Object.keys(NOTESIZE).map((notename) => {
  return {
    value: notename,
    label: notename + ' note',
  }
})

export default InstrumentRack
