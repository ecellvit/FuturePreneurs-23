import connectMongoDB from '@/libs/mongodb';
import { Level0 } from '@/models/level0';
import { TeamModel } from '@/models/teamModel';
// import { Level0Model } from "@/models/level0";
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {
  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);
  console.log("TEAM IDDDD = ", teamId);

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  } else {
    // read which questoin the user is in, endTime from db, send to user.

    // const authToken = req.headers.authorization;
    // check if leader, auth etc.


    await connectMongoDB();
    const team = await Level0.findOne({ teamId: teamId });

    const teamteam = await TeamModel.findById(teamId);
    console.log("teamteam ================ ", teamteam);

    if (!team) {
      res.status(400).json({ message: 'Team not found' });
    }
    // const team = new Level0({teamName: teamName});
    // await team.save();

    // const tesmLevelData = await Level0Model.find({teamId: teams[0]._id});

    try {
      res.status(200).json({ "team":team, "set":teamteam.newspaperset });
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
