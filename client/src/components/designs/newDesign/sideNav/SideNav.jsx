import React, { useState } from 'react';
import SizesSideNav from './SizesSideNav';
import ProductsSideNav from './ProductsSideNav';
import '../css/sideNav.css';

const COMPONENT_LIST = ['allList', 'products', 'sizes'];

function SideNav({ height, width, depth, setHeight, setWidth, setDepth }) {
  const [currentComponent, setCurrentComponent] = useState('allList');

  return (
    <nav className='sideNav'>
     <ProductsSideNav  />
 </nav>
  );
    //   {currentComponent === 'allList' &&
    //     COMPONENT_LIST.map(item => (
    //       <div key={item} onClick={() => setCurrentComponent(item)}>
    //         {item}
    //       </div>
    //     ))}

      {/* {currentComponent === 'products' && ( */}
        // <ProductsSideNav setCurrentComponent={setCurrentComponent} />
      {/* )} */}

      {/* {currentComponent === 'sizes' && (
        <SizesSideNav
          height={height}
          width={width}
          depth={depth}
          setHeight={setHeight}
          setWidth={setWidth}
          setDepth={setDepth}
          setCurrentComponent={setCurrentComponent}
        />
      )} */}
    // </nav>
  // );
}

export default SideNav;
