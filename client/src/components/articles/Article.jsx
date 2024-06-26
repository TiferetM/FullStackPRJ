import React from 'react';
import "../css/Articles.css";
import { Link } from 'react-router-dom';
function Article({ article}) {
  return (
    <Link to={article._id}>
      <div className="article">
        <h2>{article.title}</h2>
        <p>{article.body}</p>
      </div>
    </Link>
  );
}

export default Article;
// import React from 'react'

// function Article() {
//   return (
//     <div>Article</div>
//   )
// }

// export default Article