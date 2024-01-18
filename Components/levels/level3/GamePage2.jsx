import { useState } from "react";
import Navbar from "../Navbar";
import { Accordion, AccordionItem } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";



const GamePage2 = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [finalAnswerForPage2,setFinalAnswerForPage2]=useState([]);

  // function submitAnswerForLevel3Page2(){
  //   fetch('/api/levels/level1/sendData',{
  //     method:'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${session.accessTokenBackend}`,
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify({answerPage2:finalAnswerForPage2}),
  //   }).then((res) => res.json()).then(console.log('clicked')).then(console.log(level1Answer))
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

  const handleOptionChange = (heading, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [heading]: option,
    }));
  };

  const handleSubmitAnswer = (heading, index) => {
    setFinalAnswerForPage2((prev) => ({
      ...prev,
      [heading]: index,
    }));
  };

  

  const headings = ["Heading 1", "Heading 2"];
  const optionsPerHeading = {
    "Heading 1": ["Option A", "Option B"],
    "Heading 2": ["Option C", "Option D"],
  };

  return (
    <main className="min-h-screen bg-[url('/assets/landingPage/bg.svg')]">
      <Navbar level="level3" />
      <div className="flex flex-col gap-5 items-center justify-center w-[95vw] h-[80vh]">
        <div className="w-full">
          <div className="w-1/2 mx-auto p-4 border rounded-md shadow-md text-white">
            <h1 className="text-xl font-semibold mb-4">
              Select one option per property:
            </h1>
            {headings.map((heading, index) => (
              <div key={index} className="mb-4"><div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold mb-2">{heading}</h1>
                <FaDownload  className="text-white "/></div>
                {optionsPerHeading[heading].map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`flex items-center space-x-2 mb-2 p-2 rounded cursor-pointer text-white`}
                    onClick={() => {handleOptionChange(heading, option),handleSubmitAnswer(heading,optionIndex)}}
                  >
                    <input
                      type="radio"
                      name={heading}
                      value={option}
                      checked={selectedOptions[heading] === option}
                      onChange={() => {handleOptionChange(heading, option),handleSubmitAnswer(heading,optionIndex)}}
                      className="cursor-pointer"
                    />
                    <span className="select-none ml-5">{option}</span>
                    
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => console.log('hdfkjhakslghkas;fhg',finalAnswerForPage2)}
        >
          Submit
        </button>
      </div>
      <Toaster />
    </main>
  );
};

export default GamePage2;
