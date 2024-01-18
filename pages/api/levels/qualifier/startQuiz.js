import { Qualifier } from '@/models/qualifier';
import connectMongoDB from '@/libs/mongodb';
import { getSession } from 'next-auth/react';
import getTokenDetails from '@/utils/auth';
import time from '@/constants/time.json';

export default async function handler(req, res) {

  connectMongoDB();

  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);

  try {

    // let startTime = new Date(`January ${time.quizStartTime.day}, 2024 ${time.quizStartTime.hour}:${time.quizStartTime.minute}:${time.quizStartTime.second}`);
    // startTime.toTimeString();
    // startTime = startTime - 4;
    // console.log(startTime);
    
    // const currentTime = new Date();
    // const currentTime = startTime;

    // console.log('curentTime', currentTime, 'startTime', startTime);
    // console.log('asdf', Math.abs(currentTime - startTime))

    // if (Math.abs(currentTime - startTime) <= 20 * 60 * 1000) {
    //   console.log('correct')
      // await Qualifier.findOneAndUpdate(
      //   { teamId: teamId },
      //   {
      //     $set: {
      //       questionCategory: 'easy',
      //       questionPointer: 0,
      //     },
      //   }
      // );
      res.status(400).json({
        message: 'Qualifier round started',
      });
    // } else if (currentTime < startTime) {
    //   res.status(403).json({
    //     time: currentTime,
    //     message: 'Quiz has not started yet',
    //   });
    // } else {
    //   res.status(404).json({
    //     time: currentTime,
    //     message: 'Too late',
    //   });
    // }
  } catch (error) {
    return res.status(500).json({
      error: 'Something went wrong',
      e: error.toString(),
    });
  }
}
