// full questions ui here
import AnswerForQualifier from "@/Components/Qualifier/AnswerForQualifier";
import QuestionForQualifier from "@/Components/Qualifier/QuestionsForQualifier";
import Navbar from "@/Components/levels/Navbar";
import Waiting from "@/Components/levels/Waiting";
import questions from "@/constants/qualifiers/questions.json";
// import Image from "next/image";
// import bg from "public/assets/landingPage/bg.svg";
import { useEffect, useState } from "react";
import Instructions from "@/Components/Qualifier/Instructions";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import QuizEnd from "@/Components/Qualifier/QuizEnd";
import LoadingIcons from "react-loading-icons";

export default function QualifierPage() {
  const [chronoNumber, setChronoNumber] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionCategory, setQuestionCategory] = useState('instruction');
  const [finalAnswer, setFinalAnswer] = useState([]);
  const [changeOption,setChangeOption] = useState(false)
  const [teamName, setTeamName] = useState()
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (status === 'unauthenticated') {
        console.log('Authenticated000000000000000000000000=======');
        router.push('/');
      } else if (status === 'authenticated') {
        console.log('Authenticated000000000000000000000000', session);
        GetQuestionNumber();
        checkCurrentQualifier();
      }
    }
  }, [status, router]);

  const submitAnswer = () => {
    setLoading(true);
    console.log('ans submit hora')
    fetch('/api/levels/qualifier/submitAnswer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ answer: finalAnswer }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFinalAnswer([]);
        setChangeOption((prev)=>!prev)
        GetQuestionNumber();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkCurrentQualifier = () => {

    fetch('/api/levels/checkCurrentRound', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    }).then((res) => {
      if (res.status === 200) {
        res
          .json()
          .then((data) => {
            // console.log("data", data);
            // setCurPage(data.team.pageNo);
            // console.log(data.round.level);
            if (data.round.level !== -1) {
              // redirect(`/levels/level${data.round.level}`)
              router.push(`/levels/level${data.round.level}`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  function GetQuestionNumber() {

    fetch('/api/levels/qualifier/getQuestionData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => {if (res.status===400){
          setQuestionCategory('waiting')
        } else {
          return res.json()
        }
      })
      .then((data) => {
        console.log('data', data)
        setQuestionNumber(data.questionNumber);
        setQuestionCategory(data.category);
        setTeamName(data.teamName);
        setChronoNumber(data.chronoNumber)
      }).then(()=>{
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="min-h-screen bg-[url('/assets/landingPage/bg.svg')]">
      {/* <Image src={bg} alt="bgImage" fill className="object-cover z-[-10]" /> */}
      {questionCategory === 'waiting' && (
        
        <QuizEnd/>
      )}
      {questionCategory === 'instruction' && (
        <Instructions/>
        
      )}
      {questionCategory !== "instruction" && questionCategory !== "waiting" && (
    
        <div>
          <Navbar
            sendData={submitAnswer}
            teamName={teamName}
            level="qualifier"
          />
          <section className="flex gap-4 mt-4 justify-center">
          {questionCategory==='caseStudy' && (<div className="flex flex-col h-full"><iframe src="/assets/levels/navbar/qualifier/pdf.pdf#toolbar=0&navpanes=0" className="h-[60vh] w-[50vw]"/></div>) }
            <div className="flex flex-col gap-4 mt-4 justify-center items-center">
            <QuestionForQualifier
              chronoNumber={chronoNumber}
              questionNumber={questionNumber}
              questionCategory={questionCategory}
            />
            <AnswerForQualifier
              questionNumber={questionNumber}
              questionCategory={questionCategory}
              questionType={
                questions[questionCategory][questionNumber].q.questionType
              }
              setFinalAnswer={setFinalAnswer}
              finalAnswer={finalAnswer}
              changeOption={changeOption}
            />
            {(questionCategory === "caseStudy" && questionNumber === 3) ? (
              <button
                type="button"
                className="text-white w-1/6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={() => submitAnswer()}
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                className="text-center text-white w-1/6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={() => submitAnswer()}
              >
                {loading ? <LoadingIcons.Oval className="w-full" height={"20px"}/> : "Next"}
              </button>
            )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
