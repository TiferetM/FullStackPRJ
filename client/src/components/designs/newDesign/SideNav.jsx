import React from 'react'
import ChangeSize from './ChangeSize'
import './css/sideNav.css'
function SideNav({height, width, depth, setHeight, setWidth, setDepth}) {
  return (
    <nav className='sideNav'>
        <h1>Create a new design</h1>
        <h2>Change the size of the room</h2>
        <ChangeSize type="Height" size={height} setSize={setHeight} min={200} max={400}/>
        <ChangeSize type="Width" size={width} setSize={setWidth} />
        <ChangeSize type="Depth" size={depth} setSize={setDepth} />
      </nav>
  )
}

export default SideNav