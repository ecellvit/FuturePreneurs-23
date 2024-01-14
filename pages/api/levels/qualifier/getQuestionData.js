import connectMongoDB from "@/libs/mongodb";
import { Qualifier } from "@/models/qualifier"
import { TeamModel } from "@/models/teamModel";

export default async function handler(req,res){
    if(req.method !=='GET'){
        res.status(405).json({ message: 'Method not allowed' })
        return
    }else{
        await connectMongoDB();
        const teamName = 'team2';
        const qualTeam = await Qualifier.findOne({teamName:teamName});
        if(!qualTeam){
            res.status(400).json({ message: 'Team not found' })
        }
        const team = await TeamModel.findOne({teamName:teamName});
        if (team.level!==-1) {
          res.status(400).json({ message: 'Qualifier is not right now' })
        } else {
          
          

          res.status(200).json({category:qualTeam.questionCategory, questionPointer:qualTeam.questionPointer})
        }

        try{
            res.status(200).json({qualTeam})
          } catch(e) {
            console.log(e)
            res.status(500).json({ message: 'Internal server error', error: e.toString() })
          } 
    }
}
