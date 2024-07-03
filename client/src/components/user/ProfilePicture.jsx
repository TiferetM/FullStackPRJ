import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './css/profilePicture.css'

function ProfilePicture({user, userIn, update=null}) {
    const [imgUrl, setImgUrl] = useState('');
    
    useEffect(() => {
        fetch(`http://localhost:3305/${user}/avatar/${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token'),
            }
        }).then(response => response.blob())
        .then(blob => {
            const imgUrl = URL.createObjectURL(blob);
            setImgUrl(imgUrl);
        }).catch(error => {
            console.error('Error:', error);
        });
    }, [userIn, user, update]);

  return (
    <Link to={`/${userIn}/users/${user}`} className='profilePicture'>
        <img src={imgUrl} alt={user + "profile"} />
    </Link>
  )
}

export default ProfilePicture