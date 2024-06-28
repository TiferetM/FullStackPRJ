import React, {useState} from 'react';
import SizesSideNav from './SizesSideNav'
import ProductsSideNav from './ProductsSideNav'
import '../css/sideNav.css'

function SideNav({height, width, depth, setHeight, setWidth, setDepth}) {
  const [currentComponent, setCurrentComponent] = useState('allList');
  const list = ['allList','products', 'sizes'];

  return (
    <nav className='sideNav'>
      hi
        {currentComponent === 'allList' 
          && list.map(item => {
          return ( <div key={item} onClick={setCurrentComponent(item)}>{item}</div>)
        })}

        {currentComponent === 'products' && <ProductsSideNav/>}
        {currentComponent === 'sizes' && <SizesSideNav  height={height} width={width} depth={depth}
       setHeight={setHeight} setWidth={setWidth} setDepth={setDepth}/>}
      </nav>
  )
}

export default SideNav