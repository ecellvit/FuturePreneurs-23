import time from '@/constants/time';
import connectMongoDB from '@/libs/mongodb';
import { Qualifier } from '@/models/qualifier';
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {
  await connectMongoDB();
  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }
    const startTime = Date.now();
    const endTime = startTime + 1000 * 60 * time.qualifiers; //mins

    const teamData = await Qualifier.findOne({ teamId: teamId });
    console.log('teamData', teamData);
    if (
      teamData.startTime === undefined ||
      teamData.startTime === null
    ) {
      await Qualifier.findOneAndUpdate(
        { teamId: teamId },
        { startTime: startTime, endTime: endTime }
      );
      return res.status(200).json({
        message: 'Time set successfully',
        startTime: startTime,
        endTime: endTime,
      });
    } else {
      return res.status(400).json({
        message: 'Time already set',
        startTime: teamData.startTime,
        endTime: teamData.endTime,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Some error occured',
    });
  }
}
