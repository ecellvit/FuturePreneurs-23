import React from "react";
import { useState, useEffect } from "react";

const Instructions = () => {
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const targetTime = new Date(2024, 0, 17, 21, 30);
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
      // Target date has passed
      return { minutes: "00", seconds: "00", hours: "00" };
    }

    if (Math.floor(timeDiff / 1000) <= 0) {
      setButtonEnabled(true);
    }

    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return {
      hours: hours.toString().padStart(2, "0"),
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
    <main className="min-h-[100vh] text-white flex flex-col items-center">
      <div>
        <h1 className="flex justify-center my-2 text-xl underline ">
          Quiz Starts In
        </h1>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex flex-col">{timeRemaining.hours}</div>
            Hours
          </div>
          <span>:</span>
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
      <div className="border border-white rounded-lg p-2 my-6">
        <h1 className="flex justify-center text-2xl font-bold">INSTRUCTIONS</h1>
        <ul className="list-disc list-inside leading-8">
          <li>There are Four sections in the quiz.</li>
          <li>Each section can be accessed only once.</li>
          <li>
            Navigation between questions isn’t allowed and you can visit a
            question only once.
          </li>
          <li>
            These sections are divided on the basis of the difficulty level of
            the questions, i.e. Easy, Medium, Hard and Case Study.
          </li>
          <li>Easy section consists of 10 questions, each carrying 1 mark.</li>
          <li>
            Medium section consists of 8 questions, each carrying 1.5 marks.
          </li>
          <li>Case study consists of 4 questions, each carrying 2 marks.</li>
          <li>
            There are three types of questions: Multiple Choice questions,
            Multiple Correct Questions and Fill in the blank.
          </li>
          <li>
            For Multiple Correct questions, full marks will be only awarded for
            all correct answers.
          </li>
          <li>
            For multiple correct, if the number of answers is less than the
            correct answers, marks will be awarded on the basis of the number of
            correct options selected.
          </li>
          <li>
            For Multiple Correct questions, if the number of answered choices
            are more than the number of correct choices, 0 marks will be awarded
          </li>
          <li>There are no negative markings.</li>
          <li>
            Once logged in into your quiz page, you cannot open any other
            application on your screen without submitting the quiz.
          </li>
          <li>The quiz timer will be displayed on top center of the screen.</li>
          <li>45 minutes will be given for the quiz.</li>
          <li>
            You can only submit the quiz when completed, if not the quiz will
            auto-submit after 45 minutes
          </li>
        </ul>
      </div>
      <div>
        <button
          disabled={!buttonEnabled}
          className={`px-4 py-2 rounded-full bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] m-4 w-full h-12 flex items-center justify-center font-bold ${
            !buttonEnabled
              ? "opacity-75 hover:cursor-not-allowed"
              : "hover:opacity-80 hover:cursor-pointer"
          }}`}
          onClick={() => console.log("clicked")}
        >
          Start Quiz
        </button>
      </div>
    </main>
  );
};

export default Instructions;
