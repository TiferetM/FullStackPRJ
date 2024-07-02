import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/CreateArticle.css";

function CreateArticle({ userIn}) {
  const [newArticle, setNewArticle] = useState({ title: '', body: '', category: ''});
  const navigate = useNavigate();

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
      body: JSON.stringify({...newArticle, auther: userIn})
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log('Article added successfully:', data);
      setNewArticle({ title: '', body: '' });
      navigate(`/${userIn}/articles`);
    }).catch(error => {
      console.error('Error:', error);
    });
  };

  const handleClose = () => {
    setShowForm(false);
    setNewArticle({ title: '', body: '' }); // Reset form fields on close
  };

  return (
    <div className="new-article-form">
      <button id="close-button" onClick={handleClose} >❌</button>
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
              name="body"
              value={newArticle.body}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Catagory:
            <input
              type="text"
              name="category"
              value={newArticle.category}
              onChange={handleInputChange}
              required />
          </label>
        </div>
        <div className="button-container">
          <button type="submit">Add Article</button>
        </div>
      </form>
    </div>
  );
}

export default CreateArticle;

