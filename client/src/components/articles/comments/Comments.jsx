import React, { useEffect, useState } from 'react'
import Comment from './Comment.jsx'
import AddComment from './AddComment.jsx'
import './css/comments.css'

function Comments({ userIn, articleId }) {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false); // State to manage comment visibility

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const closeComments = () => {
        setShowComments(false);
    };
    useEffect(() => {
        fetch(`http://localhost:3305/${userIn}/comments?articleId=${articleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token'),
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            setComments(data);
        }).catch(error => {
            console.log(error.message);
        });
    }, [showComments]);
    return (
        <div>
            {comments.map(comment => <Comment key={comment.id} comment={comment} userIn={userIn} />)}
            <button onClick={showComments ? closeComments : toggleComments}>
                {showComments ? '❌' : '+'}
            </button>
            {showComments && <AddComment userIn={userIn} articleId={articleId} setShowComments={setShowComments}/>}
        </div>
    )
}

export default Comments