import properties from '@/constants/level3/properties.json';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";
import Navbar from "../Navbar";

const GamePage1 = (props) => {
  const defaultContent = "asdfaf";
  const [getProperty, setGetProperty] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [finalAnswerForPage1, setFinalAnswerForPage1] = useState([]);
  const [sector, setSector] = useState();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [newArray, setNewArray] = useState([])

  useEffect(() => {
    if (router.isReady) {
      if (status === "unauthenticated") {
        router.push("/");
      } else if (status === "authenticated") {
        // fetch /api/level0

        //  checkCurrentLevel3();
        getLevel3DataPage1();
      }
    }
  }, [status, router]);

  const getLevel3DataPage1 = () => {
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
          console.log('dsagsdfga', data.answers);
          console.log('getprrr///////////////', getProperty);
          // props.setNewSector(data.sector)
          setSector(data.sector);
          // setGetProperty(data);
          // setCurPage(data.team.pageNo);
          // setAnswer(data.ans)
        });
      } else {
      }
    });
  };

  function submitAnswerForLevel3() {
    if (finalAnswerForPage1.length === 2) {
      fetch("/api/levels/level3/storeAnswers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ answerPage1: finalAnswerForPage1 }),
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
    else {
      toast.error("You have to select two options!!!")
    }
  }

  const submitAnswerForLevel3Page1 = (value) => {
    if (finalAnswerForPage1.includes(value)) {
      // If option is already selected, remove it
      setFinalAnswerForPage1(
        finalAnswerForPage1.filter((selected) => selected !== value)
      );
    } else {
      // If option is not selected, add it (up to a maximum of two options)
      if (finalAnswerForPage1.length < 2) {
        setFinalAnswerForPage1([...finalAnswerForPage1, value]);
      }
    }
  };

  const handleIconClick = (link) => {
    // Replace 'your_link_url' with the actual URL you want to open
    window.open(link, '_blank');
  };


  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      // If option is already selected, remove it
      setSelectedOptions(
        selectedOptions.filter((selected) => selected !== option)
      );
    } else {
      // If option is not selected, add it (up to a maximum of two options)
      if (selectedOptions.length < 2) {
        setSelectedOptions([...selectedOptions, option]);
      } else {
        toast.error("You cannot select more than two");
      }
    }
  };

  const industry = ["E.V", "Green Construction", "Renewable Energy"]
  const final = industry[sector]

  // for(let i=0;i<getProperty.length;i++){
  //     answerArray.push(properties[sector])
  // }

  const options = [
    "Option A",
    "Option B",
    "Option C",
    "Option D",
    "Option E",
    "Option F",
    "Option G",
  ];

  return (
    <main className="min-h-screen bg-[url('/assets/landingPage/bg.svg')]">
      <Toaster />
      <Navbar level="level3" sendData={submitAnswerForLevel3} />
      <div className="flex flex-col gap-5 items-center justify-center w-[95vw] h-[80vh]">
        <div className="mx-auto p-4 border rounded-md shadow-md w-3/4 h-3/4 flex flex-col">
          <h1 className="text-lg font-semibold mb-4 text-white">
            Select up to two options:
          </h1>
          <div className="flex flex-col justify-evenly h-3/4">
            {getProperty.map((ele, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 mb-2" 
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(ele)}
                  onChange={() => { }}
                  className="cursor-pointer"
                  onClick={() => {
                  handleOptionClick(ele), submitAnswerForLevel3Page1(index);
                }}
                />
                <span className="text-white">{properties[final][ele]['title']}</span>
                <FaDownload className="text-white cursor-pointer" onClick={() => { handleIconClick(properties[final][ele]['pdf']) }} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            submitAnswerForLevel3();
          }}
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
