// PropertySection.js

import React from 'react';
import { useDrag } from 'react-dnd';

const PropertyIcon = ({ id, imageUrl,onDragStart }) => {

  const [, drag] = useDrag({
    type: 'PROPERTY_ICON',
    item: { id, imageUrl },
    options: {
      dropEffect: 'copy',
    },
  });

  return (
    <div ref={(node) => {
      if (node) {
        drag(node);
        onDragStart(node, { id, imageUrl });
      }
    }}
    >
      <img src={imageUrl} alt={`Icon ${id}`} style={{ width: '50px', height: '50px',cursor: 'move' }} />
    </div>
  );
};

const PropertySection = ({ onDrop }) => {
  const handleDragStart = (node, data) => {
    if (data && data.id) {
      // node.style.opacity = '0.5';
      console.log(`Started dragging: Icon ${data.id}`);
    }
  };
  return (
    <div>
      <h2>Draggable Property</h2>
      {/* Example images. Replace with your actual image URLs */}
      <PropertyIcon id={1} imageUrl="https://res.cloudinary.com/dsftfigs8/image/upload/v1705477464/fp9.0/Hydropower_Plants_w82btn.png" 
      onDragStart={()=>handleDragStart()}
      />
      <PropertyIcon id={2} imageUrl="https://res.cloudinary.com/dsftfigs8/image/upload/v1705477464/fp9.0/Community_sustainability_hub_zmo9rj.png" 
      onDragStart={()=>handleDragStart()}
      />
      <PropertyIcon id={3} imageUrl="https://res.cloudinary.com/dsftfigs8/image/upload/v1705477464/fp9.0/energy_storage_facility_pyaz16.png" 
      onDragStart={()=>handleDragStart()}
      />
      <PropertyIcon id={4} imageUrl="https://res.cloudinary.com/dsftfigs8/image/upload/v1705477463/fp9.0/Wattlab_chiihx.png" 
      onDragStart={()=>handleDragStart()}
      />
      <PropertyIcon id={5} imageUrl="https://res.cloudinary.com/dsftfigs8/image/upload/v1705477462/fp9.0/Solar_Power_Farms_cpvpk4.png" 
      onDragStart={()=>handleDragStart()}
      />
      {/* <div
        style={{ border: '1px solid black', height: '200px', marginTop: '10px' }}
        onDrop={(e) => {
          e.preventDefault();
          const data = JSON.parse(e.dataTransfer.getData('application/json'));
          onDrop(data);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        Drop Area
      </div> */}
    </div>
  );
};

export default PropertySection;
