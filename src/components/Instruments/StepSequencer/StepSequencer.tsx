import './StepSequencer.css'
import * as types from '../../../types'
import { DawStateContext } from '../../../App'
import React, { useContext, useState } from 'react'

const StepSequencer: React.FC<{
  instrumentIndex: number
}> = ({ instrumentIndex }) => {
  const { dawState, dawDispatch } = useContext(DawStateContext)
  const [buttonRows, setButtonRows] = useState<boolean[][]>(BUTTON_ROWS)

  function handleButtonClick(rowN: number, buttonN: number) {
    console.log('clicked button')
    const row = buttonRows[rowN]
    const currentButtonState = row[buttonN]
    setButtonRows([
      ...buttonRows.slice(0, rowN),
      [
        ...row.slice(0, buttonN),
        !currentButtonState,
        ...row.slice(buttonN + 1),
      ],
      ...buttonRows.slice(rowN + 1),
    ])
  }

  return (
    <div className="sequencer" onClick={() => console.log('head')}>
      <div className="step-grid-container">
        {buttonRows.map((buttons, rownumber) => {
          return (
            <div key={rownumber} className="step-row">
              {buttons.map((button, i) => {
                return (
                  <div
                    key={i}
                    className={`step-button ${
                      buttonRows[rownumber][i] ? 'on' : ''
                    }`}
                    onClick={() => {
                      console.log('clicky')
                      handleButtonClick(rownumber, i)
                    }}
                  ></div>
                )
              })}
            </div>
          )
        })}
        <div className="grid">
          {BARS.map((qnotes, bar) => {
            return (
              <div key={bar} className="bar">
                {qnotes.map((buttons, qnote) => {
                  return <div key={qnote} className="quarter-note"></div>
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function chunk<Type>(arr: Type[], chunkSize: number): Type[][] {
  const length = arr.length
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / chunkSize))

  while (index < length) {
    result[resIndex++] = arr.slice(index, (index += chunkSize))
  }
  return result
}

const ROW_NAMES = ['hat', 'cym', 'snr', 'kck']
const NUM_BARS_PER_ROW = 4
const NUM_NOTES_PER_BAR = 4
const NUM_BUTTONS_PER_NOTE = 4
const NUM_BUTTONS_PER_ROW_PER_BAR = NUM_BUTTONS_PER_NOTE * NUM_NOTES_PER_BAR
const NUM_STEP_BUTTONS_PER_ROW = NUM_BARS_PER_ROW * NUM_BUTTONS_PER_ROW_PER_BAR
const BUTTON_STATES = Array(NUM_STEP_BUTTONS_PER_ROW).fill(false)
const QUARNOTES = chunk(BUTTON_STATES, NUM_BUTTONS_PER_NOTE)
const BARS = chunk(QUARNOTES, NUM_NOTES_PER_BAR)
const BUTTON_ROWS = Array(ROW_NAMES.length)
  .fill(1)
  .map((_) => BUTTON_STATES)
export default StepSequencer
