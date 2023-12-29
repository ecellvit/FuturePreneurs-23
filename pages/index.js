import { signIn, signOut, useSession } from 'next-auth/react';
import eCellLogo from '@/public/assets/logos/ecell_logo.svg';
import bg from "public/assets/bg/spceBg.svg";
import Image from "next/image";
import LandingPageNavbar from '@/components/LandingPageComponent/LandingPageNavbar';
import LoginButton from '@/components/LandingPageComponent/Loginbutton';
import GlobeAnimation from '@/components/LandingPageComponent/GlobeAnimation';
import CountdownTimer from '@/components/LandingPageComponent/Timer';
import { useEffect } from 'react';
    

export default function Home() {
  const targetDate = new Date(2024,0,1,0)

  return (
    <main className="text-white p-6 h-full">
      <section className='Landing_page h-full'>
      <Image src={bg} fill className="object-cover z-[-10]" />
      <GlobeAnimation />
      <LandingPageNavbar />
      
      
      <div className="mr-10 text-[#f4f4f4] font-['coalition'] font-black text-7xl">      
        Future<br /><br /> 
        Preneurs  9.0
      </div>
      <br />
      <CountdownTimer targetDate={targetDate}/>
      <button className="rounded-full py-1 px-1 bg-gradient-to-br from-cyan-600 via-green-400 to-purple-600">
      <div className="py-2 px-4 rounded-full bg-black">
  Register!
  </div>
</button>

      </section>
    </main>
  );
}
