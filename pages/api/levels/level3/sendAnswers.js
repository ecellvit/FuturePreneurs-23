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
import { TeamModel } from '@/models/teamModel';
import { Level2test } from '@/models/level2test';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  try {

    connectMongoDB();

  
    const teams = await TeamModel.find();
    //console.log(teams);
    
    if (!teams) {
      return res.status(404).json({ message: 'Teams not found' });
    }

  
    const teamName = "vyas";

    
    const team = await Level2test.findOne({ teamName:teamName });
    const team1=await TeamModel.findOne({teamName:teamName});
    
    const sector=team1.sector;
    console.log(sector);
    console.log(team);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    
    const answers = team.answers;
    console.log(answers);
    // Send the answers in the response
    res.status(200).json({
      message: sector,answers
    });
  } catch (e) {
    console.error('Error in handler:', e);
    res.status(500).json({
      message: 'Internal server error',
      error: e.toString(),
    });
  }
}
