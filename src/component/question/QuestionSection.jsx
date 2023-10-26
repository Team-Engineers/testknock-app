import React, { useState } from 'react';
import './QuestionSection.css';

const MCQSection = () => {
  // Sample data
  const staticData = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Madrid', 'Paris', 'Berlin'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
      correctAnswer: 'Mars',
    },
    
  ];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(staticData.length).fill(null)
  );

  //handle option selection
  const handleOptionSelect = (questionIndex, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
  };


  const getAlphabet = (index) => String.fromCharCode(65 + index);

  return (
    <div className="mcq-section">
      {staticData.map((questionData, questionIndex) => (
        <div key={questionIndex} className="mcq-container">
          <div className="question-header">
            <span className="question-number">Q {questionIndex + 1}:</span>
            <h2>{questionData.question}</h2>
          </div>
          <ul>
            {questionData.options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                className={
                  selectedOptions[questionIndex] === optionIndex
                    ? optionIndex === questionData.options.indexOf(questionData.correctAnswer)
                      ? "correct"
                      : "incorrect"
                    : ""
                }
                onClick={() => handleOptionSelect(questionIndex, optionIndex)}
              >
                <span className="alphabet">{getAlphabet(optionIndex)}.   </span>
                {option}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MCQSection;
