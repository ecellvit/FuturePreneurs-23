import React from "react";
import Image from 'next/image';
import logo from "public/assets/logos/fp logo.png";

export default function NavbarForLevels(){
    return (
        <nav className='absolute top-0 flex text-white text-lg w-full justify-around h-[84px] py-4'>
        <div>
            <Image src={logo} alt='FP' className='h-full w-auto'/>
        </div>
        <div className='flex gap-3 sm:gap-10 items-center font-medium'>
            <div>TeamName: Karan</div>
            <div>TeamNumber: 12</div>
            <div>Industry: E.V</div>
            <div>Niche: Charging Port </div>
            <div>Points: 10</div>
        </div>
    </nav>
    )
}