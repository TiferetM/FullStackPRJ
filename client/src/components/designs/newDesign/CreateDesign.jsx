import React, { useEffect, useRef } from 'react';
import RoomCanvas from './RoomCanvas';
import SideNav from './SideNav';

function CreateDesign() {
  const [height, setHeight] = React.useState(100);
  const [width, setWidth] = React.useState(100);
  const [depth, setDepth] = React.useState(100);

  return (
    <>
      <SideNav height={height} width={width} depth={depth}
       setHeight={setHeight} setWidth={setWidth} setDepth={setDepth} />
      <RoomCanvas height={height} width={width} depth={depth} />
    </>
  );
}

export default CreateDesign;
