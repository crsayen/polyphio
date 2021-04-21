import './PianoRoll.css'
import Row from './Row'
import React from 'react'
const notenames = [4, 5, 6]
  .map((n) =>
    ['C', 'Csh', 'D', 'Dsh', 'E', 'F', 'Fsh', 'G', 'Gsh', 'A', 'Ash', 'B']
      .map((d) => `${d}${n}`)
      .join(',')
  )
  .join(',')
  .split(',')
  .reverse()

function PianoRoll(props: any) {
  return (
    <div id="PianoRoll">
      {notenames.map((notename: string) => (
        <Row key={notename} note={notename} sharp={notename.includes('sh')}>
          <p>{notename}</p>
        </Row>
      ))}
    </div>
  )
}

export default PianoRoll
