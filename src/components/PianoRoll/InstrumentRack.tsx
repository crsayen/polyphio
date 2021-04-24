import './PianoRoll.css'
import * as types from '../../types'
import { DawStateContext } from '../../App'
import React, { useContext, useRef, useState, useEffect } from 'react'
import useInterval from 'react-useinterval'
import PianoRoll from './PianoRoll'
import OSC from '../../OSC'

const InstrumentRack: React.FC<{ instrumentType: string; index: number }> = ({
  instrumentType,
  index,
}) => {
  const { dawState, dawDispatch } = useContext(DawStateContext)
  const [oscs, setOscs] = useState<{ [note: string]: OSC }>({})

  function handleTick() {
    for (let [note, nodes] of Object.entries(
      dawState.instruments[index].nodes
    )) {
      for (let node of nodes) {
        if (node.start === dawState.step) oscs[note].setHigh()
        else if (node.start + node.length === dawState.step) oscs[note].setLow()
      }
    }
    dawDispatch({ type: 'setStep', data: dawState.step + 1 })
  }

  useInterval(() => handleTick(), 10)

  function setNoteNodes(note: string, nodes: types.NoteNode[]) {
    dawDispatch({ type: 'setNoteNodes', instrumentIndex: index, note, nodes })
  }

  const pianoSizeRef = useRef<HTMLDivElement>(null)
  const [pianoSize, pianoSizeSet] = useState<{ width: number; height: number }>(
    {
      width: 10,
      height: 10,
    }
  )

  useEffect(() => {
    function handleResize() {
      pianoSizeSet({
        width: pianoSizeRef.current?.getBoundingClientRect().width ?? 10,
        height: pianoSizeRef.current?.getBoundingClientRect().height ?? 10,
      })
      for (let note of Object.keys(dawState.instruments[index].nodes)) {
        setOscs((o) => {
          return { ...o, [note]: new OSC(note) }
        })
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  // TODO: instrument panel
  // TODO: 'delete' button
  return (
    <div ref={pianoSizeRef}>
      <PianoRoll
        width={pianoSize.width}
        instrumentIndex={index}
        setNoteNodes={setNoteNodes}
      />
    </div>
  )
}

export default InstrumentRack
