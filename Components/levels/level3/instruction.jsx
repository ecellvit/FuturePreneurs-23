import React from 'react';

export default function Instructions(){
    return (
    <main className="min-h-[100vh] text-white flex flex-col items-center bg-[url('/assets/bg/spceBg.svg')] p-10 justify-center">
      <div className="border border-white rounded-lg p-2 my-6">
        <h1 className="flex justify-center text-2xl font-bold">INSTRUCTIONS</h1> 
        <ul className="list-disc list-inside leading-8">
        <li>
            Teams are presented with a list of correct combinations identified in the previous level, with each combination consisting of a dataset of 2 locations.
        </li>
        <li>
            A brief description of the locations has been provided. You need to carefully examine the data and select any 2 out of all the combinations they successfully identified in level 3.
        </li>
        <li>
            Further a detailed description of the locations would be displayed.
        </li>
        <li>
            It is essential for the teams to meticulously compare the data for both locations and choose the most suitable one for both combinations. 
        </li>
        <li>
            Teams with 2 or more correct combinations are granted a time frame of 15 minutes to thoroughly analyze the data and make their selections.
        </li>
        </ul>
        <h1 className="flex justify-center text-2xl font-bold">
            If only 0/1 combination is correct
        </h1>
        <ul className="list-disc list-inside leading-8">
        <li>
            Teams that got zero or one correct combinations in level 3 have faced penalties.
        </li>
        <li>
            Points have been deducted to ensure they have a minimum of 2 correct combinations to continue the game.
        </li>
        <li>
            If a team got 0 correct combinations, they would be provided with 2 correct combinations. Conversely, if a team got only 1 correct combination in, they will receive 1 correct combination.points will be deducted accordingly in both the cases.
        </li>
        <li>
            Teams with 0/1 correct combination are granted a time frame of 15 minutes to thoroughly analyze the data and make their selections.
        </li>

        </ul>
      </div>
    </main>
    )   
}
