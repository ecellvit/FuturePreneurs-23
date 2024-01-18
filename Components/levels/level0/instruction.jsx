import React from 'react';

export default function Instructions(){
    return (
    <main className="min-h-[100vh] text-white flex flex-col items-center">
      <div className="border border-white rounded-lg p-2 my-6">
        <h1 className="flex justify-center text-2xl font-bold">INSTRUCTIONS</h1>
        <ul className="list-disc list-inside leading-8">
            <li>
                Each team is provided with a newspaper.</li>
            <li>
                Teams are tasked with reading the newspaper and identifying crucial areas for action hidden within the articles</li>
            <li>
                Participants have a designated 10-minute timeframe to read the newspaper and pinpoint pressing issues.</li>
            <li>
                Following the reading period, teams will be given 5 minutes to input the problems into the portal.</li>
            <li>
                Teams have the opportunity to earn extra bonus points based on how quickly they submit their answers.</li>
        </ul>
      </div>
    </main>
    )   
}
