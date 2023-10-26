import React, { useState } from "react";
import "./question.css";

const Question = ({ questionNumber, question, options, correctAnswer }) => {
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
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${questionNumber}`}
                    aria-expanded="true"
                    aria-controls={`collapse${questionNumber}`}
                  >
                    Explain It
                  </button>
                </h2>
              </div>
              <div
                id={`collapse${questionNumber}`}
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <strong>Explain It</strong> It is shown by default, until the
                  collapse plugin adds the appropriate classes that we use to
                  style each element. These classes control the overall
                  appearance, as well as the showing and hiding via CSS
                  transitions. You can modify any of this with custom CSS or
                  overriding our default variables. It's also worth noting that
                  just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
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