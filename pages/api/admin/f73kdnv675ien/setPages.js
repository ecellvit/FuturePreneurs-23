//
import connectMongoDB from '@/libs/mongodb';
import { TeamModel } from '@/models/teamModel';
import { Level0 } from '@/models/level0';
import { Level1 } from '@/models/level1';
import { Level2 } from '@/models/level2';
import { Level3 } from '@/models/level3';
import { Level4 } from '@/models/level4';

export default async function handler(req, res) {
  try {
    connectMongoDB();

    const teams = await Level4.find();
    console.log(teams);
    let pageNo;
    for (let team of teams) {
      pageNo = team.pageNo;
      pageNo = 1;
      await Level0.findOneAndUpdate(
        { teamId: team.teamId },
        {
          $set: {
            pageNo: pageNo,
          },
        }
      );
    }

    return res.status(200).json({
      message: 'correct',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Something went wrong',
      e: error.toString(),
    });
  }
}
