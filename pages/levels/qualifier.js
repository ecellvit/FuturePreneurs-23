// full questions ui here
import AnswerForQualifier from "@/Components/Qualifier/AnswerForQualifier";
import QuestionForQualifier from "@/Components/Qualifier/QuestionsForQualifier";
import Navbar from "@/Components/levels/Navbar";
import Waiting from "@/Components/levels/Waiting";
import questions from "@/constants/qualifiers/questions.json";
// import Image from "next/image";
// import bg from "public/assets/landingPage/bg.svg";
import { useEffect, useState } from "react";

export default function Qualifier() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionCategory, setQuestionCategory] = useState("easy");
  const [finalAnswer, setFinalAnswer] = useState([]);
  console.log(questions);

  useEffect(() => {
    GetQuestionNumber();
    checkCurrentQualifier();
  });

  const submitAnswer = () => {
    fetch("/api/levels/qualifier/submitAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer: finalAnswer }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFinalAnswer([]);
        GetQuestionNumber();
        console.log("Final Answer => ", finalAnswer);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkCurrentQualifier = () => {
    fetch("/api/levels/checkCurrentRound", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res
          .json()
          .then((data) => {
            // console.log("data", data);
            // setCurPage(data.team.pageNo);
            // console.log(data.round.level);
            if (data.round.level !== -1) {
              // redirect(`/levels/level${data.round.level}`)
              Router.push(`/levels/level${data.round.level}`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  function GetQuestionNumber() {
    fetch("/api/levels/qualifier/getQuestionData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("Question number got :::::");
        console.log(data.questionNumber);
        setQuestionNumber(data.questionNumber);
        setQuestionCategory(data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="min-h-screen bg-[url('/assets/landingPage/bg.svg')]">
      {/* <Image src={bg} alt="bgImage" fill className="object-cover z-[-10]" /> */}
      {questionCategory === "waiting" && (
        <Waiting text={"Wait!!! Quiz will start in few minutes"} />
      )}
      {questionCategory === "instruction" && (
        <Waiting text={"Wait!!! Quiz will start in few minutes"} />
      )}
      {questionCategory !== "instruction" && questionCategory !== "waiting" && (
        <div>
          <Navbar
            sendData={submitAnswer}
            teamName={"Team 1"}
            level="qualifier"
          />
          <section className="flex flex-col gap-4 mt-4 items-center">
            <QuestionForQualifier
              questionNumber={questionNumber}
              questionCategory={questionCategory}
            />
            <AnswerForQualifier
              questionNumber={questionNumber}
              questionCategory={questionCategory}
              questionType={
                questions[questionCategory][questionNumber].q.questionType
              }
              setFinalAnswer={setFinalAnswer}
              finalAnswer={finalAnswer}
            />
            {(questionCategory === "caseStudy" && questionNumber === 3) ? (
              <button
                type="button"
                className="text-white w-1/6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={() => submitAnswer()}
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="text-white w-1/6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={() => submitAnswer()}
              >
                Next
              </button>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
