import React, { useState } from 'react';
import "../css/Articles.css";
import { Link } from 'react-router-dom';

function Article({ article, userIn }) {
  const [showComments, setShowComments] = useState(false); // State to manage comment visibility
  const [commentText, setCommentText] = useState(''); // State to store comment text

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const closeComments = () => {
    setShowComments(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Handle comment submission logic here (e.g., API call to add comment)
    console.log('Adding comment:', commentText);
    // Reset comment text
    setCommentText('');
  };

  return (
    <div className="article">
      <Link to={article._id}>
        <Link to={`http://localhost:5173/${userIn}/users/${article.auther}`} ><img src={article.ppic} alt={article.auther} /></Link>
        <h2>{article.title}</h2>
        <p>{article.body}</p>
      </Link>
      <button onClick={showComments ? closeComments : toggleComments}>
        {showComments ? '❌' : 'add a comment'}
      </button>
      {showComments && (
        <div className="comment-section">
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              required
            />
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Article;
