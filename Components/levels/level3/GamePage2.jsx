import locations from "@/constants/level3/locations.json";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";
import Navbar from "../Navbar";

const GamePage2 = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([0,1]);
  const [getProperty, setGetProperty] = useState([0]);
  const [finalAnswerForPage2, setFinalAnswerForPage2] = useState();
  const [sector, setSector] = useState(0);
  const [heading, setHeading] = useState([0,1]);
  const [number1,setNumber1]=useState(0);
  const [number2,setNumber2]=useState(1);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
          if (status === "unauthenticated") {
              router.push("/");
          } else if (status === "authenticated") {
              try {
                  const dataForPage2 = await getDataForPage2();
              } catch (error) {
                  // Handle errors if necessary
                  console.error("Error fetching data:", error);
              }
          }
      }
  };

  fetchData();
  }, [status, router, number1, number2]);

  function submitAnswerForLevel3Page2() {
  fetch("/api/levels/level3/storeAnswers2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessTokenBackend}`,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ "answerPage2": finalAnswerForPage2 }),
  })
  .then(res=>{
    if(res.status === 200){
      toast.success("Submitted successfully.")
      location.reload();
    };
  })  
    .catch((err) => {
    });
  }

  const getDataForPage2 = async () => {
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
          res.json().then((data) => {
            setSector(data.sector);
            setHeading(data.answers);
            let head = data.answers
            fetch("/api/levels/level3/getAnswers", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessTokenBackend}`,
                "Access-Control-Allow-Origin": "*",
              },
            }).then((res) => {
              if (res.status === 200) {
                res.json().then((data) => {
                  setGetProperty(data.answers);
                  setNumber1(data.answers[head[0]]);
                  setNumber2(data.answers[head[1]]);
                });
              } else {
              }
            });
          });
        } else {
        }
      });
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


  const industry=["E.V","Green Construction","Renewable Energy"]
  const final = industry[sector]
    
  
  const headings = [
    locations[final][number1]["title"],
    locations[final][number2]["title"],
  ];
  const pdf = [
    locations[final][number1]["pdf"],
    locations[final][number2]["pdf"],
  ];

  const optionHeadings=[
    [
      locations[final][number1]["locations"][0]["locationName"],
      locations[final][number1]["locations"][1]["locationName"]
    ],
    [
      locations[final][number2]["locations"][0]["locationName"],
      locations[final][number2]["locations"][1]["locationName"]
    ]
  ]
  return (
    <main className="min-h-screen bg-[url('/assets/landingPage/bg.svg')]">
      <Navbar level="level3" sendData={() => {submitAnswerForLevel3Page2()}}
      />
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
