import connectMongoDB from "@/libs/mongodb";
import { Qualifier } from "@/models/qualifier";
import { TeamModel } from "@/models/teamModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    try {
      await connectMongoDB();
      const teamName = "team1";

      const qualTeam = await Qualifier.findOne({ teamName: teamName });
      if (!qualTeam) {
        res.status(400).json({ message: "Team not found" });
        return;
      }

      res.status(200).json({ message: "Answer submitted" });
      const answerData = req.body;
      console.log("answerData", answerData);
      const teamData = await Qualifier.findOne({ teamName: teamName });
      const questionPointer = teamData.questionPointer;
      console.log(questionPointer);
      const userAnswers = teamData.userAnswers;
      userAnswers[questionPointer] = answerData;
      await Qualifier.updateOne(
        { teamName: teamName },
        { userAnswers: userAnswers,
          questionPointer: questionPointer + 1 }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
        error: e.toString(),
      });
    }
  }
}

// 10 easy, 8 med, 4 hard, 1cs
