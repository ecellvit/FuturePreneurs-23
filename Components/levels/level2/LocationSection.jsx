import React, { useState } from 'react';

const LocationSection = () => {
  const titles = [
    { id: 1, title: 'Title 1', description: 'Description for Title 1' },
    { id: 2, title: 'Title 2', description: 'Description for Title 2' },
    { id: 3, title: 'Title 3', description: 'Description for Title 3' },
    { id: 4, title: 'Title 4', description: 'Description for Title 4' },
    { id: 5, title: 'Title 5', description: 'Description for Title 5' },
    { id: 6, title: 'Title 6', description: 'Description for Title 6' },
    { id: 7, title: 'Title 7', description: 'Description for Title 7' },
    { id: 8, title: 'Title 8', description: 'Description for Title 8' },
    { id: 9, title: 'Title 9', description: 'Description for Title 9' },
    { id: 10, title: 'Title 10', description: 'Description for Title 10' },
  ];

  const [activeTitle, setActiveTitle] = useState(null);

  const handleClick = (id) => {
    setActiveTitle((prevActive) => (prevActive === id ? null : id));
  };

  return (
    <div className="container text-black mt-2">
      <ul>
        {titles.map(({ id, title, description }) => (
          <li key={id} className="mb-4">
            <div
              className={`cursor-pointer border p-2 ${
                activeTitle === id ? 'bg-gray-300' : 'bg-gray-100'
              }`}
              // onClick={() => handleClick(id)}
            >
              {title}
            </div>
            {activeTitle === id && (
              <div className="mt-2 bg-gray-200 p-2">
                {description}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSection;
