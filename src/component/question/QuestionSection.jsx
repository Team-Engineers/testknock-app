import React, { useState } from 'react';
import './QuestionSection.css';
import commentsImage from './comment.png';

const MCQSection = () => {
  const data = {
    paragraph: "This is LR question 2 of lr2?",
    images: ["image1.jpg", "image2.jpg"],
    questions: [
      {
        text: "Question 1 text",
        image: ["question1_image1.jpg", "question1_image2.jpg"],
        options: [
          {
            text: "Option 1 for Question 1",
            image: "option1_image.jpg"
          },
          {
            text: "Option 2 for Question 1",
            image: "option2_image.jpg"
          }
        ],
        correctOptionIndex: 2,
        explanation: {
          text: ["Explanation for Question 1"],
          image: ["explanation_image1.jpg", "explanation_image2.jpg"]
        },
        difficulty: "Easy"
      },
      {
        text: "Question 2 text",
        image: ["question2_image1.jpg"],
        options: [
          {
            text: "Option 1 for Question 2"
          },
          {
            text: "Option 2 for Question 2"
          }
        ],
        correctOptionIndex: 2,
        explanation: {
          text: ["Explanation for Question 2"],
          image: ["explanation_image1.jpg"]
        },
        difficulty: "Medium"
      }
    ],
    difficulty: "Hard",
    topic: "LR",
    subTopic: "varc1",
    entrance_exams: ["Exam 1", "Exam 2"]
  };

  const [selectedOptions, setSelectedOptions] = useState(Array(data.questions.length).fill(null));
  const [explanationVisible, setExplanationVisible] = useState(Array(data.questions.length).fill(false));

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleExplanationToggle = (questionIndex) => {
    const updatedExplanationVisible = [...explanationVisible];
    updatedExplanationVisible[questionIndex] = !updatedExplanationVisible[questionIndex];
    setExplanationVisible(updatedExplanationVisible);
  };

  const getAlphabet = (index) => String.fromCharCode(65 + index);

  return (
    <div className="mcq-section">
      <div className="mcq-container">
        <div className="question-header">
          <span className="question-number">Q 1:</span>
          <h2>{data.paragraph}</h2>
        </div>
        <ul>
          {data.questions.map((question, questionIndex) => (
            <li
              key={questionIndex}
              className={
                selectedOptions[questionIndex] === questionIndex
                  ? questionIndex === question.correctOptionIndex
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }
              onClick={() => handleOptionSelect(questionIndex, questionIndex)}
            >
              <span className="alphabet">{getAlphabet(questionIndex)}.   </span>
              {question.text}
            </li>
          ))}
        </ul>

        <button className="explanation-button" onClick={() => handleExplanationToggle(0)}>
          {explanationVisible[0] ? 'Hide Explanation' : 'Show Explanation'}
          <img src={commentsImage} alt="Explanation" className="explanation-icon" />
        </button>

        {explanationVisible[0] && (
          <div className="explanation">
            {data.questions[0].explanation.text.map((explanationText, index) => (
              <p key={index}>{explanationText}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MCQSection;
