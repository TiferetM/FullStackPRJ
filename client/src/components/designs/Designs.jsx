import React from 'react'
import { Link } from 'react-router-dom'

function Designs({ userIn }) {
  return (
    <>
      <div>Designs</div>
      <Link to={`new`}>+</Link>
    </>
  )
}

export default Designs