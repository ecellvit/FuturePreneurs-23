import connectMongoDB from '@/libs/mongodb';
import { Level2 } from '@/models/level2';
import { TeamModel } from "@/models/teamModel";
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {
  await connectMongoDB();

  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);
  console.log('teamId', teamId)

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  } else {
    // read which questoin the user is in, endTime from db, send to user.

    // const authToken = req.headers.authorization;
    // check if leader, auth etc.

    const team = await TeamModel.findById(teamId)
    console.log('team', team)

    if (!team) {
      res.status(400).json({ message: 'Team not found' });
      return
    }

    const level2tea = await Level2.findOne({teamId : teamId});
    console.log('level2tea', level2tea)

    // const tesmLevelData = await Level0Model.find({teamId: teams[0]._id});

    try {
      return res.status(200).json({ team:level2tea, set:team.newspaperset });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({
          message: 'Internal server error',
          error: e.toString(),
        });
    }
  }
}