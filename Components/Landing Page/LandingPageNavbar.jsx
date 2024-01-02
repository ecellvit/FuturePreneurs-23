import React,{ useRef } from 'react'
import Image from 'next/image';
import logo from "public/assets/logos/fp logo.png";
import eCellLogo from '@/public/assets/logos/ecell_logo.svg';
import LoginButton from './Loginbutton';
import Link from 'next/link';


export default function LandingPageNavbar(){
  return (
    <nav className='flex text-white w-full justify-center h-[84px] py-4 m-4'>
        <div className='flex justify-evenly items-center font-medium w-3/4'>
            <Link href="/">HOME</Link>
            <Link href="/">ABOUT</Link>
            <Link href="/">TIMELINE</Link>
            <Link href="/">CONTACT US</Link>
            <LoginButton />
            <Image src={eCellLogo} alt='eCellLogo' className='h-full w-auto'/>
        </div>
    </nav>
  )
}
