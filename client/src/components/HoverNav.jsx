import React from 'react'
import { NavLink } from 'react-router-dom'

function HoverNav({coordination, links}) {
  console.log(links)
  return (
    <nav className='hoverNav' style={{ top: `${coordination.y}px`, left: `${coordination.x}px` }}>
      <ul>
        {Object.entries(links).map(([key, value], i) => (
          <li key={i}>
            <NavLink to={value}>{key}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default HoverNav