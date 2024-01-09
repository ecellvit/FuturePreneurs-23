import React from 'react'
import Image from 'next/image';
import logo from "public/assets/logos/fp logo.png";
import Link from 'next/link';
import LoginButton from './Landing Page/Loginbutton';

const Navbar = () => {
  return (
    <nav className='absolute top-0 flex text-white w-full justify-around h-[84px] py-4'>
        <div>
            <Image src={logo} alt='FP' className='h-full w-auto'/>
        </div>
        <div className='flex gap-3 sm:gap-10 items-center font-medium'>
            <Link href="/">Home</Link>
            <Link href="/memberDashboard">Dashboard</Link>
            <LoginButton/>
        </div>
    </nav>
  )
}

export default Navbar
