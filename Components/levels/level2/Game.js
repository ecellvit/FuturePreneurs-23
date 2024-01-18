import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PropertySection from "@/Components/levels/level2/PropertySection";
import MapSection from "@/Components/levels/level2/MapSection";
import LocationSection from "@/Components/levels/level2/LocationSection";
import Navbar from "@/Components/levels/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

const App = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [mapData, setMapData] = useState(Array(36).fill(null));
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [dataToSend, setDataToSend] = useState([]);
  const { data: session, status } = useSession();

  const handlePropertyDrop = (item) => {
    setPropertyData([...propertyData, { id: item.id, name: item.name }]);
  };

  const handleMapDrop = (item, index) => {
    const newMapData = [...mapData];
    newMapData[index] = { id: item.id, name: item.name };
    setMapData(newMapData);
    setDataToSend([]);
    newMapData.forEach((ele, idx)=>{
      if(ele === null)
      return 
    const arr = dataToSend;
    arr.push({[idx]:ele.id})
    })
    console.log(newMapData);
    console.log("Sending dataaaaaaa=>");
    console.log(dataToSend);
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const sendDataToBackend = () => {
    // Send propertyData, mapData, and selectedLocation to the backend
    fetch("/api/levels/level2/sendData",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body:JSON.stringify({answer:dataToSend})
      
    })
    .then(res=>{
      if(res === 200){
        toast.success("Submitted successfully.")
      }
      else{
        toast.error("Something went wrong.")
      }
    })
    
  };

  return (
    <main
      className=" bg-cover bg-no-repeat bg-center text-white text-center w-full -z-20"
      style={{
        backgroundImage: "url(/assets/bg/spceBg.svg)",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <DndProvider backend={HTML5Backend}>
        <div className="flex h-[100vh]">
          <div className="w-[600px] h-fit p-8 bg-white bg-opacity-25 rounded-3xl">
            <h1 className="text-2xl font-black p-3">
              Properties
            </h1>
            <div className="underline flex flex-col items-center gap-2">
            <p><a href="https://docs.google.com/document/d/1-k6pmmQrzAvgikIcwO2qRQE1APATb6j8w8-TUnX9H-o/edit" target="_blank">Click here for more info</a></p>
            <PropertySection onDrop={handlePropertyDrop} />
            </div>
          </div>

          <div className="w-full p-5">
            <MapSection onDrop={handleMapDrop} mapData={mapData} />
          </div>

          <div className="w-[600px] p-5 bg-white bg-opacity-25 rounded-3xl">
            <h1 className="text-2xl font-black p-3 ">
              Locations{" "}
            </h1>
            <p><a className="underline" href="https://utfs.io/f/b9253f3d-074c-4713-8c3e-ef05d742053c-6m19b7.pdf" target="_blank">Click here for more info</a></p>
            <LocationSection onClick={handleLocationClick} />
          </div>
        </div>
        <button
          onClick={()=>{
            location.reload();
          }}
          className="mt-[-30px] text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Reset
        </button>
        <button
          onClick={sendDataToBackend}
          className="mt-[-30px] text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Submit
        </button>
      </DndProvider>
      <Toaster/>
    </main>
  );
};

export default App;
