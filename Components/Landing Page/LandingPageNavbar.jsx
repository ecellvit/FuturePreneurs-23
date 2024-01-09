import React, { useState } from "react";
import Image from "next/image";
import logo from "public/assets/logos/fp logo.png";
import eCellLogo from "@/public/assets/logos/ecell_logo.svg";
import LoginButton from "./Loginbutton";
import Link from "next/link";

export default function LandingPageNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="flex text-white w-full justify-center h-[84px] py-4 m-4">
      <div className=" justify-evenly items-center font-medium w-3/4 hidden md:flex">
        <Link href="/">HOME</Link>
        <Link href="#about">ABOUT</Link>
        <Link href="#timeline">TIMELINE</Link>
        <Link href="#contact">CONTACT US</Link>
        <LoginButton />
        <Image src={eCellLogo} alt="eCellLogo" className="h-full w-auto" />
      </div>
      <div className="flex justify-between items-center font-medium w-3/4 md:hidden">
      
        <Image src={eCellLogo} alt="eCellLogo" className="h-1/2 w-auto align-start" />
        <LoginButton />
      <div className='flex flex-col'>
        {/* Hamburger menu icon */}
        <div className="cursor-pointer text-white md:hidden" onClick={toggleMenu}>
          &#9776;
        </div>

        {/* Navbar links */}
        <div className={`md:flex flex-col z-10 bg-gray-800 bg-opacity-75 p-4 rounded-md top-[10%] h-1/3 ${isOpen ? 'absolute right-0' : 'hidden'} `}>
          <ul className="flex flex-col space-x-4 h-full justify-evenly items-center">
            <li><Link href="/">HOME</Link></li>
            <li><Link href="#about">ABOUT</Link></li>
            <li><Link href="#timeline">TIMELINE</Link></li>
            <li><Link href="#contact">CONTACT US</Link></li>
          </ul>
        </div>
        </div>
        </div>
      
    </nav>
  );
}
