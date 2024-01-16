import time from '@/constants/time';
import connectMongoDB from '@/libs/mongodb';
import { Qualifier } from '@/models/qualifier';
import { Settings } from '@/models/settings';
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {
  await connectMongoDB();
  // const auth = req.headers.authorization.split(' ')[1];
  // let teamId = await getTokenDetails(auth);

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }

      const settings = await Settings.find();
      const time = settings[0];

      return res.status(200).json(time);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Some error occured',
    });
  }
}
