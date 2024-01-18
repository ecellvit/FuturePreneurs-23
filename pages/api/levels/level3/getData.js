import connectMongoDB from '@/libs/mongodb';
import { Level3 } from '@/models/level3';
import { TeamModel } from '@/models/teamModel';
import getTokenDetails from '@/utils/auth';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await connectMongoDB();

  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  } else {

    const team = await TeamModel.findById(teamId);
    console.log('team', team)
    const teamInLevel3 = await Level3.findOne({teamId:teamId});

    const pageNo=teamInLevel3.pageNo;

    try {
      res.status(200).json({"team":teamInLevel3, "set":team.newspaperset })
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