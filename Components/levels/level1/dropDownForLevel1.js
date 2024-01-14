import React, { useState } from "react";

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
        alert("Please select a unique value for each statement.");
        // Reset the dropdown value for the statement that violated the rule
        updatedDropdownValues[statement] = "";
        setDropdownValues(updatedDropdownValues);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-lg p-2">
        Arrange The Given Problems In Correct Order
      </div>
      {Object.keys(dropdownValues).map((statement, index) => (
        <div key={index} className="flex items-center">
          <p className="mr-2">{`${questionStatement[index]}:`}</p>
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
    </div>
  );
};
