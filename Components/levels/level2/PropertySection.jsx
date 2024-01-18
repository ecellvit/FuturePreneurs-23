// PropertySection.js

import React,{useState} from 'react';
import { useDrag } from 'react-dnd';
import mapProperties from "@/constants/level2/mapProperties"

const PropertyIcon = ({ id,title,description, imageUrl, activeIconId, onDragStart, set }) => {
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

const PropertySection = ({ onDrop , set}) => {
  const [activeIconId, setActiveIconId] = useState(null);
  const mapping = [
    "E.V",
    "Green Construction",
    "Renewable Energy",
  ]
  // console.log('asdfsdfaasdf', mapping, set, mapping[set])


  const handleDragStart = (node, data) => {
    if (data && data.id) {
      // node.style.opacity = '0.5';
      console.log(`Started dragging: Icon ${data.id}`);
    }
    const handleIconClick = (id) => {
      setActiveIconId((prevId) => (prevId === id ? null : id));
    };
  
  };

  const icons = mapProperties[mapping[set]]
  

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
