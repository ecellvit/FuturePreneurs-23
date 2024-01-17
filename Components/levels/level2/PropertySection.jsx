// PropertySection.js

import React,{useState} from 'react';
import { useDrag } from 'react-dnd';

const PropertyIcon = ({ id,title,description, imageUrl, activeIconId, onDragStart }) => {
  const [isActive, setIsActive] = useState(id === activeIconId);

  const [, drag] = useDrag({
    type: 'PROPERTY_ICON',
    item: { id, imageUrl },
    options: {
      dropEffect: 'copy',
    },
  });

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div
    onClick={handleClick} 
    ref={(node) => {
      if (node) {
        drag(node);
        onDragStart(node, { id, imageUrl });
      }
    }}
    >
      <img src={imageUrl} alt={`Icon ${id}`} style={{ width: '50px', height: '50px',cursor: 'move' }} />
      <div>
        <h4>{title}</h4>
        {isActive && <p>{description}</p>}
      </div>
    </div>
  );
};

const PropertySection = ({ onDrop }) => {
  const [activeIconId, setActiveIconId] = useState(null);

  const handleDragStart = (node, data) => {
    if (data && data.id) {
      // node.style.opacity = '0.5';
      console.log(`Started dragging: Icon ${data.id}`);
    }
    const handleIconClick = (id) => {
      setActiveIconId((prevId) => (prevId === id ? null : id));
    };
  
  };

  const icons = [
    { id: 1, title: 'Hydropower Plants', description: 'Description for Hydropower Plants', imageUrl: 'https://res.cloudinary.com/dsftfigs8/image/upload/v1705477464/fp9.0/Hydropower_Plants_w82btn.png' },
    { id: 2, title: 'Community Sustainability Hub', description: 'Description for Community Sustainability Hub', imageUrl: 'https://res.cloudinary.com/dsftfigs8/image/upload/v1705477464/fp9.0/Community_sustainability_hub_zmo9rj.png' },
    { id: 3, title: 'Energy Storage Facility', description: 'Description for Energy Storage Facility', imageUrl: 'https://res.cloudinary.com/dsftfigs8/image/upload/v1705477464/fp9.0/energy_storage_facility_pyaz16.png' },
    { id: 4, title: 'Wattlab', description: 'Description for Wattlab', imageUrl: 'https://res.cloudinary.com/dsftfigs8/image/upload/v1705477463/fp9.0/Wattlab_chiihx.png' },
    { id: 5, title: 'Solar Power Farms', description: 'Description for Solar Power Farms', imageUrl: 'https://res.cloudinary.com/dsftfigs8/image/upload/v1705477462/fp9.0/Solar_Power_Farms_cpvpk4.png' },
  ];

  return (
    <div>
      <h2>Draggable Property</h2>
      {icons.map(({ id, title, description, imageUrl }) => (
        <div key={id}>
          <PropertyIcon
            id={id}
            title={title}
            description={description}
            imageUrl={imageUrl}
            onDragStart={() => handleDragStart()}
          />
        </div>
      ))}
    </div>
  );
};

export default PropertySection;
  
//   return (
//     <div>
//       <h2>Draggable Property</h2>

//       {icons.map(({ id, title, description, imageUrl }) => (
//         <div key=>

//           {/* Example images. Replace with your actual image URLs */}

//           <PropertyIcon id={1} imageUrl="https://res.cloudinary.com/dsftfigs8/image/upload/v1705477464/fp9.0/Hydropower_Plants_w82btn.png"
//           onDragStart={()=>handleDragStart()}
//           />
//           <PropertyIcon id={2} imageUrl="https://res.cloudinary.com/dsftfigs8/image/upload/v1705477464/fp9.0/Community_sustainability_hub_zmo9rj.png" 
//           onDragStart={()=>handleDragStart()}
//           />
//           <PropertyIcon id={3} imageUrl="https://res.cloudinary.com/dsftfigs8/image/upload/v1705477464/fp9.0/energy_storage_facility_pyaz16.png" 
//           onDragStart={()=>handleDragStart()}
//           />
//           <PropertyIcon id={4} imageUrl="https://res.cloudinary.com/dsftfigs8/image/upload/v1705477463/fp9.0/Wattlab_chiihx.png" 
//           onDragStart={()=>handleDragStart()}
//           />
//           <PropertyIcon id={5} imageUrl="https://res.cloudinary.com/dsftfigs8/image/upload/v1705477462/fp9.0/Solar_Power_Farms_cpvpk4.png" 
//           onDragStart={()=>handleDragStart()}
//           />
//           {/* <div
//             style={{ border: '1px solid black', height: '200px', marginTop: '10px' }}
//             onDrop={(e) => {
//               e.preventDefault();
//               const data = JSON.parse(e.dataTransfer.getData('application/json'));
//               onDrop(data);
//             }}
//             onDragOver={(e) => e.preventDefault()}
//           >
//             Drop Area
//           </div> */}
//             <div/>
//           ))}
//     </div>
//   );
// };

// export default PropertySection;
