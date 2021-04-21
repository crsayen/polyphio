import './App.css'
import OSC from './OSC'
import React, { useState } from 'react'
import PianoRoll from './components/PianoRoll/PianoRoll'

const osc = new OSC()

function App() {
  const [started, setStarted] = useState<boolean>(false)

  function handleStart() {
    console.log('button pressed')
    osc.context.resume()
    setStarted(true)
  }

  return (
    <div className="App">
      {started ? (
        <>
          <header className="App-header">fuck ass</header>
          <PianoRoll></PianoRoll>
        </>
      ) : (
        <button onClick={() => handleStart()}>
          you need to interact with the page to make it go for some reason
        </button>
      )}
    </div>
  )
}

export default App
