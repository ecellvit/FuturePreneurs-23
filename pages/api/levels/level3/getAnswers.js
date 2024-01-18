/*
import connectMongoDB from '@/libs/mongodb';
import { TeamModel } from '@/models/test';
import getTokenDetails from '@/utils/auth';
import { getSession } from 'next-auth/react';
import {Level3test} from '@/models/level3'

export default async function handler(req, res) {
  try {
    connectMongoDB();
    const teams = await TeamModel.find();
    console.log(teams);
    const answers_arr = [];
    const teamName="vyas";
    const team=await Level3test.findOne(teamName);
    console.log(team);
    const ans=team.answers;
   
      


      
    

    res.status(200).json({
      message: ans
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Internal server error',
      error: e.toString(),
    });
  }
}
*/


// to send the data to the frontend in the form of an array (recieved from map)
import connectMongoDB from '@/libs/mongodb';
import { Level2 } from '@/models/level2';
import { TeamModel } from '@/models/teamModel';
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {
  try {

    connectMongoDB();
    const auth = req.headers.authorization.split(' ')[1];
    let teamId = await getTokenDetails(auth);
  
    const teamteam = await TeamModel.findById(teamId);
    //console.log(team);
    
    if (!teamteam) {
      return res.status(404).json({ message: 'Teams not found' });
    }

    const team = await Level2.findOne({teamId:teamId});
    
    const sector = teamteam.newspaperset;

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    const answers = team.answers;

    // Send the answers in the response
    res.status(200).json({
      "sector": sector,
      "answers":answers
    });
  } catch (e) {
    console.error('Error in handler:', e);
    res.status(500).json({
      message: 'Internal server error',
      error: e.toString(),
    });
  }
}
