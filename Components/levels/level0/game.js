import { useState, useEffect } from 'react';
import questionsData from 'data/qualifier/questions.json';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Quiz = ({ currentSet, setCurrentSet, currentQuestionIndex, setCurrentQuestionIndex }) => {
  const currentSetQuestions = questionsData[currentSet];
  const [selectedOption, setSelectedOption] = useState(null);

  const sendAnswer = () => {
    
    const dataToSend = {
      set: currentSet,
      questionIndex: currentQuestionIndex,
      selectedOption: selectedOption,
    };

    
    fetch('/api/levels/level0/sendData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        
        console.log('Data sent successfully:', data);
      })
      .catch((error) => {
        
        console.error('Error sending data:', error);
      });

    
    if (currentQuestionIndex < currentSetQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    } else {
      const sets = Object.keys(questionsData);
      const nextSetIndex = sets.indexOf(currentSet) + 1;
      if (nextSetIndex < sets.length) {
        setCurrentSet(sets[nextSetIndex]);
        setCurrentQuestionIndex(0);
      } else {
        console.log('End of the quiz');
      }
    }
  };

  return (
    <div>
      <h1>Question {currentQuestionIndex + 1}</h1>
      <div>
        {currentSetQuestions[currentQuestionIndex]?.question.text}
      </div>
      <div>
        {currentSetQuestions[currentQuestionIndex]?.options.optn.map((option) => (
          <div key={option}>
            <input
              type="radio"
              name="options"
              value={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
      <button onClick={sendAnswer}>Next</button>
    </div>
  );
};

const HomePage = () => {
  const [currentSet, setCurrentSet] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const sets = Object.keys(questionsData);
    shuffleArray(sets);
    setCurrentSet(sets[0]);
  }, []);

  return (
    <div>
      {currentSet ? (
        <Quiz
          currentSet={currentSet}
          setCurrentSet={setCurrentSet}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default HomePage;
