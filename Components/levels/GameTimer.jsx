import React, { useState, useEffect } from "react";

export default function GameTimer(props) {
  // const currentTime = new Time.now();
  const [endTime, setEndTime] = useState(Date.now());
  useEffect(() => {
    fetch(`/api/levels/${props.level}/getTime`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data for time", data);
        setEndTime(data.endTime);
      })
      .catch((err) => {
        console.log("error=>", err);
      });
  }, []);
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
