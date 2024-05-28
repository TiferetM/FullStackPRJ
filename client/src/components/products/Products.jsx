import React from 'react'

function Products() {
  let products = fetch(`https://localhost:3305/${id}/products`)
  return (
    <ul>
    {products.map(product => <il key={product.id}>{product.title}</il>)}
    </ul>
  )
}

export default Products