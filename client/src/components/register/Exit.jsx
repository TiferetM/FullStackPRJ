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
    <div style={{
      border: '2px solid #333', 
      borderRadius: '10px', 
      padding: '20px', 
      margin: '20%', 
      backgroundColor: '#f9f9f9', 
      textAlign: 'center', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ margin: '10px 0' }}>Thank you for visiting our website</h2>
      <h3 style={{ margin: '10px 0' }}>Are you sure you want to leave us?</h3>
      <button onClick={handleExit} style={{
        margin: '5px', 
        padding: '10px 20px', 
        border:'1', 
        backgroundColor: '#754c44', 
        color: 'white', 
        borderRadius: '5px', 
        cursor: 'pointer'
      }}>Yes</button>
      <button onClick={() => window.history.back()} style={{
        margin: '5px', 
        padding: '10px 20px', 
        border: 'none', 
        backgroundColor: '#754c44', 
        color: 'white', 
        borderRadius: '5px', 
        cursor: 'pointer'
      }}>No</button>
    </div>
  )
}

export default Exit