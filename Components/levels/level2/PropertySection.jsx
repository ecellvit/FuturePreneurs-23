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
    // onClick={handleClick} 
    ref={(node) => {
      if (node) {
        drag(node);
        onDragStart(node, { id, imageUrl });
      }
    }}
    >
      <img src={imageUrl} alt={`Icon ${id}`} style={{ width: '50px', height: '50px',cursor: 'move' }} />
      {/* <div>
        <h4>{title}</h4>
        {isActive && <p>{description}</p>}
      </div> */}
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
    { id: 1, title: 'Charging Station', description: 'Description for Charging Station', imageUrl: 'https://utfs.io/f/98b501e3-9a58-427a-94fe-4abc767792a9-9nmj88.png' },
    { id: 2, title: 'Battery Manufacturing Facilites', description: 'Description for Battery Manufacturing Facilities', imageUrl: 'https://utfs.io/f/61e6dcb3-d551-4b64-8c91-c1141707140a-r9i2s5.png' },
    { id: 3, title: 'R&D Labs', description: 'Description for R&D Labs', imageUrl: 'https://utfs.io/f/fdfde9c6-5ec2-4eda-9dde-359b1e3dad69-tbtwqy.png' },
    { id: 4, title: 'Recycling Facilities', description: 'Description for Recycling Facilities', imageUrl: 'https://utfs.io/f/f0716306-2581-4384-b7d0-a1b46d661bd6-7a6lv7.png' },
    { id: 5, title: 'Supply Chain Logisitics Hub', description: 'Description for Supply Chain Logisitics Hub', imageUrl: 'https://utfs.io/f/fa7b0f25-0a10-4c76-ad3f-bbc3325b8c34-3pd66w.png' },
    { id: 6, title: 'Showroom and Customer Experience Centre', description: 'Showroom and Customer Experience Centre', imageUrl: 'https://utfs.io/f/f9e4c060-2263-4aa1-a2e1-56dd96482d28-kxtz1h.png' },
    { id: 7, title: 'Energy Storage Facility', description: 'Description for Energy Storage Facility', imageUrl: 'https://utfs.io/f/ea0fb86e-c2ca-4706-8f01-c1e6ced728d1-1k8pfk.png' },
  ];

  return (
    <div className='flex flex-wrap gap-1=5'>
      {icons.map(({ id, title, description, imageUrl }) => (
        <div key={id} className="mb-2 font-bold text-black cursor-pointer border p-2 w-20 h-20 flex items-center justify-center">
          <PropertyIcon
            id={id}
            imageUrl={imageUrl}
            onDragStart={() => handleDragStart()}
          />
          {/* <p className="mt-2">{title}</p> */}
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
