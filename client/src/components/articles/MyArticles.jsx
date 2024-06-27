import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Article from './Article.jsx';
import CreateArticle from './newArticle/CreateArticle.jsx';

function MyArticles({ userIn }) {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const location = useLocation();

  // Update query to always fetch articles by the current user
  useEffect(() => {
    setQuery(`/?author=${userIn}`);
  }, [location.pathname, userIn]);

  // Fetch articles based on the updated query
  useEffect(() => {
    fetch(`http://localhost:3305/${userIn}/articles${query}`, {
      headers: {
        'Authorization': sessionStorage.getItem('token'),
      }
    }).then(response => response.json())
      .then(data => {
        console.log('Articles fetched successfully:', data);
        setArticles(data);
      }).catch(error => {
        console.error('Error:', error);
      });
  }, [query, userIn]);

  return (
    <div className="my article-list">
      {articles.map(article => (
        <Article key={article.id} article={article} />
      ))}
      {!showForm && <button onClick={() => setShowForm(!showForm)}>Add Article</button>}
      {showForm && <CreateArticle userIn={userIn} setArticles={setArticles} setShowForm={setShowForm} />}
    </div>
  );
}

export default MyArticles;
