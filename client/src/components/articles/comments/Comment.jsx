import React, { useState } from 'react'
import ProfilePicture from '../../user/ProfilePicture'

function Comment({ comment, userIn }) {
    const className = 'comment' + (comment.userId === userIn ? ' edit' : '');
    const [body, setBody] = useState(comment.body);
    const handleBodyChange = (event) => {
        if (comment.userId !== userIn) return;
        setBody(event.target.value);
    }

    const handleSubmit = () => {
        fetch(`http://localhost:3305/${userIn}/comments/${comment._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token'),
            },
            body: JSON.stringify({ body: body })
        }).then(response => {
            return response.json();
        }).catch(error => {
            console.log(error.message);
        });
    }

    const handleDelete = async (e) => {
        const res = fetch(`http://localhost:3305/${userIn}/comments/${comment._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            }
        });
        if (res.status <400 && res.status >= 200) {
            console.log('Comment deleted successfully');
            e.target.parentElement.remove();
        } else {
            console.error('Error:', res.statusText);
        }
    }

    return (
        <div className='comment' key={comment.id}>
            <p><ProfilePicture userIn={userIn} user={comment.userId} /> :       <input onChange={handleBodyChange} value={body} name="body" />       </p>
            {comment.userId == userIn && 
            <>
                <i className='fa fa-solid fa-paper-plane' onClick={handleSubmit}></i>
                <i className='fa fa-solid fa-trash' onClick={handleDelete}></i>
            </>
            }
        </div>
    )
}

export default Comment