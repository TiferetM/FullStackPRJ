import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableProduct = ({ product }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'product',
    item: { product },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {product.pic}
    </div>
  );
};

export default DraggableProduct;
