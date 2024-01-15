import React from "react";
import questions from "@/constants/qualifiers/questions.json";

export default function QuestionForQualifier(props) {
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
          <div className="flex flex-col text-xl w-3/4 h-fit p-5 border border-black rounded-lg">
            <div>Question {props.questionNumber + 11}</div>
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
                className="w-[30vw] h-[15vh]"
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
        {props.questionCategory === "hard" && (
          <div className="flex flex-col text-xl w-3/4 h-fit p-5 border border-black rounded-lg">
            <div>Question {props.questionNumber + 19}</div>
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
          <div className="flex flex-col text-xl w-3/4 h-fit p-5 border border-black rounded-lg">
            <div>Question {props.questionNumber + 23}</div>
            <iframe src="/assets/levels/navbar/qualifier/pdf.pdf#toolbar=0&navpanes=0" />
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
