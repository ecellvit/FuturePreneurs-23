import Image from "next/image";
import { motion } from "framer-motion";
const Card = (props) => {
  return (
    <div className="bg-gradient-to-r from-[#06318730] from-15% via-[#104c8893] via-60% to-[#0655872f] to-85% w-80 h-96 flex flex-col justify-between px-4 pb-5 pt-3 rounded-xl">
      <motion.div
        initial={{
          opacity: 0,
          translateY: 50,
        }}
        whileInView={{
          opacity: 1,
          translateY: 0,
        }}
        viewport={{once:true}}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="h-1/2 w-full flex justify-center"
      >
        <Image className="h-full" src={props.image} />
      </motion.div>
      <div className="h-full flex flex-col justify-around">
        <h1 className="text-center font-bold text-2xl">{props.heading}</h1>
        <div className="text-justify text-md">{props.des}</div>
      </div>
    </div>
  );
};

export default Card;
