import React from 'react'

function ChangeSize({type, size, setSize, min=100, max=1000}) {

  return (
    <div>
        <p>{type}</p>
        <input type="range" min={min} max={max} value={size} onChange={(e) => setSize(e.target.value)} />
    </div>
  )
}

export default ChangeSize