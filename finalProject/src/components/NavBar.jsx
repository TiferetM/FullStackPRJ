import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <>
    <div>D-home</div>
    <NavLink to="/home">Home</NavLink>
    <NavLink to="/about">About</NavLink>
    <NavLink to="/designs">Designs</NavLink>
    <NavLink to="/articles">Articles</NavLink>
    </>
  )
}

export default NavBar