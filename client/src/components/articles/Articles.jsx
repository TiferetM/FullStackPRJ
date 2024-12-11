import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Article from './Article.jsx';
import './css/Articles.css';
import CreateArticle from './newArticle/CreateArticle.jsx';

function Articles({ userIn }) {
  const [articles, setArticles] = useState([]);
  const location = useLocation();

  useEffect(() => {
    let url = `http://localhost:3305/${userIn}/articles`;
    if(location.pathname.includes('/me')) {
      url = `http://localhost:3305/${userIn}/articles?auther=${userIn}`;
    }
    if(location.pathname.includes('/friends')) {
      url = `http://localhost:3305/${userIn}/articles?friends=true`;
    }
    if(location.pathname.includes('/stared')) {
      url = `http://localhost:3305/${userIn}/articles?stared=true`;
    }
    fetch(url, {
      headers: {
        'Authorization': sessionStorage.getItem('token'),
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log('Articles fetched successfully:', data);
      setArticles(data);
    }).catch(error => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <>
      <div className="article-list">
        {articles.map(article => (
          <Article key={article.id} article={article} userIn={userIn} />
        ))}
      </div>
      <Link to='new'>Add Article</Link>
    </>
  );
}


export default Articles;
