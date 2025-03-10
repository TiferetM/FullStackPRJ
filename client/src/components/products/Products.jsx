import React, { useEffect, useState } from 'react';
import Product from './Product.jsx';
import AddProduct from './new product/AddProduct.jsx';

function Products({ userIn }) {
  const isAdmin = JSON.parse(sessionStorage.getItem('role')) === 'admin';
  const [productsList, setProductsList] = useState([]);	
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3305/${userIn}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token'),
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      data = getImages(data);
      setProductsList(data);
    }).catch (error => {
      console.log(error.message);
    });
  }, []);

  const getImages = (data) => {
    data.map(product => {
      fetch(`http://localhost:3305/${userIn}/products/${product._id}/img`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('token'),
        }
      }).then(response => response.blob())
      .then(blob => {
        const imgUrl = URL.createObjectURL(blob);
        return {...product, pic : imgUrl};
      }).catch(error => {
        console.error('Error:', error);
      });
    });
    return data;
  }

  return (
    <div>
      {(isAdmin && !showForm) && <button onClick={() => setShowForm(!showForm)}>Add New Product</button>}

      {showForm && <AddProduct userIn={userIn} setProductList={setProductsList} setShowForm={setShowForm} />}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {productsList.map((product, index) => (
          console.log(product),
          <Product
            key={index}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.pic}
            userIn={userIn}
            id={product._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
