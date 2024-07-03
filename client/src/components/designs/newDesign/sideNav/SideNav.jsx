import React, { useState } from 'react';
import SizesSideNav from './SizesSideNav';
import ProductsSideNav from './ProductsSideNav';
import '../css/sideNav.css';


function SideNav({ height, width, depth, setHeight, setWidth, setDepth }) {
  const COMPONENT_LIST = ['products', 'sizes'];
  const [currentComponent, setCurrentComponent] = useState('sizes');

  return (
    <nav className='sideNav'>
        {currentComponent === 'products' && (
          <ProductsSideNav setCurrentComponent={setCurrentComponent} />
        )}
        {currentComponent === 'sizes' && (
          <SizesSideNav
            height={height}
            width={width}
            depth={depth}
            setHeight={setHeight}
            setWidth={setWidth}
            setDepth={setDepth}
            setCurrentComponent={setCurrentComponent}
          />
        )}
    </nav>
  );
}

export default SideNav;
