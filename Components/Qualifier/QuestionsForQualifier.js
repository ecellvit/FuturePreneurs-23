import React from "react";
import questions from "@/constants/qualifiers/questions.json";

export default function QuestionForQualifier(props) {
  return (
    <main>
      <section className="flex flex-col justify-center items-center px-4">
        {props.questionCategory === "easy" && (
          <div className="flex flex-col text-xl w-fit h-fit p-5 border border-white text-white rounded-lg">
            <div className="text-4xl align-top">Question {props.questionNumber + 1}</div>
            <div className="">
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
               alt="question image"
                className="h-auto w-auto"
               />
            )}
            {questions[props.questionCategory][props.questionNumber].q
              .contentType === "audio" && (
              <div>
                {typeof(
                  questions[props.questionCategory][props.questionNumber].q
                    .contentLink
                ) === "object" ? (
                  <div>
                    <audio controls className="mb-2">
                      <source
                        src={
                          questions[props.questionCategory][
                            props.questionNumber
                          ].q.contentLink[0]
                        }
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                    <audio controls className="mb-2">
                      <source
                        src={
                          questions[props.questionCategory][
                            props.questionNumber
                          ].q.contentLink[1]
                        }
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : (
                  <audio controls className="mb-2">
                    <source
                      src={
                        questions[props.questionCategory][props.questionNumber]
                          .q.contentLink
                      }
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            )}
          </div>
        )}
        {props.questionCategory === "medium" && (
          <div className="flex flex-col text-xl w-fit h-fit p-5 border border-white text-white rounded-lg">
            <div className="text-4xl align-top">Question {props.questionNumber + 11}</div>
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
                className="w-auto h-auto"
               alt="question image"/>
            )}
            {questions[props.questionCategory][props.questionNumber].q
              .contentType === "audio" && (
              <div>
                {typeof(
                  questions[props.questionCategory][props.questionNumber].q
                    .contentLink
                ) === "object" ? (
                  <div>
                    <audio controls className="mb-2">
                      <source
                        src={
                          questions[props.questionCategory][
                            props.questionNumber
                          ].q.contentLink[0]
                        }
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                    <audio controls className="mb-2">
                      <source
                        src={
                          questions[props.questionCategory][
                            props.questionNumber
                          ].q.contentLink[1]
                        }
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : (
                  <audio controls className="mb-2">
                    <source
                      src={
                        questions[props.questionCategory][props.questionNumber]
                          .q.contentLink
                      }
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            )}
          </div>
        )}
        {props.questionCategory === "hard" && (
          <div className="flex flex-col text-xl w-fit h-fit p-5 border border-white text-white rounded-lg">
            <div className="text-4xl align-top">Question {props.questionNumber + 19}</div>
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
              alt="question image"

              />
            )}
            {questions[props.questionCategory][props.questionNumber].q
              .contentType === "audio" && (
              <div>
                {typeof(
                  questions[props.questionCategory][props.questionNumber].q
                    .contentLink
                ) === "object" ? (
                  <div>
                    <audio controls className="mb-2">
                      <source
                        src={
                          questions[props.questionCategory][
                            props.questionNumber
                          ].q.contentLink[0]
                        }
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                    <audio controls className="mb-2">
                      <source
                        src={
                          questions[props.questionCategory][
                            props.questionNumber
                          ].q.contentLink[1]
                        }
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : (
                  <audio controls className="mb-2">
                    <source
                      src={
                        questions[props.questionCategory][props.questionNumber]
                          .q.contentLink
                      }
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            )}
          </div>
        )}
        {props.questionCategory === "caseStudy" && (
          <div className="flex flex-col text-xl w-fit h-fit p-5 border border-white text-white rounded-lg">
            <div className="text-4xl align-top">Question {props.questionNumber + 23}</div>
            <div>
              {
                questions[props.questionCategory][props.questionNumber].q
                  .content
              }
            </div>
            
            
          </div>
        )}
      </section>
    </main>
  );
}
