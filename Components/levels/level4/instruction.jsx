import React from 'react';

export default function Instructions(){
    return (
    <main className="min-h-[100vh] text-white flex flex-col items-center bg-[url('/assets/bg/spceBg.svg')]">
      <div className="border border-white rounded-lg p-2 my-6">
        <h1 className="flex justify-center text-2xl font-bold">INSTRUCTIONS</h1>
        <ul className="list-disc list-inside leading-8">
        <li>
            Each team is provided with an in-depth description of the products allotted to them.
        </li>
        <li>
            Teams have to develop a Minimum Viable Product for their assigned product.
        </li>
        <li>
            A template is provided to teams, and they are required to input essential details within designated word limits. 
        </li>
        <li>
            A sample MVP is displayed on the portal for teams to refer.
        </li>
        <li>
            Teams have 25 minutes to develop the MVP for their product. 
        </li>

        </ul>
      </div>
    </main>
    )   
}
