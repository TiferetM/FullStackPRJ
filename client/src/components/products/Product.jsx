// import React from 'react'

// function Product() {
//   return (
//     <div>Product</div>
//   )
// }

// export default Product
import React from 'react';
import "../css/Product.css";

function Product({ name, description, price, imageUrl }) {
  return (
    <div className="product-container">
      <img src={imageUrl} alt={name} className="product-image" />
      <h2>{name}</h2>
      <p>{description}</p>
      <p className="product-price">${price}</p>
      <button className="product-button">Add to Cart</button>
    </div>
  );
}
export default Product;
