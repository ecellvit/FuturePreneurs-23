import React, { useEffect } from "react";
import Router from "next/router";

export default function Level1(){

    useEffect(()=>{
        checkCurrentLevel();
    })

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
                if(data.round.level!==1){
                    // redirect(`/levels/level${data.round.level}`)
                    Router.push(`/levels/level${data.round.level}`)
                }
              });
            } else {
              console.log("error");
            }
          });
      }

    return(
        <div>
            level1
        </div>
    )
}