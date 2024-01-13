//
import connectMongoDB from '@/libs/mongodb';
import { TeamModel } from '@/models/teamModel';
import {Level0} from '@/models/level0';



export default async function handler(req, res){
    try{
        connectMongoDB()

        const teamName="team1";
        const v=await Level0.findOne({teamName:"team1"});
        console.log(v.pageNo)
        const pageNumber=teamName.pageNo
        const count=await TeamModel.countDocuments();
        //console.log(TeamModel)
        //console.log(count);
        //console.log(Level0)

        const teams = await Level0.find();
        console.log(teams);
        let pageNo;
        for(let team of teams) {
           
            pageNo = team.pageNo
            pageNo += 1
            await Level0.findOneAndUpdate({teamName:team.teamName},
            {$set:{
                pageNo:pageNo
            }})
        }

       
        return res.status(200).json({
            message:"correct"
        })
        
    } catch (error){
        return res.status(500).json({
            error:"Something went wrong",
            e:error.toString()
        })
    }
}

