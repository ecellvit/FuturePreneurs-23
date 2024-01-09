
// Navbar.js
import React, { useState } from 'react';

const test = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">Your Logo</div>

        {/* Hamburger menu icon */}
        <div className="cursor-pointer text-white md:hidden" onClick={toggleMenu}>
          &#9776;
        </div>

        {/* Navbar links */}
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="md:flex space-x-4">
            <li><a href="#" className="text-white">Home</a></li>
            <li><a href="#" className="text-white">About</a></li>
            <li><a href="#" className="text-white">Services</a></li>
            <li><a href="#" className="text-white">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default test;
