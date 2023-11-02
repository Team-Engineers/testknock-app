import React, { useEffect, useState } from "react";
import "./question.css";

const Question = () => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch("https://ourntamockpapers.onrender.com/api/di/question/v1")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
  };
  const handleNextPage = () => {
    if (currentPage < data.length - 1) {
      setCurrentPage(currentPage + 1);
      setSelectedOption(null);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setSelectedOption(null);
    }
  };


  const pagesToShow = 5;
  const firstPageIndex = Math.max(0, currentPage - 2);
  const lastPageIndex = Math.min(
    data.length - 1,
    firstPageIndex + pagesToShow - 1
  );

  return (
    <section className="question-practice">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-9">
            {data.map((item, index) => (
              <div key={index} className="question-container">
                <div className="question-box">
                  <p className="paragraph">
                    <strong>Direction:</strong> Read the following passage
                    carefully and answer the questions that follow.
                  </p>
                  <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                    <span className="question-number">{`P${index + 1} `}</span>
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
                          <span className="question-text">{question.text}</span>
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
                                    .image &&
                                    item.questions[
                                      questionIndex
                                    ].explanation.image.map(
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
          </div>
        </div>
      </div>
      <div className="pagination">
        <button
          className={`page-button ${currentPage === 0 ? "disabled" : ""}`}
          onClick={handlePreviousPage}
        >
          Prev
        </button>
        {Array.from({ length: lastPageIndex - firstPageIndex + 1 }).map(
          (_, index) => {
            const pageIndex = firstPageIndex + index;
            return (
              <button
                key={pageIndex}
                className={`page-button ${
                  currentPage === pageIndex ? "active" : ""
                }`}
                onClick={() => setCurrentPage(pageIndex)}
              >
                {pageIndex + 1}
              </button>
            );
          }
        )}
        <button
          className={`page-button ${
            currentPage === data.length - 1 ? "disabled" : ""
          }`}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Question;
