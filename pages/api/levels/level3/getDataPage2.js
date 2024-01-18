import connectMongoDB from "@/libs/mongodb";
import { Level3test } from "@/models/level3test";
import { TeamModel } from "@/models/teamModel";
import getTokenDetails from "@/utils/auth";

export default async function handler(req, res) {
  // const auth = req.headers.authorization.split(" ")[1];
  // console.log("auth", auth);
  // let teamId = await getTokenDetails(auth);

  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    await connectMongoDB();
    const qualTeam = await Level3test.findOne({ teamName: 'vyas' });
    if (!qualTeam) {
      res.status(400).json({ message: "Team not found" });
      return;
    }
    try {
      // console.log("asdf", teamId);
      const team = await TeamModel.findOne({teamName:'vyas'});
      console.log("AGFFaf", team);
      if (team.level !== 3) {
        res.status(400).json({ message: "Level3 is not right now" });
        return;
      } else {
        const teamData = await Level3test.findOne({ teamName: 'vyas' });
        const teamDataSector = await TeamModel.findOne({ teamName: 'vyas' });
        const sector = teamDataSector.sector;
        console.log("teamData", teamData);
        const answers = teamData.answers;
        console.log("ANSWERS_______________________", answers);
        return res.status(200).json({
          answers: answers,
          sector: sector,
        });
      }
    } catch {
      res.status(400).json({ message: "Can't get the data" });
    }
  }
}

// question number, category
