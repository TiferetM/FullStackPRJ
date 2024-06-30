import React, { useEffect, useState } from 'react';
import Product from './Product.jsx';
import { useSelector, useDispatch } from 'react-redux'
import AddProduct from './new product/AddProduct.jsx';
import { setProductsList } from '../../store/silces/productsSlice.jsx';

function Products({ userIn }) {
  const isAdmin = JSON.parse(sessionStorage.getItem('role')) === 'admin';
  const productsList = useSelector(state => state.products.productsList)
  const [showForm, setShowForm] = useState(false);

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
