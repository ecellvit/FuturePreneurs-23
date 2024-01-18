import connectMongoDB from '@/libs/mongodb';
import { Level2test } from '@/models/level2test';
import { TeamModel } from "@/models/teamModel";
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {
  // const auth = req.headers.authorization.split(' ')[1];
  // let teamId = await getTokenDetails(auth);

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  } else {
    // read which questoin the user is in, endTime from db, send to user.

    // const authToken = req.headers.authorization;
    // check if leader, auth etc.

    const teamName = 'vyas';

    await connectMongoDB();
    const team = await TeamModel.findOne({teamName:teamName})
    if (!team) {
      res.status(400).json({ message: 'Team not found' });
      return
    }
    // const team = new Level0({teamName: teamName});
    // await team.save();

    // const tesmLevelData = await Level0Model.find({teamId: teams[0]._id});
    console.log(team);
    console.log(team.sector);

    try {
      res.status(200).json({ sector:team.sector });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({
          message: 'Internal server error',
          error: e.toString(),
        });
    }
  }
}