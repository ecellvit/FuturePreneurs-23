import connectMongoDB from '@/libs/mongodb';
import { Qualifier } from '@/models/qualifier';
import { TeamModel } from '@/models/teamModel';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  } else {
    try {
      await connectMongoDB();
      const teamName = 'team1';

      const qualTeam = await Qualifier.findOne({ teamName: teamName })
      if (!qualTeam) {
        res.status(400).json({ message: 'Team not found' })
        return
      }

      // const secondQual = await Qualifier.findAndUpdate({ teamName: teamName }, { : req.body.answer })

      res.status(200).json({ message: 'Answer submitted' });

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
