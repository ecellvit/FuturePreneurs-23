import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropertySection from '@/Components/levels/level2/PropertySection';
import MapSection from '@/Components/levels/level2/MapSection';
import LocationSection from '@/Components/levels/level2/LocationSection';

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
    <DndProvider backend={HTML5Backend}>
      <div className='flex '>
        <PropertySection onDrop={handlePropertyDrop} />
        <MapSection onDrop={handleMapDrop} mapData={mapData}/>
        <LocationSection onClick={handleLocationClick} />
      </div>
      <button onClick={sendDataToBackend}>Submit</button>
    </DndProvider>
  );
};

export default App;
