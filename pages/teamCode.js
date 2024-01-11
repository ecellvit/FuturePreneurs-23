"use client";
import Alert from "@/Components/Alert";
import Navbar from "@/Components/Navbar";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import bg from "public/assets/bg/spceBg.svg";
import copyIcon from "public/assets/icons/copyIcon.svg";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoadingIcons from "react-loading-icons";


export default function TeamCode() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      
      if (status === "unauthenticated") {
        
        // router.push("/")
      } else if (status === "authenticated") {
        
        getData();
      }
    }
  }, [status, router]);

  const [teamName, setTeamName] = useState("Team Futurepreneur"); // To store the team name
  const [teamCode, setTeamCode] = useState("abc123"); //To store the team code recieved from the backend
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false); //To show the bool to display the alert.
  const [alertText, setAlertText] = useState(""); //Store the alert text to be displayed

  const getData = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/user/userDetails`, {
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
        const user = data.user;
        if (user.hasFilledDetails === true) {
          if (user.teamId !== null) {
            if (user.teamRole !== "0") {
              router.push("/memberDashboard");
            }
          } else {
            router.push("/joinTeam");
          }
        }
        else{
          router.push("/userDetails")
        }
        fetch(`${process.env.NEXT_PUBLIC_SERVER}/team/getTeamCode`, {
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
            setLoading(false);
            
            setTeamCode(data.teamCode);
            setTeamName(data.teamName);
          })
          .catch((err) => {
            setLoading(true);
            
          });
      });
  };

  return (
    <main className="min-h-[100vh] items-center flex flex-col justify-center">
      <Toaster/>
      <Navbar />
      <Image alt="bg" src={bg} fill className="object-cover z-[-10]" />
      <div className="h-[45vh] w-[45vw] bg-[#141B2B] flex flex-col items-center justify-around text-white rounded-lg p-3 min-w-fit min-h-fit">
        <h1 className="text-4xl sm:text-5xl font-bold">
          {loading ? <LoadingIcons.Oval/> : teamName}
        </h1>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-medium underline">Team Code</h1>
          <h1 className="text-lg">{loading ? <LoadingIcons.Oval/> : teamCode}</h1>
        </div>
        <div className="flex items-center hover:underline hover:cursor-pointer" onClick={()=>{
          navigator.clipboard.writeText(teamCode);
          toast.success("Copied to clipboard.", {duration:3000})
        }}>
          Click here to copy
          <div>
            <Image src={copyIcon} className="h-full p-2" />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showAlert && <Alert name={alertText} />}
      </AnimatePresence>
    </main>
  );
}
