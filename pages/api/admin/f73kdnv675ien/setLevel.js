import { TeamModel } from '@/models/teamModel';
import connectMongoDB from '@/libs/mongodb';
export default async function handler(req, res) {
  try {
    connectMongoDB();
    const teams = await TeamModel.find();
    console.log(teams);
    let level;
    for (let team of teams) {
      console.log(team);
      level = team.level;
      console.log(level);
      level = level + 1;

      await TeamModel.findOneAndUpdate(
        { teamName: team.teamName },
        { $set: { level: 1 } }
      );
    }
    return res.status(200).json({
      message: 'Levels have been assigned',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Something went wrong',
      e: error.toString(),
    });
  }
}
