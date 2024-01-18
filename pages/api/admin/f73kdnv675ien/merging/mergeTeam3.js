// to take 2 member from teamId==null and consent=true and merge with 2 member team

import connectMongoDB from '@/libs/mongodb';
import { TeamModel1 } from '@/models/test';
import { Users } from '@/models/user';

export default async function handler(req, res) {
    try{
        connectMongoDB();
        const totalTeams1 = await TeamModel1.find();
        const usersWithNullTeamId = await Users.find({ teamId: null,consent:true });

        const userobj = usersWithNullTeamId.map((user) => user._id);
        let a=0;
        let count = 0;
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;
        for (const team of totalTeams1) {
            if (team.members.length === 2) {
              team.members.push(userobj[a],userobj[a+1]);
              await team.save();
              await Users.findByIdAndUpdate(userobj[a]._id, {
                teamId: team._id,
              });
              await Users.findByIdAndUpdate(userobj[a+1]._id, {
                teamId: team._id,
              });
              
      
              
              count4++;
            } else if (team.members.length === 1) {
              count1++;
            } else if (team.members.length === 3) {
              count3++;
            } else if (team.members.length === 2) {
              count2++;
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
    