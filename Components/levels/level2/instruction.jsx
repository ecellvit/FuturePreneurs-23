import React from 'react';

export default function Instructions(){
    return (
    <main className="min-h-[100vh] text-white flex flex-col items-center  bg-[url('/assets/bg/spceBg.svg')]">
      <div className="border border-white rounded-lg p-2 my-6">
        <h1 className="flex justify-center text-2xl font-bold">INSTRUCTIONS</h1>
        <ul className="list-disc list-inside leading-8">
        <li>  
          A map is displayed to the teams featuring 10 distinct locations and 7 properties, each with their respective descriptions.
        </li>
        <li>  
          Teams are supposed to place these 7 properties within the 10 locations.
        </li>
        <li>  
          Teams must discern and select the most fitting location for each property based on the provided descriptions.
        </li>
        <li>  
          each property corresponds to only one correct location
        </li>
        <li>  
          They have 15 minutes to make accurate selections; 
        </li>
        <li>
          To start fresh with new combinations, click RESET. Be aware that this will erase all existing combinations, and teams will need to create them again.
        </li>

        </ul>
      </div>
    </main>
    )   
}
