import React from "react";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";

import bg from "public/assets/landingPage/bg.svg";
import image from "public/assets/landingPage/moonAstronaut.svg";

const StoryBehindSection = () => {
  return (
    <section className="min-h-[100vh] relative flex flex-col justify-center">
      <Image
        alt="background space image"
        src={bg}
        fill
        className="object-cover z-[-10]"
      />
      <div className="flex flex-col items-center justify-between sm:flex-row sm:px-20 sm:gap-0 md:gap-10 lg:gap-0">
        <motion.div
          animate={{
            rotate: "7deg",
          }}
          transition={{
            duration: 1,
            ease: easeInOut,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="image h-full w-1/2 relative"
        >
          <Image
            alt="astronaut chilling on the moon"
            src={image}
            className=" h-96 w-full pointer-events-none"
          />
        </motion.div>
        <div className="w-full sm:w-1/2 flex flex-col justify-center gap-5 px-16 sm:px-0">
          <h1 className="font-bold text-5xl">Story Behind...</h1>
          <p className="">
            Born from E-Cell's fiery spirit, we are ready to bring
            Futurepreneurs 9.0, to converse unique ideas. This event was
            meticulously crafted with the prime objective of delivering
            first-hand experiences of a business simulation event right to the
            participants desks. Students from diverse backgrounds have
            established names for themselves by solving real life problems with
            dedication, commitment and analytical skills amongst their peers.
            These challenges have helped them to move forward with success,
            showing them the importance of initiation and working together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StoryBehindSection;
