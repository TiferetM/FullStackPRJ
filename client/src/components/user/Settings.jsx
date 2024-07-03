import React, { useEffect, useState } from 'react';
import ImageUpload from '../tools/ImageUpload';
import '../css/Settings.css'; // יבוא של קובץ ה-CSS
import ProfilePicture from './ProfilePicture';

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
      <ProfilePicture user={userIn} userIn={userIn} />
      <div className="user-info">
        <h1>{userIn}</h1>
        <p>{user.email}</p>
        <p>{user.role}</p>
      </div>
      <div className="upload-section">
        <ImageUpload type={"users"} url={`http://localhost:3305/${userIn}/avatar`}/>
      </div>
    </div>
  );
}

export default Settings;
