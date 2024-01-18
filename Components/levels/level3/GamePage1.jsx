import { useState } from "react";
import Navbar from "../Navbar";
import { Accordion, AccordionItem } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";

const GamePage1 = (props) => {
  const defaultContent = "asdfaf";
  
  const [finalAnswerForPage1,setFinalAnswerForPage1]=useState([]);

  const [selectedOptions, setSelectedOptions] = useState([]);

  // fetch('/api/levels/level3/sendAnswers',{
  //   method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${session.accessTokenBackend}`,
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     }).then((res) => {
  //       if (res.status === 200) {
  //         res.json().then((data) => {
  //           console.log("data", data);
  //           // setCurPage(data.team.pageNo);
  //           setAnswer(data.ans)
  //           // if(data.round.level!==3){
  //           //     // redirect(`/levels/level${data.round.level}`)
  //           //     Router.push(`/levels/level${data.round.level}`)
  //           // }
  //         });
  //       } else {
  //         console.log("error");
  //       }
  // })

  // function submitAnswerForLevel3Page1(){
  //   fetch('/api/levels/level1/sendData',{
  //     method:'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${session.accessTokenBackend}`,
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify({answerPage1:finalAnswerForPage1}),
  //   }).then((res) => res.json()).then(console.log('clicked')).then(console.log(level1Answer))
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }


  const submitAnswerForLevel3Page1=(value)=>{
    if (finalAnswerForPage1.includes(value)) {
      // If option is already selected, remove it
      setFinalAnswerForPage1(finalAnswerForPage1.filter((selected) => selected !== value));
    } else {
      // If option is not selected, add it (up to a maximum of two options)
      if (finalAnswerForPage1.length < 2) {
        setFinalAnswerForPage1([...finalAnswerForPage1, value]);
      }
    }
  }

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      // If option is already selected, remove it
      setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
    } else {
      // If option is not selected, add it (up to a maximum of two options)
      if (selectedOptions.length < 2) {
        setSelectedOptions([...selectedOptions, option]);
      }
      else{
        toast.error('You cannot select more than two')
      }
    }
  };

  

  const options = [
    'Option A',
    'Option B',
    'Option C',
    'Option D',
    'Option E',
    'Option F',
    'Option G',
  ];

  
  
  return (
    <main className="min-h-screen bg-[url('/assets/landingPage/bg.svg')]">
      <Toaster/>
      <Navbar level="level3" /><div className="flex flex-col gap-5 items-center justify-center w-[95vw] h-[80vh]">
      <div className="mx-auto p-4 border rounded-md shadow-md w-3/4 h-3/4 flex flex-col">
      <h1 className="text-lg font-semibold mb-4 text-white">Select up to two options:</h1>
      <div className="flex flex-col justify-evenly h-3/4">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 mb-2"
            onClick={() => {handleOptionClick(option),submitAnswerForLevel3Page1(index);}}
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => {}}
              className="cursor-pointer"
            />
            <span
              className="text-white"
            >
              {option}
            </span>
            <FaDownload className="text-white"/>
          </div>
        ))}
      </div>
    </div>
        <button
        onClick={()=>{console.log('hfhashfkdhfskldfhkadh',finalAnswerForPage1);}}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Submit
      </button>
      </div>
      <Toaster />
      
    </main>
  );
};

export default GamePage1;
