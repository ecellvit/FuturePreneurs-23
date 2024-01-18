import React, { useEffect, useState } from "react";
import Router from "next/router";
import Waiting from "@/Components/levels/Waiting";
import Game1 from "@/Components/levels/level1/game";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Instructions from "@/Components/levels/level1/instruction";

export default function Level1() {

  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      if (status === 'unauthenticated') {
        console.log('Authenticated000000000000000000000000=======');
        router.push('/');
      } else if (status === 'authenticated') {
        console.log('Authenticated000000000000000000000000', session);
        checkCurrentLevel1();
        getLevel1Data();
      }
    }
  } , [status, router]);

  const [curPage, setCurPage] = useState(-1);

  const checkCurrentLevel1 = () => {
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
          console.log("data", data);
          // setCurPage(data.team.pageNo);
          console.log(data.round.level);
          if (data.round.level !== 1) {
            // redirect(`/levels/level${data.round.level}`)
            Router.push(`/levels/level${data.round.level}`);
          }
        });
      } else {
        console.log("error");
      }
    });
  };

  const getLevel1Data = () => {
    // get question number & end Time from backend
    fetch("/api/levels/level1/getData", {
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
      {curPage === -1 && <Waiting text={"Please Wait for Level 1 to start"} />}
      {/* {curPage === 0 && <Instructions/>} */}
      {curPage === 0 && <Instructions/>}
      {curPage === 1 && <Game1 />}
      {curPage === 2 && <Waiting text={"Prompt"} />}
      {curPage === 3 && <Waiting text={"Level 1 is ended"} />}
      {/* {curPage === 2 && <Prompt/>} */}
    </div>
  );
}
