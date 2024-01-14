import React,{useEffect,useState} from "react"
import Waiting from "@/Components/levels/Waiting";
import GamePage1 from "@/Components/levels/level3/GamePage1";
import Router from "next/router";

export default function Level3() {

  // useEffect(() => {
  //   // fetch /api/level0
  //   getLevel0Data();
  //   checkCurrentLevel0();
  // }, [])

  const [curPage, setCurPage] = useState(1);

  const checkCurrentLevel0 = ()=>{
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

  const getLevel0Data = () => {
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
