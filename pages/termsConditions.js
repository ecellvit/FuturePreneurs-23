import Navbar from "@/Components/Navbar";
import bg from "@/public/assets/bg/spceBg.svg";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TermsConditions() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [check, setCheck] = useState();

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
        console.log(data.consent);
        const user = data.user;
        setCheck(data.consent);
        // if (user.hasFilledDetails == true) {
        //   if (user.teamId !== null) {
        //     const redirect = user.teamRole=='1' ? '/memberDashboard' : '/leaderDashboard';
        //     router.push(redirect);
        //   } else {
        //     router.push("/makeTeam");
        //   }
        // }
        console.log('user', user)
      })
  }

  function consent() {
    fetch(process.env.NEXT_PUBLIC_SERVER + 'user/consent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        "consent": true
      })
    }).then((res) => res.json())
      .then((data) => {
        router.push("/makeTeam")
        location.reload();
      })
  }
  
  useEffect(() => {
    if (router.isReady) {
      if (status === "unauthenticated") {
        //Checks if session is not ready and redirects to root.
        console.log("Please Login First!");
        router.push("/");
      } else if (status === "authenticated") {
        console.log(`Getting data`, status);
        // toast.success("Logged In");
        // getData();
      }
    }
  }, [status, router]);

  return (
    <div className="h-full w-full">
      <Image src={bg} alt="bgImage" fill className="object-cover z-[-10] w-full min-h-[100vh]" />
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen max-md:overflow-scroll max-md:max-h-fit ">
        <div className="w-1/2 h-1/2 max-md:h-fit max-md:w-2/3 p-8 flex flex-col justify-around items-center bg-[#141B2B] rounded-lg border border-white">
          <p className="text-white text-xl font-bold flex max-md:align-top">TERMS AND CONDITION</p>
          <p className="text-white flex flex-wrap max-md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
            mollitia quis expedita nam animi soluta voluptatum hic ratione in
            incidunt dicta error quibusdam dolores ullam quos tempora facere
            repellat eaque sequi unde rerum odit autem? Reiciendis alias non
            neque quam!
          </p>
        </div>
        <div>
          {!check ? <button onClick={() => { consent() }} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            I Agree
          </button> : <button onClick={() => { location.reload() }} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            I Disgree
          </button>}
        </div>
      </div>
    </div>

  )
}