import React, { useEffect, useState } from 'react';
import Product from './Product.jsx';

function Products({ userIn }) {
  // נניח שהמשתמש הוא מנהל, אפשר לשנות לפי הצורך
  const isAdmin = true;

  // const [productList, setProductList] = useState([
  //   {
  //     name: "Sample Product 1",
  //     description: "This is a sample product description 1.",
  //     price: 19.99,
  //     imageUrl: "https://via.placeholder.com/150"
  //   },
  //   {
  //     name: "Sample Product 2",
  //     description: "This is a sample product description 2.",
  //     price: 29.99,
  //     imageUrl: "https://via.placeholder.com/150"
  //   },
  //   {
  //     name: "Sample Product 3",
  //     description: "This is a sample product description 3.",
  //     price: 39.99,
  //     imageUrl: "https://via.placeholder.com/150"
  //   }
  // ]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:3305/${userIn}/products`).then(response => {
      return response.json();
    }).then(data => {
      setProductList(data);
    }
    )
  }, []);

  console.log(productList);

  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProductList([...productList, { ...newProduct, price: parseFloat(newProduct.price) }]);
    setShowForm(false);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      imageUrl: ''
    });
  };

  return (
    <div>
      <h1>Product List</h1>
      {isAdmin && <button onClick={() => setShowForm(!showForm)}>Add New Product</button>}

      {showForm && (
        <div className="new-product-form">
          <h2>Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Image URL:
                <input
                  type="text"
                  name="imageUrl"
                  value={newProduct.imageUrl}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <button type="submit">Add Product</button>
          </form>
        </div>
      )}

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
