import React, { useEffect, useState } from "react";
import Router from "next/router";
import Waiting from "@/Components/levels/Waiting";
import Game1 from "@/Components/levels/level1/game";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Navbar from "@/Components/Navbar";

export default function Level1() {

  const { data: session, status } = useSession();
  const router = useRouter();
  const [problems,setProblems] = useState([]);
  const [level1Answer,setLevel1Answer] = useState({});
  const [sector,setSector] = useState();

  useEffect(() => {
    if (router.isReady) {
      if (status === 'unauthenticated') {
        console.log('Authenticated000000000000000000000000=======');
        router.push('/');
      } else if (status === 'authenticated') {
        console.log('Authenticated000000000000000000000000', session);
        checkCurrentLevel1();
        getLevel1Data();
      }
    }
  } , [status, router]);

  const [curPage, setCurPage] = useState(-1);

  function submitAnswerForLevel1(){
    fetch('/api/levels/level1/sendData',{
      method:'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({answer:level1Answer}),
    }).then((res) => res.json()).then(console.log('clicked')).then(console.log(level1Answer))
    .catch((err) => {
      console.log(err);
    });
  }

  const checkCurrentLevel1 = () => {
    fetch("/api/levels/checkCurrentRound", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log("data", data);
          // setCurPage(data.team.pageNo);
          // console.log(data.round.level);
          if (data.round.level !== 1) {
            // redirect(`/levels/level${data.round.level}`)
            // if(data.round.level!==-1)
            // {router.push(`/levels/level${data.round.level}`);}
            // else{
            //   router.push(`/levels/qualifier`);
            // }
            router.push(`/levels/level${data.round.level}`);
          }
        });
      } else {
        console.log("error");
      }
    });
  };

  const getLevel1Data = () => {
    // get question number & end Time from backend
    fetch("/api/levels/level1/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log("data", data);
          // setCurPage(data.team.pageNo);
          setCurPage(data.pageNo);
          setProblems(data.problems);
          setSector(data.sector);
          // console.log(data.team.pageNo);
        });
      } else {
        console.log("error");
      }
    });
  };

  return (
    <div>
      {curPage === -1 && <Waiting text={"Please Wait for Level 1 to start"} />}
      {curPage === 0 && <Waiting text={"Instruction"} />}
      {curPage === 1 && <Game1 submit={submitAnswerForLevel1} problems={problems} sector={sector} setProblems={setProblems} setLevel1Answer={setLevel1Answer} level1Answer={level1Answer}/>}
      {curPage === 3 && <Waiting text={"Level 1 has ended"} />}
    </div>
  );
}
