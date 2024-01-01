import Image from "next/image";
import { motion } from "framer-motion";

import bg from "public/assets/landingPage/bg.svg";
import earth from "public/assets/landingPage/earth.svg";

const Test = () => {
  return (
    <main className="min-h-[100vh] relative overflow-hidden">
      <Image src={bg} fill className="object-cover z-[-10]" />
      <motion.div 
      initial={{
        top:"-30%",
        right:"0",
        height:"25rem",
        
      }} 
      animate={{
        height:"75rem",
        bottom:"-115%",
        right:"10%"
      }}
      transition={{duration:2, ease: "easeInOut", type:"just"}}
      className="img absolute h-[75rem] bottom-[-115%] right-[10%]">
        <Image src={earth} fill className="h-full w-full " />
      </motion.div>
    </main>
  );
};

export default Test;
