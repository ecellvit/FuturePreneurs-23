import connectMongoDB from "@/libs/mongodb";
import { Qualifier } from "@/models/qualifier";
import { TeamModel } from "@/models/teamModel";
import getTokenDetails from "@/utils/auth";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {

  const session = await getSession({req});
  let teamId = await getTokenDetails(session);

  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    await connectMongoDB();
    const qualTeam = await Qualifier.findOne({ teamId: teamId});
    if (!qualTeam) {
      res.status(400).json({ message: "Team not found" });
    }
    const team = await TeamModel.findOne({ teamId: teamId});
    if (team.level !== -1) {
      res.status(400).json({ message: "Qualifier is not right now" });
    } else {
      const teamData = await Qualifier.findOne({ teamId: teamId});
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
      else if(questionCatogory === "instruction"){
        return res.status(200).json({ category: "instruction", questionNumber: -1 });
      }
      else if(questionCatogory === "waiting"){
        return res.status(200).json({ category: "waiting", questionNumber: -1 });
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
