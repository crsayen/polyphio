import './App.css'
import * as types from './types'
import OSC from './OSC'
import { NOTES, NOTE_OBJ, NUM_STEPS } from './constants'
import React, { useState, useReducer } from 'react'
import useInterval from 'react-useinterval'
import InstrumentRack from './components/PianoRoll/InstrumentRack'

// TODO: this should be something we can load from server
const initialState: types.DawState = {
  instruments: [
    {
      type: 'synth',
      nodes: NOTE_OBJ,
    },
  ],
  playing: false,
  step: 0,
  bpm: 120,
}

function dawStateReducer(state: types.DawState, action: types.DawAction) {
  switch (action.type) {
    case 'addInstrument':
      return { ...state, instruments: [...state.instruments, action.data] }
    case 'delInstrument':
      return {
        ...state,
        instruments: [
          ...state.instruments.slice(0, action.data),
          ...state.instruments.slice(action.data + 1),
        ],
      }
    case 'setPlaying':
      return { ...state, playing: action.data }
    case 'setStep':
      return { ...state, step: action.data % (NUM_STEPS + 1) }
    case 'setBpm':
      return { ...state, bpm: action.data }
    case 'setNoteNodes':
      const instr = state.instruments
      const idx = action.instrumentIndex
      const nodes = { ...instr[idx].nodes, [action.note]: action.nodes }
      return {
        ...state,
        instruments: [
          ...instr.slice(0, idx - 1),
          { ...instr[idx], nodes },
          ...instr.slice(idx + 1),
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
            <header className="App-header">fuck ass</header>
            {state.instruments.map(
              (instrument: types.InstrumentState, index: number) => {
                return (
                  <InstrumentRack
                    key={index}
                    instrumentType={instrument.type}
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
