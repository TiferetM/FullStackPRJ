import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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
    const handleEdit = () => {
        navigate(`/articles/${id_a}/edit`);
    }
    const handleRequestFriendship = async (e) => {
        e.target.classList.toggle('fa-solid');
        e.target.classList.toggle('fa-regular');
    }
    return (
        <div className='fullArticle'>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <p>{article.author}</p>
            <div className='edits'>
                <i className='fa-regular fa-star' onClick={handleStared}></i>
                {isAuther && <i className="fa-solid fa-pen-to-square" onClick={handleEdit}></i>}
                <i className="fa-solid fa-handshake" onClick={handleRequestFriendship}></i>
            </div>
        </div>
    )
}

export default FullArticle