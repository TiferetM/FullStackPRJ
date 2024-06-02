import React from 'react';
import "../css/Articles.css";
function Article({ title, content }) {
  return (
    <div className="article">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
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