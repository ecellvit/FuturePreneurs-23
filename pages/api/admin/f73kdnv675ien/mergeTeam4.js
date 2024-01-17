import connectMongoDB from '@/libs/mongodb';
import { TeamModel1 } from '@/models/test';
import { Users } from '@/models/user';

export default async function handler(req, res) {
  try {
    connectMongoDB();
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;

    const totalTeams1 = await TeamModel1.find();

    const totalUsers = await Users.countDocuments();
    //console.log(totalUsers);
    const usersWithNullTeamId = await Users.find({ teamId: null ,consent:true });
    console.log(usersWithNullTeamId);
    const userobj = usersWithNullTeamId.map((user) => user._id);
    console.log(userobj);
    console.log(usersWithNullTeamId.length);


    function generateRandomString(length) {
        const charset =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(
            Math.random() * charset.length
          );
          result += charset.charAt(randomIndex);
        }
        return result;
      }

      for (let i = 0; i < userobj.length; i += 4) {
        const remainingUsers = userobj.length - i;
  
        if (remainingUsers >= 4) {
          const arr = [userobj[i], userobj[i + 1], userobj[i + 2],userobj[i+3]];
  
          // Your existing code to create and save the team
          const newTeam = new TeamModel1({
            teamName: generateRandomString(8),
            members: arr,
          });
  
          await newTeam.save();
  
          for (const user of arr) {
            if (user) {
              await Users.findByIdAndUpdate(user._id, {
                teamId: newTeam._id,
              });
            }
          }
  
          count4++;
        }
    }
    const totalTeams = await TeamModel1.countDocuments();
    return res.status(200).json({
      'Total no of teams': totalTeams,
      
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
}
