import Waiting from "@/Components/levels/Waiting";
import GamePage from "@/Components/levels/level4/GamePage";
import Instructions from "@/Components/levels/level4/instruction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Level4() {
  const [curPage, setCurPage] = useState(-1);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (status === 'unauthenticated') {
        console.log('Authenticated000000000000000000000000=======');
        router.push('/');
      } else if (status === 'authenticated') {
        console.log('Authenticated000000000000000000000000', session);
     // fetch /api/level0
 
     getLevel4Data();
     checkCurrentLevel4();
     }
    } 
   }, [status, router]);

  const checkCurrentLevel4 = ()=>{
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
            if(data.round.level!==4){
                router.push(`/levels/level${data.round.level}`)
            }
          });
        } else {
          console.log("error");
        }
      });
  }

  const getLevel4Data = () => {
    // get question number & end Time from backend
    fetch("/api/levels/level4/getData", {
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
      {curPage === -1 && <Waiting text={"Please Wait for Level 5 to start"}/>}
      {/* {curPage === 0 && <Instructions/>} */}
      {curPage === 0 && <Instructions/>}
      {curPage === 1 && <GamePage/>}
      {curPage === 2 && <Waiting text={"Prompt"}/>}
      {curPage === 3 && <Waiting text={"Level 5 is ended"}/>}
      {/* {curPage === 2 && <Prompt/>} */}
    </div>
  )
}


