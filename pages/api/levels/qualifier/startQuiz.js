import { Qualifier } from '@/models/qualifier';
import connectMongoDB from '@/libs/mongodb';
import { getSession } from 'next-auth/react';
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {

  connectMongoDB();

  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);

  try {

    let startTime = new Date('January 16, 2024 13:20:00');
    startTime.toTimeString();
    startTime = startTime - 4;
    console.log(startTime);
    const currentTime = Date.now();

    console.log(currentTime);

    if (Math.abs(currentTime - startTime) <= 600000) {
      await Qualifier.findOneAndUpdate(
        { teamId: teamId },
        {
          $set: {
            questionCategory: 'easy',
            questionPointer: 0,
          },
        }
      );
      res.status(200).json({
        message: 'Qualifier round started',
      });
    } else if (currentTime < startTime) {
      res.status(403).json({
        message: 'Quiz has not started yet',
      });
    } else {
      res.status(404).json({
        message: 'Too late',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Something went wrong',
      e: error.toString(),
    });
  }
}
