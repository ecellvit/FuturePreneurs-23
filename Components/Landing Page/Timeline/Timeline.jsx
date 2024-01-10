import TimelineCard from "./TimelineCard";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import bg from "public/assets/landingPage/bg.svg";
import img1 from "public/assets/landingPage/timeline/img1.svg";
import img2 from "public/assets/landingPage/timeline/img2.svg";
import img3 from "public/assets/landingPage/timeline/img3.svg";

const Timeline = () => {
  const cardsData = [
    {
      id: 1,
      img: img1,
      date: "10 JAN 2023",
      text: "Registrations open!",
    },
    {
      id: 2,
      img: img2,
      date: "14 JAN 2023",
      text: "Registrations closes!",
    },
    {
      id: 3,
      img: img3,
      date: "17 JAN 2023",
      text: "Qualifier Round!",
    },
    {
      id: 4,
      img: img1,
      date: "18 JAN 2023",
      text: "Results of Qualifier Round!",
    },
    {
      id: 5,
      img: img2,
      date: "19 JAN 2023",
      text: "D-Day!",
    },
  ];

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const timelineCards = cardsData.map((card) => (
    <TimelineCard {...card} key={card.id} />
  ));

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  return (
    <main>
      <section
        ref={targetRef}
        className="sm:min-h-[400vh] relative flex flex-col justify-start"
        id="timeline"
      >
        <div className="static sm:sticky sm:top-0 sm:h-screen ">
          <Image
            alt="background space image"
            src={bg}
            fill
            className="object-cover z-[-10]"
          />

          <h1 className="w-full flex justify-center text-4xl tracking-widest font-bold my-10">
            TIMELINE
          </h1>
          <div className="overflow-hidden px-3 hidden sm:flex">
            <motion.div style={{ x }} className="flex gap-5">
              {timelineCards}
            </motion.div>
          </div>
          <div className="visible flex flex-col sm:hidden items-center gap-5 pb-10 ">
            {timelineCards}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Timeline;
