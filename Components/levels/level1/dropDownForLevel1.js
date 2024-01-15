import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function DropdownStatements(){
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

  const handleDropdownChange = (statement, value) => {
    const updatedDropdownValues = {
      ...dropdownValues,
      [statement]: value,
    };

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

  return (
    <div className="flex flex-col items-center gap-8">
    <Toaster/>
      <div className="text-4xl p-2 text-white font-bold">
        Arrange The Given Problems In Correct Order
      </div>
      {Object.keys(dropdownValues).map((statement, index) => (
        <div key={index} className="flex items-center">
          <p className="mr-2 text-white font-bold text-3xl">{`${questionStatement[index]}:`}</p>
          <select
            className="border rounded p-2"
            value={dropdownValues[statement]}
            onChange={(e) => handleDropdownChange(statement, e.target.value)}
          >
            <option value="">Select</option>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Submit</button>
    </div>
  );
};
