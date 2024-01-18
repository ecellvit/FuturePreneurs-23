
// to store the choices(page2)


import connectMongoDB from '@/libs/mongodb';
import { Level3test } from '@/models/level3test';
import { TeamModel } from '@/models/teamModel';

export default async function handler(req, res) {
  try {
    connectMongoDB();

    // Assuming req.body contains the received data from the frontend
    const receivedData = req.body.answerPage2;
    const teamName="vyas"
    const team=await TeamModel.findOne({teamName:teamName});
    await Level3test.findOneAndUpdate({teamName:teamName},{$set:{choice:receivedData}})

   
    res.status(201).json({
      message: 'Data stored successfully'
    });
  } catch (e) {
    console.error('Error in handler:', e);
    res.status(500).json({
      message: 'Internal server error',
      error: e.toString(),
    });
  }
}
