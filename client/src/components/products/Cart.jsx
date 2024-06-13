// src/components/Cart.js
import React, { useState, useEffect } from 'react';
//import '../css/Cart.css';  // Import CSS file

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage or server
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setItems(cartItems);
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>{item.price}</span>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
