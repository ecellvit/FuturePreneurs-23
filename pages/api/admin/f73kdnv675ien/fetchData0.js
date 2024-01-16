import connectMongoDB from '@/libs/mongodb';
import { Level0 } from '@/models/level0';
import { TeamModel1 } from '@/models/test';

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
      const newLevel0 = await new Level0({
        teamName: teamName,
        teamLeaderId: teamId,
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
