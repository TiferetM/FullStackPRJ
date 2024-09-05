import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Home.css'
import ProfilePicture from './ProfilePicture';

function Home({ userIn }) {
  const username = useParams().name_u ?? userIn;
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(`http://localhost:3305/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token'),
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      setUser(data);
    }).catch(error => {
      console.log(error.message);
    });
  }, []);

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
           {userIn !== user.username && <button onClick={handleFollow}>Follow</button>}
          </>)
        }
      </div>
    </div>
  );
}

export default Home;
