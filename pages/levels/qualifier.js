// full questions ui here
import React, { useEffect, useState } from "react";
import Navbar from "@/Components/levels/Navbar";
import questions from "@/constants/qualifiers/questions.json";
import QuestionForQualifier from "@/Components/Qualifier/QuestionsForQualifier";
import AnswerForQualifier from "@/Components/Qualifier/AnswerForQualifier";
import Waiting from "@/Components/levels/Waiting";

export default function qualifier() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionCategory, setQuestionCategory] = useState("");

  useEffect(() => {
    GetQuestionNumber();
  });

  function GetQuestionNumber() {
    fetch("/api/levels/qualifier/getQuestionData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log("data", data);
          setQuestionNumber(data.questionPointer);
          console.log(data.category)
          setQuestionCategory(data.category);
          // console.log(data.team.pageNo);
        });
      } else {
        console.log("error");
      }
    });
  }

  return (
    <main className="min-h-screen">
      {questionCategory !== "instruction" ? (
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
            />
            <button
              type="button"
              class="text-white w-1/6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Submit
            </button>
          </section>
        </div>
      ) : (
        <Waiting text={"Wait!!! Quiz will start in few minutes"} />
      )}
    </main>
  );
}
