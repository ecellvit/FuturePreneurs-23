import connectMongoDB from '@/libs/mongodb';
import { Qualifier } from '@/models/qualifier';
import { TeamModel } from '@/models/teamModel';
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {
  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  } else {
    await connectMongoDB();
    const qualTeam = await Qualifier.findOne({ teamId: teamId });
    if (!qualTeam) {
      res.status(400).json({ message: 'Team not found' });
      return
    }
    const team = await TeamModel.findById(teamId);
    if (team.level !== -1) {
      res.status(400).json({ message: 'Qualifier is not right now' });
      return
    } else {

      const teamData = await Qualifier.findOne({ teamId: teamId });

      const questionCatogory = teamData.questionCategory;
      const pointer = teamData.questionPointer;
      const easyOrder = teamData.easyOrder;
      const mediumOrder = teamData.mediumOrder;
      const hardOrder = teamData.hardOrder;
      let questionNumber = 0;

      if (questionCatogory == 'waiting') {
        return res
          .status(400)
          .json({ message: 'Qualifier round is completed.' });
      }
      if (questionCatogory === 'easy') {
        questionNumber = easyOrder[pointer];
      } else if (questionCatogory === 'medium') {
        questionNumber = mediumOrder[pointer];
      } else if (questionCatogory === 'hard') {
        questionNumber = hardOrder[pointer];
      } else if (questionCatogory === 'caseStudy') {
        questionNumber = pointer;
      } else if (questionCatogory === 'instruction') {
        return res
          .status(200)
          .json({ category: 'instruction', questionNumber: -1, teamName:teamData.teamName });
      } else if (questionCatogory === 'waiting') {
        return res
          .status(200)
          .json({ category: 'waiting', questionNumber: -1, teamName:teamData.teamName });
      }

      return res.status(200).json({
        category: questionCatogory,
        questionNumber: questionNumber,
        chronoNumber: pointer,
        teamName: teamData.teamName,
      });
    }

  }
}

// question number, category
