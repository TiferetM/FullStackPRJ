import React from 'react'
import { NavLink } from 'react-router-dom'
import "../generalComponents/generalCss/NavBar.css" 

function NavBar() {
  return (
    <>
    <div id="nav">D-home</div>
    <NavLink to="/home">Home</NavLink>
    <NavLink to="/about">About</NavLink>
    <NavLink to="/designs">Designs</NavLink>
    <NavLink to="/articles">Articles</NavLink>
    </>
  )
}

export default NavBar