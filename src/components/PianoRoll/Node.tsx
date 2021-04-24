import React from 'react'

const style = {
  height: '100%',
  padding: '0px',
  backgroundColor: 'rgba(240, 163, 163, 0.8)',
  marginTop: '-1px',
  marginBottom: '1px',
}

export default function Row(props: any) {
  return <div className="node" style={{ ...style, ...props.pos }}></div>
}
