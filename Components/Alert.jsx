//Alert component to show alerts.
import { motion } from "framer-motion";

export default function Alert(props) {
  return (
    <motion.div
      className="w-[50vw] bg-gray-800 text-green-400 font-medium p-2 rounded-lg absolute bottom-10 after:content-[''] after:top-0 after:left-0 after:w-full after:h-[1px]"
      initial={{
        translateY: "100%",
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
      }}
      exit={{
        translateY:"100%",
        opacity:0,
      }}
      transition={{ duration: 0.5, type:"spring", bounce:"0.4" }}
    >
      <h1>{props.name}</h1>
    </motion.div>
  );
}
