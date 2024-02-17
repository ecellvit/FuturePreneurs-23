import Image from "next/image";
import { useState } from "react";

import bg from "public/assets/landingPage/bg.svg";
import { AnimatedTooltip } from "../../ui/animated-tooltip.jsx";

const Credits = () => {
  const people = [
    {
      id: 1,
      name: "Pratyush Kongalla",
      link: "https://github.com/pratyush3124",
      image: "https://github.com/pratyush3124.png",
    },
    {
      id: 2,
      name: "Anjy Gupta",
      link: "https://github.com/anjy7",
      image: "https://github.com/anjy7.png",
    },
    {
      id: 3,
      name: "Karan Vyas",
      link: "https://github.com/kv8gh",
      image: "https://github.com/kv8gh.png",
    },
    {
      id: 4,
      name: "Smriti Doneria",
      link: "https://github.com/smritidoneria",
      image: "https://github.com/smritidoneria.png",
    },
    {
      id: 5,
      name: "Arjun Bector",
      link: "https://github.com/arjunbector",
      image: "https://github.com/arjunbector.png",
    },
    {
      id: 6,
      name: "Isha Agarwal",
      link: "https://github.com/Ishaag3",
      image: "https://github.com/Ishaag3.png",
    },
    {
      id: 7,
      name: "Pranav Murali",
      link: "https://github.com/PranavMurali-Coder",
      image: "https://github.com/PranavMurali-Coder.png",
    },
  ];

  return (
    <section className="relative min-h-[10vh] w-full flex justify-center items-center">
      <Image
        alt="background space image"
        src={bg}
        fill
        className="object-cover z-[-10]"
      />
      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={people} />
      </div>
    </section>
  );
};

export default Credits;