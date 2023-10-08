import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const MakeTeam = () => {
  const [teamName, setTeamName] = useState('');
  const history = useHistory();

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
        history.push('/TeamCode');
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
    history.push('/JoinTeam');
  };

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Make a Team</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button className="create-button" onClick={handleCreateTeam}>
            Create Team
          </button>
          <button className="join-button" onClick={handleJoinTeam}>
            Join Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeTeam;
