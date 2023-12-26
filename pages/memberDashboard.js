import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function App() {
  const userInfo = [{
    name: 'John Doe',
    registrationNumber: '123',
    email: 'johndoe@example.com',
  },
  {
    name: 'John',
    registrationNumber: '123456',
    email: 'john@example.com',
  }
  ]

  const {data: session, status} = useSession();
  const router = useRouter();
  const [teamId,setTeamId] = useState('');

  useEffect(() => {
    if (router.isReady) {
      console.log('status', status)
      if (status === "unauthenticated") {
        console.log("Please Login First!")
        // router.push("/")
      } else if(status === "authenticated"){
        console.log('asdfasdfasdf')
        fetchDataFromBackend();
        // getData()
      }
    }
  }, [status, router])
  console.log('clisession', session);

  const handleLeaveTeam = () => {
    alert('You have left the team.');
     fetch(process.env.NEXT_PUBLIC_SERVER +'/team/removeMember'+teamId, {//check the router
        method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
       }
     }).then((res) => res.json())
       .then((data) => {
         console.log(data)
    })
  };

    const fetchDataFromBackend = () => {

      fetch(process.env.NEXT_PUBLIC_SERVER +'/team/getTeamDetails', {
        content: "application/json",
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
        },
      }).then(res => res.json())
      .then(data => {
        console.log(data);
        setTeamId(data.teamDetails._id);

      }).catch(err => {
        console.log("no team found");
        console.log(err)
      })

    };





  return (

    <div className="min-h-screen flex items-center justify-center">

      {userInfo.map((ele) =>
        <div key={ele} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">User Information</h5>
          </a>
          <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <div>
              <strong>Name:</strong> {ele.name}
            </div>
            <div>
              <strong>Registration Number:</strong> {ele.registrationNumber}
            </div>
            <div>
              <strong>Email:</strong> {ele.email}
            </div>
          </div>
        </div>)}
      <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <button onClick={handleLeaveTeam}>Leave Team</button>
        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </a>
    </div>

  );
}

export default App;
