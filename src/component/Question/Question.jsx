// import React from "react";
// import "./question.css";

// const Question = () => {
//   const Questions = [
//     {
//       QuestionsText: "What is the capital of France?",
//       answerOptions: [
//         { answerText: "New York", isCorrect: false },
//         { answerText: "London", isCorrect: false },
//         { answerText: "Paris", isCorrect: true },
//         { answerText: "Dublin", isCorrect: false },
//       ],
//     },
//     {
//       QuestionsText: "Who is CEO of Tesla?",
//       answerOptions: [
//         { answerText: "Jeff Bezos", isCorrect: false },
//         { answerText: "Elon Musk", isCorrect: true },
//         { answerText: "Bill Gates", isCorrect: false },
//         { answerText: "Tony Stark", isCorrect: false },
//       ],
//     },
//     {
//       QuestionsText: "The iPhone was created by which company?",
//       answerOptions: [
//         { answerText: "Apple", isCorrect: true },
//         { answerText: "Intel", isCorrect: false },
//         { answerText: "Amazon", isCorrect: false },
//         { answerText: "Microsoft", isCorrect: false },
//       ],
//     },
//     {
//       QuestionsText: "How many Harry Potter books are there?",
//       answerOptions: [
//         { answerText: "1", isCorrect: false },
//         { answerText: "4", isCorrect: false },
//         { answerText: "6", isCorrect: false },
//         { answerText: "7", isCorrect: true },
//       ],
//     },
//   ];
//   const options = [
//     { text: "4", is_correct: false },
//     { text: "3", is_correct: true },
//     { text: "3", is_correct: true },
//     { text: "3", is_correct: true },
//   ];

//   return (
//     <div>
//       <h3 className="Question-text">{Question.text}</h3>
//       {/* <h3>{Question.text}</h3> */}
//       <ul>
//         {options.map((option, index) => (
//           <li className="option" key={index}>
//             {option.text}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Question;

// import React, { useState } from "react";
// import "./question.css";

// const Question = () => {
//   const Questions = [
//     {
//       QuestionsText: "What is the capital of France?",
//       answerOptions: [
//         { answerText: "New York", isCorrect: false },
//         { answerText: "London", isCorrect: false },
//         { answerText: "Paris", isCorrect: true },
//         { answerText: "Dublin", isCorrect: false },
//       ],
//     },
//     {
//       QuestionsText: "Who is CEO of Tesla?",
//       answerOptions: [
//         { answerText: "Jeff Bezos", isCorrect: false },
//         { answerText: "Elon Musk", isCorrect: true },
//         { answerText: "Bill Gates", isCorrect: false },
//         { answerText: "Tony Stark", isCorrect: false },
//       ],
//     },
//     {
//       QuestionsText: "The iPhone was created by which company?",
//       answerOptions: [
//         { answerText: "Apple", isCorrect: true },
//         { answerText: "Intel", isCorrect: false },
//         { answerText: "Amazon", isCorrect: false },
//         { answerText: "Microsoft", isCorrect: false },
//       ],
//     },
//     {
//       QuestionsText: "How many Harry Potter books are there?",
//       answerOptions: [
//         { answerText: "1", isCorrect: false },
//         { answerText: "4", isCorrect: false },
//         { answerText: "6", isCorrect: false },
//         { answerText: "7", isCorrect: true },
//       ],
//     },
//   ];

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const currentQuestion = Questions[currentQuestionIndex];

//   return (
//     <div>
//       <h3 className="Question-text">{currentQuestion.QuestionsText}</h3>
//       <ul>
//         {currentQuestion.answerOptions.map((option, index) => (
//           <li className="option" key={index}>
//             {option.answerText}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Question;

// import React from "react";
// import "./QuestionComponent.css";

// const QuestionComponent = ({ question, options }) => {
//   return (
//     <div className="question-container">
//       <div className="question-box">{question}</div>
//       <div className="options-container">
//         {options.map((option, index) => (
//           <div key={index} className="option-box">
//             {option}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuestionComponent;

// import React from "react";
// import "./QuestionComponent.css";

// const QuestionComponent = ({ question, options }) => {
//   return (
//     <div className="question-container">
//       <div className="question-box">{question}</div>
//       <div className="options-container">
//         {/* {options.map((option, index) => (
//           <div key={index} className="option-box">
//             {index + 1}. {option} */}
//         {options.map((option, index) => (
//           <div key={index} className="option-box" data-number={index + 1}>
//             {option}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuestionComponent;

//

// import React from "react";
// import "./QuestionComponent.css";

// const QuestionComponent = ({ question, options }) => {
//   // Array of alphabets (you can extend this if needed)
//   const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

//   return (
//     <div className="question-container">
//       {/* <div className="question-box">{question}</div> */}
//       <div className="question-box">
//         <span className="question-number">1. </span>
//         {question}
//       </div>
//       <div className="options-container">
//         {options.map((option, index) => (
//           <div key={index} className="option-box">
//             <span className="option-alphabet">{alphabets[index]}. </span>
//             {option}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuestionComponent;

import React, { useState } from "react";
import "./question.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const Question = ({ questionNumber, question, options, correctAnswer }) => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  return (
    <div className="question-container">
      <div className="question-box">
        <span className="question-number">{questionNumber}. </span>
        {question}
      </div>
      <div className="options-container">
        <div className="options-grid">
          {options.map((option, index) => (
            <div
              key={index}
              className={`option-box ${
                correctAnswer === index
                  ? "correct"
                  : selectedOption === index
                  ? "incorrect"
                  : ""
              }`}
              onClick={() => handleOptionClick(index)}
            >
              {/* <div key={index} className="option-box"> */}
              <span className="option-alphabet">{alphabets[index]}. </span>
              {option}
              {correctAnswer === index && (
                <span className="correct-answer">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
              {selectedOption === index && (
                <span className="incorrect-answer">
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
