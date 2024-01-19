import React from 'react';

export default function Instructions(){
    return (
    <main className="min-h-[100vh] text-white flex flex-col items-center bg-[url('/assets/bg/spceBg.svg')]">
      <div className="border border-white rounded-lg p-2 my-6">
        <h1 className="flex justify-center text-2xl font-bold">INSTRUCTIONS</h1>
        <ul className="list-disc list-inside leading-8">
        <li>Each team has been assigned a specific sector based on the problems identified in their designated newspapers.</li>
        <li>Teams are tasked with prioritizing from a list of four problems according to their perceived importance, with priority numbers ranging from 1 to 4.</li>
        <li>Following this task, teams will be allocated a product aligning with their designated sector.</li>
        <li>A time limit of 5 minutes is provided for teams to finalize their prioritization of the identified problems.</li>

        </ul>
      </div>
    </main>
    )   
}
