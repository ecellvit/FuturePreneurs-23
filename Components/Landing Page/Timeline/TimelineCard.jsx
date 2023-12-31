import React from "react";
import Image from "next/image";
import img1 from "public/assets/landingPage/timeline/img1.svg";
const TimelineCard = (props) => {
  return (
    <div className=" h-96 w-72 relative flex flex-col justify-between select-none">
      <Image src={props.img} fill className="absolute z-[-5] object-cover"/>
      <div className="p-2 text-lg font-bold">{props.id}</div>
      <div className="flex flex-col items-center text-center px-3">
        <h1 className="font-bold text-xl">
            {props.date}
            <div className="h-[1px] bg-[#ffffff54] w-full"></div>
        </h1>
        <h1 className="font-medium text-3xl uppercase">
           {props.text}
        </h1>
      </div>
    </div>
  );
};

export default TimelineCard;
