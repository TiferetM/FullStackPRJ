import React, {useState} from 'react'
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

    return (
        <div className='comment' key={comment.id}>
            <p><ProfilePicture userIn={userIn} user={comment.userId} /> :       <input onChange={handleBodyChange} value={body} name="body"/>       </p>
            {comment.userId == userIn && <i className='fa fa-solid fa-paper-plane' onClick={handleSubmit}></i>}
        </div>
    )
}

export default Comment