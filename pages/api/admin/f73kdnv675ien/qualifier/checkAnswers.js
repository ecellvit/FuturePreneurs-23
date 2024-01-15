import connectMongoDB from "@/libs/mongodb";
import { Qualifier } from "@/models/qualifier";
import answers from "@/constants/qualifiers/answers.json";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    await connectMongoDB();
    const teamName = "team2";

    const qualTeam = await Qualifier.findOne({ teamName: teamName });
    if (!qualTeam) {
      res.status(400).json({ message: "Team not found" });
      return;
    }

    const qualifierData = await Qualifier.findOne({ teamName: teamName });
    const easyAnswers = qualifierData.easyAnswers;
    const mediumAnswers = qualifierData.mediumAnswers;
    const hardAnswers = qualifierData.hardAnswers;
    const caseStudyAnswers = qualifierData.caseStudyAnswers;
    console.log("adsgfasg");
    console.log(answers);
    
    return res.status(200).json({message:"API HIT "});
  } catch (err) {
    console.log(err.toString());
    return res.status(500).json({ error: "Internal server error" });
  }
}

function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Convert arrays to sets
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  // Check if sets are equal
  return arraysAreEqual(Array.from(set1), Array.from(set2));
}

function arraysAreEqual(array1, array2) {
    return array1.every((element) => array2.includes(element));
}
