import React,{useEffect,useState} from "react"
import Waiting from "@/Components/levels/Waiting";
import GamePage1 from "@/Components/levels/level3/GamePage1";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Level3() {

  const { data: session, status } = useSession();

  // useEffect(() => {
  //  if (router.isReady) {
  //    if (status === 'unauthenticated') {
  //      console.log('Authenticated000000000000000000000000=======');
  //      router.push('/');
  //    } else if (status === 'authenticated') {
  //      console.log('Authenticated000000000000000000000000', session);
  //   // fetch /api/level0

  //   getLevel0Data();
  //   checkCurrentLevel0();
  //   }
  //  } 
  // }, [status, router]);

  const [curPage, setCurPage] = useState(1);

  const checkCurrentLevel0 = ()=>{
    fetch('/api/levels/checkCurrentRound',{
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
            console.log(data.round.level);
            if(data.round.level!==0){
                // redirect(`/levels/level${data.round.level}`)
                Router.push(`/levels/level${data.round.level}`)
            }
          });
        } else {
          console.log("error");
        }
      });
  }

  const getLevel0Data = () => {
    // get question number & end Time from backend
    fetch("/api/levels/level0/getData", {
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
          setCurPage(data.team.pageNo);
          console.log(data.team.pageNo);
        });
      } else {
        console.log("error");
      }
    });
  };

  return (
    <div>
      {curPage === -1 && <Waiting text={"Please Wait for other teams,Level 0 started"}/>}
      {/* {curPage === 0 && <Instructions/>} */}
      {curPage === 0 && <Waiting text={"Instruction"}/>}
      {curPage === 1 && <GamePage1/>}
      {curPage === 2 && <GamePage1/>}
      {curPage === 3 && <Waiting text={"Prompt"}/>}
      {curPage === 4 && <Waiting text={"Level 0 is ended"}/>}
      {/* {curPage === 2 && <Prompt/>} */}
    </div>
  )
}
