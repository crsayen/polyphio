import './PianoRoll.css'
import React, { useState, useEffect } from 'react'
import Node from './Node'
import OSC from '../../OSC'
import useInterval from 'react-useinterval'

const MINNODEWIDTH = 30

export default function Row(props: any) {
  function getRelX(e: React.MouseEvent<HTMLDivElement, MouseEvent>): number {
    const currentTargetRect = e.currentTarget.getBoundingClientRect()
    const event_offsetX = e.pageX - currentTargetRect.left
    return event_offsetX
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setMouseDown(true)
    const relX = getRelX(e)
    setNodes([...nodes, { start: relX, width: MINNODEWIDTH }])
  }

  function handleMouseUp(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setMouseDown(false)
    const relX = getRelX(e)
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!mouseDown) return
    const relX = getRelX(e)
    let currNodeIdx = nodes.length - 1
    let currNode = nodes[currNodeIdx]
    setNodes([
      ...nodes.slice(0, currNodeIdx),
      {
        ...currNode,
        width: Math.max(MINNODEWIDTH, relX - currNode.start),
      },
    ])
  }

  const [tick, setTick] = useState<number>(0)

  function playSounds() {
    if (osc === null) {
      setOsc(new OSC(props.note))
    }
    nodes.forEach((node) => {
      if (node.start === tick) {
        console.log(props.note)
        //@ts-ignore
        osc.setHigh()
      } else if (node.start + node.width === tick) {
        //@ts-ignore
        osc.setLow()
      }
    })
    if (tick > 1080) {
      setTick(0)
    } else {
      setTick(tick + 1)
    }
  }

  const [osc, setOsc] = useState<OSC | null>(null)

  useInterval(playSounds, 10)

  const [nodes, setNodes] = useState<{ start: number; width: number }[]>([])
  const [mouseDown, setMouseDown] = useState<boolean>(false)
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={`Row ${props.sharp ? 'blackkey' : 'whitekey'}`}
    >
      {nodes.map((node) => (
        <Node
          key={node.start}
          pos={{
            marginLeft: `${node.start}px`,
            marginRight: `${-(node.start + node.width)}px`,
            width: `${node.width}px`,
          }}
        ></Node>
      ))}
    </div>
  )
}
