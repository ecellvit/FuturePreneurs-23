import connectMongoDB from '@/libs/mongodb';
import { TeamModel } from '@/models/teamModel';
import getTokenDetails from '@/utils/auth';

export default async function checkCurrentRound(req, res) {
  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);
  console.log('teamId', teamId);

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  } else {
    await connectMongoDB();
    console.log('reamID', teamId);
    const round = await TeamModel.findById(teamId);
    console.log('round', round);
    // 65a51a0184dbd8c1e549d011

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
