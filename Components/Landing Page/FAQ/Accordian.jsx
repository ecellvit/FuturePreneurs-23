import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
const Accordian = (props) => {
  const showAns = (props.showAnsNumber === props.id)
  return (
    <div className="w-full">
      <motion.div className="w-full flex flex-col gap-3">
        <motion.div
          className="w-full flex items-center justify-between hover:cursor-pointer"
          initial={false}
          onClick={()=>{
            props.handleClick(props.id)
          }}
        >
          <div className="font-bold text-md">
            {props.q}
          </div>
          <span>
           {showAns ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </motion.div>
        <AnimatePresence>
          {showAns && (
            <motion.div
              initial={{
                height:0,
              }}
              animate={{
                height:"auto",
              }}
              exit={{
                height:0,
              }}
              transition={{ duration: 0.2, ease: "linear" }}
              className="overflow-hidden"
            >
              <div className="font-light text-neutral-100">
                {props.ans}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="w-full h-[1px] bg-[white] mt-2 font-normal"></div>
    </div>
  );
};

export default Accordian;
