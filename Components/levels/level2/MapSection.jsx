// MapSection.js
import Image from "next/image";
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import map from "public/map.png";

const MapDroppableArea = ({ onDrop, index, mapData, onDragStart }) => {
  const [itemUrl, setItemUrl] = useState();

  const [collectedProps, drop] = useDrop({
    accept: "PROPERTY_ICON",
    drop: (item, monitor) => {
      console.log("drop hora bhai", item);
      setItemUrl(item.imageUrl);
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      onDrop(item, index);
    },
  });

  const isDropArea = mapData[index] !== null;

  const areaStyle = `
  border w-14 h-14 relative
  `;
  //  border w-12 h-12 z-10

  return (
    <div
      ref={(node) => {
        if (node) {
          drop(node);
          onDragStart(node, mapData[index]);
        }
      }}
      className={areaStyle}
    >
      {mapData[index] && (
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            style={{
              backgroundImage: `url(${itemUrl})`,
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

const dropArr = [6, 12, 14, 18, 25, 65, 104, 129, 134, 143];
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
    node.style.opacity = "1";
  };

  return (
    <main className="relative w-full mx-auto">
      <div className="absoluter">
        <Image src={map} className="w-full absolute top-0 left-0" />
        {/* <div className="flex flex-row">
       {Array.from({ length: 10 }, (_, index) => (
         <div className="flex flex-column">
         {Array.from({ length: 16 }, (_, index) => (
           <MapDroppableArea
           key={index}
           index={index}
           onDrop={onDrop}
           mapData={mapData}
           onDragStart={handleDragStart}
           className="drop-area border-dashed border border-gray-400 p-4"/>
           ))}
           </div>
           ))}
          </div> */}
        <div
          style={{
            // grid-template-columns: repeat(16, 1fr); /* 16 columns */
            // grid-template-rows: repeat(10, 1fr); /* 10 rows */</main>
            gridTemplateColumns: " repeat(10, 1fr)",
            gridTemplateColumns: "repeat(16, 1fr)",
          }}
          className="grid"
        >
          {Array.from({ length: 16 * 10 }, (_, index) => {
            if (dropArr.includes(index)) {
              return (
                <MapDroppableArea
                  key={index}
                  index={index}
                  onDrop={onDrop}
                  mapData={mapData}
                  onDragStart={handleDragStart}
                  className="drop-area"
                />
              );
            } else {
              return <div key={index} className="border w-14 h-14 relative"></div>;
            }
          })}
        </div>
      </div>
    </main>
  );
};

export default MapSection;
