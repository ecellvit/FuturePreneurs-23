// send answers
// send end time
// page no increment\
// waiting page:true
import connectMongoDB from '@/libs/mongodb';
import {Level1} from '@/models/level1';
import getTokenDetails from '@/utils/auth';

export default async function handler(req, res) {
    const auth = req.headers.authorization.split(' ')[1];
    let teamId = await getTokenDetails(auth);
  
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    } else {
        await connectMongoDB();
        let level1Points=0;
        console.log("qweqerqtiuqwnbfihqb");
        console.log(req.body);
        const answerForLevel1 = req.body.answer;
        console.log(answerForLevel1)

        const teamLevelOne = await Level1.findOne({teamId:teamId})
        if (!teamLevelOne) {
            res.status(400).json({ message: 'Team not found' });
            return;
          }
        console.log(teamLevelOne)
        const pageNo = teamLevelOne.pageNo;
        const curPage= pageNo+1;
        const problemOrder =Object.values( teamLevelOne.problemOrder);
        console.log("adfgadgfgsfgd",problemOrder)
        const answerOrder =Object.values( answerForLevel1);
        console.log("Anser arrayyyyyyyy=", answerOrder);
        if((problemOrder[0]+1)==answerOrder[0]){
          console.log("1 is correct");
            level1Points+=20;
        }
        if((problemOrder[1]+1)==answerOrder[1]){
            level1Points+=15;
        }
        if((problemOrder[2]+1)==answerOrder[2]){
            level1Points+=10;
        }
        if((problemOrder[3]+1)==answerOrder[3]){
            level1Points+=5;
        }
        console.log("points=", level1Points);

      try {
        await Level1.findOneAndUpdate({teamId:teamId},{level1Points:level1Points})
        await Level1.findOneAndUpdate({teamId:teamId},{pageNo:curPage})
        res.status(200).json({message:answerForLevel1,message:'successful'})
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Internal server error',
          error: err.toString(),
        });
      }
    }
  }