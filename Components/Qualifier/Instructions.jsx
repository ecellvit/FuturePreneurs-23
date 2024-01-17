import time from "@/constants/time.json";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoadingIcons from "react-loading-icons";

const Instructions = () => {
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const[loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  const calculateTimeRemaining = () => {
    const now = new Date().getTime();

    const targetTime = new Date(
      2024,
      0,
      time.quizStartTime.day,
      time.quizStartTime.hour,
      time.quizStartTime.minute,
      time.quizStartTime.second
    );
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
      // Target date has passed
      setButtonEnabled(true);
      return { minutes: "00", seconds: "00", hours: "00" };
    }

    if (Math.floor(timeDiff / 1000) <= 0) {
      console.log("asdf");
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
    // if early then disable button

    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const startQuiz = () => {
    setLoading(true);
    fetch("/api/levels/qualifier/startQuiz", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("quizStartingNow.");
          location.reload();
        } else if (res.status === 403) {
          toast.error("Quiz has not started yet");
        } else {
          toast.error("too late");
        }
        setLoading(false);
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <div className="flex flex-col items-start w-[90vw] px-8 py-4 border rounded-xl m-2">
        <p>
          Welcome to the Qualifying round of Futureprenuers 9.0! The quiz is
          designed to assess your knowledge and skills. To successfully qualify,
          you must answer the questions with accuracy and precision.
        </p>
        <br />
        <p>
          Read the following instructions carefully to ensure a smooth and
          successful completion of the quiz.
        </p>
        <ul className="list-inside list-disc">
          <li>
            <span className="underline">Basic Rules:</span>
            <ol className="list-inside list-decimal ml-6">
              <li>
                Participants will be given{" "}
                <span className="font-bold">45 minutes</span> to complete the
                quiz.
              </li>
              <li>
                Once logged in, participants{" "}
                <span className="font-bold">
                  cannot open any other application
                </span>
                without submitting the quiz.
              </li>
              <li>A timer will be displayed at the top of the screen.</li>
              <li>
                The quiz can only be submitted after completion, otherwise, it
                will auto-submit after 45 minutes.
              </li>
              <li>
                There is <span className="font-bold">no</span> negative marking.
              </li>
            </ol>
          </li>
          <li>
            <span className="underline">Navigation Rules:</span>
            <ol className="list-inside list-decimal ml-6">
              <li>
                Each section is accessible{" "}
                <span className="font-bold">only once</span>.
              </li>
              <li>
                Participants are not allowed to navigate between questions
                within a section.
              </li>
              <li>
                The navigation is designed to be one-way, therefore{" "}
                <span className="font-bold">
                  every question can be visited only once
                </span>
                .
              </li>
              <li>
                Selecting ‘Next’ without choosing any answer will result in
                automatic skipping of the current question, and there is no
                provision to go back.
              </li>
            </ol>
          </li>
          <li>
           <span className="underline"> Section Division:</span>
            <ol className="list-inside list-decimal ml-6">
              <li>
                The quiz is divided into <span className="font-bold">FOUR</span>{" "}
                sections.
              </li>
              <li>
                Sections are categorized by level of difficulty: Easy, Medium,
                Hard and Case Study.
              </li>
              <li>
                Section one consists of 10 questions, carrying 1 mark each.
              </li>
              <li>
                Section two consists of 8 questions, carrying 1.5 marks each.
              </li>
              <li>
                Section three consists of 8 questions, carrying 2.5 marks each.
              </li>
              <li>
                Section four consists of 4 questions, carrying 2 marks each.
              </li>
            </ol>
          </li>
          <li>
          <span className="underline">Question types:</span>
            <ol className="list-inside list-decimal ml-6">
              <li>
                There are <span className="font-bold">THREE</span> question
                types: Multiple Choice, Multiple Correct, and Fill in the Blank.
              </li>
              <li>
                For Multiple Correct questions, full marks are awarded only if
                all correct answers are chosen. If the number of selected
                answers is less than the correct options, marks will be awarded
                based on the correct choices selected.
              </li>
              <li>
                For Multiple Correct questions, if the number of answered
                choices are more than the number of correct choices, <span className="font-bold">zero</span> marks
                are awarded.
              </li>
            </ol>
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
          onClick={() => startQuiz()}
        >
          {loading ? <LoadingIcons.Oval height={"20px"}/> : "Start Quiz"}
        </button>
      </div>
      <Toaster />
    </main>
  );
};

export default Instructions;
