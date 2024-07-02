import React, {useState} from 'react'

function AddComment({ articleId, userIn, setShowComments}) {
    const [commentText, setCommentText] = useState(''); // State to store comment text

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        // Handle comment submission logic here (e.g., API call to add comment)
        console.log('Adding comment:', commentText);
        fetch(`http://localhost:3305/${userIn}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token'),
            },
            body: JSON.stringify({ body: commentText , articleId: articleId, userId: userIn})
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log('Comment added successfully:', data);
            setShowComments(false);
        }).catch(error => {
            console.error('Error:', error);
        });
        // Reset comment text
        setCommentText('');
    };

  return (
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
  )
}

export default AddComment