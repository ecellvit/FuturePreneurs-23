import React, { useState } from "react";
import questions from "@/constants/qualifiers/questions.json";


export default function AnswerForQualifier(props) {
  const [answer, setAnswer] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  // const storeAnswers = ()=>{
  //   if(answerOptionType==='single'){
  //     setStoreAnswer()
  //     setFinalAnswer(storeAnswer)
  //   }
  // }

  const storeAnswer=(ele)=>{
    if(props.questionType==='single')
      props.setFinalAnswer(ele)
    else{
      // console.log(selectedOptions)
      if(answer.includes(ele))
        {
          setAnswer(answer.filter((x) => x !== ele));
        }
      
      else{
        setAnswer(prevAnswer => [...prevAnswer, ele]);
        
      }
    }
  }
  props.setFinalAnswer(answer)
  
  const handleOptionChange = (questionId, option) => {
    const isSelected = selectedOptions[questionId]?.includes(option);
    // console.log(isSelected)
    
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: getUpdatedOptions(
        prevOptions[questionId] || [],
        option,
        questions[props.questionCategory][questionId].q.questionType,
        isSelected
        ),
      })
      
      );
      // props.setFinalAnswer(selectedOptions)
  };

  const getUpdatedOptions = (prevOptions, option, optionType, isSelected) => {
    if (optionType === "single") {
      return [option];
    } else {
      return isSelected
      ? prevOptions.filter((selectedOption) => selectedOption !== option)
      : [...prevOptions, option];
    }
  };
  return (
    <main>
      
      <section className="flex flex-col justify-center items-center">
      
        {props.questionCategory === "easy" && (
          <div className="flex text-xl">
            <ul className="">
              {Object.keys(
                questions[props.questionCategory][props.questionNumber].ans
                  .optionsContent
              ).map((ele) => {
                return (
                  <>
                    {questions[props.questionCategory][props.questionNumber].ans
                      .optionsType === "text" ? (
                      <div>
                        <label key={ele}>
                          <input
                            type={
                              props.questionType === "single"
                                ? "radio"
                                : "checkbox"
                            }
                            onChange={() =>
                              {
                                handleOptionChange(props.questionNumber, ele)
                                storeAnswer(ele)
                              }
                            }
                            checked={
                              selectedOptions[props.questionNumber]?.includes(ele) ||
                              false
                            }
                            className="mr-2"
                          />
                          {questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]}
                        </label>
                      </div>
                    ) : (
                      <div className="">
                        <input
                          type={
                              answerOptionType === "single"
                                ? "radio"
                                : "checkbox"
                            }
                            onChange={() =>
                              {handleOptionChange(props.questionNumber, ele)
                                storeAnswer(ele)
                              }
                            }
                            checked={
                              selectedOptions[props.questionNumber]?.includes(ele) ||
                              false
                            }
                            className="mr-2"
                        />
                        <img
                          src={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]
                          }
                          className="w-[350px] h-auto "
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </ul>

          </div>
        )}
        {props.questionCategory === "medium" && (
          <div className="flex text-xl">
            <ul className="">
              {Object.keys(
                questions[props.questionCategory][props.questionNumber].ans
                  .optionsContent
              ).map((ele) => {
                return (
                  <>
                    {questions[props.questionCategory][props.questionNumber].ans
                      .optionsType === "text" ? (
                      <div>
                        <label key={ele}>
                          <input
                            type={
                              props.questionType === "single"
                                ? "radio"
                                : "checkbox"
                            }
                            onChange={() =>
                              {
                                handleOptionChange(props.questionNumber, ele)
                                storeAnswer(ele)
                              }
                            }
                            checked={
                              selectedOptions[props.questionNumber]?.includes(ele) ||
                              false
                            }
                            className="mr-2"
                          />
                          {questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]}
                        </label>
                      </div>
                    ) : (
                      <div className="">
                        <input
                          type={
                              answerOptionType === "single"
                                ? "radio"
                                : "checkbox"
                            }
                            onChange={() =>
                              {handleOptionChange(props.questionNumber, ele)
                                storeAnswer(ele)
                              }
                            }
                            checked={
                              selectedOptions[props.questionNumber]?.includes(ele) ||
                              false
                            }
                            className="mr-2"
                        />
                        <img
                          src={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]
                          }
                          className="w-[350px] h-auto "
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </ul>

          </div>
        )}
        {props.questionCategory === "hard" && (
          <div className="flex text-xl">
            <ul className="">
              {Object.keys(
                questions[props.questionCategory][props.questionNumber].ans
                  .optionsContent
              ).map((ele) => {
                return (
                  <>
                    {questions[props.questionCategory][props.questionNumber].ans
                      .optionsType === "text" ? (
                      <div>
                        <label key={ele}>
                          <input
                            type={
                              props.questionType === "single"
                                ? "radio"
                                : "checkbox"
                            }
                            onChange={() =>
                              {
                                handleOptionChange(props.questionNumber, ele)
                                storeAnswer(ele)
                              }
                            }
                            checked={
                              selectedOptions[props.questionNumber]?.includes(ele) ||
                              false
                            }
                            className="mr-2"
                          />
                          {questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]}
                        </label>
                      </div>
                    ) : (
                      <div className="">
                        <input
                          type={
                              answerOptionType === "single"
                                ? "radio"
                                : "checkbox"
                            }
                            onChange={() =>
                              {handleOptionChange(props.questionNumber, ele)
                                storeAnswer(ele)
                              }
                            }
                            checked={
                              selectedOptions[props.questionNumber]?.includes(ele) ||
                              false
                            }
                            className="mr-2"
                        />
                        <img
                          src={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]
                          }
                          className="w-[350px] h-auto "
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </ul>

          </div>
        )}
        {props.questionCategory === "caseStudy" && (
          <div className="flex text-xl">
            <ul className="">
              {Object.keys(
                questions[props.questionCategory][props.questionNumber].ans
                  .optionsContent
              ).map((ele) => {
                return (
                  <>
                    {questions[props.questionCategory][props.questionNumber].ans
                      .optionsType === "text" ? (
                      <div>
                        <label key={ele}>
                          <input
                            type={
                              props.questionType === "single"
                                ? "radio"
                                : "checkbox"
                            }
                            onChange={() =>
                              {
                                handleOptionChange(props.questionNumber, ele)
                                storeAnswer(ele)
                              }
                            }
                            checked={
                              selectedOptions[props.questionNumber]?.includes(ele) ||
                              false
                            }
                            className="mr-2"
                          />
                          {questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]}
                        </label>
                      </div>
                    ) : (
                      <div className="">
                        <input
                          type={
                              answerOptionType === "single"
                                ? "radio"
                                : "checkbox"
                            }
                            onChange={() =>
                              {handleOptionChange(props.questionNumber, ele)
                                storeAnswer(ele)
                              }
                            }
                            checked={
                              selectedOptions[props.questionNumber]?.includes(ele) ||
                              false
                            }
                            className="mr-2"
                        />
                        <img
                          src={
                            questions[props.questionCategory][
                              props.questionNumber
                            ].ans.optionsContent[ele]
                          }
                          className="w-[350px] h-auto "
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </ul>

          </div>
        )}
      </section>
    </main>
  );
}
