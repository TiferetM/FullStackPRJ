import React from 'react'
import { useState } from 'react'


function CreateArticle({userIn, setArticles, setShowForm}) {
  
  const [newArticle, setNewArticle] = useState({ title: '', content: '' });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({ ...newArticle, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3305/${userIn}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token'),
      },
      body: JSON.stringify(newArticle)
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log('Article added successfully:', data);
      setArticles(last => [...last, { id: data.id, ...newArticle }]);
      setShowForm(false);
      setNewArticle({ title: '', content: '' });
    }).catch(error => {
      console.error('Error:', error);
    });
  };
  return (
    <div className="new-article-form">
      <i className="fas fa-times" onClick={() => setShowForm(false)}></i>
          <h2>New Article</h2>
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
            <button type="submit">Add Article</button>
          </form>
        </div>
  )
}

export default CreateArticle