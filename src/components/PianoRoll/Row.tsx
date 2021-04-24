import './PianoRoll.css'
import * as types from '../../types'
import { DawStateContext } from '../../App'
import React, { useState, useContext } from 'react'
import Node from './Node'
import { NUM_STEPS } from '../../constants'

const DEFAULT_NODE_LEGTH = 72

const Row: React.FC<{
  note: string
  sharp: boolean
  nodes: types.NoteNode[]
  width: number
  setNodes: (nodes: types.NoteNode[]) => void
}> = ({ note, nodes, width, sharp, setNodes }) => {
  function getRelX(e: React.MouseEvent<HTMLDivElement, MouseEvent>): number {
    const currentTargetRect = e.currentTarget.getBoundingClientRect()
    const event_offsetX = e.pageX - currentTargetRect.left
    return event_offsetX
  }

  function normalizeStart(val: number): number {
    return Math.floor(val / DEFAULT_NODE_LEGTH) * DEFAULT_NODE_LEGTH
  }

  function stepValToPixelVal(val: number): number {
    return Math.ceil((val / NUM_STEPS) * width)
  }

  function pixelValToStepVal(val: number): number {
    return Math.floor((val / width) * NUM_STEPS)
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const pixelRelX = getRelX(e)
    const stepRelX = pixelValToStepVal(pixelRelX)
    const nRelX = normalizeStart(stepRelX)
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (Math.abs(nRelX - node.start) < 5) {
        // TODO: we clicked an existing node. We should be able to
        //       move it or change its size
        return
      }
      if (nRelX < node.start && nRelX + DEFAULT_NODE_LEGTH > node.start) {
        // this node would bump into an existing node
        return
      }
    }
    setNodes([
      ...nodes,
      {
        start: nRelX,
        length: DEFAULT_NODE_LEGTH,
      },
    ])
  }

  const { dawState, dawDispatch } = useContext(DawStateContext)

  return (
    <div
      onMouseDown={handleMouseDown}
      //onMouseUp={handleMouseUp}
      //onMouseMove={handleMouseMove}
      //onMouseLeave={handleMouseLeave}
      className={`Row ${sharp ? 'blackkey' : 'whitekey'}`}
    >
      {nodes.map((node, i) => {
        const start = stepValToPixelVal(node.start)
        const width = stepValToPixelVal(node.length)
        return (
          <Node
            key={i}
            pos={{
              marginLeft: `${start}px`,
              marginRight: `${-(start + width)}px`,
              width: `${width}px`,
            }}
          ></Node>
        )
      })}
    </div>
  )
}

export default Row
