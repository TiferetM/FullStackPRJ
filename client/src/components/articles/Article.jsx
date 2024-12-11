import React, { useState} from 'react';
import "../css/Articles.css";
import { Link } from 'react-router-dom';
import ProfilePicture from '../user/ProfilePicture';
import TitleData from '../tools/TitleData';

function Article({ article, userIn }) {

  const text = article.body.split(' ').slice(0, 10).join(' ') + '...';

  return (
    <div className="article">
      <Link to={article._id}>
        <TitleData userIn={userIn} user={article.author} 
        title={article.title} following={article.following} stared={article.stared}/>
        <p>{text}</p>
      </Link>
    </div>
  );
}

export default Article;
