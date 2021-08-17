import './App.css'
import * as types from './types'
import OSC from './OSC'
import { NOTE_OBJ, NUM_STEPS } from './constants'
import React, { useState, useReducer } from 'react'
import InstrumentRack from './components/Instruments/InstrumentRack'

// TODO: this should be something we can load from server
const initialState: types.DawState = {
  synths: [
    {
      nodes: NOTE_OBJ,
    },
  ],
  sequencers: [
    {
      nodes: [],
    },
  ],
  playing: false,
  step: 0,
  bpm: 120,
}

function dawStateReducer(state: types.DawState, action: types.DawAction) {
  switch (action.type) {
    case 'addSynth':
      return { ...state, synths: [...state.synths, action.synth] }
    case 'addSequencer':
      return { ...state, sequencers: [...state.sequencers, action.sequencer] }
    case 'delInstrument':
      return {
        ...state,
        [action.instrumentType]: [
          ...state[action.instrumentType].slice(0, action.instrumentIndex),
          ...state[action.instrumentType].slice(action.instrumentIndex + 1),
        ],
      }
    case 'setPlaying':
      return { ...state, playing: action.playing }
    case 'setStep':
      return { ...state, step: action.step % (NUM_STEPS + 1) }
    case 'setBpm':
      return { ...state, bpm: action.bpm }
    case 'setSequencerNoteNodes':
      const seq = state.sequencers
      const seqidx = action.index
      const seqnodes = action.nodes
      return {
        ...state,
        sequencers: [
          ...seq.slice(seqidx - 1),
          { ...seq[seqidx], seqnodes },
          ...seq.slice(seqidx + 1),
        ],
      }
    case 'setSynthNoteNodes':
      const synth = state.synths
      const synthidx = action.index
      const synthnodes = {
        ...synth[synthidx].nodes,
        [action.note]: action.nodes,
      }
      return {
        ...state,
        instruments: [
          ...synth.slice(0, synthidx - 1),
          { ...synth[synthidx], synthnodes },
          ...synth.slice(synthidx + 1),
        ],
      }
    default:
      throw new Error()
  }
}

export const DawStateContext = React.createContext<types.DawStateContextType>(
  //@ts-ignore
  null
)

function App() {
  const [state, dispatch] = useReducer(dawStateReducer, initialState)
  const [started, setStarted] = useState<boolean>(false)

  function handleStart() {
    OSC.context.resume()
    setStarted(true)
  }

  return (
    <DawStateContext.Provider
      value={{ dawState: state, dawDispatch: dispatch }}
    >
      <div className="App">
        {started ? (
          <>
            <header onClick={() => console.log('head')} className="App-header">
              polyph.io
            </header>
            {state.synths.map((instrument: types.SynthState, index: number) => {
              return (
                <InstrumentRack
                  key={'syn' + index}
                  instrumentType={'synth'}
                  index={index}
                />
              )
            })}
            {state.sequencers.map(
              (instrument: types.SequencerState, index: number) => {
                return (
                  <InstrumentRack
                    key={'seq' + index}
                    instrumentType={'sequencer'}
                    index={index}
                  />
                )
              }
            )}
            <div className="bottom"></div>
          </>
        ) : (
          <button onClick={() => handleStart()}>
            you need to interact with the page to make it go for some reason
          </button>
        )}
      </div>
    </DawStateContext.Provider>
  )
}

export default App
