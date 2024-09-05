import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Comments from './comments/Comments';
import './css/FullArticle.css';

function FullArticle({ userIn }) {
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
    
    return (
        <div className='fullArticle'>
            <h1>{article.title} / <Link to={`/${userIn}/users/${article.author}`}><p>{article.author}</p></Link></h1>
            <p>{article.body}</p>
            <Comments userIn={userIn} articleId={id_a} />
        </div>
    )
}

export default FullArticle