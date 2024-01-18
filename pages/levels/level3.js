import React,{useEffect,useState} from "react"
import Waiting from "@/Components/levels/Waiting";
import GamePage1 from "@/Components/levels/level3/GamePage1";
import GamePage2 from "@/Components/levels/level3/GamePage2";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Instructions from "@/Components/levels/level3/instruction";

export default function Level3() {

  const { data: session, status } = useSession();
  const router = useRouter();

  const [finalAnswerForPage1,setFinalAnswerForPage1]=useState([]);
  const [finalAnswerForPage2,setFinalAnswerForPage2]=useState([]);

  useEffect(() => {
   if (router.isReady) {
     if (status === 'unauthenticated') {
       console.log('Authenticated000000000000000000000000=======');
       router.push('/');
     } else if (status === 'authenticated') {
       console.log('Authenticated000000000000000000000000', session);
    // fetch /api/level0

    checkCurrentLevel3();
    getLevel3Data();
    }
   } 
  }, [status, router]);

  const [curPage, setCurPage] = useState(1);

  const checkCurrentLevel3 = ()=>{
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
            if(data.round.level!==3){
                router.push(`/levels/level${data.round.level}`)
            }
          });
        } else {
          console.log("error");
        }
      });
  }

  const getLevel3Data = () => {
    // get question number & end Time from backend
    fetch("/api/levels/level3/getData", {
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
          setCurPage(data.pageNo);
          console.log(data.pageNo)
        });
      } else {
        console.log("error");
      }
    });
  };

  return (
    <div>
    {/* <GamePage2/> */}
      {curPage === -1 && <Waiting text={"Please Wait for other teams,Level 0 started"}/>}
      {curPage === 0 && <Instructions/>}
      {curPage === 1 && <GamePage1 finalAnswerForPage1={finalAnswerForPage1} setFinalAnswerForPage1={setFinalAnswerForPage1}/>}
      {curPage === 2 && <GamePage2 finalAnswerForPage2={finalAnswerForPage2} setFinalAnswerForPage2={setFinalAnswerForPage2}/>}
      {curPage === 4 && <Waiting text={"Level 3 has ended"}/>}
    </div>
  )
}
