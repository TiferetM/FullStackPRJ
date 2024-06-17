import React from 'react'
import { useNavigate } from 'react-router-dom'

function Exit({setUserIn}) {
  const navigate = useNavigate();
  const handleExit = async () => {
    sessionStorage.setItem('currentUser', JSON.stringify("guest"));
    await setUserIn("guest");
    navigate("/guest/home");
  }
  return (
    <div>
      <h2>Thank you for visiting our site</h2>
      <h1>Are you sure you want to leave us?</h1>
      <button onClick={handleExit}>Yes</button>
      <button onClick={window.history.back}>No</button>
    </div>
  )
}

export default Exit