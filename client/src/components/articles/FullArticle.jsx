import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import './css/FullArticle.css';

function FullArticle({ userIn }) {

    
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

    const { id_a } = useParams();
    const [article, setArticle] = useState([]);
    let isAuther = false;
    useEffect(() => {
        fetch(`http://localhost:3305/${userIn}/articles/${id_a}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log('Articles fetched successfully:', data);
            if (data.author === userIn)
                isAuther = true;
            setArticle(data);
        }).catch(error => {
            console.error('Error:', error);
        });
    }, []);
    const handleStared = async (e) => {
        await fetch(`http://localhost:3305/${userIn}/articles/${id_a}/stared`, {
            method: 'PUT',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log('Article stared successfully:', data);
            e.target.classList.toggle('fa-regular');
            e.target.classList.toggle('fa-solid');
            setArticle(data);
        }).catch(error => {
            console.error('Error:', error);
        });
    }
    const handleEdit = async (e) => {
        //navigate(`/articles/${id_a}/edit`);
        e.target.classList.toggle('fa-solid');
        e.target.classList.toggle('fa-regular');
    }
    const handleRequestFriendship = async (e) => {
        e.target.classList.toggle('fa-solid');
        e.target.classList.toggle('fa-regular');
    }
    const handleDelete= async (e) => {
        e.target.classList.toggle('fa-solid');
        e.target.classList.toggle('fa-regular');
    }
    return (
        <div className='fullArticle'>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <Link to={`/${userIn}/users/${article.author}`}><p>{article.author}</p></Link>
            
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
            <div className='edits'>
                <i className='fa-regular fa-star' onClick={handleStared}></i>
                {isAuther && <i className="fa-solid fa-pen-to-square" onClick={handleEdit}></i>}
                <i className="fa-solid fa-handshake" onClick={handleRequestFriendship}></i>
                <i className="fa-solid fa-trash" onClick={handleDelete}></i>
            </div>
        </div>
    )
}

export default FullArticle