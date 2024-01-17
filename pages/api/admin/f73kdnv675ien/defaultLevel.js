import connectMongoDB from '@/libs/mongodb';
import { TeamModel } from '@/models/teamModel';

export default async function handler(req, res) {
  try {
    connectMongoDB();
    const teams = await TeamModel.find();

    for (let team of teams) {
      await TeamModel.findOneAndUpdate(
        { teamName: team.teamName },
        { $set: { level: -1 } }
      );
    }
    res.status(200).json({
      message: 'Data has been assigned',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
