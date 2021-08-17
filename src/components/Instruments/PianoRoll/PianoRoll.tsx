import './PianoRoll.css'
import * as types from '../../../types'
import Row from './Row'
import { DawStateContext } from '../../../App'
import React, { useContext, useEffect, useRef, useState } from 'react'
import useInterval from 'react-useinterval'
import OSC from '../../../OSC'
import Select from 'react-select'
import { NOTESIZE } from '../../../constants'

const TICK_DUR = 10

const PianoRoll: React.FC<{
  //refs: React.RefObject<HTMLDivElement>
  instrumentIndex: number
}> = ({ instrumentIndex }) => {
  const [oscs, setOscs] = useState<{ [note: string]: OSC }>({})
  const { dawState, dawDispatch } = useContext(DawStateContext)
  const [jobs, setJobs] = useState<Function[]>([])
  const [noteSize, setNoteSize] = useState<string>('quarter')

  function setNoteNodes(note: string, nodes: types.SynthNoteNode[]) {
    dawDispatch({
      type: 'setSynthNoteNodes',
      index: instrumentIndex,
      note,
      nodes,
    })
  }

  function handleTick() {
    for (let [note, nodes] of Object.entries(
      dawState.synths[instrumentIndex].nodes
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
    dawDispatch({ type: 'setStep', step: dawState.step + 1 })
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
      for (let note of Object.keys(dawState.synths[instrumentIndex].nodes)) {
        setOscs((o) => {
          return { ...o, [note]: new OSC(note) }
        })
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [dawState.synths, instrumentIndex])

  const nodes = dawState.synths[instrumentIndex].nodes
  return (
    <>
      <Select
        defaultValue={{ value: 'quarter', label: 'quarter note' }}
        options={noteOptions}
        onChange={(n) => setNoteSize(n?.value ?? '')}
      />
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
                defaultNodeSize={NOTESIZE[noteSize]}
                sharp={note.includes('sh')}
                setNodes={(nodes: types.SynthNoteNode[]) =>
                  setNoteNodes(note, nodes)
                }
              ></Row>
            ))}
        </div>
      </div>
    </>
  )
}

const noteOptions = Object.keys(NOTESIZE).map((notename) => {
  return {
    value: notename,
    label: notename + ' note',
  }
})

export default PianoRoll
