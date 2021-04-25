import React, { useState } from 'react'
import { getRelXY } from '../../helpers'

const style = {
  height: '20px',
  padding: '0px',
  backgroundColor: 'rgba(240, 163, 163, 0.8)',
  outline: '1px solid rgba(0,0,0,0.5)',
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
    const [x] = getRelXY(e)
    const ignore = Math.abs(x - lastMoveX) > 30
    setLastMoveX(x)
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
        onDragEnd={handleMove}
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

export default Row
