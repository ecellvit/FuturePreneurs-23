import React from 'react'
import Image from 'next/image';
import logo from "public/assets/logos/fp logo.png";
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='absolute top-0 flex text-white w-full justify-around h-[84px] py-4'>
        <div>
            <Image src={logo} alt='FP' className='h-full w-auto'/>
        </div>
        <div className='flex gap-3 sm:gap-10 items-center font-medium'>
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
