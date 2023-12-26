import React from 'react'
import Image from 'next/image';
import logo from "public/assets/logos/fp logo.png";
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='flex text-white w-full justify-around h-[84px] py-4 align-center'>
        <div>
            <Image src={logo} className='h-full w-auto'/>
        </div>
        <div className='flex gap-10 align-center font-medium'>
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/">Events</Link>
            <Link href="/">Speakers</Link>
            <Link href="/">Sponsors</Link>
        </div>
    </nav>
  )
}

export default Navbar
