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
      q: "Is it compulsory to participate in a team?",
      ans: ["Yes, it is compulsory to participate as a team."]
    },
    {
      id: 2,
      q: "What is the team size?",
      ans: ["Team can consists 2 to 4 members."]
    },
    {
      id: 3,
      q: "I’m interested in participating but I’m unable to find a team. What should I do?",
      ans: ["You can register without a team, we will provide a team for you."]
    },
    {
      id: 4,
      q: "Will there be any registration fees?",
      ans: ["No, the event is free of cost."]
    },
    {
      id: 5,
      q: "Do I need to have a business idea ready?",
      ans: ["No, we provide support for idea development throughout the event - just bring your enthusiasm!"]
    },
    {
      id: 6,
      q: "What is the duration of the event?",
      ans: ["The event will be conducted from 10:00 AM to 5:00 PM."]
    },
    {
      id: 7,
      q: "Will ODs be provided for the event? ",
      ans: ["Yes, ODs will be provided for the duration of the event."]
    },
    {
      id: 8,
      q: "I still have some doubts regarding the event. How can I get them resolved?",
      ans: ["Contact:", "Anuj Khokhar +91 8827995405","Vrinda Bajaj +91 7303555341 "]
    },
  ]

  const faqSection = faqs.map((questionObj)=>(
    <Accordian key={questionObj.id} {...questionObj} handleClick={handleClick} showAnsNumber={showAnsNumber}/>
  ))

  return (
    <section className="relative min-h-[80vh] w-full flex justify-center items-center">
      <Image alt="background space image" src={bg} fill className="object-cover z-[-10]" />
      <div className="flex flex-col sm:flex-row gap-10 items-center w-3/4">
        <div className="w-full sm:w-1/2 flex sm:flex-col items-center gap-5 sm:gap-0">
          <div className="w-1/2 sm:w-full">
            <Image src={faqAstro} alt="Astronaut" className="pointer-events-none"/>
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
