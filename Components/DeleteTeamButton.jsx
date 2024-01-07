import React from 'react';

const DeleteTeamButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-red-500 text-white px-4 py-3 rounded-s-md">
      Delete Team
    </button>
  );
};

export default DeleteTeamButton;
