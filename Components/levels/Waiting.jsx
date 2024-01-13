import React from "react"

export default function Waiting(props){
  return(
      <div className="flex h-[100vh] w-[100vw] justify-center items-center bg-slate-800">
          {/* <h1 className={styles.waiting}>Evaluation of your company is {parseFloat(vps)*100}</h1> */}
          <p className="text-white">{props.text}</p>  
      </div>
  )
}