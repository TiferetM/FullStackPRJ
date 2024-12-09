import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../css/Home.css'
import ProfilePicture from './ProfilePicture';

function Home({ userIn }) {
  const username = useParams().name_u ?? userIn;
  const [user, setUser] = useState();
  const location = useLocation();

  useEffect(() => {
    fetch(`http://localhost:3305/${userIn}/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token'),
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      setUser(data);
      console.log(data.relationship);
    }).catch(error => {
      console.log(error.message);
    });
  }, [location.pathname]);

  const handleFollow = () => {
    fetch(`http://localhost:3305/${userIn}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token'),
      },
      body: JSON.stringify({ username: userIn, friend: user.username})
    }).then(response => {
      return response.json();
    } ).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error.message);
    });
  }


  return (
    <div className="home-container">
      <div className="testimonials">
        {user &&
          (<>
            <ProfilePicture user={user.username} />
            <h1>{user.username}</h1>
            <h2>{user.email}</h2>
           {user.relationship == "none" || user.relationship == "followed" && <button onClick={handleFollow}>Follow</button>}
          </>)
        }
      </div>
    </div>
  );
}

export default Home;
