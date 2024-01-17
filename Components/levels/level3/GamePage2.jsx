import { useState } from "react";
import Navbar from "../Navbar";
import { Accordion, AccordionItem } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";

const GamePage2 = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    heading1: null,
    heading2: null,
  });

  const handleOptionChange = (heading, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [heading]: option,
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
              <div key={index} className="mb-4"><div>
                <h1 className="text-2xl font-semibold mb-2">{heading}</h1>
                <FaDownload  className="text-white "/></div>
                {optionsPerHeading[heading].map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`flex items-center space-x-2 mb-2 p-2 rounded cursor-pointer text-white`}
                  >
                    <input
                      type="radio"
                      name={heading}
                      value={option}
                      checked={selectedOptions[heading] === option}
                      onChange={() => handleOptionChange(heading, option)}
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
        >
          Submit
        </button>
      </div>
      <Toaster />
    </main>
  );
};

export default GamePage2;
