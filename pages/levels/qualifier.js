// full questions ui here
import React, { useEffect, useState } from "react";
import Navbar from "@/Components/levels/Navbar";
import questions from "@/constants/qualifiers/questions.json";
import QuestionForQualifier from "@/Components/Qualifier/QuestionsForQualifier";
import AnswerForQualifier from "@/Components/Qualifier/AnswerForQualifier";
import Waiting from "@/Components/levels/Waiting";

export default function qualifier() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionCategory, setQuestionCategory] = useState("easy");
  const [finalAnswer,setFinalAnswer]= useState([]);
  console.log(questions)

  useEffect(() => {
    GetQuestionNumber();
    checkCurrentQualifier();
  });

  const submitAnswer=()=>{
    fetch('/api/levels/qualifier/submitAnswer',{
          method: "PUSH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( finalAnswer ),
        }).then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              console.log("data", data);
            });
          } else {
            console.log("error");
          }
        });
  }

  const checkCurrentQualifier = ()=>{
    fetch('/api/levels/checkCurrentRound',{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            console.log("data", data);
            // setCurPage(data.team.pageNo);
            console.log(data.round.level);
            if(data.round.level!==-1){
                // redirect(`/levels/level${data.round.level}`)
                Router.push(`/levels/level${data.round.level}`)
            }
          });
        } else {
          console.log("error");
        }
      });
  }

  function GetQuestionNumber() {
    fetch("/api/levels/qualifier/getQuestionData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setQuestionNumber(data.questionPointer);
          setQuestionCategory(data.category);
        });
      } else {
        console.log("error");
      }
    });
  }

  return (
    <main className="min-h-screen">
      {questionCategory==='waiting' && <Waiting text={"Wait!!! Quiz will start in few minutes"} />}
      {questionCategory === 'instruction' && (
        <Waiting text={"Wait!!! Quiz will start in few minutes"} />)}
      {(questionCategory !== "instruction" && questionCategory !=='waiting') && (
        <div>
          <Navbar />
          <section className="flex flex-col gap-4 mt-4 items-center">
            <QuestionForQualifier
              questionNumber={questionNumber}
              questionCategory={questionCategory}
            />
            <AnswerForQualifier
              questionNumber={questionNumber}
              questionCategory={questionCategory}
              questionType={questions[questionCategory][questionNumber].q.questionType}
              setFinalAnswer = {setFinalAnswer}
              finalAnswer = {finalAnswer}
            />
            <button
              type="button"
              className="text-white w-1/6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={()=>console.log(finalAnswer)}
            >
              Next
            </button>
          </section>
        </div>
      ) }
    </main>
  );
}
