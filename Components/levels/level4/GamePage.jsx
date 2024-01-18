import { useState } from 'react';
import Navbar from '../Navbar';
import { useSession } from "next-auth/react";

export default function GamePage() {
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    problemStatement: '',
    projectName: '',
    keyFeatures: '',
    successCriteria: '',
    objective: '',
    targetAudience: '',
    testingPlan: '',
    successMetrics: '',
    constraintsGuidelines: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send formData to the backend using a fetch or Axios
      const response = await fetch('/api/levels/level4/sendData', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      if (response.status === 200) {
        // Handle success, maybe show a success message to the user
        console.log('Data successfully sent to the backend.');
      } else {
        // Handle errors, maybe show an error message to the user
        console.error('Failed to send data to the backend.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <main
      className=" bg-cover bg-no-repeat bg-center text-white text-center w-full"
      style={{
        backgroundImage: 'url(/assets/bg/spceBg.svg)',
        minHeight: '100vh',
      }}>
      <Navbar sendData={()=>{handleSubmit()}} level="level4" />
      <form onSubmit={handleSubmit}>
        <div className="grid min-h-screen gap-3 grid-cols-5 px-10 pt-10">
          <div className="h-full w-full flex items-center justify-center text-3xl leading-none bg-gradient-to-r from-[#416B93] to-[#0F4474] font-bold col-span-5 row-span-1">
            MINIMUM VIABLE PRODUCT (MVP) CARD-LEVEL 3
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-4 ">
            <div className="h-full flex flex-col ">
              <h1 className="font-semibold text-xl uppercase">
                problem statement
              </h1>
              <textarea
                className="w-full h-full bg-transparent text-white p-2 resize-none "
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-2 flex flex-col ">
            <h1 className="font-semibold text-xl uppercase">
              project/product name
            </h1>
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-4 flex flex-col ">
            <h1 className="font-semibold text-xl uppercase">
              Key Features
            </h1>
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="keyFeatures"
              value={formData.keyFeatures}
              onChange={handleChange}
            />
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-2 flex flex-col ">
            <h1 className="font-semibold text-xl uppercase">
              success criteria
            </h1>
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="successCriteria"
              value={formData.successCriteria}
              onChange={handleChange}
            />
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-4 flex flex-col ">
            <h1 className="font-semibold text-xl uppercase">
              Objective
            </h1>
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="objective"
              value={formData.objective}
              onChange={handleChange}
            />
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-2 flex flex-col">
            <h1 className="font-semibold text-xl uppercase">
              target audience
            </h1>
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
            />
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-2 flex flex-col ">
            <h1 className="font-semibold text-xl uppercase">
              testing plan
            </h1>
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="testingPlan"
              value={formData.testingPlan}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center col-span-5 gap-3">
            <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold col-span-3 flex flex-col ">
              <h1 className="font-semibold text-xl uppercase">
                key metrics to measure success
              </h1>
              <textarea
                className="w-full h-full bg-transparent text-white p-2 resize-none"
                name="successMetrics"
                value={formData.successMetrics}
                onChange={handleChange}
              />
            </div>
            <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold col-span-2 flex flex-col ">
              <h1 className="font-semibold text-xl uppercase">
                constraints and guidelines
              </h1>
              <textarea
                className="w-full h-full bg-transparent text-white p-2 resize-none"
                name="constraintsGuidelines"
                value={formData.constraintsGuidelines}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full py-4 px-10">
          <button
            type="submit"
            className="rounded-full cursor-pointer bg-gradient-to-r from-[#416B93] to-[#0F4474] w-fit px-6 mb-5 h-12 flex items-center justify-center font-bold">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
