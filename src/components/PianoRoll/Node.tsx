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
}> = ({ css, onResize }) => {
  function handleResize(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    onResize(e)
  }

  return (
    <div className="node" style={{ ...style, ...css }}>
      <div className="nodehandle"></div>
      <div
        draggable="true"
        className="nodestretcher"
        onClick={() => console.log('clicked')}
        onDrag={handleResize}
      ></div>
    </div>
  )
}

export default Row

/* const [originalEndX, setOriginalEndX] = useState<number>(0)
  const [resizing, setResizing] = useState<boolean>(false)

  function handleResizeMouseDown(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    setOriginalEndX(css.width + css.marginLeft)
    setResizing(true)
  }
  function handleResizeMouseMove(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (!resizing) return
    const relX = getRelX(e)
    onResize(relX - originalEndX)
  } */
