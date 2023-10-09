import React, { useState } from 'react';
import { useRouter } from 'next/router';

const MakeTeam = () => {
  const [teamName, setTeamName] = useState('');
  const router = useRouter();

  const handleCreateTeam = async () => {
    try {
      // Send a request to the backend to check if the team name is unique
      const response = await fetch('/api/checkTeamName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName }),
      });

      const data = await response.json();

      if (data.isUnique) {
        // Team name is unique, so redirect to TeamCode page
        router.push('/teamCode');
      } else {
        // Team name is already used, display an error message
        alert('Team name already used. Please choose a different name.');
      }
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleJoinTeam = () => {
    // Redirect to JoinTeam page
    router.push('/joinTeam');
  };

  return (
    <div className="border border-gray-300 rounded shadow-md p-4 bg-white max-w-xs mx-auto text-center">
      <h1 className="text-2xl font-semibold mb-2">Make a Team</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        className="px-4 py-2 rounded cursor-pointer bg-blue-500 text-white"
        onClick={handleCreateTeam}
      >
        Create Team
      </button>
      <button
        className="px-4 py-2 rounded cursor-pointer bg-green-500 text-white mt-4"
        onClick={handleJoinTeam}
      >
        Join Team
      </button>
    </div>
  );
};

export default MakeTeam;
