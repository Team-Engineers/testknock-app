import React from "react";
import Question from "./Question";

const QuestionSeries = () => {
  // Declare the questions array within this component
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["New York", "London", "Paris", "Dublin"],
      correctAnswerIndex: 2,
    },
    {
      question: "Who is CEO of Tesla?",
      options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tony Stark"],
      correctAnswerIndex: 1,
    },
    {
      question: "What year was JavaScript launched?",
      options: ["1996", "1995", "1994", "none of the above"],
      correctAnswerIndex: 1,
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Central Style Sheets",
        "Cascading Style Sheets",
        "Cascading Simple Sheets",
        "Cars SUVs Sailboats",
      ],
      correctAnswerIndex: 1,
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      correctAnswerIndex: 3,
    },
  ];

  return (
    <div>
      {questions.map((q, index) => (
        <Question
          key={index}
          questionNumber={index + 1}
          question={q.question}
          options={q.options}
          correctAnswer={q.correctAnswerIndex}
        />
      ))}
    </div>
  );
};

export default QuestionSeries;
