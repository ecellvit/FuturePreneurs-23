import React, { useState } from "react";
import questions from "@/constants/qualifiers/questions.json";


export default function AnswerForQualifier(props) {
  const [selectedOptions, setSelectedOptions] = useState({});

  // const storeAnswers = ()=>{
  //   if(answerOptionType==='single'){
  //     setStoreAnswer()
  //     setFinalAnswer(storeAnswer)
  //   }
  // }

  const storeAnswer=(ele)=>{
    if(props.questionType==='single')
      {console.log('hfsdfsd',ele)
      props.setFinalAnswer([ele])}
    else{
      // console.log(selectedOptions)
      if((props.finalAnswer).includes(ele))
        {
          props.setFinalAnswer((props.answer).filter((x) => x !== ele));
        }
      
      else{
        props.setFinalAnswer(prevAnswer => [...prevAnswer, ele]);
        
      }
    }
  }
  // props.setFinalAnswer(answer)
  
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
    <main className="text-white">
      
      <section className="flex flex-col justify-center items-center text-white">
      
        {props.questionCategory === "easy" && (
          <div className="flex text-xl">
            <ul className="grid grid-cols-2 gap-8">
              {Object.keys(
                questions[props.questionCategory][props.questionNumber].ans
                  .optionsContent
              ).map((ele) => {
                return (
                  <div key={ele}>
                    {questions[props.questionCategory][props.questionNumber].ans
                      .optionsType === "text" ? (
                      <div key={ele}>
                        <label >
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
                      <div className="flex" key={ele}>
                        <input
                          type={
                              props.questionType === "single"
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
                          className="w-[300px] h-auto "
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </ul>

          </div>
        )}
        {props.questionCategory === "medium" && (
          <div className="flex text-xl">
            <ul className="grid grid-cols-2 gap-8">
              {Object.keys(
                questions[props.questionCategory][props.questionNumber].ans
                  .optionsContent
              ).map((ele) => {
                return (
                  <div key={ele}>
                    {questions[props.questionCategory][props.questionNumber].ans
                      .optionsType === "text" ? (
                      <div key={ele}>
                        <label>
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
                      <div className="flex" key={ele}>
                        <input
                          type={
                            props.questionType === "single"
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
                          className="w-[300px] h-auto "
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </ul>

          </div>
        )}
        {props.questionCategory === "hard" && (
          <div className="flex text-xl">
            <ul className="grid grid-cols-2 gap-8">
              {Object.keys(
                questions[props.questionCategory][props.questionNumber].ans
                  .optionsContent
              ).map((ele) => {
                return (
                  <div key={ele}>
                    {questions[props.questionCategory][props.questionNumber].ans
                      .optionsType === "text" ? (
                      <div key={ele}>
                        <label>
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
                      <div className="flex" key={ele}>
                        <input
                          type={
                            props.questionType === "single"
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
                          className="w-[300px] h-auto "
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </ul>

          </div>
        )}
        {props.questionCategory === "caseStudy" && (
          <div className="flex text-xl">
            <ul className="grid grid-cols-2 gap-8">
              {Object.keys(
                questions[props.questionCategory][props.questionNumber].ans
                  .optionsContent
              ).map((ele) => {
                return (
                  <div key={ele}>
                    {questions[props.questionCategory][props.questionNumber].ans
                      .optionsType === "text" ? (
                      <div key={ele}>
                        <label >
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
                      <div className="flex" key={ele}>
                        <input
                          type={
                            props.questionType === "single"
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
                          className="w-[300px] h-auto "
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </ul>

          </div>
        )}
      </section>
    </main>
  );
}
