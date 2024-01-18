// import connectMongoDB from '@/libs/mongodb';
// import { TeamModel } from '@/models/teamModel';

import { Level0 } from '@/models/level0';
import { TeamModel1 } from '@/models/test';

// const newspaperLinks = [
//   'https://newspaper1.com',
//   'https://newspaper2.com',
//   'https://newspaper3.com',
// ];
// const Industry = ['E.V', 'Green Construction', 'Renewable Energy'];
// export default async function handler(req, res) {
//   try {
//     connectMongoDB();
//     const totalTeams = await TeamModel.find();
//     const counts = await TeamModel.countDocuments();
//     //console.log(totalTeams);
//     const distribution = Math.floor(counts / newspaperLinks.length);
//     // Function to shuffle an array
//     function shuffleArray(array) {
//       for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//       }
//       return array;
//     }
//     const teamNames = totalTeams.map((team) => team.teamName);
//     const shuffledTeams = shuffleArray(teamNames);
//     //console.log(teamNames);

//     //excepted output [teamName1, teAMnAME5 .....]
//     let part1Distribution = distribution;
//     let part2Distribution = distribution;
//     let part3Distribution = distribution;
//     let currentNewspaper = 1;
//     console.log(distribution);

//     for (const teamName of shuffledTeams) {
//       if (part1Distribution >= 0) {
//         const team = await TeamModel.findOne({
//           teamName: shuffledTeams[part1Distribution],
//         });
//         //console.log(team);
//         // const team = totalTeams.find(team => team.teamName === teamName);

//         await TeamModel.findOneAndUpdate(
//           { teamName: teamName },
//           {
//             $set: {
//               newspaperLink: newspaperLinks[0],
//               newspaperset: 1,
//               newspaperExists: true,
//             },
//           }
//         );
//         part1Distribution--;
//       }
//       // Move to the next newspaper after reaching the distribution count

//       if (part1Distribution === -1 && part2Distribution >= 0) {
//         const team = await TeamModel.findOne({
//           teamName: shuffledTeams[part1Distribution],
//         });
//         await TeamModel.findOneAndUpdate(
//           { teamName: teamName },
//           {
//             $set: {
//               newspaperLink: newspaperLinks[1],
//               newspaperset: 2,
//               newspaperExists: true,
//             },
//           }
//         );
//         part2Distribution--;

//         if (
//           part1Distribution === -1 &&
//           part2Distribution == -1 &&
//           part3Distribution >= 0
//         ) {
//           const team = await TeamModel.findOne({
//             teamName: shuffledTeams[part1Distribution],
//           });
//           await TeamModel.findOneAndUpdate(
//             { teamName: teamName },
//             {
//               $set: {
//                 newspaperLink: newspaperLinks[2],
//                 newspaperset: 3,
//                 newspaperExists: true,
//               },
//             }
//           );
//           part3Distribution--;
//         }
//       }
//     }

//     const teamsWithoutNewspaper = await TeamModel.find({
//       newspaperExists: false,
//     });

//     const teamNames1 = teamsWithoutNewspaper.map(
//       (team) => team.teamName
//     );

//     console.log(teamNames1);
//     for (const teamName of teamNames1) {
//       await TeamModel.findOneAndUpdate(
//         { teamName: teamName },
//         {
//           $set: {
//             newspaperLink: newspaperLinks[0],
//             newspaperset: 1,
//             newspaperExists: true,
//           },
//         }
//       );
//     }

//     /*
//          const teamsWithoutNewspaper = await Team.find({ newspaperExists: false });
//          const teamNames_nonews = teamsWithoutNewspaper.map(team => team.teamName);
//          for(teamName_no in teamNames_nonews){
//             const team = totalTeams.find(team => team.teamName === teamName_no);
//                 await Team.findByIdAndUpdate(team._id, {
//                     $set: { newspaperLink: newspaperLinks[0],newspaperExists:true },
//                 });
//          }
//          */

//     return res.status(200).json({
//       message: 'Newspaper have been alloted successfully',
//     });

//     // Now teamsWithoutNewspaper contains the teams whose newspaper hasn't been allocated yet
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: 'Something went wrong' });
//   }
// }
