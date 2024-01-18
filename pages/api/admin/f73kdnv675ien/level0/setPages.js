//
import connectMongoDB from "@/libs/mongodb";
import { TeamModel } from "@/models/teamModel";
import { Level0 } from "@/models/level0";

export default async function handler(req, res) {
  try {
    connectMongoDB();

      const teams = await Level0.find();
      console.log(teams);
      let pageNo;
      for (let team of teams) {
        pageNo = team.pageNo;
        pageNo = 0;
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
      message: "correct",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
      e: error.toString(),
    });
  }
}
