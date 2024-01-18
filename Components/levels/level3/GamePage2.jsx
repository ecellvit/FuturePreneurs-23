import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Accordion, AccordionItem } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import properties from "@/constants/level3/properties.json";
import locations from "@/constants/level3/locations.json";

const GamePage2 = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [finalAnswerForPage2, setFinalAnswerForPage2] = useState([]);
  const [sector, setSector] = useState('E.V');
  const [heading, setHeading] = useState([1,2]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("hora hai");
    getDataForPage2()
  }, []);

  function submitAnswerForLevel3Page2() {
    fetch("/api/levels/level3/storeAnswers2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ answerPage2: finalAnswerForPage2 }),
    })
      .then((res) => res.json())
      .catch((err) => {});
  }

  function getDataForPage2() {
    fetch("/api/levels/level3/getDataPage2", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },  
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("errorrrrrrrrrrrr");
        }
      })
      .then((data) => {
        console.log("page2data data", data);
        setSector(data.sector);
        setHeading(data.answers);
      }).catch(err=>{console.log('asdfasdferr', err)})
  }

  const handleIconClick = (link) => {
    // Replace 'your_link_url' with the actual URL you want to open
    window.open(link, '_blank');
  };

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

  // const pair = heading[i];

  const number1 = heading[0];
  const number2 = heading[1];

  console.log('sab', number1, number2, locations[sector][number1]["title"] )

  const headings = [
    locations[sector][number1]["title"],
    locations[sector][number2]["title"],
  ];
  const pdf = [
    locations[sector][number1]["pdf"],
    locations[sector][number2]["pdf"],
  ];

  const optionHeadings=[
    [
      locations[sector][number1]["locations"][0]["locationName"],
      locations[sector][number1]["locations"][1]["locationName"]
    ],
    [
      locations[sector][number2]["locations"][0]["locationName"],
      locations[sector][number2]["locations"][1]["locationName"]
    ]
  ]

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
              <div key={index} className="mb-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-semibold mb-2">{heading}</h1>
                  <FaDownload
                    className="text-white cursor-pointer"
                    onClick={() => {handleIconClick(pdf[index])}}
                  />
                </div>
                {optionHeadings[index].map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`flex items-center space-x-2 mb-2 p-2 rounded cursor-pointer text-white`}
                    onClick={() => {
                      handleOptionChange(heading, option),
                        handleSubmitAnswer(heading, option);
                    }}
                  >
                    <input
                      type="radio"
                      name={heading}
                      value={option}
                      checked={selectedOptions[heading] === option}
                      onChange={() => {
                        handleOptionChange(heading, option),
                          handleSubmitAnswer(heading, option);
                      }}
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
          onClick={() => {
            submitAnswerForLevel3Page2();
          }}
        >
          Submit
        </button>
      </div>
      <Toaster />
    </main>
  );
};

export default GamePage2;
