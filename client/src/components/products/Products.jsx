import React, { useEffect, useState } from 'react';
import Product from './Product.jsx';
import AddProduct from './AddProduct.jsx';

function Products({ userIn }) {
  // נניח שהמשתמש הוא מנהל, אפשר לשנות לפי הצורך
  const isAdmin = true;
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:3305/${userIn}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token'),
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      setProductList(data);
    }
    )
  }, []);//יבוא מוצרים מהDB

  console.log(productList);

  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h1>Product List</h1>
      {isAdmin && <button onClick={() => setShowForm(!showForm)}>Add New Product</button>}

      {showForm && <AddProduct/>}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {productList.map((product, index) => (
          <Product
            key={index}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
