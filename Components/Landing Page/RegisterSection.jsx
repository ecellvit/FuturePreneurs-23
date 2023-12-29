import Image from "next/image";

import image from "public/assets/landingPage/mountainsWithFlag.svg";
import bg from "public/assets/landingPage/bg.svg";

const RegisterSection = () => {
  return (
    <main className="h-[80vh] sm:h-[50vh] relative flex justify-center items-center">
      <Image src={bg} fill className="object-cover z-[-10]" />
      <div className="card w-4/5 sm:w-1/2 h-4/5 bg-[#ffffff13] rounded-lg p-5">
        <div className="h-1/2 flex flex-col sm:flex-row items-center justify-start">
          <div className="relative h-full w-1/2 sm:w-1/3">
            <Image src={image} fill/>
          </div>
          <div className="text-4xl font-medium">Sounds Awesome?</div>
        </div>
        <div className="flex justify-center w-full">
            register now
        </div>
      </div>
    </main>
  );
};

export default RegisterSection;
