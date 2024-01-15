import connectMongoDB from "@/libs/mongodb";
import { Level1 } from "@/models/level1";
// import { Level0Model } from "@/models/level0";
import { TeamModel } from "@/models/teamModel";
import getTokenDetails from "@/utils/auth";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {

  const session = await getSession({req});
  console.log('session', session);
  let token = await getTokenDetails(session)
  console.log('asdf', token);

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  } else {
    // read which questoin the user is in, endTime from db, send to user.
    console.log('asdf', token)
    // const authToken = req.headers.authorization;
    // check if leader, auth etc.

    const teamName = 'team1';

    await connectMongoDB();
    const team = await Level1.findOne({teamName: teamName});
    // const team = new Level1({teamName: teamName});
    // await team.save();

    // const tesmLevelData = await Level0Model.find({teamId: teams[0]._id});

    console.log(team)

    try{
      res.status(200).json({team})
    } catch(e) {
      console.log(e)
      res.status(500).json({ message: 'Internal server error', error: e.toString() })
    } 
  }
}