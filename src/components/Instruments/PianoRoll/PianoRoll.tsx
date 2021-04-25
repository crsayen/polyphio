import './PianoRoll.css'
import * as types from '../../../types'
import Row from './Row'
import { DawStateContext } from '../../../App'
import React, { useContext, useEffect, useRef, useState } from 'react'
import useInterval from 'react-useinterval'
import OSC from '../../../OSC'

const TICK_DUR = 10

const PianoRoll: React.FC<{
  //refs: React.RefObject<HTMLDivElement>
  instrumentIndex: number
  defaultNodeSize: number
}> = ({ defaultNodeSize, instrumentIndex }) => {
  const [oscs, setOscs] = useState<{ [note: string]: OSC }>({})
  const { dawState, dawDispatch } = useContext(DawStateContext)
  const [jobs, setJobs] = useState<Function[]>([])

  function setNoteNodes(note: string, nodes: types.NoteNode[]) {
    dawDispatch({ type: 'setNoteNodes', instrumentIndex, note, nodes })
  }

  function handleTick() {
    for (let [note, nodes] of Object.entries(
      dawState.instruments[instrumentIndex].nodes
    )) {
      let osc = oscs[note]
      for (let node of [...nodes]) {
        /* if (node.start === dawState.step) {
          osc.setHigh()
          let length = node.length
          setTimeout(() => osc.setLow(), length * TICK_DUR)
        } */
        if (
          dawState.step >= node.start &&
          //@ts-ignore
          dawState.step <= node.start + node.length
        ) {
          if (!osc.high) {
            osc.setHigh()
          }
        } else if (osc.high) {
          osc.setLow()
        }
      }
    }
    dawDispatch({ type: 'setStep', data: dawState.step + 1 })
  }

  useInterval(() => handleTick(), TICK_DUR)

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
      for (let note of Object.keys(
        dawState.instruments[instrumentIndex].nodes
      )) {
        setOscs((o) => {
          return { ...o, [note]: new OSC(note) }
        })
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [dawState.instruments, instrumentIndex])

  const nodes = dawState.instruments[instrumentIndex].nodes
  return (
    <div ref={pianoSizeRef}>
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
              rowIndex={i}
              width={pianoSize.width}
              nodes={nodes}
              defaultNodeSize={defaultNodeSize}
              sharp={note.includes('sh')}
              setNodes={(nodes: types.NoteNode[]) => setNoteNodes(note, nodes)}
            ></Row>
          ))}
      </div>
    </div>
  )
}

export default PianoRoll
