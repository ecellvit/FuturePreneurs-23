import connectMongoDB from '@/libs/mongodb';
import { Qualifier } from '@/models/qualifier';
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {
  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  } else {
    try {
      await connectMongoDB();

      const qualTeam = await Qualifier.findOne({ teamId: teamId });
      if (!qualTeam) {
        res.status(400).json({ message: 'Team not found' });
        return;
      }

      const answerData = req.body.answer;
      console.log('answerData', answerData);
      const teamData = await Qualifier.findOne({ teamId: teamId });
      const questionPointer = teamData.questionPointer;
      const easyOrder = teamData.easyOrder;
      const mediumOrder = teamData.mediumOrder;
      const hardOrder = teamData.hardOrder;
      const easyAnswers = teamData.easyAnswers;
      const mediumAnswers = teamData.mediumAnswers;
      const hardAnswers = teamData.hardAnswers;
      const caseStudyAnswers = teamData.caseStudyAnswers;

      let questionCategory = teamData.questionCategory;
      let newQuestionPointer = questionPointer;

      console.log('easy-------', easyAnswers);
      console.log('medium-------', easyOrder);
      console.log('medium-------', questionPointer);
      if (questionCategory === 'easy') {
        easyAnswers[easyOrder[questionPointer]] = answerData;
      } else if (questionCategory == 'medium') {
        mediumAnswers[mediumOrder[questionPointer]] = answerData;
      } else if (questionCategory == 'hard') {
        hardAnswers[hardOrder[questionPointer]] = answerData;
      } else if (questionCategory == 'caseStudy') {
        caseStudyAnswers[questionPointer] = answerData;
      }

      if (questionCategory === 'easy' && questionPointer === 9) {
        newQuestionPointer = 0;
        questionCategory = 'medium';
      } else if (
        questionCategory === 'medium' &&
        questionPointer === 7
      ) {
        newQuestionPointer = 0;
        questionCategory = 'hard';
      } else if (
        questionCategory === 'hard' &&
        questionPointer === 7
      ) {
        newQuestionPointer = 0;
        questionCategory = 'caseStudy';
      } else if (
        questionCategory === 'caseStudy' &&
        questionPointer === 3
      ) {
        newQuestionPointer = 0;
        questionCategory = 'waiting';
      } else if (questionCategory == 'waiting') {
        return res
          .status(400)
          .json({ message: 'Qualifier round is completed.' });
      } else {
        newQuestionPointer = questionPointer + 1;
      }

      console.log('asdfasdfasdf', easyAnswers);

      await Qualifier.findOneAndUpdate(
        { teamId: teamId },
        {
          questionPointer: newQuestionPointer,
          questionCategory: questionCategory,
          easyAnswers: easyAnswers,
          mediumAnswers: mediumAnswers,
          hardAnswers: hardAnswers,
          caseStudyAnswers: caseStudyAnswers,
        }
      );
      return res.status(200).json({ message: 'Answer submitted' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Internal server error',
        error: err.toString(),
      });
    }
  }
}

// 10 easy, 8 med, 4 hard, 4cs
