import Game from "@/Components/levels/level0/game";
import { useState, useEffect } from "react";

export default function Level0() {

  useEffect(() => {
    // fetch /api/level0
  }, [])

  const [curPage, setCurPage] = useState(1);

  return (
    <div>
      {curPage === -1 && <Waiting/>}
      {curPage === 0 && <Instructions/>}
      {curPage === 1 && <Game/>}
      
      {curPage === 2 && <Prompt/>}
    </div>
  )
}
