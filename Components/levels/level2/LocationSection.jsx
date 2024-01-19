import React, { useState } from 'react';

const LocationSection = () => {
  const titles = [
    { id: 1, title: 'HIGHWAY', description: 'Description for Title 1' },
    { id: 2, title: 'DISTRICT9', description: 'Description for Title 2' },
    { id: 3, title: 'HELO MOUNTAINS', description: 'Description for Title 3' },
    { id: 4, title: 'Castle Rock', description: 'Description for Title 4' },
    { id: 5, title: 'Asteroid Range', description: 'Description for Title 5' },
    { id: 6, title: 'NEXUS HEIGHTS', description: 'Description for Title 6' },
    { id: 7, title: 'EMERALDS', description: 'Description for Title 7' },
    { id: 8, title: 'NATURE HAVEN', description: 'Description for Title 8' },
    { id: 9, title: 'MARITIME OASIS', description: 'Description for Title 9' },
    { id: 10, title: 'ELVATECH DISTRICT', description: 'Description for Title 10' },
  ];

  const [activeTitle, setActiveTitle] = useState(null);

  const handleClick = (id) => {
    setActiveTitle((prevActive) => (prevActive === id ? null : id));
  };

  return (
    <div className="container text-black mt-2">
      <ul>
        {titles.map(({ id, title, description }) => (
          <li key={id} className="mb-4 flex bg-white p-2 gap-2 uppercase">
            <div className='font-bold'>{id}).</div>
            <div
              // onClick={() => handleClick(id)}
            >
              {title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSection;
