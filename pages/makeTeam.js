import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '../Components/Navbar';

const MakeTeam = () => {
  const [teamName, setTeamName] = useState('');
  const router = useRouter();
  const session= useSession();

  const handleCreateTeam = async () => {
    try {
      // Send a request to the backend to check if the team name is unique
      const response = await fetch(process.env.NEXT_PUBLIC_SERVER + '/team/createTeam', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'teamName':teamName }),
      });

      const data = await response.json();
      console.log("not found",data);

      if (data) {
        // Team name is unique, so redirect to TeamCode page
        router.push('/teamCode');
      }
      // else {
      //  // Team name is already used, display an error message
      //  alert('Team name already used. Please choose a different name.');
      //}
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleJoinTeam = () => {
    // Redirect to JoinTeam page
    router.push('/joinTeam');
  };
  //useEffect(()=>{
  //  if(!session){
  //    console.log("redirecting")
  //    router.push("/");
  //  }
  //},[])

  return (
    <div className=" bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(/assets/bg/spceBg.svg)', minHeight: '100vh' }}>
      <Navbar />
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className="w-[90%] sm:w-[55vw] bg-[#141B2B] flex flex-col items-center justify-around text-white rounded-lg p-2 min-w-fit min-h-[70vh] m-12">
          <p className="text-[2.8rem] font-bold m-2 mb-4 text-center">Join a Team or Create a Team</p>
          
          <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-6">


            <div className="flex flex-col items-center mx-auto mb-4">
            <h1 className="text-[1.8rem] font-semibold mb-4">Join your team</h1>
            <input 
                type="text"
                placeholder="Enter Team Name"
                value={teamName}
                /*onChange={(e) => setTeamName(e.target.value)}*/
                className="w-full p-2 border text-black border-gray-300 rounded"
              />
            
            <button
              className="px-4 py-2 rounded-full cursor-pointer bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] mt-4 w-full h-12 flex items-center justify-center font-semibold"
              onClick={handleJoinTeam}
            >
              Find Team To Join
            </button>
            </div>

            <div className="border-b border-gray-300 w-full sm:hidden my-4"></div>
            <div className="border-l border-gray-300 h-full my-4 hidden sm:block" ></div>


            <div className="flex flex-col items-center mx-auto mb-4 ">
            <h1 className="text-[1.8rem] font-semibold mb-4 ">Create your team</h1>
              <input 
                type="text"
                placeholder="Enter Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full p-2 border text-black border-gray-300 rounded"
              />
              
              <button
              className="px-4 py-2 rounded-full cursor-pointer bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] mt-4 w-full h-12 flex items-center justify-center font-semibold"
              onClick={handleCreateTeam}
              >
              Create Your Own Team
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeTeam;
