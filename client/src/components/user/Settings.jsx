// import React, { useEffect, useState } from 'react'
// import ImageUpload from '../tools/ImageUpload';
// import '../css/Settings.css'

// function Settings({userIn}) {
//   const [user, setUser] = useState({});
//   useEffect(() => {
//     console.log(userIn);
//     fetch(`http://localhost:3305/${userIn}`, {
//       headers: {
//         'Authorization': sessionStorage.getItem('token'),
//       }
//     }).then(response => {
//       return response.json();
//     }).then(data => {
//       setUser(data);
//     }).catch(error => {
//       console.error('Error:', error);
//     });
//   }, []);
//   return (
//     <div>
//       <img src={user.profilePic} alt="profile pic" />
//       <h1>{userIn}</h1>
//       <p>{user.email}</p>
//       <p>{user.role}</p>
//       <ImageUpload />

//     </div>
//   )
// }

// export default Settings
// Settings.jsx
import React, { useEffect, useState } from 'react';
import ImageUpload from '../tools/ImageUpload';
import '../css/Settings.css'; // יבוא של קובץ ה-CSS

function Settings({ userIn }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(userIn);
    fetch(`http://localhost:3305/${userIn}`, {
      headers: {
        'Authorization': sessionStorage.getItem('token'),
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      setUser(data);
    }).catch(error => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <div className="settings-container">
      <img src={user.profilePic} alt="profile pic" className="profile-pic" />
      <div className="user-info">
        <h1>{userIn}</h1>
        <p>{user.email}</p>
        <p>{user.role}</p>
      </div>
      <div className="upload-section">
        <ImageUpload />
      </div>
    </div>
  );
}

export default Settings;
