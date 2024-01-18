import connectMongoDB from "@/libs/mongodb";
import { Level3 } from "@/models/level3";
import { TeamModel } from "@/models/teamModel";
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {
  const auth = req.headers.authorization.split(" ")[1];
  let teamId = await getTokenDetails(auth);

  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    await connectMongoDB();
    const qualTeam = await Level3.findOne({ teamId: teamId });
    if (!qualTeam) {
      res.status(400).json({ message: "Team not found" });
      return;
    }
    try {
      // console.log("asdf", teamId);
      const team = await TeamModel.findById(teamId);
      if (team.level !== 3) {
        res.status(400).json({ message: "Level3 is not right now" });
        return;
      } else {
        const teamData = await Level3.findOne({ teamId: teamId });
        const teamDataSector = await TeamModel.findById(teamId);
        const sector = teamDataSector.newspaperset;
        const answers = teamData.answers;
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
