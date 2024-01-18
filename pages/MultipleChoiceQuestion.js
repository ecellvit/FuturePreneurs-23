import React, { useState } from 'react';

const DualChoiceQuestion = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    heading1: null,
    heading2: null,
  });

  const handleOptionChange = (heading, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [heading]: option,
    }));
  };

  const headings = ['Heading 1', 'Heading 2'];
  const optionsPerHeading = {
    'Heading 1': ['Option A', 'Option B'],
    'Heading 2': ['Option C', 'Option D'],
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-md">
      <h1 className="text-lg font-semibold mb-4">Select one option per heading:</h1>
      {headings.map((heading, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-md font-semibold mb-2">{heading}</h2>
          {optionsPerHeading[heading].map((option, optionIndex) => (
            <div
              key={optionIndex}
              className={`flex items-center space-x-2 mb-2 ${
                selectedOptions[heading] === option
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              } p-2 rounded cursor-pointer`}
            >
              <input
                type="radio"
                name={heading}
                value={option}
                checked={selectedOptions[heading] === option}
                onChange={() => handleOptionChange(heading, option)}
                className="cursor-pointer"
              />
              <span className="select-none">{option}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DualChoiceQuestion;



