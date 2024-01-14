import React, { useState } from "react";
import questions from "@/constants/qualifiers/questions.json";

export default function AnswerForQualifier(props) {
  const [answer, setAnswer] = useState("");
  const questionCategory = "easy";
  return (
    <main>
      <section className="flex flex-col justify-center items-center">
        {props.questionCategory === "easy" && (
          <div className="flex text-xl ">
            <ul>
              {Object.keys(
                questions[props.questionCategory][props.questionNumber].ans
                  .optionsContent
              ).map((ele) => {
                return (
                  <>
                    {questions[props.questionCategory][props.questionNumber].ans
                      .optionsType === "text" ? (
                      <div>
                        <input
                          key={ele}
                          type="radio"
                          id={ele}
                          checked={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele] === answer
                          }
                          onClick={() => {
                            setAnswer(
                              questions[props.questionCategory][
                                props.questionNumber
                              ].ans.optionsContent[ele]
                            );
                          }}
                        />
                        <label>
                          {
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]
                          }
                        </label>
                      </div>
                    ) : (
                      <div className="flex flex-row justify-between ">
                        <input
                          key={ele}
                          type="radio"
                          id={ele}
                          checked={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele] === answer
                          }
                          onClick={() => {
                            setAnswer(
                              questions[props.questionCategory][
                                props.questionNumber
                              ].ans.optionsContent[ele]
                            );
                          }}
                        />
                        <img
                          src={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]
                          }
                          className="w-[350px] h-auto"
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </ul>

            <div></div>
          </div>
        )}
        {questionCategory === "medium" && (
          <div className="flex text-xl ">
            <ul>
              {Object.keys(
                questions[props.questionCategory][props.questionNumber].ans
                  .optionsContent
              ).map((ele) => {
                return (
                  <>
                    {questions[props.questionCategory][props.questionNumber].ans
                      .optionsType === "text" ? (
                      <div>
                        <input
                          key={ele}
                          type="radio"
                          id={ele}
                          checked={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele] === answer
                          }
                          onClick={() => {
                            setAnswer(
                              questions[props.questionCategory][
                                props.questionNumber
                              ].ans.optionsContent[ele]
                            );
                          }}
                        />
                        <label>
                          {
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]
                          }
                        </label>
                      </div>
                    ) : (
                      <div>
                        <input
                          key={ele}
                          type="radio"
                          id={ele}
                          checked={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele] === answer
                          }
                          onClick={() => {
                            setAnswer(
                              questions[props.questionCategory][
                                props.questionNumber
                              ].ans.optionsContent[ele]
                            );
                          }}
                        />
                        <img
                          src={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]
                          }
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </ul>

            <div></div>
          </div>
        )}
        {questionCategory === "hard" && (
          <div className="flex text-xl ">
            <ul>
              {Object.keys(
                questions[props.questionCategory][props.questionNumber].ans
                  .optionsContent
              ).map((ele) => {
                return (
                  <>
                    {questions[props.questionCategory][props.questionNumber].ans
                      .optionsType === "text" ? (
                      <div>
                        <input
                          key={ele}
                          type="radio"
                          id={ele}
                          checked={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele] === answer
                          }
                          onClick={() => {
                            setAnswer(
                              questions[props.questionCategory][
                                props.questionNumber
                              ].ans.optionsContent[ele]
                            );
                          }}
                        />
                        <label>
                          {
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]
                          }
                        </label>
                      </div>
                    ) : (
                      <div>
                        <input
                          key={ele}
                          type="radio"
                          id={ele}
                          checked={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele] === answer
                          }
                          onClick={() => {
                            setAnswer(
                              questions[props.questionCategory][
                                props.questionNumber
                              ].ans.optionsContent[ele]
                            );
                          }}
                        />
                        <img
                          src={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]
                          }
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </ul>

            <div></div>
          </div>
        )}
        {questionCategory === "caseStudy" && (
          <div className="flex text-xl ">
            <ul>
              {Object.keys(
                questions[props.questionCategory][props.questionNumber].ans
                  .optionsContent
              ).map((ele) => {
                return (
                  <>
                    {questions[props.questionCategory][props.questionNumber].ans
                      .optionsType === "text" ? (
                      <div>
                        <input
                          key={ele}
                          type="radio"
                          id={ele}
                          checked={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele] === answer
                          }
                          onClick={() => {
                            setAnswer(
                              questions[props.questionCategory][
                                props.questionNumber
                              ].ans.optionsContent[ele]
                            );
                          }}
                        />
                        <label>
                          {
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]
                          }
                        </label>
                      </div>
                    ) : (
                      <div>
                        <input
                          key={ele}
                          type="radio"
                          id={ele}
                          checked={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele] === answer
                          }
                          onClick={() => {
                            setAnswer(
                              questions[props.questionCategory][
                                props.questionNumber
                              ].ans.optionsContent[ele]
                            );
                          }}
                        />
                        <img
                          src={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]
                          }
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </ul>

            <div></div>
          </div>
        )}
      </section>
    </main>
  );
}
