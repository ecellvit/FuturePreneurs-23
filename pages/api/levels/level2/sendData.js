import correctOrder from '@/constants/level2/correctOrder.json';
import connectMongoDB from '@/libs/mongodb';
import { Level2 } from '@/models/level2';
import { TeamModel } from '@/models/teamModel';
import getTokenDetails from '@/utils/auth';

function anderHai( a, b ){
  const isObjectEqual = (obj1, obj2) => obj1.title === obj2.title && obj1.author === obj2.author
  return b.some(item => isObjectEqual(item, a));
}

export default async function handler(req, res) {
  await connectMongoDB();
  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);

  try {
    // change to POST
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    } else {
      const data = req.body.answer;

      // data = [{title:6, author:4}, {title:1, author:6}, {title:2, author:8}]
      // {title:location, author:property}

      console.log("DATA GOTTTT", data);

      const team = await TeamModel.findById(teamId);

      const set = team.newspaperset;
      const mapping = [
        "E.V",
        "Green Construction",
        "Renewable Energy",
      ]
      const sector = mapping[set]
      console.log('SECTOR', sector)

      const co = correctOrder[sector];
      console.log('CO', co)

      let points = 0;
      let anss = [];

      for (let pair of data){
        console.log('PAIR', pair)
        if (anderHai(pair, co)){
          points += 10;
          anss.push(pair.author-1)
        }
      }

      console.log('ansss', points, anss)

      if (anss.length===0) {
        points -= 20;
        let n1 = Math.floor(Math.random() * 7)
        let n2 = n1+1
        if (n2==7){
          n2 = 5
        }
        anss.push(n1)
        anss.push(n2)
      } else if (anss.length===1) {
        points -= 10;
        let n1 = Math.floor(Math.random() * 7)
        anss.push(n1)
      }

      await Level2.findOneAndUpdate(
        {teamId:teamId},{answers:anss, Level2points:points, pageNo:2}
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