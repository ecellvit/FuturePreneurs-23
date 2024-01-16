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
    const usersWithNullTeamId = await Users.find({ teamId: null });
    console.log(usersWithNullTeamId);
    const userobj = usersWithNullTeamId.map((user) => user._id);
    console.log(userobj);
    console.log(usersWithNullTeamId.length);

    // to merge 2-member teams with 1-member teams

    for (const team of totalTeams1) {
      if (team.members.length === 1) {
        const twoMemberTeam = totalTeams1.find(
          (t) => t.members.length === 2
        );

        if (twoMemberTeam) {
          const memberToRemove = team.members.pop();
          //console.log(memberToRemove);
          twoMemberTeam.members.push(memberToRemove);
          await team.save();
          await twoMemberTeam.save();
          await TeamModel1.deleteOne({ _id: team._id });
        } else {
          count1++;
        }
      } else if (team.members.length === 2) {
        count2++;
      } else if (team.members.length === 3) {
        count3++;
      } else if (team.members.length === 4) {
        count4++;
      }
    }

    // to form 2 member team from two 1 member team

    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    for (const team of totalTeams1) {
      if (team.members.length === 1) {
        const oneMemberTeam1 = totalTeams1.find(
          (t) => t.members.length === 1 && t.teamName != team.teamName
        );
        //const oneMemberTeam2=totalTeams1.find(t=>t.members.length===1)
        if (oneMemberTeam1) {
          const memberToRemove = team.members.pop();
          console.log(memberToRemove);
          oneMemberTeam1.members.push(memberToRemove);
          await team.save();
          await oneMemberTeam1.save();
          await TeamModel1.deleteOne({ _id: team._id });
        } else {
          count1++;
        }
      } else if (team.members.length === 2) {
        count2++;
      } else if (team.members.length === 3) {
        count3++;
      } else if (team.members.length === 4) {
        count4++;
      }
    }

    // to add the member whose teamId==null into 2 member team

    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    let a = 0;
    for (const team of totalTeams1) {
      if (team.members.length === 2) {
        team.members.push(userobj[a]);
        await team.save();
        await Users.findByIdAndUpdate(userobj[a]._id, {
          teamId: team._id,
        });

        userobj.splice(a, 1);
        count3++;
      } else if (team.members.length === 1) {
        count1++;
      } else if (team.members.length === 3) {
        count3++;
      } else if (team.members.length === 4) {
        count4++;
      }
    }

    // to add two member whose team==null into 1 -member team
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    for (const team of totalTeams1) {
      if (team.members.length === 1) {
        team.members.push(userobj[a], userobj[a + 1]);
        await team.save();

        for (const userId of [userobj[a]._id, userobj[a + 1]._id]) {
          await Users.findByIdAndUpdate(userId, { teamId: team._id });
        }
        userobj.splice(a, 2);
      } else if (team.members.length === 2) {
        count2++;
      } else if (team.members.length === 3) {
        count3++;
      } else if (team.members.length === 4) {
        count4++;
      }
    }

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

    for (let i = 0; i < userobj.length; i += 3) {
      const remainingUsers = userobj.length - i;

      if (remainingUsers >= 3) {
        const arr = [userobj[i], userobj[i + 1], userobj[i + 2]];

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

        count3++;
      } else if (remainingUsers === 2) {
        const arr = [userobj[i], userobj[i + 1]];

        const existingThreeMemberTeams = await TeamModel1.find({
          members: { $size: 3 },
        });

        if (existingThreeMemberTeams.length >= 2) {
          // Update teamId for the first user
          existingThreeMemberTeams[0].members.push(arr[0]);
          await existingThreeMemberTeams[0].save();
          await Users.findByIdAndUpdate(arr[0]._id, {
            teamId: existingThreeMemberTeams[0]._id,
          });

          // Update teamId for the second user
          existingThreeMemberTeams[1].members.push(arr[1]);
          await existingThreeMemberTeams[1].save();
          await Users.findByIdAndUpdate(arr[1]._id, {
            teamId: existingThreeMemberTeams[1]._id,
          });

          count4++;
          count4++;
          count3 = count3 - 2;
        }
      } else if (remainingUsers === 1) {
        const arr = [userobj[i]];

        const existingThreeMemberTeams = await TeamModel1.find({
          members: { $size: 3 },
        });

        if (existingThreeMemberTeams.length >= 1) {
          // Update teamId for the user
          existingThreeMemberTeams[0].members.push(arr[0]);
          await existingThreeMemberTeams[0].save();
          await Users.findByIdAndUpdate(arr[0]._id, {
            teamId: existingThreeMemberTeams[0]._id,
          });

          count4++;
          count3 = count3 - 1;
        }
      }
    }

    //console.log(a);

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
