import './PianoRoll.css'
import * as types from '../../types'
import Row from './Row'
import { DawStateContext } from '../../App'
import React, { useContext } from 'react'

const PianoRoll: React.FC<{
  //refs: React.RefObject<HTMLDivElement>
  width: number
  instrumentIndex: number
  setNoteNodes: (note: string, nodes: types.NoteNode[]) => void
}> = ({ setNoteNodes, width, instrumentIndex }) => {
  const { dawState, dawDispatch } = useContext(DawStateContext)

  const nodes = dawState.instruments[instrumentIndex].nodes
  return (
    <>
      <div className="grid">
        <div className="gridline bold"></div>
        <div className="gridline"></div>
        <div className="gridline"></div>
        <div className="gridline"></div>
        <div className="gridline bold"></div>
        <div className="gridline"></div>
        <div className="gridline"></div>
        <div className="gridline"></div>
        <div className="gridline bold"></div>
        <div className="gridline"></div>
        <div className="gridline"></div>
        <div className="gridline"></div>
        <div className="gridline bold"></div>
        <div className="gridline"></div>
        <div className="gridline"></div>
        <div className="gridline"></div>
      </div>
      <div id="PianoRoll">
        {Object.entries(nodes)
          .reverse()
          .map(([note, nodes], i) => (
            <Row
              key={i}
              note={note}
              width={width}
              nodes={nodes}
              sharp={note.includes('sh')}
              setNodes={(nodes: types.NoteNode[]) => setNoteNodes(note, nodes)}
            ></Row>
          ))}
      </div>
    </>
  )
}

export default PianoRoll
