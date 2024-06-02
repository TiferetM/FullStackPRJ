// import React from 'react'

// function Products() {
//   let products = fetch(`https://localhost:3305/${id}/products`)
//   return (
//     <><ul>
//       {products.map(product => <il key={product.id}>{product.title}</il>)}
//     </ul><div>
//         <h1>Product List</h1>
//         <Product {...productDetails} />
//       </div></>
//   )
// }

// export default Products
// Products.js
import React from 'react';
import Product from './Product.jsx';

function Products() {
  const productList = //fetch products from db with url as in routes, then parse using json
  [
    {
      name: "Sample Product 1",
      description: "This is a sample product description 1.",
      price: 19.99,
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      name: "Sample Product 2",
      description: "This is a sample product description 2.",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      name: "Sample Product 3",
      description: "This is a sample product description 3.",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/150"
    }
  ];

  return (
    <div>
      <h1>Product List</h1>
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
