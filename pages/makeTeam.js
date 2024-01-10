import Navbar from "@/Components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const MakeTeam = () => {
  const [teamName, setTeamName] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (router.isReady) {
      if (status === "unauthenticated") {
        //Checks if session is not ready and redirects to root.
        console.log("Please Login First!");
        router.push("/");
      } else if (status === "authenticated") {
        console.log(`Getting data`, status);
        // toast.success("Logged In");
        getData();
        localStorage.setItem("asdf", "asdf");
      }
    }
  }, [status, router]);

  const getData = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/user/userDetails`, {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const user = data.user;
        if (user.hasFilledDetails == true) {
          if (user.teamId !== null) {
            const redirect =
              user.teamRole == "1" ? "/memberDashboard" : "/leaderDashboard";
            router.push(redirect);
          } else {
            // router.push("/makeTeam");
          }
        } else {
          router.push("/userDetails");
        }
      });
  };

  const handleCreateTeam = async () => {
    console.log("session", session);

    try {
      // Send a request to the backend to check if the team name is unique
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER + "/team/createTeam",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teamName: teamName }),
        }
      );

      const data = await response.json();
      console.log("not found", data);

      if (data.message == "User Already Part of a Team") {
        // show toast
      } else {
        // Team name is unique, so redirect to TeamCode page
        router.push("/leaderDashboard");
      }
      // else {
      //  // Team name is already used, display an error message
      //  alert('Team name already used. Please choose a different name.');
      //}
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  const handleJoinTeam = () => {
    // Redirect to JoinTeam page
    router.push("/joinTeam");
  };
  //useEffect(()=>{
  //  if(!session){
  //    console.log("redirecting")
  //    router.push("/");
  //  }
  //},[])

  return (
    <div
      className=" bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: "url(/assets/bg/spceBg.svg)",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-[90%] sm:w-[55vw] bg-[#141B2B] flex flex-col items-center justify-around text-white rounded-lg p-2 min-w-fit min-h-[70vh] m-12">
          <p className="text-[2.8rem] font-bold m-2 mb-4 text-center">
            Join or Create a Team
          </p>

          <div className="flex flex-col items-center mx-auto mb-1">
            <button
              className="px-4 py-2 rounded-full capitalize cursor-pointer bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] mt-4 w-full h-12 flex items-center justify-center font-bold"
              onClick={handleJoinTeam}
            >
              Join team with code
            </button>
          </div>

          <div className="border-b border-gray-300 w-5/6 my-1"></div>

          <div className="flex flex-col items-center mx-auto mb-6 ">
            <h1 className="text-[1.8rem] font-semibold mb-4 ">
              Create your team
            </h1>
            <input
              type="text"
              placeholder="Enter Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-2 border text-black border-gray-300 rounded"
            />

            <button
              className="px-4 py-2 rounded-full cursor-pointer bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] mt-4 w-full h-12 flex items-center justify-center font-bold"
              onClick={() => {
                if (teamName.trim().length === 0) {
                  toast.error("Team Name cannot be empty.");
                } else {
                  handleCreateTeam();
                }
              }}
            >
              Create Your Own Team
            </button>
            <Toaster />
          </div>

            </div>
            
      <div className="border-b border-gray-300 w-5/6 my-1"></div>
      <div>
            
            <button onClick={()=>{router.push('/termsConditions')}} className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
              I dont have a Team
            </button>
          </div>
        </div>
      </div>
  );
};

export default MakeTeam;
