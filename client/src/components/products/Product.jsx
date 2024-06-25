import React, { useState } from 'react';
import "../css/Product.css";
import AddedSuccessfully from './new product/AddedSuccessfully';
function Product({ id, name, description, price, imageUrl, userIn }) {
  const [showSuccess, setShowSuccess] = useState(false);

  const addItemToCart = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3305/${userIn}/cart`, {
        method: 'PUT',
        headers: {
          'Authorization': sessionStorage.getItem('token'),
          'Content-Type': 'application/json',
          'add': 'true' // Assuming you're using this header to specify the operation
        },
        body: JSON.stringify({ id, name, description, price, imageUrl }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Item added successfully:', result);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 3000); // Hide the success message after 3 seconds
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="product-container">
      <img src={imageUrl} alt={name} className="product-image" />
      <h2>{name}</h2>
      <p>{description}</p>
      <p className="product-price">${price}</p>
      <button className="product-button" onClick={addItemToCart}>Add to Cart</button>
     {showSuccess && <AddedSuccessfully/>}
    </div>
  );
}

export default Product;
