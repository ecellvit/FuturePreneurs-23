import connectMongoDB from "@/libs/mongodb";
import { Level1 } from "@/models/level1";
// import { Level0Model } from "@/models/level0";
import { TeamModel } from "@/models/teamModel";
import getTokenDetails from "@/utils/auth";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {

  const session = await getSession({req});
  let teamId = await getTokenDetails(session)

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  } else {

    await connectMongoDB();
    const team = await Level1.findOne({teamId: teamId});

    try{
      res.status(200).json(team)
    } catch(e) {
      console.log(e)
      res.status(500).json({ message: 'Internal server error', error: e.toString() })
    } 
  }
}