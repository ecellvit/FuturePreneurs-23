// pages/api/fetchteamCode.js

// List to map JWTs with TeamCodes
const joinCodeToTeamCodeMap = {
  'joinCode1': 'teamCodeA',
  'joinCode2': 'teamCodeB',
  '123': '123',
  // Add more mappings as needed
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { joinCode } = req.body; //or const joinCode = req.body.joinCode; //(ES6 shorthand)

    if (joinCode in joinCodeToTeamCodeMap) {
      // Retrieve the corresponding teamCode
      const tCode = joinCodeToTeamCodeMap[joinCode];

      // Respond with the teamCode
      res.status(200).json({ teamCode: tCode });
    } else {
      // If the joinCode is not found, return an error
      res.status(400).json({ error: 'Invalid join code.' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).end();
  }
}
