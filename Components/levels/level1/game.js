import Navbar from "../Navbar";
import React from "react";
import DropdownStatements from "./dropDownForLevel1";
import { Toaster } from "react-hot-toast";

export default function Game1(){
    return(
        <main className="min-h-screen" 
        style={{ backgroundImage: 'url(/assets/bg/spceBg.svg)' }}
        >
            <Navbar />
            <div>
                <DropdownStatements />
            </div>
        </main>
    )
}