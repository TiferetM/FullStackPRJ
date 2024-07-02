import React from 'react';
import PropTypes from 'prop-types';
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
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        display: 'inline-block',
      }}
    >
      <img
        src={product.pic}
        alt={product.title}
        style={{ maxWidth: '100px', maxHeight: '100px' }}
      />
    </div>
  );
};

DraggableProduct.propTypes = {
  product: PropTypes.shape({
    pic: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired, // Path to the GLB file
  }).isRequired,
};

export default DraggableProduct;

