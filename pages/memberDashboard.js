import Card from '@/Components/Card';
import Navbar from '@/Components/Navbar';

const TeamPage = () => {
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
  return (
    <div
      className="bg-cover bg-no-repeat bg-center min-h-screen"
      style={{ backgroundImage: 'url(/assets/bg/spceBg.svg)' }}
    >
      <Navbar />

      <div className="max-w-screen-xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4 mt-8 text-white">YOUR TEAM</h1>

        <div className="flex flex-wrap justify-center">
          <Card name="Person 1" imageSrc="/assets/boardpics/image2.svg" />
          <Card name="Person 2" imageSrc="/assets/boardpics/image2.svg" />
        </div>

        <div className="flex flex-wrap justify-center mt-4">
          <Card name="Person 3" imageSrc="/assets/boardpics/image2.svg" />
          <Card name="Person 4" imageSrc="/assets/boardpics/image2.svg" />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
