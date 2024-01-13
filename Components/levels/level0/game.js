import React, { useState, useEffect } from "react";
import GameTimer from "../GameTimer";
import Navbar from "../Navbar";
import InputBoxList from "./InputBoxList";

export default function Game() {
  return (
    <main className="min-h-screen">
      <Navbar level="level0"/>
      <div className="flex">
        <div className="flex basis-[60vw]">
          For Newspaper
        </div>
        <InputBoxList />
      </div>
    </main>
  );
}
