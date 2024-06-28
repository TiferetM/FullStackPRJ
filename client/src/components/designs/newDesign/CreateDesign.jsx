import React, { useEffect, useRef } from 'react';
import RoomCanvas from './RoomCanvas';
import SideNav from './sideNav/SideNav';

function CreateDesign() {
  const [height, setHeight] = React.useState(150);
  const [width, setWidth] = React.useState(150);
  const [depth, setDepth] = React.useState(150);

  return (
    <>
      <SideNav height={height} width={width} depth={depth}
       setHeight={setHeight} setWidth={setWidth} setDepth={setDepth} />
      <RoomCanvas height={height} width={width} depth={depth} />
    </>
  );
}

export default CreateDesign;
