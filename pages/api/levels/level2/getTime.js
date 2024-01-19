import time from '@/constants/time';
import connectMongoDB from '@/libs/mongodb';
import { Level2 } from '@/models/level2';
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {
  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);
  console.log('asdf', teamId)

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }
    const startTime =  Date.now();
    const endTime = startTime + 1000 * 60 * time.level2; //mins
    console.log("START TIME END TIMEEEEEE", startTime);
    console.log("START TIME END TIMEEEEEE", endTime);
    await connectMongoDB();
    const teamData = await Level2.findOne({ teamId: teamId });
    console.log(teamData.startTime);
    if (
      teamData.startTime === undefined ||
      teamData.startTime === null
    ) {
        console.log("Setting time.  ")
      await Level2.findOneAndUpdate(
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
