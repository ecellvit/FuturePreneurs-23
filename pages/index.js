import { signIn, signOut, useSession } from "next-auth/react";
import eCellLogo from "@/public/assets/logos/ecell_logo.svg";
import bg from "public/assets/landingPage/bg.svg";
import Image from "next/image";
import BSG from "@/Components/Landing Page/BSG";
import CardSection from "@/Components/Landing Page/CardSection";
import StoryBehindSection from "@/Components/Landing Page/StoryBehindSection";
import Ticker from "@/Components/Landing Page/Ticker";
import FAQ from "@/Components/Landing Page/FAQ";

export default function Home() {
  const { data: session } = useSession();
  console.log("session", session);

  return (
    <main className="text-white">
      <section className="Landing_page min-h-[100vh]">
        <Image src={bg} fill className="object-cover z-[-10]" />
        FuturePreneurs 2023
        <Image src={eCellLogo} alt="eCellLogo" className="h-1/2" />
        <br />
        {session ? (
          <div>
            {" "}
            Signed In{" "}
            <button
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>{" "}
          </div>
        ) : (
          <button
            onClick={() => {
              signIn("google", { callbackUrl: "/userDetails" });
            }}
          >
            Sign In with Google
          </button>
        )}
      </section>
      <BSG/>
      <Ticker/>
      <CardSection/>
      <StoryBehindSection/>
    </main>
  );
}
