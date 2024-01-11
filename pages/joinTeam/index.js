import Navbar from '@/Components/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingIcons from 'react-loading-icons';

const JoinTeam = ({ teamCode: propTeamCode }) => {
  const [teamCode, setTeamCode] = useState(propTeamCode || '');
  const [teamName, setTeamName] = useState('');
  const [message, setMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isModalLoading, setIsMoadalLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (router.isReady) {
      if (status === "unauthenticated") {
        //Checks if session is not ready and redirects to root.
        
        router.push("/");
      } else if (status === "authenticated") {
        
        // toast.success("Logged In");
        getData();
        localStorage.setItem('asdf', 'asdf')
      }
    }
  }, [status, router]);

  const getData = ()=>{
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
        
        const user = data.user;
        if (user.hasFilledDetails == false) {
          router.push('/userDetails');
        } else {
          if (user.teamId !== null) {
            const redirect = user.teamRole=='1' ? '/memberDashboard' : '/leaderDashboard';
            router.push(redirect);
          }
        }
        
      })
  }

 useEffect(() => {
    if (propTeamCode) {
      simulateTyping(propTeamCode);
    }
  }, [propTeamCode]);

  const simulateTyping = async (code) => {
    for (let i = 0; i < code.length; i++) {
      setTeamCode(code.substring(0, i + 1));
      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for typing effect
    }

    // To auto click the button
    // setTimeout(() => {
    //   fetchTeamName();
    // }, 800);
  };

  const fetchTeamName = async () => {
    setisLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/team/getTeamViaToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ session.accessTokenBackend
        },
        body: JSON.stringify({ teamCode: teamCode }),
      });

      if (response.ok) {
        const data = await response.json();
        
        setTeamName(data.teamDetails.teamName);
        setShowDialog(true); // Show the dialog box
      } else {
        showMessage('Team code not found. Please try again.');
      setisLoading(fasle);

      }
    } catch (error) {
      console.error('Error fetching team name:', error);
      showMessage('An error occurred while fetching team name.');
      setisLoading(false);
    }
    // TODO: ShowMessage if already in a team
  };

  const handleConfirmJoin = async () => {
    // Send a request to the API to join the team with the team code.
    setIsMoadalLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SERVER+'/team/jointeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + session.accessTokenBackend
        },
        body: JSON.stringify({ teamCode: teamCode }),
      })

      if (response.ok) {
        setIsMoadalLoading(false);
        showMessage('Successfully joined the team.', 'success');
        setShowDialog(false);
        setTimeout(() => { 
          // You can use react-router-dom or another routing library to handle the redirection

          // React Friendly Approach
          /*
          import { useHistory } from 'react-router-dom'; //add to top
          const history = useHistory(); 
          history.push('/member-dashboard');
          */
          
          // non react friendly 
          window.location.href = '/memberDashboard'; 

        }, 1000);
      } else {
        
        showMessage('Failed to join the team. Please check the team code.', 'error');
      }
    } catch (error) {
      setIsMoadalLoading(false);
      console.error('Error joining the team:', error);
      showMessage('An error occurred while joining the team.', 'error');
    }
  };

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage('');
    }, 5000); // Hide the messages after 5 seconds
  };

  return (
    // tailwind
    <div className=" bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(/assets/bg/spceBg.svg)', minHeight: '100vh' }}>
      <Navbar />
      <div className='flex flex-col justify-center items-center h-screen'>
      <div className="w-[90%] sm:w-[55vw] bg-[#141B2B] flex flex-col items-center justify-evenly text-white rounded-lg p-2 min-w-fit min-h-[70vh] m-12">
      <h1 className="text-[2.8rem] font-bold m-2 mb-4 text-center">
        Join a Team
      </h1>
      <form onSubmit={(e) => { e.preventDefault(); fetchTeamName(); }}  className=" dark:bg-gray-800 p-4 rounded-lg shadow-md w-80 flex flex-col justify-center">
        <div className="mb-4">
          <label className="text-[1.8rem] font-semibold mb-4">Team Code:</label>
          <input
            type="text"
            value={teamCode}
            onChange={(e)=>{
              setTeamCode(e.target.value)
            }}
            className="text-white border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500 bg-gray-700"
          />
        </div>
        <button
          id="joinTeamButton" 
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 rounded-full cursor-pointer bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] mt-4 w-full h-12 flex items-center justify-center font-semibold"
        >
          {isLoading ? <LoadingIcons.Oval height="20px"/> : "Join Team"}
        </button>
      </form>
      {message && (
        <div
          className={`mt-4 border ${
            message.type === 'success'
              ? 'border-green-500 text-green-500'
              : 'border-red-500 text-red-500'
          } bg-white dark:bg-gray-800 p-2 rounded-md`}
        >
          {message.text}
        </div>
      )}

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-96">
            <p className="text-gray-700 dark:text-gray-300">
              Do you want to join Team-{teamName}?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                disabled={isModalLoading}
                className="bg-blue-500 text-white dark:bg-blue-600 dark:hover:bg-blue-700 rounded px-4 py-2 hover:bg-blue-600 focus:outline-none mr-2"
                onClick={() => handleConfirmJoin()}
              >
                {isModalLoading ? <LoadingIcons.Oval height="20px"/> : "Yes"}
              </button>
              <button
                className="text-gray-500 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none"
                onClick={() => setShowDialog(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      </div>
    </div>
  );
};

export default JoinTeam;
