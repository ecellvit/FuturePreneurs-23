import Card from '@/Components/Card';
import Navbar from '@/Components/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const TeamPage = () => {

  const [popUpForDelete, setPopUpForDelete] = useState(false);
  const [popUpForRemove, setPopUpForRemove] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [remove, setRemove] = useState(false);
  const [id, setId] = useState();
  const [teamId,setTeamId] = useState('');
  const [teamLeaderId,setTeamLeaderId] = useState('');
  const [teamName,setTeamName] = useState('');
  const [teamMembersData,setTeamMemberData] = useState([]);

  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      console.log('status', status)
      if (status === "unauthenticated") {
        router.push("/")
      } else if(status === "authenticated"){
        getData()
        fetchDataFromBackend();
      }
    }
  }, [status, router])

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
        console.log(data);
        const user = data.user;
        if (user.hasFilledDetails == true) {
          if (user.teamId !== null) {
            const redirect = user.teamRole=='1' ? '/memberDashboard' : '/leaderDashboard';
            router.push(redirect);
          } else {
            router.push("/leaderDashboard");
          }
        } else{
          router.push('/makeTeam');
        }
        console.log('user', user)
      })
  }

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
      console.log('dd', data)
      setTeamId(data.teamDetails._id);
      setTeamMemberData(data.teamDetails.members);
      setTeamName(data.teamDetails.teamName);
      setTeamLeaderId(data.teamDetails.teamLeaderId);
    }).catch(err => {
      console.log("no team found");
      console.log(err)
    })
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center min-h-screen"
      style={{ backgroundImage: 'url(/assets/bg/spceBg.svg)' }}
    >
      <Navbar />

      <div className="max-w-screen-xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4 mt-8 text-white">{teamName}</h1>

        <div className="flex flex-wrap justify-center">
          {
            teamMembersData.map(el=>{
              <Card name={el.firstName} imageSrc="/assets/boardpics/image2.svg" />
            })
          }
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
