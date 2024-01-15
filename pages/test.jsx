// src/components/Quiz.js

import { useState } from 'react';

const questions = [
  {
    id: 1,
    text: 'Which programming languages are dynamically typed?',
    options: ['Python', 'JavaScript', 'Java', 'C#'],
    correctAnswers: ['Python', 'JavaScript'],
    optionType: 'multiple',
  },
  // Add more questions as needed
];

const Test = () => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (questionId, option) => {
    const isSelected = selectedOptions[questionId]?.includes(option);
    
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: getUpdatedOptions(
        prevOptions[questionId] || [],
        option,
        questions.find((q) => q.id === questionId).optionType,
        isSelected
      ),
    }));
  };

  const getUpdatedOptions = (prevOptions, option, optionType, isSelected) => {
    if (optionType === 'single') {
      
      // For single-select, keep only the selected option
      return [option];
    } else {
      // For multiple-select, add or remove the option based on selection
      return isSelected
        ? prevOptions.filter((selectedOption) => selectedOption !== option)
        : [...prevOptions, option];
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md">
      {questions.map((question) => (
        <div key={question.id} className="mb-4">
          <h2 className="text-lg font-semibold mb-2">{question.text}</h2>
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type={question.optionType === 'single' ? 'radio' : 'checkbox'}
                  name={`question_${question.id}`}
                  onChange={() => handleOptionChange(question.id, option)}
                  checked={
                    selectedOptions[question.id]?.includes(option) || false
                  }
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
        Submit
      </button>
    </div>
  );
};

export default test;
