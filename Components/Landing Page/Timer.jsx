import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate }){
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
      // Target date has passed
      return { days: 0, hours: 0, minutes: 0};
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes};
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Registration Closes In</h1>
      <p>{timeRemaining.days} days : {timeRemaining.hours} hours : {timeRemaining.minutes} minutes</p>
    </div>
  );
};
