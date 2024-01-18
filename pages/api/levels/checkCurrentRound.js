import connectMongoDB from '@/libs/mongodb';
import { TeamModel } from '@/models/teamModel';
import getTokenDetails from '@/utils/auth';

export default async function checkCurrentRound(req, res) {
  
  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  } else {
    await connectMongoDB();
    const round = await TeamModel.findById(teamId);
    console.log('round', round)

    try {
      res.status(200).json({ round });
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

//  /api/admin/{token}/
