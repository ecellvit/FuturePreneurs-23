// MapSection.js
import Image from 'next/image';
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import map from "public/assets/levels/navbar/level3/map.png"

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
    <main className='relative w-full'>
    <Image src={map} className='w-full absolute top-0 left-0'/>
      <div className="grid grid-cols-12">
      {Array.from({ length: 12 * 7 }, (_, index) => (
          <MapDroppableArea
            key={index}
            index={index}
            onDrop={onDrop}
            mapData={mapData}
            onDragStart={handleDragStart}
            className="drop-area border-dashed border border-gray-400 p-4"/>
        ))}
      </div>
    </main>
  );
};

export default MapSection;