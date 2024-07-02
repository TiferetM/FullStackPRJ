import React, { useState} from 'react';
import "../css/Articles.css";
import { Link } from 'react-router-dom';

function Article({ article, userIn }) {

  const text = article.body.split(' ').slice(0, 10).join(' ') + '...';

  return (
    <div className="article">
      <Link to={article._id}>
        <Link to={`/${userIn}/users/${article.author}`} ><img src={article.ppic} alt={article.author} /></Link>
        <h2>{article.title}</h2>
        <p>{text}</p>
      </Link>
    </div>
  );
}

export default Article;
