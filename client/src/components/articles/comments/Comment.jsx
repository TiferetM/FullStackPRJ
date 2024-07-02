import React from 'react'

function Comment({ comment, userIn }) {
    return (
        <div key={comment.id}>
            <p>{comment.userId} : {comment.body}</p>
        </div>
    )
}

export default Comment