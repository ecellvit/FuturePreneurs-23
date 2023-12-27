import React from 'react';
import LeaveButton from './LeaveButton';

const Card = ({ name, imageSrc }) => {
  return (
    <div className="w-64 h-80 rounded overflow-hidden shadow-lg mx-4 my-4 flex flex-col bg-white bg-opacity-30">
      <img className="w-full h-full object-cover rounded-t" src={imageSrc} alt={name} />
      <div className="px-6 py-4 flex-grow">
        <p className="font-bold text-xl mb-2 text-white">{name}</p>
        <LeaveButton />
      </div>
    </div>
  );
};

export default Card;