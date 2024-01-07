import React from "react";
import NavbarForLevels from "../components/NavbarForLevels";
import Image from "next/image";
import bg from "@/public/assets/bg/spceBg.svg";

export default function level2(){
    return(
        <main>
            <Image src={bg} alt="bg-Image" fill className="object-cover z-[-10]"/>
            <NavbarForLevels />
        </main>
    )
}