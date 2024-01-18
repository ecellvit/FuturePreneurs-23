import React,{useEffect,useState} from "react"
import Waiting from "@/Components/levels/Waiting";
import Game from "@/Components/levels/level0/game";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Level0() {

  const { data: session, status } = useSession();

  const [curPage, setCurPage] = useState(-1);
  const router = useRouter();


  useEffect(() => {
    // fetch /api/level0
    if (router.isReady) {
      if (status === 'unauthenticated') {
        console.log('Authenticated000000000000000000000000=======');
        router.push('/');
      } else if (status === 'authenticated') {
        console.log('Authenticated000000000000000000000000', session);
        getLevel0Data();
        checkCurrentLevel0();
      }
    }
  }, [status, router]);


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
      {curPage === -1 && <Waiting text={"Please Wait for Level 0 to start"}/>}
      {/* {curPage === 0 && <Instructions/>} */}
      {curPage === 0 && <Instructions/>}

  
      {curPage === 1 && <Game/>}
      {curPage === 2 && <Waiting text={"Level 0 Submitted"}/>}
    </div>
  )
}
