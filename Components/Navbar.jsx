import React,{useState} from 'react'
import Image from 'next/image';
import logo from "public/assets/logos/fp logo.png";
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className='absolute top-0 flex text-white w-full justify-around h-[84px] py-4'>
        <div>
            <Image src={logo} alt='FP' className='h-full w-auto'/>
        </div>
        <div className='hidden gap-3 sm:gap-10 items-center font-medium md:flex'>
            <Link href="/">Home</Link>
            <Link href="/#about">About</Link>
            <Link href="/#timeline">Events</Link>
            <Link href="/">Speakers</Link>
            <Link href="/">Sponsors</Link>
        </div>
        <div className='flex flex-col justify-around md:hidden'>
        {/* Hamburger menu icon */}
        <div className="cursor-pointer text-white md:hidden" onClick={toggleMenu}>
          &#9776;
        </div>

        {/* Navbar links */}
        <div className={`md:flex flex-col z-10 bg-gray-800 bg-opacity-75 p-4 rounded-md top-[6vh] h-[20vh] ${isOpen ? 'absolute right-0' : 'hidden'} `}>
          <ul className="flex flex-col justify-around items-center space-x-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#timeline">Events</Link></li>
            <li><Link href="/">Speakers</Link></li>
            <li><Link href="/">Sponsors</Link></li>
          </ul>
        </div>
        </div>
    </nav>
  )
}

export default Navbar
