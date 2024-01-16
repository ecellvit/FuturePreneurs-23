import { Mongoose } from "mongoose";
import connectMongoDB from "@/libs/mongodb";
import { TeamModel } from "@/models/teamModel";
import getTokenDetails from "@/utils/auth";
import { getSession } from "next-auth/react";

export default async function checkCurrentRound(req,res){

    const session = await getSession({req});
    console.log('session', session)
    let teamId = await getTokenDetails(session);
    console.log('teamId', teamId)

    if(req.method !=='GET'){
        res.status(405).json({ message: 'Method not allowed' })
        return
    }else{
        await connectMongoDB();
        console.log('reamID', teamId)
        const round = await TeamModel.findById(teamId);
        console.log('round', round)

        try{
            res.status(200).json({round})
          } catch(e) {
            console.log(e)
            res.status(500).json({ message: 'Internal server error', error: e.toString() })
          } 
    }
}

//  /api/admin/{token}/