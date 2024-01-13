import React,{useEffect,useState} from "react"
import Waiting from "@/Components/levels/Waiting";
import Game from "@/Components/levels/level0/game";
import Router from "next/router";
import { redirect } from "next/dist/server/api-utils";

export default function Level0() {

  useEffect(() => {
    // fetch /api/level0
    getLevelData();
    checkCurrentLevel();
  }, [])

  const [curPage, setCurPage] = useState(-1);

  const checkCurrentLevel = ()=>{
    fetch('/api/levels/checkCurrentRound',{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

  const getLevelData = () => {
    // get question number & end Time from backend
    fetch("/api/levels/level0/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
      {curPage === -1 && <Waiting text={"Please Wait for other teams"}/>}
      {/* {curPage === 0 && <Instructions/>} */}
      {curPage === 0 && <Waiting text={"Instruction"}/>}
      {curPage === 1 && <Game/>}
      {curPage === 2 && <Waiting text={"Prompt"}/>}
      {curPage === 3 && <Waiting text={"Level 0 is ended"}/>}
      {/* {curPage === 2 && <Prompt/>} */}
    </div>
  )
}
