import React, { useState } from "react";
import "./question.css";

const QuestionV1 = ({ data }) => {
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
    <section className="question-practice-v1">
      <div className="d-flex justify-content-center mt-4 align-items-center flex-column">
        {data.slice(currentPage * 1, currentPage + 1).map((item, index) => (
          <div key={index} className="question-container">
            <div className="question-box paragraph">
              <h6>
                <strong>Direction:</strong> Read the following passage carefully
                and answer the questions that follow.
              </h6>
              <div className="d-flex justify-content-start align-items-center gap-3">
                <span className="question-number">{`P${
                  index + 1 + currentPage
                } `}</span>
                <div className="question-text">
                  {item.paragraph.map((paragraph, paraindex) => (
                    <h6 key={paraindex}>{paragraph}</h6> // The 'return' is implicit here
                  ))}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center gap-3">
                {item.images &&
                  item.images.map((image, imageIndex) => (
                    <img
                      className="question-image"
                      key={imageIndex}
                      src={image}
                      alt={`Img ${imageIndex + 1}`}
                    />
                  ))}
              </div>
            </div>
            <div className="options-container">
              {item.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="options-grid">
                  <div className="question-box">
                    <div className="question-option">
                      <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                        <span className="question-number">{`${
                          questionIndex + 1
                        } `}</span>
                        <div>
                          {question.text.map((text, textIndex) => (
                            <h6
                              key={textIndex}
                              className="question-text"
                            >{`${text}`}</h6>
                          ))}
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                        {question.images &&
                          question.images.map((image, imageIndex) => (
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
                            selectedOption[questionIndex] !== null &&
                            selectedOption[questionIndex] === optionIndex
                              ? question.correctOptionIndex === optionIndex
                                ? "correct"
                                : "incorrect"
                              : ""
                          }`}
                          onClick={() => handleOptionClick(optionIndex)}
                        >
                          <h6 className="option-alphabet">
                            {alphabets[optionIndex]}
                          </h6>
                          <h6 className="d-flex justify-content-start gap-3 w-100 align-items-center ">
                            {option.text}
                          </h6>
                          <div className="d-flex">
                            {question.correctOptionIndex === optionIndex &&
                              selectedOption === optionIndex && (
                                <span className="correct-answer">
                                  <i className="fa-solid fa-check"></i>
                                </span>
                              )}
                            {selectedOption !== null &&
                              selectedOption === optionIndex &&
                              question.correctOptionIndex !== optionIndex && (
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
                          //   aria-labelledby={`heading${index}`}
                          data-bs-parent={`#accordionExample-${questionIndex}`}
                        >
                          <div class="accordion-body">
                            {item.questions[questionIndex].explanation.text.map(
                              (explanationText, explanationIndex) => (
                                <h6
                                  key={explanationIndex}
                                  className="explanation"
                                >
                                  {explanationText}
                                </h6>
                              )
                            )}
                            <div className="d-flex justify-content-center align-items-center gap-3">
                              {item.questions[questionIndex].explanation
                                .images &&
                                item.questions[
                                  questionIndex
                                ].explanation.images.map(
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
          </div>
        ))}
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

export default QuestionV1;
