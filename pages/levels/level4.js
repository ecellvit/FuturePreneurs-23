import { useState } from 'react';

export default function Level4() {
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
      const response = await fetch('/your-backend-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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
    <main className=" bg-cover bg-no-repeat bg-center text-white text-center"
      style={{
        backgroundImage: "url(/assets/bg/spceBg.svg)",
        minHeight: "100vh",
      }}>
      <form onSubmit={handleSubmit}>
        <div className="grid min-h-screen gap-3 grid-cols-5 p-10 ">
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-bold col-span-5 row-span-1">
          MINIMUM VIABLE PRODUCT (MVP) CARD-LEVEL 3
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-4 ">
            <div className='h-full flex flex-col '>
            problem statement
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none "
              name="problemStatement"
              value={formData.problemStatement}
              onChange={handleChange}
            />
            </div>
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-2 flex flex-col ">
            project/product name
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-4 flex flex-col ">
            Key Features
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="keyFeatures"
              value={formData.keyFeatures}
              onChange={handleChange}
            />
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-2 flex flex-col ">
            success criteria
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="successCriteria"
              value={formData.successCriteria}
              onChange={handleChange}
            />
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-4 flex flex-col ">
            Objective
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="objective"
              value={formData.objective}
              onChange={handleChange}
            />
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-2 flex flex-col">
            target audience
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
            />
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold row-span-2 flex flex-col ">
            testing plan 
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="testingPlan"
              value={formData.testingPlan}
              onChange={handleChange}
            />
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold col-span-3 flex flex-col ">
            key metrics to measure success
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="successMetrics"
              value={formData.successMetrics}
              onChange={handleChange}
            />
          </div>
          <div className="h-full w-full bg-gradient-to-r from-[#416B93] to-[#0F4474] font-semibold col-span-2 flex flex-col ">
            constraints and guidelines
            <textarea
              className="w-full h-full bg-transparent text-white p-2 resize-none"
              name="constraintsGuidelines"
              value={formData.constraintsGuidelines}
              onChange={handleChange}
            />
          </div>
          <button type="submit" 
          className="rounded-full cursor-pointer bg-gradient-to-r from-[#416B93] to-[#0F4474] w-full h-12 flex items-center justify-center font-bold"
          >Submit</button>
        </div>
      </form>
    </main>
  );
}
