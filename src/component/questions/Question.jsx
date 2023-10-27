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
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
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
