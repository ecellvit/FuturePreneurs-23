import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navbar from '../components/Navbar';
import Card from '../components/Card';

  // const {data: session, status} = useSession();
  // const router = useRouter();
  // const [teamId,setTeamId] = useState('');

  // useEffect(() => {
  //   if (router.isReady) {
  //     console.log('status', status)
  //     if (status === "unauthenticated") {
  //       console.log("Please Login First!")
  //       // router.push("/")
  //     } else if(status === "authenticated"){
  //       console.log('asdfasdfasdf')
  //       fetchDataFromBackend();
  //       // getData()
  //     }
  //   }
  // }, [status, router])
  // console.log('clisession', session);

  // const handleLeaveTeam = () => {
  //   alert('You have left the team.');
  //    fetch(process.env.NEXT_PUBLIC_SERVER +'/team/removeMember'+teamId, {//check the router
  //       method: 'DELETE',
  //      headers: {
  //        'Content-Type': 'application/json',
  //      }
  //    }).then((res) => res.json())
  //      .then((data) => {
  //        console.log(data)
  //   })
  // };

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
  //       console.log(data);
  //       setTeamId(data.teamDetails._id);

  //     }).catch(err => {
  //       console.log("no team found");
  //       console.log(err)
  //     })

  //   };

const IndexPage = () => {
  return (
    <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(/assets/bg/spceBg.svg)' }}>
      <Navbar />

      <div className="max-w-screen-xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4 mt-8 text-white">YOUR TEAM</h1>

        <div className="flex flex-wrap justify-center">
          <Card name="Person 1" imageSrc="/path/to/person1.jpg" />
          <Card name="Person 2" imageSrc="/path/to/person2.jpg" />
        </div>

        <div className="flex flex-wrap justify-center mt-4">
          <Card name="Person 3" imageSrc="/path/to/person3.jpg" />
          <Card name="Person 4" imageSrc="/path/to/person4.jpg" />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;