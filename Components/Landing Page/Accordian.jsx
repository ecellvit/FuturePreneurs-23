import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";
const Accordian = (props) => {
  const [showAns, setShowAns] = useState(false);
  const handleClick = () => {
    console.log("clicked");
    setShowAns((prev) => !prev);
  };
  return (
    <div className="w-[100vh]">
      <motion.div className="w-full">
        <motion.div
          className="w-full flex items-center justify-between hover:cursor-pointer"
          initial={false}
          onClick={handleClick}
        >
          <div>
            {props.q}
          </div>
          <span>
            <FaAngleDown />
          </span>
        </motion.div>
        <AnimatePresence>
          {showAns && (
            <motion.div
              key="content"
              initial={{
                height:0,
                // opacity:0
              }}
              animate={{
                height:"auto",
                // opacity:1
              }}
              exit={{
                height:0,
                // opacity:0
              }}
            //   variants={{
            //     open: { height: "auto" },
            //     collapsed: { height: 0 },
            //   }}
              transition={{ duration: 0.2, ease: "linear" }}
              className="overflow-hidden"
            >
              <div>
                {props.ans}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Accordian;
