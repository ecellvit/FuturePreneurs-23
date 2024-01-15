import connectMongoDB from "@/libs/mongodb";
import { Qualifier } from "@/models/qualifier";
import { TeamModel } from "@/models/teamModel";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    await connectMongoDB();
    const teamName = "team2";
    const qualTeam = await Qualifier.findOne({ teamName: teamName });
    if (!qualTeam) {
      res.status(400).json({ message: "Team not found" });
    }
    const team = await TeamModel.findOne({ teamName: teamName });
    if (team.level !== -1) {
      res.status(400).json({ message: "Qualifier is not right now" });
    } else {
      const teamData = await Qualifier.findOne({ teamName: teamName });
      const questionCatogory = teamData.questionCategory;
      const pointer = teamData.questionPointer;
      const easyOrder = teamData.easyOrder;
      const mediumOrder = teamData.mediumOrder;
      const hardOrder = teamData.hardOrder;
      let questionNumber = 0;

      if (questionCatogory == "waiting") {
        return res
          .status(400)
          .json({ message: "Qualifier round is completed." });
      }
      if (questionCatogory === "easy") {
        questionNumber = easyOrder[pointer];
      } else if (questionCatogory === "medium") {
        questionNumber = mediumOrder[pointer];
      } else if (questionCatogory === "hard") {
        questionNumber = hardOrder[pointer];
      } else if (questionCatogory === "caseStudy") {
        questionNumber = pointer;
      }
      else{
        return res.status(400).json({ message: "Question type is incorrect" });
      }

      res.status(200).json({
        category: questionCatogory,
        questionNumber: pointer,
      });
    }

    try {
      res.status(200).json({ qualTeam });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "Internal server error", error: e.toString() });
    }
  }
}

// question number, category
