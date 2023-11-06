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
    if (currentPage < Math.ceil(data.length) - 1) {
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
    const totalPages = Math.ceil(data.length);
    const maxPagesToShow = 5;
    const pages = [];
    const currentPageIndex = currentPage;

    for (
      let i = currentPageIndex - Math.floor(maxPagesToShow / 2);
      i <= currentPageIndex + Math.floor(maxPagesToShow / 2);
      i++
    ) {
      if (i >= 0 && i < totalPages) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <section className="question-practice-v2">
      <div className="col-lg-9 w-100">
        <div className="d-flex justify-content-center mt-4 align-items-center flex-column">
          {data.slice(currentPage*1,(currentPage+1)).map((item, index) => (
            <div key={index} className="question-container">
              <div className="question-box">
                <p className="paragraph">
                  <strong>Direction:</strong> Read the following passage
                  carefully and answer the questions that follow.
                </p>
                <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                  <span className="question-number">{`P${index + 1+ currentPage} `}</span>
                  <span className="question-text">{item.paragraph}</span>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
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
                      <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                        <span className="question-number">{`${
                          questionIndex + 1
                        } `}</span>
                        <div>
                          {question.text.map((text, textIndex) => (
                            <span
                              key={textIndex}
                              className="question-text"
                            >{`${text}`}</span>
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
                          <span className="option-alphabet">
                            {alphabets[optionIndex]}
                          </span>
                          <div className="d-flex justify-content-start gap-3 w-100 align-items-center ">
                            {option.text}
                            {/* {option.image ? (
                              <img
                                className="question-image"
                                src={option.image}
                                alt={`Img ${optionIndex + 1}`}
                              />
                            ) : (
                              ""
                            )} */}
                          </div>
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
                              Explain It
                            </button>
                          </h2>
                          <div
                            id={`collapse${questionIndex}`}
                            class="accordion-collapse collapse"
                            //   aria-labelledby={`heading${index}`}
                            data-bs-parent={`#accordionExample-${questionIndex}`}
                          >
                            <div class="accordion-body">
                              <strong>
                                This is the explanation for this question.
                              </strong>
                              {item.questions[
                                questionIndex
                              ].explanation.text.map(
                                (explanationText, explanationIndex) => (
                                  <p key={explanationIndex}>
                                    {explanationText}
                                  </p>
                                )
                              )}
                              <div className="d-flex justify-content-center align-items-center gap-3">
                                {item.questions[questionIndex].explanation
                                  .images &&
                                  item.questions[
                                    questionIndex
                                  ].explanation.images.map(
                                    (
                                      explanationImage,
                                      explanationImageIndex
                                    ) => (
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
                currentPage === Math.ceil(data.length / 1) - 1 ? "disabled" : ""
              }`}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  )

};

export default QuestionV1;
