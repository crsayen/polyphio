import './PianoRoll.css'
import * as types from '../../types'
import { DawStateContext } from '../../App'
import React, { useState, useContext } from 'react'
import Node from './Node'
import { NUM_STEPS } from '../../constants'

const DEFAULT_NODE_LEGTH = 72
const MINIMUM_NODE_LEGTH = 8

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

  function getContainedNode(options: {
    start: number
    end: number
    exclude?: number[]
  }): number | null {
    const { exclude, start, end } = options
    for (let i = 0; i < nodes.length; i++) {
      if (exclude?.includes(i)) continue
      let node = nodes[i]
      if (start <= node.start && end >= node.start + node.length) return i
    }
    return null
  }

  /**points should be in terms of steps, not pixels */
  function overlapsNode(options: {
    points: number[]
    exclude?: number[]
  }): boolean {
    const { exclude, points } = options
    for (let i = 0; i < nodes.length; i++) {
      if (exclude?.includes(i)) continue
      let node = nodes[i]
      for (let x of points) {
        if (x > node.start && x < node.start + node.length) return true
      }
    }
    return false
  }

  function snapToNodeGrid(val: number): number {
    return Math.floor(val / DEFAULT_NODE_LEGTH) * DEFAULT_NODE_LEGTH
  }

  function snapToGridFine(val: number): number {
    return Math.round(val / MINIMUM_NODE_LEGTH) * MINIMUM_NODE_LEGTH
  }

  function stepValToPixelVal(val: number): number {
    return Math.ceil((val / NUM_STEPS) * width)
  }

  function pixelValToStepVal(val: number): number {
    return Math.floor((val / width) * NUM_STEPS)
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const stepRelX = pixelValToStepVal(getRelX(e))
    const nRelX = snapToNodeGrid(stepRelX)
    if (overlapsNode({ points: [stepRelX] })) {
      // TODO: we clicked an existing node. We should be able to
      //       move it or change its size
      console.log('you clicked an existing node')
      return
    }
    if (overlapsNode({ points: [nRelX, nRelX + DEFAULT_NODE_LEGTH] })) {
      // this node would bump into an existing node
      console.log('not enough room')
      return
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

  const handleResize = (
    nodeIndex: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const node = nodes[nodeIndex]
    const snappedDelta = snapToGridFine(pixelValToStepVal(getRelX(e)))
    if (node.start + snappedDelta < node.start + MINIMUM_NODE_LEGTH) return
    // check if we are bumping into any other nodes
    if (
      overlapsNode({
        exclude: [nodeIndex],
        points: [node.start + node.length + snappedDelta],
      })
    )
      return
    // check if we are going to eat another node
    const eatenNode = getContainedNode({
      exclude: [nodeIndex],
      start: node.start,
      end: node.start + node.length,
    })
    let newNodes =
      eatenNode === null
        ? nodes
        : [...nodes.slice(0, eatenNode - 1), ...nodes.slice(eatenNode + 1)]
    setNodes([
      ...newNodes.slice(0, nodeIndex),
      { ...node, length: node.length + snappedDelta },
      ...newNodes.slice(nodeIndex + 1),
    ])
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`Row ${sharp ? 'blackkey' : 'whitekey'}`}
    >
      {nodes.map((node, i) => {
        const start = stepValToPixelVal(node.start)
        const width = stepValToPixelVal(node.length)
        return (
          <Node
            key={i}
            css={{
              marginLeft: `${start}px`,
              marginRight: `${-(start + width)}px`,
              width: `${width}px`,
            }}
            onResize={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              handleResize(i, e)
            }
          ></Node>
        )
      })}
    </div>
  )
}

export default Row
