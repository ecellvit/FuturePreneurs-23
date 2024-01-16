import connectMongoDB from '@/libs/mongodb';
import { Qualifier } from '@/models/qualifier';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  } else {
    await connectMongoDB();

    const qualTeams = await Qualifier.find();
    if (!qualTeams) {
      res.status(400).json({ message: 'Team not found' });
    }

    for(let i = 0; i < qualTeams.length; i++) {

    const easy = [];
    const medium = [];
    const hard = [];

    const easyLength = 10;
    const mediumLength = 8;
    const hardLength = 4;

    const getRandomUniqueNumberEasy = (array) => {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 30) + 1;
      } while (array.includes(randomNumber));
      return randomNumber;
    };

    const getRandomUniqueNumberMedium = (array) => {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 25) + 1;
      } while (array.includes(randomNumber));
      return randomNumber;
    };

    const getRandomUniqueNumberHard = (array) => {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 20) + 1;
      } while (array.includes(randomNumber));
      return randomNumber;
    };

    // Fill easy array with unique random numbers
    for (let i = 0; i < easyLength; i++) {
      easy.push(getRandomUniqueNumberEasy(easy));
    }

    // Fill medium array with unique random numbers
    for (let i = 0; i < mediumLength; i++) {
      medium.push(getRandomUniqueNumberMedium(medium));
    }

    // Fill hard array with unique random numbers
    for (let i = 0; i < hardLength; i++) {
      hard.push(getRandomUniqueNumberHard(hard));
    }

    //randomise easy array
    for (let i = easyLength - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [easy[i], easy[j]] = [easy[j], easy[i]];
    }
    //randomise medium array
    for (let i = mediumLength - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [medium[i], medium[j]] = [medium[j], medium[i]];
    }
    //randomise hard array
    for (let i = hardLength - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [hard[i], hard[j]] = [hard[j], hard[i]];
    }
    qualTeams[i].easyOrder = easy;
    qualTeams[i].mediumOrder = medium;
    qualTeams[i].hardOrder = hard;
    await qualTeams[i].save();
  }
    try {
      res.status(200).json({ "message":"success" });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({
          message: 'Internal server error',
          error: e.toString(),
        });
    }
  }
}
