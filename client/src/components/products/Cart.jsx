// // src/components/Cart.js
// import React, { useState, useEffect } from 'react';
// import './css/cart.css';  // Import CSS file
// import { Link } from 'react-router-dom';

// function Cart({ userIn }) {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     // Fetch cart items from local storage or server
//     fetch(`http://localhost:3305/${userIn}/cart`, {
//       method: 'GET',
//       headers: {
//         'Authorization': sessionStorage.getItem('token'),
//       }
//     }).then(response => {
//       return response.json();
//     }).then(data => {
//       console.log(data);
//       setItems([...data]);
//     }).catch(error => {
//       console.error('Error:', error);
//     });
//   }, []);

//   const updateCart = (item, add = true) => {
//     console.log(item, add);
//     fetch(`http://localhost:3305/${userIn}/cart`, {
//       method: 'PUT',
//       headers: {
//         'Authorization': sessionStorage.getItem('token'),
//         'Content-Type': 'application/json',
//         'Add': add
//       },
//       body: JSON.stringify(item)
//     }).then(response => {
//       return response.json();
//     }
//     ).then(data => {
//       console.log(data);
//     }
//     ).catch(error => {
//       console.error('Error:', error);
//     });
//   }

//   const handleRemoveItem = (itemId) => {
//     const updatedItems = items.filter(item => item.id !== itemId);
//     setItems(updatedItems);
//     updateCart(items.find(i => i.id == itemId), false);
//     localStorage.setItem('cartItems', JSON.stringify(updatedItems));

//   };

//   const handleChangeQuantity = (operation, itemId) => {
//     const updatedItems = items.map(item => {
//       if (item.id === itemId) {
//         if (operation === '+') {
//           return { ...item, quantity: item.quantity + 1 };
//         } else if (operation === '-' && item.quantity > 1) {
//           return { ...item, quantity: item.quantity - 1 };
//         }
//       }
//       return item;
//     });

//     setItems(updatedItems);
//     updateCart(items.find(i => i.id == itemId), operation === '+');
//     localStorage.setItem('cartItems', JSON.stringify(updatedItems));
//   }

//   return (
//     <div className="cart">
//       <h2>Your Shopping Cart</h2>
//       {items.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <>
//           <ul className='cart'>
//             {items.map(item => (
//               <li key={item.id} className='item'>
//                 <span className='title'>{item.title}</span>
//                 <span className='price'>{item.price}</span>
//                 <span className='quantity'>{item.quantity}</span>
//                 <i className='fa fa-plus' onClick={() => handleChangeQuantity('+', item.id)} />
//                 <i className='fa fa-minus' onClick={() => handleChangeQuantity('-', item.id)} />
//                 <i className="fa fa-trash" onClick={() => handleRemoveItem(item.id)} />
//               </li>
//             ))}
//           </ul>
//           <Link to='checkout'>Proceed to checkout</Link>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;
// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import './css/cart.css';  // Import CSS file
import { Link } from 'react-router-dom';

function Cart({ userIn }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage or server
    fetch(`http://localhost:3305/${userIn}/cart`, {
      method: 'GET',
      headers: {
        'Authorization': sessionStorage.getItem('token'),
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
      setItems([...data]);
    }).catch(error => {
      console.error('Error:', error);
    });
  }, []);

  const updateCart = (item, add = true) => {
    console.log(item, add);
    fetch(`http://localhost:3305/${userIn}/cart`, {
      method: 'PUT',
      headers: {
        'Authorization': sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Add': add
      },
      body: JSON.stringify(item)
    }).then(response => {
      return response.json();
    }
    ).then(data => {
      console.log(data);
    }
    ).catch(error => {
      console.error('Error:', error);
    });
  }
  // const handleRemoveItem = (itemId) => {
  //   const updatedItems = items.filter(item => item.id !== itemId);
  //   setItems(updatedItems);
  //   updateCart(items.find(i => i.id == itemId), 0);
  //   localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  // };
  const handleRemoveItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    updateCart(items.find(i => i.id === itemId), 0);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };


  const handleChangeQuantity = (operation, itemId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        if (operation === '+') {
          return { ...item, quantity: item.quantity + 1 };
        } else if (operation === '-' && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });

    setItems(updatedItems);
    updateCart(items.find(i => i.id == itemId), operation === '+' ? 1 : -1);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  }

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className='cart'>
            {items.map(item => (
              <li key={item.id} className='item'>
                <span className='title'>{item.title}</span>
                <span className='price'>{item.price}</span>
                <span className='quantity'>{item.quantity}</span>
                <i className='fa fa-plus' onClick={() => handleChangeQuantity('+', item.id)} />
                <i className='fa fa-minus' onClick={() => handleChangeQuantity('-', item.id)} />
                <i className="fa fa-trash" onClick={() => handleRemoveItem(item.id)} />
              </li>
            ))}
          </ul>
          <Link to='checkout'>Proceed to checkout</Link>
        </>
      )}
    </div>
  );
}

export default Cart;
// תשנה את זה שכשילחצו על האייקון זה ימחק את כל המוצרים ולא יפחית אחד