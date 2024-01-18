// to store the choices(page2)
import connectMongoDB from '@/libs/mongodb';
import getTokenDetails from '@/utils/auth';
import { TeamModel } from '@/models/teamModel';
import correctOrder from '@/constants/level3/correctOrder.json';
import { Level3 } from '@/models/level3';

// import { TeamModel } from '@/models/teamModel';

export default async function handler(req, res) {
  const auth = req.headers.authorization.split(' ')[1];
  let teamId = await getTokenDetails(auth);

  try {
    connectMongoDB();

    // Assuming req.body contains the received data from the frontend
    const receivedData = req.body;

    // let receivedData = {"answerPage2": {
    //   'EcoCycle Center: Maritime Oasis': 'Kerala, India',
    //   'Community Sustainability Hub: ElevaTech District': 'Assam, India'  
    // }}

    const chosenOptions = receivedData.answerPage2;

    const team=await TeamModel.findById(teamId);
    const industry=["E.V", "Green Construction", "Renewable Energy"]

    const sector = industry[team.newspaperset]

    let points = 0;

    Object.keys(chosenOptions).forEach((key) => {
      console.log('key', key, correctOrder[sector][key])
      if (chosenOptions[key] == correctOrder[sector][key]) {
        points += 10;
      }
    });

    const choices = Object.keys(chosenOptions)

    await Level3.findOneAndUpdate({teamId:teamId},{$set:{choice:choices, Level3points:points ,pageNo:3}})
   
    res.status(200).json({
      message: 'Data stored successfully'
    });
  } catch (e) {
    console.error('Error in handler:', e);
    res.status(500).json({
      message: 'Internal server error',
      error: e.toString(),
    });
  }
}
