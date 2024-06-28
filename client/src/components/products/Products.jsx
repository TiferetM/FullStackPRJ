import React, { useEffect, useState } from 'react';
import Product from './Product.jsx';
import AddProduct from './new product/AddProduct.jsx';

function Products({ userIn }) {
const isAdmin=JSON.parse(sessionStorage.getItem('role'))==='admin';
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
  }, []);

  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {(isAdmin&&!showForm) && <button onClick={() => setShowForm(!showForm)}>Add New Product</button>}

      {showForm && <AddProduct userIn={userIn} setProductList={setProductList} setShowForm={setShowForm}/>}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {productList.map((product, index) => (
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
