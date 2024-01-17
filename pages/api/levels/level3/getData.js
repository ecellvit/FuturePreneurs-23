import connectMongoDB from '@/libs/mongodb';
import { Level3test } from '@/models/level3test';
import { TeamModel } from '@/models/teamModel';
// import { Level0Model } from "@/models/level0";
import getTokenDetails from '@/utils/auth';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  let teamId = await getTokenDetails(session);

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  } else {
    await connectMongoDB();
    const teamName = 'vyas'
    // const team = await Level1test.findOne({ teamId: teamId });

    // const team = new Level3test({teamName:teamName})
    // await team.save();
    // const teamId ='65a51a0ef7b023b3e7ff0fd4'
    const team =await TeamModel.findOne({teamName:teamName});
    console.log('Team is ', team);
    const teamInLevel3 = await Level3test.findOne({teamName:teamName});
    // if(!teamInLevel3){
        
    // }
    // res.status(400).json({message:n})
    const pageNo=teamInLevel3.pageNo;
    console.log(teamInLevel3.pageNo)
    const level=team.level;
    console.log(pageNo)
    // const problems = Object.values(teamInLevel3.problemOrder);
    // const sector = team.sector;
    // console.log(sector);

    try {
      res.status(200).json({pageNo:pageNo})
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