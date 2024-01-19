import connectMongoDB from '@/libs/mongodb';
import { Level1 } from '@/models/level1';
import { TeamModel } from '@/models/teamModel';
import {TeamModel1} from '@/models/test';
import getTokenDetails from '@/utils/auth';
import { getSession } from 'next-auth/react';
var mongoose = require('mongoose');

export default async function handler(req, res) {
  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  } else {
    await connectMongoDB();
    // const team = await Level1test.findOne({ teamId: teamId });

    // const team = new Level1test({teamName:teamName})
    // await team.save();
    const team =await TeamModel.findById(teamId);
    console.log("********",team)
    const teamInLevel1 = await Level1.findOne({teamName:team.teamName});
    console.log("+++++++++",teamInLevel1)
    // res.status(400).json({message:n})
    const pageNo=teamInLevel1.pageNo;
    const level=team.level;
    const problems = Object.values(teamInLevel1.problemOrder);
    const newspaperset = team.newspaperset;

    try {
      if(level!==1){
        return res.status(400).json({message:'Level one is not started'})
      }
      else{
        if(team.newspaperset == null){
          return res.status(400).json({message:'newspaper not assigned'})
        }
        else{
          // console.log(typeof (Object.values(team.problemStatements)))
          if(problems.length===0){
            return res.status(400).json({message:'problem order not assigned'})
          }
          else{
            // return res.status(200).json({message:'successful'})
            
            res.status(200).json({problems:problems,pageNo:pageNo,newspaperset:newspaperset})
          }
        }
      }
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
