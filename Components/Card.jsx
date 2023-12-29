import React from 'react';
import LeaveButton from './LeaveButton';

const Card = ({ name, imageSrc }) => {
  return (
    <div className="relative flex-col justify-between w-96 h-47 rounded-3xl overflow-hidden shadow-lg mx-4 my-4 bg-white bg-opacity-30 ">
      <img className="w-full h-32 object-cover rounded-t-3xl" src={imageSrc} alt={name} />
      <div className="flex justify-between">
        <div className="px-3 py-0">
          <p className="font-bold text-xl mb-2 text-white">{name}</p>
        </div>
        <div className="px-6 pb-4">
          <LeaveButton />
        </div>
      </div>
    </div>
  );
};

export default Card;