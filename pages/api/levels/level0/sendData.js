// send answers
// send end time
// page no increment\
// waiting page:true

import connectMongoDB from "@/libs/mongodb";
import { Level0 } from "@/models/level0";
export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    } else {
      let numberOfAnswers = req.body.answers;
      console.log(numberOfAnswers);
      if(numberOfAnswers > 7) numberOfAnswers = 7;
      const teamName = "team1";
      await connectMongoDB();

      const teamData = await Level0.findOne({ teamName: teamName });
      const endTime = Date.now();
      const startTime = teamData.startTime;
      const timeTaken = (endTime - startTime) / 1000;
      const points = addBonus(numberOfAnswers * 10, timeTaken);

      //TODO: set points in TeamModel.

      await Level0.updateOne(
        { teamName: teamName },
        { pageNo: 2, level0Points: points }
      );
      return res
        .status(200)
        .json({
          message: "Answers submitted successfully",
          timeTaken: timeTaken,
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Some error occured" });
  }
}

function addBonus(points, timeTaken) {
  if (timeTaken < 120) {
    return points + 30;
  } else if (timeTaken < 180) {
    return points + 20;
  } else {
    return points;
  }
}
