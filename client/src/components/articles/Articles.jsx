import React, { useEffect, useState } from 'react';
import Article from './Article.jsx';
import CreateArticle from './newArticle/CreateArticle.jsx';

function Articles({userIn}) {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3305/${userIn}/articles`, {
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
    <div className="article-list">
      {articles.map(article => (
        <Article key={article.id} title={article.title} content={article.content} />
      ))}
      {!showForm && <button onClick={() => setShowForm(!showForm)}>Add Article</button>}
      {showForm && <CreateArticle userIn={userIn} setArticles={setArticles} setShowForm={setShowForm}/>}
    </div>
  );
}

export default Articles;