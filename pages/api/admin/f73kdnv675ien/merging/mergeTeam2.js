import connectMongoDB from '@/libs/mongodb';
import { TeamModel1 } from '@/models/test';
import { Users } from '@/models/user';


export default async function handler(req, res) {
    try {
        connectMongoDB();
        const totalTeams1 = await TeamModel1.find();
        const usersWithNullTeamId = await Users.find({ teamId: null });

        const userobj = usersWithNullTeamId.map((user) => user._id);

        let count = 0;
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;
        
        for (const team of totalTeams1) {
            if (team.members.length === 2) {
              const oneMemberTeam1 = totalTeams1.find(
                (t) => t.members.length === 2 && t.teamName != team.teamName
              );
              //const oneMemberTeam2=totalTeams1.find(t=>t.members.length===1)
              if (oneMemberTeam1) {
                const memberToRemove1 = team.members.pop();
                const memberToRemove2 = team.members.pop();
                console.log(memberToRemove1);
                console.log(memberToRemove2);
                oneMemberTeam1.members.push(memberToRemove1,memberToRemove2);
                await team.save();
                await oneMemberTeam1.save();
                await TeamModel1.deleteOne({ _id: team._id });
              } else {
                count2++;
              }
            } else if (team.members.length === 1) {
              count1++;
            } else if (team.members.length === 3) {
              count3++;
            } else if (team.members.length === 4) {
              count4++;
            }
          }
      
        const totalTeams = await TeamModel1.countDocuments();
        return res.status(200).json({
          'Total no of teams': totalTeams,
          'No of 4- member teams': count4,
          'No of 3- member teams': count3,
          'No of 2- member teams': count2,
          'No of 1- member teams': count1,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: 'Something went wrong',
        });
      }
    }
    