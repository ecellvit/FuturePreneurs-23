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
import fpFont from 'public/assets/landingPage/FUTURE PRENEURS.svg'

export default function Home() {
  const targetDate = new Date(2024,0,24,0,0)
  return (
    

    <main className="text-white h-full w-full overflow-hidden">
      <Image src={bg} alt="bgImage" fill className="object-cover z-[-10] w-[100vw] min-h-[100vh]" />
      <section className='Landing_page p-2 h-[100svh]'>
      
      <GlobeAnimation />
      <LandingPageNavbar />
      
      
      <div className="pr-10">      
       <Image src={fpFont} className="w-3/4 h-1/4"/>
      <br />
      <CountdownTimer targetDate={targetDate}/>
      <br/><br/>
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
    </main>
  );
}
