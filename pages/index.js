import { signIn, signOut, useSession } from "next-auth/react";
import eCellLogo from "@/public/assets/logos/ecell_logo.svg";
import bg from "public/assets/landingPage/bg.svg";
import Image from "next/image";
import LandingPageNavbar from '@/components/Landing Page/LandingPageNavbar';
import LoginButton from '@/components/Landing Page/Loginbutton';
import GlobeAnimation from '@/components/Landing Page/GlobeAnimation';
import CountdownTimer from '@/components/Landing Page/Timer';
import BSG from "@/Components/Landing Page/BSG";
import CardSection from "@/Components/Landing Page/CardSection/CardSection";
import StoryBehindSection from "@/Components/Landing Page/StoryBehindSection";
import Ticker from "@/Components/Landing Page/Ticker";
import FAQ from "@/Components/Landing Page/FAQ/FAQ";
import Timeline from "@/Components/Landing Page/Timeline/Timeline";
    

export default function Home() {
  const targetDate = new Date(2024,0,1,0)

  return (
    <main className="text-white p-6 h-full">
      <section className='Landing_page h-screen'>
      <Image src={bg} fill className="object-cover z-[-10]" />
      <GlobeAnimation />
      <LandingPageNavbar />
      
      
      <div className="mr-10 text-[#f4f4f4] font-['coalition'] font-black text-8xl">      
        Future<br />
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
      <BSG/>
      <Timeline/>
      <Ticker/>
      <CardSection/>
      <StoryBehindSection/>
      <FAQ/>
    </main>
  );
}
