import React, { useState } from "react";
import "./question.css";

const Question = ({
  questionNumber,
  question,
  options,
  correctAnswer,
  //   explanation,
  //   topic,
  //   difficulty,
  //   subTopic,
  //   entrance_exams,
}) => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [selectedOption, setSelectedOption] = useState(null); // Initialize selectedOption to null

  const handleOptionClick = (index) => {
    setSelectedOption(index); // Update selectedOption when an option is clicked
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="question-container">
            <div className="question-box">
              <span className="question-number">{questionNumber} </span>
              {question}
            </div>
            <div className="options-container">
              <div className="options-grid">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`option-box ${
                      selectedOption !== null && selectedOption === index
                        ? correctAnswer === index
                          ? "correct"
                          : "incorrect"
                        : ""
                    }`}
                    onClick={() => handleOptionClick(index)}
                  >
                    <span className="option-alphabet">{alphabets[index]} </span>
                    {option}
                    {correctAnswer === index && selectedOption === index && (
                      <span className="correct-answer">
                        <i className="fa-solid fa-check"></i>
                      </span>
                    )}
                    {selectedOption !== null &&
                      selectedOption === index &&
                      correctAnswer !== index && (
                        <span className="incorrect-answer">
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      )}
                  </div>
                ))}
              </div>
            </div>

            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Explain It
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <strong>This is the first item's accordion body.</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
