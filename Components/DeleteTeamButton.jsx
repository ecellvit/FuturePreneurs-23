import React from 'react';

const DeleteTeamButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white px-3 py-1 border-0 rounded-lg cursor-pointer"
    >
      Delete Team
    </button>
  );
};

export default DeleteTeamButton;
