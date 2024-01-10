import BSG from "@/Components/Landing Page/BSG";
import CardSection from "@/Components/Landing Page/CardSection/CardSection";
import FAQ from "@/Components/Landing Page/FAQ/FAQ";
import Footer from "@/Components/Landing Page/Footer";
import GlobeAnimation from '@/Components/Landing Page/GlobeAnimation';
import LandingPageNavbar from '@/Components/Landing Page/LandingPageNavbar';
import RegisterButton from "@/Components/Landing Page/RegisterButton";
import RegisterSection from "@/Components/Landing Page/RegisterSection";
import StoryBehindSection from "@/Components/Landing Page/StoryBehindSection";
import Ticker from "@/Components/Landing Page/Ticker";
import Timeline from "@/Components/Landing Page/Timeline/Timeline";
import CountdownTimer from '@/Components/Landing Page/Timer';
import LoadingScreen from "@/Components/LoadingScreen";
import styles from "@/styles/fpfont.module.css";
import Image from "next/image";
import bg from "public/assets/landingPage/bg.svg";
import { useState } from "react";

export default function Home() {
  const targetDate = new Date(2024,0,19,0,0)
  const [isLoading, setIsLoading] = useState(false);
  return (

    <main className="text-white h-full">
      {isLoading ? <LoadingScreen/> : (<>
        <Image src={bg} alt="bgImage" fill className="object-cover z-[-10] w-full min-h-[100vh]" />
        <section className='Landing_page p-2 relative h-[100svh] overflow-hidden'>
        
        <GlobeAnimation />
        <LandingPageNavbar />
        
        <div className="pl-5"> 
        <div className={styles.fp}>     
         <p>FUTURE</p>
         <p>PRENEURS  9.0</p>
         </div>
         {/* <Image src={fpFont} alt="Future Preneurs Logo" />
         <Image src={fpFont2} alt="9.0" /> */}
        <CountdownTimer targetDate={targetDate}/>
        <br/>
        <RegisterButton text="Register!"/>
        </div>
        </section>
        <BSG/>
        <Timeline/>
        <Ticker/>
        <CardSection/>
        <StoryBehindSection/>
        <FAQ/>
        <RegisterSection/>
        <Footer/>
        </>
      )}
      
    </main>
  );
}
