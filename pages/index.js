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
import RegisterSection from "@/Components/Landing Page/RegisterSection";
import Footer from "@/Components/Landing Page/Footer";
import RegisterButton from "@/Components/Landing Page/RegisterButton";

export default function Home() {
  const targetDate = new Date(2024,0,1,0)

  return (
    <main className="text-white h-full">
      <section className='Landing_page p-6 h-full'>
      <Image src={bg} fill className="object-cover z-[-10]" />
      <GlobeAnimation />
      <LandingPageNavbar />
      
      
      <div className="mr-10 text-[#f4f4f4] font-['coalition'] font-black text-7xl">      
        Future<br />
        Preneurs  9.0
      </div>
      <br />
      <CountdownTimer targetDate={targetDate}/>
      <RegisterButton text="Register!"/>


  
      </section>
      <BSG/>
      <Timeline/>
      <Ticker/>
      <CardSection/>
      <StoryBehindSection/>
      <FAQ/>
      <RegisterSection/>
      <Footer/>
    </main>
  );
}
