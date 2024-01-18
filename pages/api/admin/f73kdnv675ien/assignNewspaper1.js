import connectMongoDB from "@/libs/mongodb";

const Industry = ['E.V', 'Green Construction', 'Renewable Energy'];

export default async function handler(req, res) {
  
  connectMongoDB();
  const teams = await TeamModel.find();

  let i=0;

  for (let team of teams){

    if (i==0){
      await TeamModel.findOneAndUpdate(
        { teamName: team.teamName },
        {
          $set: {
            set: 0,
          },
        }
      );
    } else if (i==1){
      await TeamModel.findOneAndUpdate(
        { teamName: team.teamName },
        {
          $set: {
            set: 0,
          },
        }
      );
    } else if (i==2){
      await TeamModel.findOneAndUpdate(
        { teamName: team.teamName },
        {
          $set: {
            set: 0,
          },
        }
      );
    }
    i = i+1

    i = i%3;

    
  }
  return res.status(200).json({message:'sets lag gaye hai'})

}