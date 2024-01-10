import { motion } from "framer-motion";
import Image from "next/image";

// Images import
import bg from "public/assets/landingPage/bg.svg";
import FPCard from "public/assets/landingPage/BSG/FPCard.svg";
import EcellCard from "public/assets/landingPage/BSG/EcellCard.svg";
import bcCard from "public/assets/landingPage/BSG/bitcoinCard.svg";
import groupImg from "public/assets/landingPage/BSG/groupImg.svg";

const BSG = () => {
  return (
    <main>
      <section
        className="min-h-[100vh] relative flex flex-col justify-center items-center p-2 sm:p-0"
        id="about"
      >
        <Image
          alt="background space image"
          src={bg}
          fill
          className="object-cover z-[-10]"
        />
        <div className=" bg-[#141B2B] opacity-90 rounded-3xl p-4 min-h-[80vh] w-[80vw] flex flex-col items-center justify-between sm:justify-around">
          <div className="flex flex-col items-center gap-2 sm:gap-0">
            <h3 className="uppercase font-semibold text-xl sm:text-3xl tracking-wider font-montserrat">
              the ultimate
            </h3>
            <h1 className="font-bold text-4xl text-center sm:text-5xl tracking-widest">
              Business Simulation Game
            </h1>
          </div>
          <div className="w-full flex flex-col h-full pt-10 sm:pt-0 sm:h-auto sm:flex-row">
            <div className="hidden sm:block sm:w-1/2 pr-10 sm:pr-0 h-full relative">
              <motion.div
                initial={{ opacity: 0, rotate: "-30deg" }}
                whileInView={{ opacity: 1, rotate: "0deg" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative origin-bottom"
              >
                <Image
                  src={bcCard}
                  alt="bitcoin"
                  className=" h-40 sm:h-52 absolute z-[2] left-[-30px] top-[50px] pointer-events-none"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotate: "-30deg" }}
                whileInView={{ opacity: 1, rotate: "0deg" }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="relative origin-bottom"
              >
                <Image
                  src={EcellCard}
                  alt="e-cell"
                  className="h-40 sm:h-52 absolute z-[3] left-[5%] top-[10px] pointer-events-none"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotate: "-20deg" }}
                whileInView={{ opacity: 1, rotate: "0deg" }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
                className="relative origin-bottom"
              >
                <Image
                  src={FPCard}
                  alt="Futurepreneur"
                  className="h-40 sm:h-52 absolute z-[4] left-[20%] pointer-events-none"
                />
              </motion.div>
            </div>
            <div className="sm:hidden flex justify-center">
              <Image src={groupImg} />
            </div>
            <div className="sm:w-1/2 pr-10 flex flex-col gap-3 sm:gap-10 text-lg leading-8 text-justify sm:text-left">
              <div>
                Entrepreneurship Cell, VIT proudly presents Futurepreneurs 9.0,
                a dynamic Business Simulation Event! Elevate your business
                acumen by staying tuned to consumer preferences and current
                trends. Can you demonstrate a vision, which would allow you to
                navigate through the ebbing and flowing challenges of the event?
                Enroll in the crew, where discovery meets competition!
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BSG;
