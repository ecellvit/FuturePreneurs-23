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
        <Card image={img1} heading= {"Explore"} des={" Dive into the world of entrepreneurship, discovering new possibilities and opportunities."}/>
        <Card image={img2} heading= {"Create"} des={"Develop your business acumen, crafting innovative solutions and strategies."}/>
        <Card image={img3} heading= {"Triumph"} des={"Experience success by applying your newfound skills, excelling in the event and beyond."}/>
      </div>
    </main>
  );
};

export default CardSection;
