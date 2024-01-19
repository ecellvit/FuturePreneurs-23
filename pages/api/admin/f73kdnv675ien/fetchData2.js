import connectMongoDB from '@/libs/mongodb';
import { Level2, Level2test } from '@/models/level2';
import { TeamModel } from '@/models/teamModel';

export default async function handler(req, res) {
  try {
    connectMongoDB();
    const teams = await TeamModel.find();
    let team;
    for (team of teams) {
      const teamId = team._id;
      const teamName = team.teamName;
      await new Level2({
        teamName: teamName,
        teamId: teamId,
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
