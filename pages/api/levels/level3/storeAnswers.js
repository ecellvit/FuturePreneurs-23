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


// to store the answers of the user (page1)
import connectMongoDB from '@/libs/mongodb';
import { TeamModel } from '@/models/teamModel';
import { Level3test } from '@/models/level3test';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  try {

    connectMongoDB();

    const teamName="vyas"
    const answers=req.body.answerPage1;
    const team=await TeamModel.findOne({teamName:teamName});
    console.log(team);
    await Level3test.findOneAndUpdate({teamName:teamName}, {$set:{answers:answers,pageNo:2}});

    await 
    res.status(200).json({
      message: "successfull"
    });
  } catch (e) {
    console.error('Error in handler:', e);
    res.status(500).json({
      message: 'Internal server error',
      error: e.toString(),
    });
  }
}
