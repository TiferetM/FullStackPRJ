import React, {useState, useEffect} from 'react'
import '../css/sideNav.css'
import DraggableProduct from '../dragable/dragableProduct'

const ProductsSideNav = ({height, width, depth, setHeight, setWidth, setDepth, setCurrentComponent} ) => {
    const [productsList, setProductsList] = useState([]);
    const userIn = JSON.parse(sessionStorage.getItem('currentUser'));
    useEffect(() => {
      fetch(`http://localhost:3305/${userIn}/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('token'),
        }
      }).then(response => {
        return response.json();
      }).then(data => {
        console.log(data);
        setProductsList(data);
      }).catch (error => {
        console.log(error.message);
      });
    }, []);

    return (
      <nav className='productsSideNav'>
      <h1>Create a new design</h1>
      <h2>add your product</h2>
      <h3>drag and drop</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {productsList.map((product, index) => (
          <DraggableProduct key={index} product={product} />
        ))}
      </div>
      <button onClick={() => setCurrentComponent('sizes')}>Sizes</button>
    </nav>
    )
  }

export default ProductsSideNav