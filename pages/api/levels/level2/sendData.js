import correctOrderForMap from '@/constants/level2/correctOrderForMap.json';
import mapLocation from '@/constants/level2/mapLocation.json';
import mapProperties from '@/constants/level2/mapProperties.json';
import connectMongoDB from '@/libs/mongodb';
import { Level2test } from '@/models/level2';
import { TeamModel } from '@/models/teamModel';
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {
  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);

  try {
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    } else {
      const data = req.body.answer;
      console.log(data);
      await connectMongoDB();
      const teamName='vyas';
      const team=await TeamModel.findOne({teamName:teamName});
      const sector = team.sector;
      const overAllPoints = team.points;
      const level2team = await Level2test.findOne({teamName:teamName});
      let level2Points = 0
      let newOverAllPoints = 0


      const numData = JSON.parse(data)
      const newArray = []
      console.log((numData));

      for (let i = 0; i < numData.length; i++) {
        const pair = numData[i];
        const number1 = pair[0];
        const number2 = pair[1];
        console.log(mapProperties[sector][number1]);
        console.log(mapLocation[number2]);
        console.log(correctOrderForMap[sector][0]);
        if (correctOrderForMap[sector][0][mapProperties[sector][number1]] === mapLocation[number2]) {
          {console.log('Values are equal.');
          newArray.push(number1);
          newOverAllPoints+=10;
          level2Points+=10;
        }
        } else {
          console.log('Values are not equal.');
        }
      }
      console.log(newArray);

      // await Level3test.findOneAndUpdate(
      //   { teamId: teamId },
      //   { answers: data }
      // );
      console.log(level2Points)


      await Level2test.findOneAndUpdate(
        {teamName:teamName},{answers:newArray,Level2points:level2Points}
       
      );

      return res
        .status(200)
        .json({ message: 'Data saved successfully.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Some error occured' });
  }
}