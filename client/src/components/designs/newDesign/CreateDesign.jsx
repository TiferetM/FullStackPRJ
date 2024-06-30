import React from 'react';
import RoomCanvas from './RoomCanvas';
import SideNav from './sideNav/SideNav';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function CreateDesign() {
  const [height, setHeight] = React.useState(150);
  const [width, setWidth] = React.useState(150);
  const [depth, setDepth] = React.useState(150);

  return (
    <DndProvider backend={HTML5Backend}>
      <SideNav 
        height={height} 
        width={width} 
        depth={depth}
        setHeight={setHeight} 
        setWidth={setWidth} 
        setDepth={setDepth} 
      />
      <RoomCanvas height={height} width={width} depth={depth} />
    </DndProvider>
  );
}

export default CreateDesign;
