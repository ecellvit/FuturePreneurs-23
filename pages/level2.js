import bg from "@/public/assets/bg/spceBg.svg";
import Image from "next/image";

export default function level2(){
    return(
        <main>
            <Image src={bg} alt="bg-Image" fill className="object-cover z-[-10]"/>
            {/* <NavbarForLevels /> */}
        </main>
    )
}