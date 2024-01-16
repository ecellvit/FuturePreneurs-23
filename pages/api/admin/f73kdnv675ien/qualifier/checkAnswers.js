import answers from '@/constants/qualifiers/answers.json';
import gamePoints from '@/constants/qualifiers/points.json';
import connectMongoDB from '@/libs/mongodb';
import { Qualifier } from '@/models/qualifier';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    await connectMongoDB();

    const qualTeam = await Qualifier.findOne({ teamId: teamId });
    if (!qualTeam) {
      res.status(400).json({ message: 'Team not found' });
      return;
    }

    let points = 0;
    const qualifierData = await Qualifier.findOne({ teamId: teamId });
    const easyAnswers = qualifierData.easyAnswers;
    const mediumAnswers = qualifierData.mediumAnswers;
    const hardAnswers = qualifierData.hardAnswers;
    const caseStudyAnswers = qualifierData.caseStudyAnswers;

    console.log(answers.easyAnswers.length);
    // for comparing easy answers
    for (
      let pointer = 0;
      pointer < answers.easyAnswers.length;
      pointer++
    ) {
      if (typeof answers.easyAnswers[pointer] === 'number') {
        if (easyAnswers[pointer] === answers.easyAnswers[pointer]) {
          points += gamePoints.easyPoints;
        }
      } else if (typeof answers.easyAnswers[pointer] === 'object') {
        if (
          compareArrays(
            easyAnswers[pointer],
            answers.easyAnswers[pointer]
          )
        ) {
          points += gamePoints.easyPoints;
        }
      }
    }
    // for comparing medium answers
    for (
      let pointer = 0;
      pointer < answers.mediumAnswers.length;
      pointer++
    ) {
      if (typeof answers.mediumAnswers[pointer] === 'number') {
        if (
          mediumAnswers[pointer] === answers.mediumAnswers[pointer]
        ) {
          points += gamePoints.mediumPoints;
        }
      } else if (typeof answers.mediumAnswers[pointer] === 'object') {
        if (
          compareArrays(
            mediumAnswers[pointer],
            answers.mediumAnswers[pointer]
          )
        ) {
          points += gamePoints.mediumPoints;
        }
      }
    }
    // for comparing hard answers
    for (
      let pointer = 0;
      pointer < answers.hardAnswers.length;
      pointer++
    ) {
      if (typeof answers.hardAnswers[pointer] === 'number') {
        if (hardAnswers[pointer] === answers.hardAnswers[pointer]) {
          points += gamePoints.hardPoints;
        }
      } else if (typeof answers.hardAnswers[pointer] === 'object') {
        if (
          compareArrays(
            hardAnswers[pointer],
            answers.hardAnswers[pointer]
          )
        ) {
          points += gamePoints.hardPoints;
        }
      }
    }
    // for comparing caseStudy answers
    for (
      let pointer = 0;
      pointer < answers.caseStudyAnswers.length;
      pointer++
    ) {
      if (typeof answers.caseStudyAnswers[pointer] === 'number') {
        if (
          caseStudyAnswers[pointer] ===
          answers.caseStudyAnswers[pointer]
        ) {
          points += gamePoints.caseStudyPoints;
        }
      } else if (
        typeof answers.caseStudyAnswers[pointer] === 'object'
      ) {
        if (
          compareArrays(
            caseStudyAnswers[pointer],
            answers.caseStudyAnswers[pointer]
          )
        ) {
          points += gamePoints.caseStudyPoints;
        }
      }
    }

    await Qualifier.findOneAndUpdate(
      { teamId: teamId },
      { points: points }
    );

    return res
      .status(200)
      .json({
        message: 'Points updated successfully',
        points: points,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
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
