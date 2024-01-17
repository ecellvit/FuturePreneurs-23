import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropertySection from '@/Components/levels/level2/PropertySection';
import MapSection from '@/Components/levels/level2/MapSection';
import LocationSection from '@/Components/levels/level2/LocationSection';
import Navbar from '@/Components/levels/Navbar';

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
    console.log('Sending data to backend:', { propertyData, mapData, selectedLocation });
  };

  return (
    <main
      className=" bg-cover bg-no-repeat bg-center text-white text-center w-full"
      style={{
        backgroundImage: 'url(/assets/bg/spceBg.svg)',
        minHeight: '100vh',
      }}>
      <Navbar/>

        <DndProvider backend={HTML5Backend}>
          <div className='flex h-[100vh] '>

            <div className='flex-1'>
                <h1  className='text-2xl font-black p-8'>Description of Properties</h1>
                <PropertySection onDrop={handlePropertyDrop} />
            </div>

            <div className='flex-1'>
                <h1></h1>
                <MapSection onDrop={handleMapDrop} mapData={mapData}/>
            </div>

            <div className='flex-1'>
                <h1 className='text-2xl font-black p-8'>Description of Location </h1>
                <LocationSection onClick={handleLocationClick} />
            </div>

          </div>
          <button onClick={sendDataToBackend} className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
          Submit</button>
        </DndProvider>
    </main>
  );
};

export default App;
