import connectMongoDB from '@/libs/mongodb';
import { Level3 } from '@/models/level3';
import { TeamModel } from '@/models/teamModel';
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {
  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);
  console.log('teamID', teamId)

  try {
    connectMongoDB();

    const answers=req.body.answerPage1;
    const team=await TeamModel.findById(teamId);

    console.log("------",team);
    console.log("++++++++++++++",answers)
    await Level3.findOneAndUpdate({teamId:teamId}, {$set:{answers:answers,pageNo:2}});

    await 
    res.status(200).json({
      message: "successfull"
    });
  } catch (e) {
    console.error('Error in handler:', e);
    res.status(500).json({
      message: 'Internal server error',
      error: e.toString(),
    });
  }
}
