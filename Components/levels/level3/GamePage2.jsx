import { useState,useEffect } from "react";
import Navbar from "../Navbar";
import { Accordion, AccordionItem } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import properties from '@/constants/level3/properties.json'
import locations from '@/constants/level3/locations.json'



const GamePage2 = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [finalAnswerForPage2,setFinalAnswerForPage2]=useState([]);
  const [sector,setSector]= useState();
  const [heading,setHeading] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (status === "unauthenticated") {
        console.log("Authenticated000000000000000000000000=======");
        router.push("/");
      } else if (status === "authenticated") {
        console.log("Authenticated000000000000000000000000", session);
        // fetch /api/level0

        //  checkCurrentLevel3();
        getLevel3DataPage2();
      }
    }
  }, [status, router]);

  function submitAnswerForLevel3Page2(){
    fetch('/api/levels/level3/storeAnswers2',{
      method:'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({answerPage2:finalAnswerForPage2}),
    }).then((res) => res.json()).then(console.log('clicked')).then(console.log(finalAnswerForPage2))
    .catch((err) => {
      console.log(err);
    });
  }

  function getDataForPage2(){
    fetch('/api/levels/level3/getDataPage2',{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log("data", data);
          setSector(data.sector);
          setHeading(data.answers);
          // setGetProperty(data);
          // setCurPage(data.team.pageNo);
          // setAnswer(data.ans)
        });
      } else {
        console.log("error");
      }
    })
  }

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

  // console.log(locations[sector]["title"])
  // console.log(locations[sector]["locations"][0]["locationName"])

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
                    onClick={() => {handleOptionChange(heading, option),handleSubmitAnswer(heading,option)}}
                  >
                    <input
                      type="radio"
                      name={heading}
                      value={option}
                      checked={selectedOptions[heading] === option}
                      onChange={() => {handleOptionChange(heading, option),handleSubmitAnswer(heading,option)}}
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
        onClick={() => {submitAnswerForLevel3Page2()}}
        >
          Submit
        </button>
      </div>
      <Toaster />
    </main>
  );
};

export default GamePage2;
