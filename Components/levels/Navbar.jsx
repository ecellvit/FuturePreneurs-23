import Image from 'next/image';
import GameTimer from './GameTimer';
// import image from 'public/assets/levels/navbar/downloadNewspaper.svg';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import pdf from 'public/assets/levels/navbar/downloadNewspaper.svg';
import sponsor from 'public/assets/levels/navbar/sponsor.png';
import logo from 'public/assets/logos/FP LOGO.svg';
import { useEffect, useState } from 'react';

const Navbar = (props) => {
  const { data: session, status } = useSession();
  const [teamName, setTeamName] = useState('');
  const [set, setSet] = useState();
  const levelNames = {
    qualifier: 'Qualifier',
    level0: 'Round 1',
    level1: 'Round 2',
    level2: 'Round 3',
    level3: 'Round 4',
    level4: 'Round 5',
  };
  const newspaper = [
    'https://utfs.io/f/341b21ed-f487-4308-a55c-3ecb1edbf5bb-xraikq.pdf',
    'https://utfs.io/f/f7304a69-9962-4fc0-8672-ae75917fae2a-x045o8.pdf',
    'https://utfs.io/f/7c46982b-507d-4234-a9da-b0988a31c231-z4yujb.pdf',
  ];

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (status === 'unauthenticated') {
        console.log('Authenticated000000000000000000000000=======');
        router.push('/');
      } else if (status === 'authenticated') {
        fetch(
          process.env.NEXT_PUBLIC_SERVER + '/team/getTeamDetails',
          {
            content: 'application/json',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.accessTokenBackend}`,
              'Access-Control-Allow-Origin': '*',
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setTeamName(data.teamDetails.teamName);
            setSet(data.teamDetails.newspaperset);
          });
      }
    }
  }, [status, router]);

  // useEffect(() => {
  //   fetch(process.env.NEXT_PUBLIC_SERVER + "/team/getTeamDetails", {
  //     content: "application/json",
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${session.accessTokenBackend}`,
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTeamName(data.teamDetails.teamName)
  //     });
  // }, []);

  return (
    <main>
      <nav className="flex justify-around h-16 items-center w-full bg-[#050C17] border-b-2 border-white text-white">
        <div className="left flex w-1/3 justify-around items-center">
          <div className="logo">
            <Image src={logo} className="h-16 p-3" />
          </div>
          <div className="">
            <Image src={sponsor} className="h-16 w-48 p-3" />
          </div>
          {set?.toString() && (
            <Link href={newspaper[set]} target='blank'>
              <div className="">
                <Image src={pdf} className="h-16 w-48 p-3" />
              </div>
            </Link>
          )}
        </div>
        <div className="mid w-1/3 flex justify-center text-2xl font-bold">
          {levelNames[props.level]}
        </div>
        <div className="right w-1/3 flex justify-center flex-col items-center">
          <div className="underline text-sm">Team Name:</div>
          <div className="text-lg font-bold">{teamName}</div>
        </div>
      </nav>
      <div className="flex w-full justify-center bg-[url('/assets/bg/spceBg.svg')] pb-4">
        <div
          style={{
            borderBottom: '65px solid #1e273d97 ',
            borderLeft: '25px solid transparent',
            borderRight: ' 25px solid transparent',
            height: '0px',
            width: '250px',
            rotate: '180deg',
          }}>
          <div className="rotate-180">
            <GameTimer
              sendData={props.sendData}
              level={props.level}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
