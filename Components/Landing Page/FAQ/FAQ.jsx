import Image from "next/image";
import Accordian from "./Accordian";
import { useState } from "react";

import bg from "public/assets/landingPage/bg.svg";
import faqAstro from "public/assets/landingPage/FAQ/faqAstro.svg";

const FAQ = () => {

  const [showAnsNumber, setShowAnsNumber] = useState(-1)
  const handleClick = (id)=>{
    if(id === showAnsNumber){
      setShowAnsNumber(-1);
    }
    else{
      setShowAnsNumber(id);
    }
  }

  const faqs = [
    {
      id: 1,
      q: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, odio!",
      ans: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae enim placeat tempora similique cum ipsa ea debitis quia repellat earum."
    },
    {
      id: 2,
      q: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, odio!",
      ans: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae enim placeat tempora similique cum ipsa ea debitis quia repellat earum."
    },
    {
      id: 3,
      q: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, odio!",
      ans: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae enim placeat tempora similique cum ipsa ea debitis quia repellat earum."
    },
    {
      id: 4,
      q: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, odio!",
      ans: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae enim placeat tempora similique cum ipsa ea debitis quia repellat earum."
    },
  ]

  const faqSection = faqs.map((questionObj)=>(
    <Accordian key={questionObj.id} q={questionObj.q} ans={questionObj.ans} id={questionObj.id} handleClick={handleClick} showAnsNumber={showAnsNumber}/>
  ))

  return (
    <section className="relative min-h-[80vh] w-full flex justify-center items-center">
      <Image src={bg} fill className="object-cover z-[-10]" />
      <div className="flex flex-col sm:flex-row gap-10 items-center w-3/4">
        <div className="w-full sm:w-1/2 flex sm:flex-col items-center gap-5 sm:gap-0">
          <div className="w-1/2 sm:w-full">
            <Image src={faqAstro} />
          </div>
          <div className="">
            <h1 className="text-2xl sm:text-3xl">
              <div>Answers To Some</div>
              <div>Commonly Asked Questions.</div>
            </h1>
          </div>
        </div>
        <div className="w-full sm:w-1/2 h-full flex flex-col gap-2 items-start">
          {faqSection}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
