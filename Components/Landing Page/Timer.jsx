import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate }){
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
      // Target date has passed
      return { days: '00', hours: '00', minutes: '00' };
    }

    const days =Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return {
      days: days.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0')
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
    <div className="text-white flex flex-col w-fit">
      <div className="font-bold text-3xl my-4 self-center max-sm:text-2xl">Registration Closed</div>
      {/* <div className='flex font-black text-3xl justify-evenly max-sm:text-2xl'>
      <div className='flex flex-col'>{timeRemaining.days}<span className='text-base font-normal'>DAYS</span></div>:
      <div className='flex flex-col'>{timeRemaining.hours}<span className='text-base font-normal'>HOURS</span></div>:
      <div className='flex flex-col'>{timeRemaining.minutes}<span className='text-base font-normal'>MINS</span></div>
      </div> */}
    </div>
  );
};
