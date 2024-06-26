import React, { useEffect, useState } from 'react'

function Settings({userIn}) {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3305/${userIn}`, {
      headers: {
        'Authorization': sessionStorage.getItem('token'),
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log('Settings fetched successfully:', data);
      setUser(data);
    }).catch(error => {
      console.error('Error:', error);
    });
  }, []);
  return (
    <div>
      <h1>{userIn}</h1>
      <p>{user.email}</p>
      <p>{user.role}</p>

    </div>
  )
}

export default Settings