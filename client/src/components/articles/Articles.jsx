import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Article from './Article.jsx';
import './css/Articles.css';
import CreateArticle from './newArticle/CreateArticle.jsx';

function Articles({ userIn }) {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/me"))
      setQuery(`/?author=${userIn}`);
    else if (location.pathname.includes("/friends"))
      setQuery(`/?friends=true`);
    else if (location.pathname.includes("/stared"))
      setQuery(`/?stared=true`);
    else
      setQuery('');
    console.log("query", query);
  }, [location.pathname]);

  useEffect(() => {
    fetch(`http://localhost:3305/${userIn}/articles${query}`, {
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
  }, [query]);

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
