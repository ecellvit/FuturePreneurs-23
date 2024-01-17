// MapSection.js
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const MapDroppableArea = ({ onDrop, index, mapData, onDragStart }) => {

  const [itemUrl, setItemUrl] = useState()

  const [collectedProps, drop] = useDrop({

    accept: 'PROPERTY_ICON',
    drop: (item, monitor) => {
      console.log('drop hora bhai', item)
      setItemUrl(item.imageUrl)
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      onDrop(item, index);
    },
  });

  const isDropArea = mapData[index] !== null;

  const areaStyle = `
    border w-16 h-16 relative
  `;

  return (
    <div ref={(node) => {
      if (node) {
        drop(node);
        onDragStart(node, mapData[index]);
      }
    }} className={areaStyle}>
    
      {mapData[index] && (
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            style={{
              backgroundImage: `url(${itemUrl})`,
              backgroundSize: 'cover',
              width: '100%',
              height: '100%',
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

const MapSection = ({ onDrop, mapData }) => {
  // const gridItems = Array.from({ length: 6 * 6 }, (_, index) => (
  //   <MapDroppableArea key={index} index={index} onDrop={onDrop} mapData={mapData} />
  // ));
  // const handleDragStart = (node, data) => {
  //   node.style.opacity = '0.5';
  //   console.log(`Started dragging: Icon ${data.id}`);
  // };
  const handleDragStart = (node, data) => {
    if (data && data.id) {
      console.log(`Started dragging: Icon ${data.id}`);
    }
  };

  const handleDragEnd = (node) => {
    node.style.opacity = '1';
  };


  return (
    <div style={{ background: 'url(https://res.cloudinary.com/dsftfigs8/image/upload/v1705482804/fp9.0/sgkhym89kdgrvenkhrfh.png)', backgroundSize: 'cover' }}>
      <h2 className="text-xl font-bold mb-4">Map Section</h2>
      <div className="grid grid-cols-6">
      {Array.from({ length: 6 * 6 }, (_, index) => (
          <MapDroppableArea
            key={index}
            index={index}
            onDrop={onDrop}
            mapData={mapData}
            onDragStart={handleDragStart}
            className="drop-area border-dashed border border-gray-400 p-4"/>
        ))}
      </div>
    </div>
  );
};

export default MapSection;
