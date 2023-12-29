import Image from "next/image";
import bg from "public/assets/landingPage/bg.svg";
import Accordian from "./Accordian";

const FAQ = () => {
  return (
    <section className="relative min-h-[100vh]">
      <Image src={bg} fill className="object-cover z-[-10]" />
      <Accordian q={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit amet culpa necessitatibus. Est alias amet ex fugiat aperiam nam perferendis?"} ans={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit amet culpa necessitatibus. Est alias amet ex fugiat aperiam nam perferendis?"} />
    </section>
    
  );
};

export default FAQ;
