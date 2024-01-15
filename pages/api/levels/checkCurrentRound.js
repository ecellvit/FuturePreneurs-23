import { Mongoose } from "mongoose";
import connectMongoDB from "@/libs/mongodb";
import { TeamModel } from "@/models/teamModel";

export default async function checkCurrentRound(req,res){
    if(req.method !=='GET'){
        res.status(405).json({ message: 'Method not allowed' })
        return
    }else{
        await connectMongoDB();
        const teamName = 'team2';
        const round = await TeamModel.findOne({teamName:teamName});

        try{
            res.status(200).json({round})
          } catch(e) {
            console.log(e)
            res.status(500).json({ message: 'Internal server error', error: e.toString() })
          } 
    }
}

//  /api/admin/{token}/