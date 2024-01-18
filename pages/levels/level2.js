import React, { useEffect, useState } from "react";
import Router from "next/router";
import Waiting from "@/Components/levels/Waiting";
import Game from "@/Components/levels/level2/Game";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Instructions from "@/Components/levels/level2/instruction";
import { compress } from "@/next.config";

export default function Level2() {

  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      if (status === 'unauthenticated') {
        console.log('Authenticated000000000000000000000000=======');
        router.push('/');
      } else if (status === 'authenticated') {
        console.log('Authenticated000000000000000000000000', session);
        checkCurrentLevel2();
        getLevel2Data();
      }
    }
  } , [status, router]);

  const [curPage, setCurPage] = useState();
  const[set, setSet] = useState();

  const checkCurrentLevel2 = () => {
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
          if (data.round.level !== 2) {
            router.push(`/levels/level${data.round.level}`);
          }
        });
      } else {
        console.log("error");
      }
    });
  };

  const getLevel2Data = () => {
    // get question number & end Time from backend
    fetch("/api/levels/level2/getData", {
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
          setSet(data.set);
          console.log(data.set);
          
          setCurPage(data.team.pageNo);
        });
      } else {
        console.log("error");
      }
    });
  };

  return (
    <div>
       {curPage === -1 && <Waiting text={"Please Wait for Level 2 to start"} />}
      {curPage === 0 && <Instructions/>}
      {curPage === 1 && <Game set={set}/>}
      {curPage === 2 && <Waiting text={"Level 2 has ended"} />} 
    </div>
  );
}
