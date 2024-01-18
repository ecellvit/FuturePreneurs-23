import connectMongoDB from '@/libs/mongodb';
import { Level4 } from '@/models/level4';
import { TeamModel } from '@/models/teamModel';

export default async function handler(req, res) {
  try {
    connectMongoDB();
    const teams = await TeamModel.find();
    let team;
    for (team of teams) {
      const teamId = team._id;
      const teamName = team.teamName;
    
      const newLevel1 = await new Level4({
        teamName: teamName,
        teamId: teamId
        
      }).save();
    }
    res.status(200).json({
      message: 'Data for level4 has been assigned',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
