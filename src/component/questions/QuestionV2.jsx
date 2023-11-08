import React, { useState } from "react";
import "./question.css";
const QuestionV2 = ({ data }) => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleOptionClick = (questionIndex, optionIndex) => {
    const updatedSelectedOption = [...selectedOption];
    updatedSelectedOption[questionIndex] = optionIndex;
    setSelectedOption(updatedSelectedOption);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / 5) - 1) {
      setCurrentPage(currentPage + 1);
      setSelectedOption([]);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setSelectedOption([]);
    }
  };

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(data.length / 5);
    const maxPagesToShow = 5;
    const pages = [];
    let startPage = currentPage - Math.floor(maxPagesToShow / 2);
    let endPage = currentPage + Math.floor(maxPagesToShow / 2);

    if (startPage < 0) {
      endPage -= startPage;
      startPage = 0;
    }

    if (endPage > totalPages - 1) {
      startPage -= endPage - totalPages + 1;
      endPage = totalPages - 1;
    }

    startPage = Math.max(startPage, 0);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    while (pages.length > maxPagesToShow) {
      if (currentPage - startPage <= endPage - currentPage) {
        pages.pop();
      } else {
        pages.shift();
      }
    }

    return pages;
  };

  return (
    <section className="question-practice-v2">
      <div className="w-100 d-flex justify-content-center mt-4 align-items-center flex-column">
        <div className="options-container">
          {data
            .slice(currentPage * 5, (currentPage + 1) * 5)
            .map((question, questionIndex) => (
              <div key={questionIndex} className="options-grid">
                <div className="question-box">
                  <div className="question-option">
                    <div className="question">
                      <div className="question-number-container">
                        <span className="question-number">{`${
                          questionIndex + 1 + currentPage * 5
                        } `}</span>
                      </div>
                      <div className="question-text-container">
                        <h6 className="question-text">{question.text}</h6>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                      {question.image &&
                        question.image.map((image, imageIndex) => (
                          <img
                            className="question-image"
                            key={imageIndex}
                            src={image}
                            alt={`Img ${imageIndex + 1}`}
                          />
                        ))}
                    </div>
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`option-box ${
                          selectedOption[questionIndex] === optionIndex
                            ? question.correctOptionIndex - 1 === optionIndex
                              ? "correct"
                              : "incorrect"
                            : ""
                        }`}
                        onClick={() =>
                          handleOptionClick(questionIndex, optionIndex)
                        }
                      >
                        <span className="option-alphabet">
                          {alphabets[optionIndex]}
                        </span>
                        <div className="d-flex align-items-center justify-content-start gap-3 w-100 align-items-center ">
                          <h6>{option.text}</h6>
                          {option.image ? (
                            <img
                              className="question-image"
                              src={option.image}
                              alt={`Img ${optionIndex + 1}`}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="d-flex">
                          {question.correctOptionIndex - 1 === optionIndex &&
                            selectedOption[questionIndex] === optionIndex && (
                              <span className="correct-answer">
                                <i className="fa-solid fa-check"></i>
                              </span>
                            )}
                          {selectedOption[questionIndex] === optionIndex &&
                            question.correctOptionIndex - 1 !== optionIndex && (
                              <span className="incorrect-answer">
                                <i className="fa-solid fa-xmark"></i>
                              </span>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div class="accordion" id={`accordionExample`}>
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${questionIndex}`}
                          aria-expanded="true"
                          aria-controls={`collapse${questionIndex}`}
                        >
                          <h6>Explain It</h6>
                        </button>
                      </h2>
                      <div
                        id={`collapse${questionIndex}`}
                        class="accordion-collapse collapse"
                      >
                        <div class="accordion-body ">
                          {question.explanation.text.map(
                            (explanationText, explanationIndex) => (
                              <h6
                                className="explanation"
                                key={explanationIndex}
                              >
                                {explanationText}
                              </h6>
                            )
                          )}
                          <div className="d-flex justify-content-center align-items-center gap-3">
                            {question.explanation.image &&
                              question.explanation.image.map(
                                (explanationImage, explanationImageIndex) => (
                                  <img
                                    className="question-image"
                                    key={explanationImageIndex}
                                    src={explanationImage}
                                    alt={`Explanation Img ${
                                      explanationImageIndex + 1
                                    }`}
                                  />
                                )
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="pagination col-md-9">
          <button
            className={`page-button ${currentPage === 0 ? "disabled" : ""}`}
            onClick={handlePreviousPage}
          >
            Prev
          </button>
          {generatePageNumbers().map((pageIndex) => (
            <button
              key={pageIndex}
              className={`page-button ${
                currentPage === pageIndex ? "active" : ""
              }`}
              onClick={() => setCurrentPage(pageIndex)}
            >
              {pageIndex + 1}
            </button>
          ))}
          <button
            className={`page-button ${
              currentPage === Math.ceil(data.length / 5) - 1 ? "disabled" : ""
            }`}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuestionV2;
