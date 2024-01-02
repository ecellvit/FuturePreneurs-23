import Card from "./Card";
import Image from "next/image";

import bg from "public/assets/landingPage/bg.svg";
import img1 from "public/assets/landingPage/BSG/cardImg1.svg";
import img2 from "public/assets/landingPage/BSG/cardImg2.svg";
import img3 from "public/assets/landingPage/BSG/cardImg3.svg";

const CardSection = () => {
  return (
    <main className="relative py-10">
      <Image alt="background space image" src={bg} fill className="object-cover z-[-10]" />
      <div className="flex justify-evenly  flex-wrap gap-10 sm:gap-0">
        <Card image={img1} heading= {"Problem Solving"} des={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}/>
        <Card image={img2} heading= {"Skill Testing"} des={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}/>
        <Card image={img3} heading= {"Self Analysis"} des={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}/>
      </div>
    </main>
  );
};

export default CardSection;
