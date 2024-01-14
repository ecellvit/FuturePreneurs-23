import React from "react";
import questions from "@/constants/qualifiers/questions.json";

export default function QuestionForQualifier(props) {
  console.log('asdf', props, questions[props.questionCategory])
  const questionCategory = "easy";
  return (
    <main>
      <section className="flex flex-col justify-center items-center">
        {props.questionCategory === "easy" && (
          <div className="flex flex-col text-xl w-3/4 h-fit p-5 border border-black rounded-lg">
            <div>Question {props.questionNumber + 1}</div>
            <div>
              {
                questions[props.questionCategory][props.questionNumber].q
                  .content
              }
            </div>
            {questions[props.questionCategory][props.questionNumber].q
              .contentType === "image" && (
              <img
                src={
                  questions[props.questionCategory][props.questionNumber].q
                    .contentLink
                }
              />
            )}
          </div>
        )}
        {props.questionCategory === "medium" && (
          <div className="flex flex-col text-xl w-3/4 h-fit p-5 border border-black rounded-lg">
            <div>Question {props.questionNumber + 1}</div>
            <div>
              {
                questions[props.questionCategory][props.questionNumber].q
                  .content
              }
            </div>
            {questions[props.questionCategory][props.questionNumber].q
              .contentType === "image" && (
              <img
                src={
                  questions[props.questionCategory][props.questionNumber].q
                    .contentLink
                } className="w-[30vw] h-[15vh]"
              />
            )}
          </div>
        )}
        {props.questionCategory === "hard" && (
          <div className="flex flex-col text-xl w-3/4 h-fit p-5 border border-black rounded-lg">
            <div>Question {props.questionNumber + 1}</div>
            <div>
              {
                questions[props.questionCategory][props.questionNumber].q
                  .content
              }
            </div>
            {questions[props.questionCategory][props.questionNumber].q
              .contentType === "image" && (
              <img
                src={
                  questions[props.questionCategory][props.questionNumber].q
                    .contentLink
                }
              />
            )}
          </div>
        )}
        {props.questionCategory === "caseStudy" && (
          <div className="flex flex-col text-xl w-3/4 h-fit p-5 border border-black rounded-lg">
            <div>Question {props.questionNumber + 1}</div>
            <div>
              {
                questions[props.questionCategory][props.questionNumber].q
                  .content
              }
            </div>
            {questions[props.questionCategory][props.questionNumber].q
              .contentType === "image" && (
              <img
                src={
                  questions[props.questionCategory][props.questionNumber].q
                    .contentLink
                }
              />
            )}
          </div>
        )}
      </section>
    </main>
  );
}
