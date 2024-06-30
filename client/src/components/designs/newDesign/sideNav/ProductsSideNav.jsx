import React from 'react'
import '../css/sideNav.css'
import { useSelector } from 'react-redux'


const ProductsSideNav = ({height, width, depth, setHeight, setWidth, setDepth, setCurrentComponent} ) => {
    const productsList = useSelector(state => state.products.productsList)

    return (
        <nav className='productsSideNav'>
            <h1>Create a new design</h1>
            <h2>add your product</h2>
            <h3>drag and drop</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {productsList.map((product, index) => (
              <div key={index}>
                {product.name}
              </div>
            ))}
            <button onClick={() => setCurrentComponent('sizes')}>Sizes</button>
          </div>
        </nav>
    )
  }

export default ProductsSideNav