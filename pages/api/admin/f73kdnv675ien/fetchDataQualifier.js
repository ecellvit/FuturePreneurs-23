import { TeamModel1 } from '@/models/test';

import connectMongoDB from '@/libs/mongodb';

import { Qualifier } from '@/models/qualifier';

export default async function handler(req, res) {
  try {
    connectMongoDB();
    const teams = await TeamModel1.find();
    let team;
    for (team of teams) {
      const teamId = team._id;
      const teamName = team.teamName;
      const leaderName = team.leaderName;
      const leaderEmail = team.leaderEmail;
      const newLevel1 = await new Qualifier({
        teamName: teamName,
        teamId: teamId,
        leaderName: leaderName,
        leaderEmail: leaderEmail,
      }).save();
    }
    res.status(200).json({
      message: 'Data has been assigned',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
