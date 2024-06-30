import React from 'react'
import ChangeSize from '../ChangeSize'
import '../css/sideNav.css'

function SizesSideNav({height, width, depth, setHeight, setWidth, setDepth, setCurrentComponent}) {
  return (
    <div className='sideNav'>
        <h1>Create a new design</h1>
        <h2>Change the size of the room</h2>
        <ChangeSize type="Height" size={height} setSize={setHeight} min={200} max={400}/>
        <ChangeSize type="Width" size={width} setSize={setWidth} min={200} max={400}/>
        <ChangeSize type="Depth" size={depth} setSize={setDepth} min={200} max={400}/>
        <button onClick={() => setCurrentComponent('products')}>Procuts</button>
      </div>
  )
}

export default SizesSideNav 