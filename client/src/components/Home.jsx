import React from 'react'
import NavBar from './NavBar'
import logo from '../images/logo.png'


function home() {
  return (
    <>
        <div>home</div>
        {/* <img src={"../images/logo.png"} alt="Logo" /> this kind of image that will work */}
        <img src={logo} alt="Logo" />
    </>
  )
}

export default home