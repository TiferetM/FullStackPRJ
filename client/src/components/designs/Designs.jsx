import React from 'react'
import { Link } from 'react-router-dom'

function Designs({ userIn }) {
  return (
    <>
      <div>Designs</div>
      <Link to={`${userIn}/designs/new`}>Create Design</Link>
    </>
  )
}

export default Designs