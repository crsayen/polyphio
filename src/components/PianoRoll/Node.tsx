import React, { useState } from 'react'

const style = {
  height: '100%',
  padding: '0px',
  backgroundColor: 'rgba(240, 163, 163, 0.8)',
  marginTop: '-1px',
  marginBottom: '1px',
  display: 'flex',
  flexDirection: 'row',
}

const Row: React.FC<{
  css: any
  onResize: any
  onDelete: any
  onMove: any
}> = ({ onDelete, css, onMove, onResize }) => {
  const [lastMoveX, setLastMoveX] = useState<number>(0)
  function handleMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault()
    const relX = getRelX(e)
    const ignore = Math.abs(relX - lastMoveX) > 30
    setLastMoveX(relX)
    if (!ignore) onMove(e)
  }

  function handleResize(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault()
    onResize(e)
  }

  return (
    <div className="node" style={{ ...style, ...css }}>
      <div
        className="nodehandle"
        draggable="true"
        onDrag={handleMove}
        onDoubleClick={onDelete}
      ></div>
      <div
        draggable="true"
        className="nodestretcher"
        onDrag={handleResize}
      ></div>
    </div>
  )
}

function getRelX(e: React.MouseEvent<HTMLDivElement, MouseEvent>): number {
  const currentTargetRect = e.currentTarget.getBoundingClientRect()
  const event_offsetX = e.pageX - currentTargetRect.left
  return event_offsetX
}

export default Row
