import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function GameTimer(props) {
  // const currentTime = new Time.now();
  const [endTime, setEndTime] = useState(Date.now());

  const { data: session, status } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      if (status === 'unauthenticated') {
        router.push('/');
      } else if (status === 'authenticated') {
        fetch(`/api/levels/${props.level}/getTime`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessTokenBackend}`,
            'Access-Control-Allow-Origin': '*',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data for time", data);
            setEndTime(data.endTime);
          })
          .catch((err) => {
            console.log("error=>", err);
          });
      }
    }
  }, [status, router]);


  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const targetTime = new Date(endTime).getTime();
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
      // Target date has passed
      return { minutes: "00", seconds: "00" };
    }

    if (Math.floor(timeDiff / 1000) <= 0) {
      props.sendData();
      location.reload();
    }

    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return {
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  });

  return (
    <div className="flex justify-center h-full w-full text-white ">
      <div className="flex justify-evenly h-full w-full text-xl">
        <div className="flex flex-col items-center">
          <div className="flex flex-col">{timeRemaining.minutes}</div>
          MINS
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <div className="flex flex-col">{timeRemaining.seconds}</div>
          SECS
        </div>
      </div>
    </div>
  );
}
