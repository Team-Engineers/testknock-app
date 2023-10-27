import React, { useState } from 'react';
import './QuestionSection.css';
import commentsImage from './comment.png';

const MCQSection = () => {
  // Sample data
  const staticData = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Madrid', 'Paris', 'Berlin'],
      correctAnswer: 'Paris',
      explanation: 'Paris is the capital of France.',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
      correctAnswer: 'Mars',
      explanation: 'Mars is often referred to as the Red Planet due to its reddish appearance.',
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(staticData.length).fill(null)
  );

  const [explanationVisible, setExplanationVisible] = useState(
    Array(staticData.length).fill(false)
  );

  // Handle option selection
  const handleOptionSelect = (questionIndex, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
  };

  // Handle explanation visibility toggle
  const handleExplanationToggle = (questionIndex) => {
    const updatedExplanationVisible = [...explanationVisible];
    updatedExplanationVisible[questionIndex] = !updatedExplanationVisible[questionIndex];
    setExplanationVisible(updatedExplanationVisible);
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
          
          <button
  className="explanation-button"
  onClick={() => handleExplanationToggle(questionIndex)}
>
  {explanationVisible[questionIndex] ? 'Hide Explanation' : 'Show Explanation'}
  <img
  src={commentsImage}
  alt="Explanation"
  className="explanation-icon"
/>
</button>

          {explanationVisible[questionIndex] && (
            <div className="explanation">
              {questionData.explanation}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MCQSection;


