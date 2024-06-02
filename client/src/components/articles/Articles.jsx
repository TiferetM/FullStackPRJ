import React, { useState } from 'react';
import Article from './Article.jsx';
import CreateArticle from './newArticle/CreateArticle.jsx';

const initialArticles = [
  { id: 1, title: 'Article 1', content: 'This is the content of article 1.' },
  { id: 2, title: 'Article 2', content: 'This is the content of article 2.' },
  { id: 3, title: 'Article 3', content: 'This is the content of article 3.' },
];

function Articles() {
  const [articles, setArticles] = useState(initialArticles);
  const [showForm, setShowForm] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: '', content: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({ ...newArticle, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const articleToAdd = {
      id: articles.length + 1,
      title: newArticle.title,
      content: newArticle.content,
    };
    setArticles([...articles, articleToAdd]);
    setShowForm(false);
    setNewArticle({ title: '', content: '' });
  };

  return (
    <div className="article-list">
      {articles.map(article => (
        <Article key={article.id} title={article.title} content={article.content} />
      ))}
      <button onClick={() => setShowForm(!showForm)}>Add Article</button>
      {showForm && (
        <div className="new-article-form">
          <h2>Add New Article</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={newArticle.title}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Content:
                <textarea
                  name="content"
                  value={newArticle.content}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <CreateArticle />
    </div>
  );
}

export default Articles;
