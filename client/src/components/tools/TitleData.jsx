import React from 'react'
import ProfilePicture from '../user/ProfilePicture'
import './css/titleData.css'

function TitleData({userIn, user, title, following, stared}) {
  return (
    <div className='tiltleData'>
      <ProfilePicture userIn={userIn} user={user}/>
      <h1>{title}</h1>
      {following && <h2>Following</h2>}
      {stared ? <i class="fa-solid fa-star"></i> : <i class="fa-regular fa-star"></i>}
    </div>
  )
}

export default TitleData