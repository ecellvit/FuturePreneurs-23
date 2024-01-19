import Navbar from "../Navbar";
import React, { useState } from "react";
import DropdownStatements from "./dropDownForLevel1";
import { Toaster,toast } from "react-hot-toast";
import priorityOrder from "@/constants/level1/priorityOrder.json"

export default function Game1(props){

    const initialDropdownValues = {
        statement1: "",
        statement2: "",
        statement3: "",
        statement4: "",
      };
    
      const questionStatement = [
        "Problem Statement 1",
        "Problem Statement 2",
        "Problem Statement 3",
        "Problem Statement 4",
      ];
    
      const [dropdownValues, setDropdownValues] = useState(initialDropdownValues);

      const submitAnswerForLevel1=(statement,value)=>{
        props.setLevel1Answer({...props.level1Answer,[statement]:value})
      }
      console.log(props.level1Answer)
    
      const handleDropdownChange = (statement, value) => {
        const updatedDropdownValues = {
          ...dropdownValues,
          [statement]: value,
        };
        console.log("dsdfasdgasdgs",dropdownValues)
        const valuesArray = Object.values(updatedDropdownValues);
        const isUnique = valuesArray.filter((val) => val === value).length === 1;
    
        if (isUnique) {
          setDropdownValues(updatedDropdownValues);
        } else {
          if (updatedDropdownValues[statement] === "") {
            updatedDropdownValues[statement] = "";
            setDropdownValues(updatedDropdownValues);
          } else {
            // Show an error or handle the validation as needed
            // alert("Please select a unique value for each statement.");
            toast.error("Please select a unique value for each problem statement.")
            // Reset the dropdown value for the statement that violated the rule
            updatedDropdownValues[statement] = "";
            setDropdownValues(updatedDropdownValues);
          }
        }
      };

      console.log("=======12",priorityOrder)
      console.log("+++++++12",props.sector)
      console.log("=======12",props.problems)

      const mapping = [
        "E.V",
        "Green Construction",
        "Renewable Energy",
      ]
      
    return(
        <main className="min-h-screen" 
        style={{ backgroundImage: 'url(/assets/bg/spceBg.svg)' }}
        >
            <Navbar />
            <div className="flex flex-col items-center gap-8">
    <Toaster/>
    <div className="text-4xl p-2 text-white font-bold">Your sector is: {mapping[props.sector]}</div>
      <div className="text-4xl p-2 text-white font-bold">
        Arrange The Given Problems In Correct Order
      </div>
      {Object.keys(priorityOrder[mapping[props.sector]]).map((statement, index) => (
        <div key={index} className="flex items-center justify-between w-full">
          <div className="w-1/2 flex justify-center mr-2 text-white font-bold text-3xl">{`${priorityOrder[mapping[props.sector]][props.problems[index]]}:`}</div>
          <div className="w-1/2 self-start">
          <select
            className="border rounded p-2 w-1/4 flex justify-center"
            value={dropdownValues[statement]}
            onChange={(e) => {handleDropdownChange(statement, e.target.value),submitAnswerForLevel1(statement,e.target.value)}}
          >
            <option value="">Select</option>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          </div>
        </div>
      ))}
      <button type="button" onClick={()=>props.submit()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Submit</button>
    </div>
        </main>
    )
}