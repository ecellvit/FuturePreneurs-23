// api/getTeamDetails.js

export default (req, res) => {
    // Mock database
    const teams = [
      {
        teamCode: '123',
        teamName: 'Team ABC',
        leader: 'John Doe',
        members: ['Alice', 'Bob', 'Charlie'],
      },
      {
        teamCode: 'team456',
        teamName: 'Team B',
        leader: 'Jane Smith',
        members: ['David', 'Eve', 'Frank'],
      },
      // Add more teams as needed
    ];
  
    const  {teamCode}  = req.body;
  
    // Find the team based on the teamCode
    const team = teams.find((t) => t.teamCode === teamCode);
  
    if (!team) {
      return res.status(400).json({ error: 'Team not found' });
    }
  
    res.status(200).json({
      teamName: team.teamName,
      leader: team.leader,
      members: team.members,
    });
  };
  