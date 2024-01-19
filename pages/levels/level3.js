import Waiting from "@/Components/levels/Waiting";
import GamePage1 from "@/Components/levels/level3/GamePage1";
import GamePage2 from "@/Components/levels/level3/GamePage2";
import Instructions from "@/Components/levels/level3/instruction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Level3() {

  const { data: session, status } = useSession();
  const router = useRouter();

  const [finalAnswerForPage1,setFinalAnswerForPage1]=useState([]);
  const [finalAnswerForPage2,setFinalAnswerForPage2]=useState([]);
  const [transfer,newTransfer]=useState();
  const [newSector,setNewSector]=useState()

  useEffect(() => {
   if (router.isReady) {
     if (status === 'unauthenticated') {
       console.log('Authenticated000000000000000000000000=======');
       router.push('/');
     } else if (status === 'authenticated') {
       console.log('Authenticated000000000000000000000000', session);

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
          setCurPage(data.team.pageNo);
          console.log("dfssd--------",data.team.pageNo)
        });
      } else {
        console.log("error");
      }
    });
  };

  return (
    <div>
    {/* <GamePage2/> */}
      {curPage === -1 && <Waiting text={"Please Wait for other teams,Level 4 started"}/>}
      {curPage === 0 && <Instructions/>}
      {curPage === 1 && <GamePage1 finalAnswerForPage1={finalAnswerForPage1} setFinalAnswerForPage1={setFinalAnswerForPage1}/>}
      {curPage === 2 && <GamePage2 finalAnswerForPage2={finalAnswerForPage2} finalAnswerForPage1={finalAnswerForPage1} setFinalAnswerForPage2={setFinalAnswerForPage2}/>}
      {curPage === 3 && <Waiting next={'4'} text={"Level 4 has ended"}/>}
    </div>
  )
}
