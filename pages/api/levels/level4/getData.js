import connectMongoDB from "@/libs/mongodb";
import { Level4 } from "@/models/level4";
// import { Level0Model } from "@/models/level0";
import getTokenDetails from "@/utils/auth";

export default async function handler(req, res) {

    const auth = req.headers.authorization.split(' ')[1];
    let teamId = await getTokenDetails(auth);

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  } else {
    // read which questoin the user is in, endTime from db, send to user.

    // const authToken = req.headers.authorization;
    // check if leader, auth etc.

    const teamName = 'team1';

    await connectMongoDB();
    const team = await Level4.findOne({teamId:teamId});
    // const team = new Level0({teamName: teamName});
    // await team.save();

    // const tesmLevelData = await Level0Model.find({teamId: teams[0]._id});

    console.log(team)

    try{
      res.status(200).json({team})
    } catch(e) {
      console.log(e)
      res.status(500).json({ message: 'Internal server error', error: e.toString() })
    } 
  }
}