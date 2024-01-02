import React from "react";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";

import bg from "public/assets/landingPage/bg.svg";
import image from "public/assets/landingPage/moonAstronaut.svg";

const StoryBehindSection = () => {
  return (
    <section className="min-h-[100vh] relative flex flex-col justify-center">
      <Image alt="background space image" src={bg} fill className="object-cover z-[-10]" />
      <div className="flex flex-col items-center justify-between sm:flex-row sm:px-20 sm:gap-0 md:gap-10 lg:gap-0">
        <motion.div 
        animate={{
          rotate:"7deg"
        }}
        transition={{duration:1,ease:easeInOut ,repeat:Infinity, repeatType:"mirror"}}
        className="image h-full w-1/2 relative">
          <Image alt="astronaut chilling on the moon" src={image} className=" h-96 w-full" />
        </motion.div>
        <div className="w-full sm:w-1/2 flex flex-col justify-center gap-5 px-16 sm:px-0">
          <h1 className="font-bold text-5xl">Story Behind...</h1>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
            mollitia quis expedita nam animi soluta voluptatum hic ratione in
            incidunt dicta error quibusdam dolores ullam quos tempora facere
            repellat eaque sequi unde rerum odit autem? Reiciendis alias non
            neque quam!
          </p>
        </div>
      </div>
    </section>
  );
};

export default StoryBehindSection;
