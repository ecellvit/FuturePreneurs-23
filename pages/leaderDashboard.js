import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import DeleteTeamButton from '../components/DeleteTeamButton';

const IndexPage = () => {
  // Function to handle the "Delete Team" button click
  const handleDeleteTeam = () => {
    // Add your logic to handle deleting the team
    console.log('Team deleted!');
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: 'url(/assets/bg/spceBg.svg)', minHeight: '100vh' }}
    >
      <Navbar />

      <div className="max-w-screen-xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4 mt-8 text-white">YOUR TEAM</h1>

        <div className="flex flex-wrap justify-center text-left">
          <Card name="Person 1" imageSrc="/path/to/person1.jpg" />
          <Card name="Person 2" imageSrc="/path/to/person2.jpg" />
        </div>

        <div className="flex flex-wrap justify-center mt-4 text-left">
          <Card name="Person 3" imageSrc="/path/to/person3.jpg" />
          <Card name="Person 4" imageSrc="/path/to/person4.jpg" />
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <DeleteTeamButton onClick={handleDeleteTeam} />
      </div>
    </div>
  );
};

export default IndexPage;

// import React, { useEffect, useState } from "react";
// import { ReactDOM } from "react";
// import { FiPlus } from "react-icons/fi";
// // import LeaderDashboardCards from "./LeaderDashboardCards";
// import Modal from "../components/Modal";
// import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";

// const info = [
//   {
//     id: 0,
//     role: "leader",
//     name: "Karan Vyas",
//     regNo: "22BIT0092",
//     emailId: "karan.vyas2022@vitstudent.ac.in",
//     phoneNumber: "123456789",
//   },
//   {
//     id: 1,
//     role: "member",
//     name: "abcd",
//     regNo: "22BIT0139",
//     emailId: "karan.vyas2022@vitstudent.ac.in",
//     phoneNumber: "123456789",
//   },
//   {
//     id: 2,
//     role: "member",
//     name: "efgh",
//     regNo: "22BIT0051",
//     emailId: "karan.vyas2022@vitstudent.ac.in",
//     phoneNumber: "123456789",
//   },
//   {
//     id: 3,
//     role: "member",
//     name: "ijkl",
//     regNo: "22BIT0108",
//     emailId: "karan.vyas2022@vitstudent.ac.in",
//     phoneNumber: "123456789",
//   },
// ];

// export default function LeaderDashboard() {
//   const [popUpForDelete, setPopUpForDelete] = useState(false);
//   const [popUpForRemove, setPopUpForRemove] = useState(false);
//   const [deleted, setDeleted] = useState(false);
//   const [remove, setRemove] = useState(false);
//   const [id, setId] = useState();
//   const [teamId,setTeamId] = useState('');
//   const [teamLeaderId,setTeamLeaderId] = useState('');
//   const [teamName,setTeamName] = useState('');
//   const [teamMemberData,setTeamMemberData] = useState('');
//   // const router = useRouter();
//   // const {data: session} = useSession();

//   const {data: session, status} = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (router.isReady) {
//       console.log('status', status)
//       if (status === "unauthenticated") {
//         console.log("Please Login First!")
//         // router.push("/")
//       } else if(status === "authenticated"){
//         console.log('asdfasdfasdf',session)
//         // getData()
//         fetchDataFromBackend();
//       }
//     }
//   }, [status, router])
//   console.log('clisession', session);

// //   useEffect(()=>{
// //   if(!session){
// //     console.log('redirecting')
// //     router.push('/')
// //   }
// //   else{
// //     console.log('in else')
// //   }
// // },[session])

// // useEffect(() => {
// //   if (router.isReady) {
// //     if (status !== "loading" && status === "unauthenticated") {
// //       toast.error("Please Login First!")
// //       router.push("/")
// //     }
// //   }
// // }, [status, router])
// // const { status } = useSession();

//   const fetchDataFromBackend = () => {
//     fetch(process.env.NEXT_PUBLIC_SERVER +'/team/getTeamDetails', {
//       content: "application/json",
//       method: "GET",
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${session.accessTokenBackend}`,
//         'Access-Control-Allow-Origin': '*',
//       },
//     }).then(res => res.json())
//     .then(data => {
//       console.log(data)
//       setTeamId(data.teamDetails._id);
//       setTeamMemberData(data.teamDetails.members);
//       setTeamName(data.teamDetails.teamName);
//       setTeamLeaderId(data.teamDetails.teamLeaderId);
//     }).catch(err => {
//       console.log("no team found");
//       console.log(err)
//     })

//   };

//   // useEffect(() => {
//   //   fetchDataFromBackend();
//   // }, []);

//   useEffect(() => console.log("hii"), [remove, deleted]);

//   function toggleDelete() {
//     setDeleted(!deleted);
//   }
//   function toggleRemove() {
//     setRemove(!remove);
//   }
//   function togglePopUpForRemove() {
//     setPopUpForRemove(!popUpForRemove);
//   }
//   function togglePopUpForDelete() {
//     setPopUpForDelete(!popUpForDelete);
//   }
//   function removeMember() {
//     console.log("remove");
//     console.log(id);
//     setRemove(!remove);
//       fetch(process.env.NEXT_PUBLIC_SERVER + '/team/removeMember/'+teamId, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         memberId:id
//       })
//     }).then((res) => res.json())
//       .then((data) => {
//         console.log(data)
//         location.reload();
//       }).then(setRemove(!remove))
//   }
//   function deleteTeam() {
//     alert("delete");
//     setDeleted(!deleted);
//     router.push('/');
//     fetch(process.env.NEXT_PUBLIC_SERVER +'/team/deleteTeam/'+teamId, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     }).then((res) => res.json())
//       .then((data) => {
//         console.log(data)
//       }).then(router.push('/MakeTeam'))
//   }
//   return (

//     <div className="w-full h-full flex flex-col items-center ">
//     <div className="text-transparent bg-clip-text bg-gradient-to-r to-yellow-500 from-orange-500">
//       {teamName}
//     </div>
//     <ol className="w-9/12 flex flex-col">
//       {info.map((ele) => (
//         <li className="mx-4 list-none w-full self-center" key={ele}>
//           {ele._id ===  teamLeaderId? (
//             <div className="flex flex-row justify-evenly p-8 m-4 text-lg h-full w-auto bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
//               <div className="w-3/4 h-5/6 flex justify-evenly">
//               <div>
//                 <p className="font-black text-yellow-200 text-4xl m-2">
//                   {ele.name}
//                 </p>
//                 <p className=" text-yellow-700">Team Leader</p></div>
//                 <div className="mt-4">
//                   <div className=" text-yellow-700">{ele.regNo}</div>
//                   <div className=" text-yellow-700">{ele.emailId}</div>
//                   {/* <div className=" text-yellow-700">{ele.phoneNumber}</div> */}
//                 </div>
//               </div>
//               <div>

//               </div>
//               {/* <button
//               className="text-black bg-gradient-to-r from-yellow-500 to-orange-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-yellow-200 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
//               onClick={togglePopUpForRemove}
//             >
//               REMOVE
//             </button> */}
//             </div>
//           ) : (
//             <div className="flex flex-row justify-around p-5 m-2 text-lg h-full w-auto bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
//               <div className="w-3/4 h-5/6 flex justify-evenly">
//               <div>
//                 <p className="font-black text-yellow-200 text-4xl m-2 flex flex-wrap">
//                 {ele.name}
//                 </p>
//                 <p className=" text-yellow-700">Team Member</p></div>
//                 <div className="mt-4">
//                   <div className=" text-yellow-700">{ele.regNo}</div>
//                   <div className=" text-yellow-700">{ele.emailId}</div>
//                   {/* <div className=" text-yellow-700">{ele.phoneNumber}</div> */}
//                 </div>
//               </div>
//               <button
//                 className="text-black bg-gradient-to-r from-yellow-500 to-orange-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-yellow-200 dark:focus:ring-yellow-800 font-medium rounded-lg self-end text-sm px-5 py-2.5 text-center mr-2 mb-2"
//                 onClick={() => {
//                   togglePopUpForRemove();
//                   setId(ele.id);
//                 }}
//               >
//                 REMOVE
//               </button>
//             </div>
//           )}
//         </li>
//       ))}
//       {popUpForRemove && (
//         <Modal
//           popup={togglePopUpForRemove}
//           callFunction={removeMember}
//           popUpValue={popUpForDelete}
//           setStateRemove={toggleRemove}
//         />
//       )}
//     </ol>
//     <div className="w-auto flex justify-evenly">
//     <button
//       className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
//       onClick={togglePopUpForDelete}
//     >
//       Delete Team
//     </button>
//     {popUpForDelete && (
//       <Modal
//         popup={togglePopUpForDelete}
//         callFunction={deleteTeam}
//         popUpForDelete={popUpForDelete}
//         setStateDelete={toggleDelete}
//       />
//     )}
//     {info.length<4 && (<button
//       className="text-white flex justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
//       onClick={()=>router.push('/teamCode')}
//     >
//       <FiPlus  /> Add Team Member
//     </button>)}</div>
//   </div>
// );
// }

