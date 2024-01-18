import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PropertySection from "@/Components/levels/level2/PropertySection";
import MapSection from "@/Components/levels/level2/MapSection";
import LocationSection from "@/Components/levels/level2/LocationSection";
import Navbar from "@/Components/levels/Navbar";

const App = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [mapData, setMapData] = useState(Array(36).fill(null));
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handlePropertyDrop = (item) => {
    setPropertyData([...propertyData, { id: item.id, name: item.name }]);
  };

  const handleMapDrop = (item, index) => {
    const newMapData = [...mapData];
    newMapData[index] = { id: item.id, name: item.name };
    setMapData(newMapData);
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const sendDataToBackend = () => {
    // Send propertyData, mapData, and selectedLocation to the backend
    console.log("Sending data to backend:", {
      propertyData,
      mapData,
      selectedLocation,
    });
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
          <div className="w-[600px] p-8 bg-white bg-opacity-25 rounded-3xl">
            <h1 className="text-2xl font-black p-3">
              Properties
            </h1>
            <div className="flex flex-col items-center gap-2">
            <p><a href="https://docs.google.com/document/d/1TzaCZ8bP8ucFfBr0SdmRWky_D39bqWgRo5y_eB3wt2Q/edit">Click here for more info</a></p>
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
            <p><a href="https://docs.google.com/document/d/1TzaCZ8bP8ucFfBr0SdmRWky_D39bqWgRo5y_eB3wt2Q/edit">Click here for more info</a></p>
            <LocationSection onClick={handleLocationClick} />
          </div>
        </div>
        <button
          onClick={sendDataToBackend}
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Submit
        </button>
      </DndProvider>
    </main>
  );
};

export default App;
