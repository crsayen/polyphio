import React from 'react'

const style = {
  height: '100%',
  padding: '0px',
  backgroundColor: 'red',
}

export default function Row(props: any) {
  return <div className="node" style={{ ...style, ...props.pos }}></div>
}
