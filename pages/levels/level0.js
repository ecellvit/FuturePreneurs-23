import React,{useEffect,useState} from "react"
import Waiting from "@/Components/levels/Waiting";
import Game from "@/Components/levels/level0/game";

export default function Level0() {

  useEffect(() => {
    // fetch /api/level0
    getLevelData();

  }, [])

  const [curPage, setCurPage] = useState(-1);

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
