import React,{useEffect,useState} from "react"
import Waiting from "@/Components/levels/Waiting";
import Router from "next/router";
import { redirect } from "next/dist/server/api-utils";
import GamePage from "@/Components/levels/level4/GamePage";
import { useSession } from "next-auth/react";
import Instructions from "@/Components/levels/level4/instruction";

export default function Level4() {
  const [curPage, setCurPage] = useState(1);

  const { data: session, status } = useSession();

  useEffect(() => {
    // fetch /api/level0
    getLevel4Data();
    checkCurrentLevel4();
  }, [])

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
            console.log("data", data);
            // setCurPage(data.team.pageNo);
            console.log(data.round.level);
            if(data.round.level!==4){
                // redirect(`/levels/level${data.round.level}`)
                // Router.push(`/levels/level${data.round.level}`)
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
          // setCurPage(data.team.pageNo);
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
      {curPage === 1 && <GamePage/>}
      {curPage === 2 && <Waiting text={"Prompt"}/>}
      {curPage === 3 && <Waiting text={"Level 0 is ended"}/>}
      {/* {curPage === 2 && <Prompt/>} */}
    </div>
  )
}


