"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";
import Image from "next/image";
import bg from "public/assets/bg/spceBg.svg";
import copyIcon from "public/assets/icons/copyIcon.svg";

export default function TeamCode() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      console.log("status", status);
      if (status === "unauthenticated") {
        console.log("Please Login First!");
        // router.push("/")
      } else if (status === "authenticated") {
        console.log("asdfasdfasdf");
        // getData()
      }
    }
  }, [status, router]);
  console.log("clisession", session);

  const [teamName, setTeamName] = useState("Team Futurepreneur"); // To store the team name
  const [teamCode, setTeamCode] = useState("abc123"); //To store the team code recieved from the backend
  const [showAlert, setShowAlert] = useState(false); //To show the bool to display the alert.
  const [alertText, setAlertText] = useState(""); //Store the alert text to be displayed
  const getData = () => {
    // console.log(process.env.NEXT_PUBLIC_SERVER);
    // console.log(session.accessTokenBackend);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/team/getTeamDetails`, {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        // console.log("no team found");
        // console.log(err);
      });
  };
  return (
    <main className="min-h-[100vh] items-center flex flex-col justify-center">
      <Navbar />
      <Image src={bg} fill className="object-cover z-[-10]" />
      <div className="h-[70vh] w-[55vw] bg-[#141B2B] flex flex-col items-center justify-around text-white rounded-lg p-2 min-w-fit min-h-fit">
        <div>
          <h1 className="text-[1.8rem] font-bold">Enter Team Details</h1>
        </div>
        <div className="w-full flex flex-col items-center gap-5">
          <div className="w-full flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter Team Name Here"
              className="bg-[#E9FFFF] rounded-md w-1/2 h-10 text-center px-5 text-black"
            />
          </div>
          <div className="flex justify-center w-full gap-5">
            <div className="w-1/2 text-end font-semibold underline">
              {teamName}
            </div>
            <div className="flex w-1/2 ">
              <div
                className="flex hover:underline hover:cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(teamName);
                }}
              >
                <Image src={copyIcon} alt="copyIcon" className="h-1/2" />
                <span>Click here to copy</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full gap-5">
            <div className="w-1/2 text-end font-semibold underline">
            {`https://fp/${teamName}`}
            </div>
            <div className="flex w-1/2 ">
              <div
                className="flex hover:underline hover:cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(`https://fp/${teamName}`);
                }}
              >
                <Image src={copyIcon} alt="copyIcon" className="h-1/2" />
                <span>Click here to copy</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          
          <h1 className="text-[1.8rem] font-bold">Share with Members!</h1>
        </div>
      </div>
    </main>
  );
}
