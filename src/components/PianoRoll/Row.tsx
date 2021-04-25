import './PianoRoll.css'
import * as types from '../../types'
import { DawStateContext } from '../../App'
import React, { useState, useContext } from 'react'
import Node from './Node'
import { NUM_STEPS } from '../../constants'

const MINIMUM_NODE_LEGTH = 8

const Row: React.FC<{
  note: string
  rowIndex: number
  sharp: boolean
  nodes: types.NoteNode[]
  defaultNodeSize: number
  width: number
  setNodes: (nodes: types.NoteNode[]) => void
}> = ({ rowIndex, defaultNodeSize, note, nodes, width, sharp, setNodes }) => {
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
    return Math.floor(val / defaultNodeSize) * defaultNodeSize
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

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const stepRelX = pixelValToStepVal(getRelX(e))
    const nRelX = snapToNodeGrid(stepRelX)
    if (overlapsNode({ points: [stepRelX] })) {
      // TODO: we clicked an existing node. We should be able to
      //       move it or change its size
      console.log('you clicked an existing node')
      return
    }
    if (overlapsNode({ points: [nRelX + 1, nRelX + defaultNodeSize] })) {
      // this node would bump into an existing node
      console.log('not enough room')
      return
    }
    setNodes([
      ...nodes,
      {
        start: nRelX,
        length: defaultNodeSize,
      },
    ])
  }

  const { dawState, dawDispatch } = useContext(DawStateContext)

  const handleResizeNode = (
    nodeIndex: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const node = nodes[nodeIndex]
    const snappedDelta = snapToGridFine(pixelValToStepVal(getRelX(e)))
    // make sure we don't shrink too much
    if (
      node.start + node.length + snappedDelta <
      node.start + MINIMUM_NODE_LEGTH
    )
      return
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

  const handleMoveNode = (
    nodeIndex: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const node = nodes[nodeIndex]
    const snappedDelta = snapToGridFine(pixelValToStepVal(getRelX(e)))
    // make sure we don't move off the grid
    if (node.start + snappedDelta < 0 || node.start + node.length > NUM_STEPS)
      return
    // check if we are bumping into any other nodes
    if (
      overlapsNode({
        exclude: [nodeIndex],
        points: [
          node.start + snappedDelta,
          node.start + node.length + snappedDelta,
        ],
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
      { ...node, start: node.start + snappedDelta },
      ...newNodes.slice(nodeIndex + 1),
    ])
  }

  function handleDoubleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // delete bot
  }

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
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
              handleResizeNode(i, e)
            }
            onMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              handleMoveNode(i, e)
            }
            onDelete={() => {
              setNodes([...nodes.slice(0, i), ...nodes.slice(i + 1)])
            }}
          ></Node>
        )
      })}
    </div>
  )
}

export default Row
