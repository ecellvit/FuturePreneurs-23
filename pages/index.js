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
import Image from "next/image";
import bg from "public/assets/landingPage/bg.svg";

export default function Home() {
  const targetDate = new Date(2024,0,24,0,0)
  return (
    

    <main className="text-white h-full w-full">
      <Image src={bg} alt="bgImage" fill className="object-cover z-[-10] w-[100vw] h-[100vh]" />
      <section className='Landing_page p-2 h-[100svh]'>
      
      <GlobeAnimation />
      <LandingPageNavbar />
      
      
      <div className="mr-10 text-[#f4f4f4] drop-shadow-[0_35px_35px_rgb(a,a,a)] font-['coalition'] font-black text-8xl">      
        Future<br />
        Preneurs  9.0
      </div>
      <br />
      <CountdownTimer targetDate={targetDate}/>
      <br/><br/>
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
