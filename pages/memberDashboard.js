import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

const TeamPage = () => {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center min-h-screen"
      style={{ backgroundImage: 'url(/assets/bg/spceBg.svg)' }}
    >
      <Navbar />

      <div className="max-w-screen-xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4 mt-8 text-white">YOUR TEAM</h1>

        <div className="flex flex-wrap justify-center">
          <Card name="Person 1" imageSrc="/assets/boardpics/image2.svg" />
          <Card name="Person 2" imageSrc="/assets/boardpics/image2.svg" />
        </div>

        <div className="flex flex-wrap justify-center mt-4">
          <Card name="Person 3" imageSrc="/assets/boardpics/image2.svg" />
          <Card name="Person 4" imageSrc="/assets/boardpics/image2.svg" />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
